(function () {
  const CURRENCY = "USD";
  const PRODUCT_CONTENT_TYPE = "product";
  const CATALOG_AUDIT_URL = "/api/shopify/catalog-audit";
  const BAG_STORAGE_KEY = "driftBag";

  let catalogAudit = null;
  let catalogAuditRequest = null;
  let pendingAddToCart = null;
  let lastBagCount = 0;
  let lastViewedProductKey = "";

  const safeFbq = (eventName, params) => {
    if (typeof window.fbq !== "function") return;
    window.fbq("track", eventName, params);
  };

  const parseMoney = (value) => {
    if (!value) return 0;
    const amount = Number(String(value).replace(/[^0-9.]/g, ""));
    return Number.isFinite(amount) ? amount : 0;
  };

  const productTitle = () => document.querySelector(".product-detail-title")?.textContent.trim() || "";

  const selectedColor = () => {
    const text = document.querySelector(".product-detail-selection")?.textContent || "";
    return text.replace(/^Color\s*/i, "").trim();
  };

  const selectedSize = () => {
    const text = document.querySelector(".product-detail-size-selection")?.textContent || "";
    return text.replace(/^Size\s*/i, "").trim();
  };

  const selectedQuantity = () => {
    const quantity = Number(document.querySelector(".product-detail-quantity")?.value || 1);
    return Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
  };

  const selectedPrice = () => {
    const priceNode =
      document.querySelector(".product-detail-price .price-current") ||
      document.querySelector(".product-detail-price");
    return parseMoney(priceNode?.textContent);
  };

  const normalize = (value) => String(value || "").trim().toLowerCase();

  const variantKeysFor = (productName, color, size) => {
    const keys = [];
    if (color && size) keys.push(`${color} / ${size}`);
    if (color) keys.push(color);
    if (size) keys.push(size);
    if (productName) keys.push(productName);
    return keys;
  };

  const loadCatalogAudit = async () => {
    if (catalogAudit) return catalogAudit;
    if (!catalogAuditRequest) {
      catalogAuditRequest = fetch(CATALOG_AUDIT_URL, { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : null))
        .then((audit) => {
          catalogAudit = audit || {};
          return catalogAudit;
        })
        .catch(() => {
          catalogAudit = {};
          return catalogAudit;
        });
    }
    return catalogAuditRequest;
  };

  const findVariantId = async ({ productName, color, size, variantKey }) => {
    const audit = await loadCatalogAudit();
    const variants = audit.variantIds?.[productName] || {};
    const product = audit.products?.[productName] || {};
    const possibleKeys = [
      variantKey,
      ...variantKeysFor(productName, color, size)
    ].filter(Boolean);

    for (const key of possibleKeys) {
      if (variants[key]) return variants[key];
      const matchedKey = Object.keys(variants).find((candidate) => normalize(candidate) === normalize(key));
      if (matchedKey) return variants[matchedKey];
    }

    return product.id || product.handle || productName;
  };

  const currentProductPayload = async (eventName) => {
    const title = productTitle();
    const color = selectedColor();
    const size = selectedSize();
    const quantity = selectedQuantity();
    const unitValue = selectedPrice();
    const contentId = await findVariantId({ productName: title, color, size });

    return {
      eventName,
      params: {
        content_ids: [contentId],
        content_name: title,
        content_type: PRODUCT_CONTENT_TYPE,
        value: Number((unitValue * quantity).toFixed(2)),
        currency: CURRENCY
      }
    };
  };

  const getBagCount = () => {
    const count = Number(document.querySelector(".bag-count")?.textContent.trim() || 0);
    return Number.isFinite(count) ? count : 0;
  };

  const getBagItems = () => {
    try {
      const items = JSON.parse(window.localStorage.getItem(BAG_STORAGE_KEY) || "[]");
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  };

  const checkoutPayload = async () => {
    const items = getBagItems();
    const contentIds = await Promise.all(
      items.map((item) =>
        findVariantId({
          productName: item.product,
          color: item.color,
          size: item.size,
          variantKey: item.variantKey
        })
      )
    );
    const subtotal = parseMoney(document.querySelector(".bag-subtotal")?.textContent);
    const fallbackSubtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);

    return {
      content_ids: contentIds.filter(Boolean),
      content_type: PRODUCT_CONTENT_TYPE,
      value: Number((subtotal || fallbackSubtotal || 0).toFixed(2)),
      currency: CURRENCY,
      num_items: items.reduce((sum, item) => sum + Number(item.quantity || 1), 0)
    };
  };

  const trackViewContent = async () => {
    const detail = document.querySelector(".product-detail");
    if (!detail || detail.hidden) return;

    const title = productTitle();
    if (!title) return;

    const key = [title, selectedColor(), selectedSize()].filter(Boolean).join("|");
    if (key === lastViewedProductKey) return;
    lastViewedProductKey = key;

    const payload = await currentProductPayload("ViewContent");
    safeFbq(payload.eventName, payload.params);
  };

  const armAddToCart = (target) => {
    const button = target.closest(".product-detail-add, .mobile-sticky-add, .bundle-add");
    if (!button || button.disabled) return;

    const title = productTitle();
    const color = selectedColor();
    const size = selectedSize();
    const quantity = selectedQuantity();
    const unitValue = selectedPrice();

    pendingAddToCart = {
      params: {
        content_ids: [title],
        content_name: title,
        content_type: PRODUCT_CONTENT_TYPE,
        value: Number((unitValue * quantity).toFixed(2)),
        currency: CURRENCY
      },
      previousCount: getBagCount(),
      expiresAt: Date.now() + 4000
    };

    findVariantId({ productName: title, color, size }).then((contentId) => {
      if (!pendingAddToCart) return;
      pendingAddToCart.params.content_ids = [contentId];
    });
  };

  const maybeTrackAddToCart = () => {
    if (!pendingAddToCart) return;

    const currentCount = getBagCount();
    const didIncrease = currentCount > pendingAddToCart.previousCount || currentCount > lastBagCount;
    const expired = Date.now() > pendingAddToCart.expiresAt;

    if (didIncrease) {
      safeFbq("AddToCart", pendingAddToCart.params);
      pendingAddToCart = null;
    } else if (expired) {
      pendingAddToCart = null;
    }

    lastBagCount = currentCount;
  };

  const trackCheckout = async (target) => {
    const button = target.closest(".bag-checkout");
    if (!button || button.disabled) return;
    safeFbq("InitiateCheckout", await checkoutPayload());
  };

  const observeProductDetail = () => {
    const detail = document.querySelector(".product-detail");
    if (!detail) return;

    const observer = new MutationObserver(() => {
      window.setTimeout(trackViewContent, 0);
    });

    observer.observe(detail, {
      attributes: true,
      attributeFilter: ["hidden", "class"],
      childList: true,
      subtree: true
    });
  };

  const observeBagCount = () => {
    const count = document.querySelector(".bag-count");
    if (!count) return;

    const observer = new MutationObserver(maybeTrackAddToCart);
    observer.observe(count, {
      childList: true,
      characterData: true,
      subtree: true
    });
  };

  document.addEventListener(
    "click",
    (event) => {
      armAddToCart(event.target);
      trackCheckout(event.target);
    },
    true
  );

  document.addEventListener("DOMContentLoaded", () => {
    lastBagCount = getBagCount();
    loadCatalogAudit();
    observeProductDetail();
    observeBagCount();
    window.setTimeout(trackViewContent, 0);
  });
})();
