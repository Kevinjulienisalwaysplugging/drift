const header = document.querySelector(".site-header");
const animated = document.querySelectorAll("[data-animate]");
const form = document.querySelector(".signup-form");
const note = document.querySelector(".form-note");
const submitButton = form.querySelector("button");
let supabaseConfig = window.DRIFT_SUPABASE || {};
const productDetail = document.querySelector(".product-detail");
const productDetailClose = document.querySelector(".product-detail-close");
const productDetailGallery = document.querySelector(".product-detail-gallery");
const productDetailImageWrap = document.querySelector(".product-detail-image-wrap");
const productDetailImage = document.querySelector(".product-detail-image");
const productDetailTitle = document.querySelector(".product-detail-title");
const productDetailRating = document.querySelector(".product-detail-rating");
const productDetailDescription = document.querySelector(".product-detail-description");
const productDetailFeatures = document.querySelector(".product-detail-features");
const productDetailPrice = document.querySelector(".product-detail-price");
const productDetailSelection = document.querySelector(".product-detail-selection");
const productDetailOptions = document.querySelector(".product-detail-options");
const productDetailSwatches = document.querySelector(".product-detail-swatches");
const productDetailSizeOptions = document.querySelector(".product-detail-size-options");
const productDetailSizes = document.querySelector(".product-detail-sizes");
const productDetailSizeSelection = document.querySelector(".product-detail-size-selection");
const productDetailThumbnails = document.querySelector(".product-detail-thumbnails");
const productDetailQuantity = document.querySelector(".product-detail-quantity");
const productDetailAdd = document.querySelector(".product-detail-add");
const productDetailBuy = document.querySelector(".product-detail-buy");
const productDetailNote = document.querySelector(".product-detail-note");
const productDetailReviews = document.querySelector(".product-detail-reviews");
const productDetailEditorialDescription = document.querySelector(".product-detail-editorial-description");
const productDetailMaterials = document.querySelector(".product-detail-materials");
const productDetailCare = document.querySelector(".product-detail-care");
const productDetailFaqs = document.querySelector(".product-detail-faqs");
const productRelatedList = document.querySelector(".product-related-list");
const productRecentList = document.querySelector(".product-recent-list");
const productLightbox = document.querySelector(".product-lightbox");
const productLightboxImage = document.querySelector(".product-lightbox-image");
const productLightboxClose = document.querySelector(".product-lightbox-close");
const productLightboxBackdrop = document.querySelector(".product-lightbox-backdrop");
const customerGalleryPrev = document.querySelector(".customer-gallery-prev");
const customerGalleryNext = document.querySelector(".customer-gallery-next");
const mobileStickyCart = document.querySelector(".mobile-sticky-cart");
const mobileStickyTitle = document.querySelector(".mobile-sticky-title");
const mobileStickyPrice = document.querySelector(".mobile-sticky-price");
const mobileStickyAdd = document.querySelector(".mobile-sticky-add");
const bagTrigger = document.querySelector(".bag-trigger");
const bagCount = document.querySelector(".bag-count");
const bagPanel = document.querySelector(".bag-panel");
const bagClose = document.querySelector(".bag-close");
const bagBackdrop = document.querySelector(".bag-backdrop");
const bagItems = document.querySelector(".bag-items");
const bagEmpty = document.querySelector(".bag-empty");
const bagSubtotal = document.querySelector(".bag-subtotal");
const bagCheckout = document.querySelector(".bag-checkout");
const bagCheckoutNote = document.querySelector(".bag-checkout-note");
const joinPopup = document.querySelector(".join-popup");
const joinPopupClose = document.querySelector(".join-popup-close");
const joinPopupBackdrop = document.querySelector(".join-popup-backdrop");
const joinAuthForm = document.querySelector(".join-auth-form");
const joinAuthName = document.querySelector("#join-popup-name");
const joinAuthEmail = document.querySelector("#join-popup-email");
const joinAuthPassword = document.querySelector("#join-popup-password");
const joinAuthSignup = document.querySelector('[data-auth-action="signup"]');
const joinAuthLogin = document.querySelector('[data-auth-action="login"]');
const joinAuthReset = document.querySelector(".join-popup-reset");
const joinPopupMessage = document.querySelector(".join-popup-message");
const joinPopupSessionKey = "driftJoinPopupClosed";
const joinPopupCompletedKey = "driftJoinAuthCompleted";
const authStatus = document.querySelector(".auth-status");
const authStatusEmail = document.querySelector(".auth-status-email");
const authLogout = document.querySelector(".auth-logout");
const profileTrigger = document.querySelector(".profile-trigger");
const profileDropdown = document.querySelector(".profile-dropdown");
const profileMenuClose = document.querySelector(".profile-menu-close");
const profileMenuAuth = document.querySelector(".profile-menu-auth");
const profileMenuProfile = document.querySelector(".profile-menu-profile");
const profileMenuOrders = document.querySelector(".profile-menu-orders");
const namePopup = document.querySelector(".name-popup");
const namePopupClose = document.querySelector(".name-popup-close");
const namePopupBackdrop = document.querySelector(".name-popup-backdrop");
const profileNameForm = document.querySelector(".profile-name-form");
const profileNameInput = document.querySelector("#profile-name");
const profileNameMessage = document.querySelector(".profile-name-message");
const profileNameStorageKey = "driftCustomerName";
const profileNamePromptSessionKey = "driftProfileNamePromptClosed";

const colorClassByName = {
  Champagne: "swatch-champagne",
  Black: "swatch-black",
  Blush: "swatch-blush",
  Rose: "swatch-rose",
  Pink: "swatch-pink",
  "Light Pink": "swatch-light-pink",
  White: "swatch-white",
  Navy: "swatch-navy",
  "Navy Blue": "swatch-navy",
  Red: "swatch-red",
  Green: "swatch-light-green",
  "Light Green": "swatch-light-green",
  "Coffee Brown": "swatch-coffee-brown",
  "Light Champagne": "swatch-light-champagne",
  Ivory: "swatch-ivory",
  Mocha: "swatch-mocha",
  "Default Title": "swatch-bundle",
};

// Edit displayed storefront prices here. Shopify checkout prices still come from Shopify.
const productMarketPrices = {
  "Satin Pillowcase": "$19.99",
  "Satin Eyemask": "$14.99",
  "Satin Scrunchie": "$7.99",
  "Satin Bonnet": "$17.99",
  "Luxury Slippers": "$34.99",
  "Satin Nightgown": "$44.99",
};

const productPrices = {
  "Satin Pillowcase": "$12.99",
  "Satin Eyemask": "$9.99",
  "Satin Scrunchie": "$4.99",
  "Satin Bonnet": "$13.99",
  "Satin Twin Bedding Set": "$30.99",
  "Satin Full Bedding Set": "$49.99",
  "Satin Queen Bedding Set": "$69.99",
  "Satin King Bedding Set": "$75.99",
  "Satin Blanket": "$89.99",
  "Luxury Slippers": "$29.99",
  "Satin Nightgown": "$32.99",
  "The Nightstand Essentials Trio": "$39.99",
  "The Ultimate Hair Care Duo": "$19.99",
  "The Beauty Sleep Bundle": "$44.99",
  "The College / Dorm Starter": "$64.99",
};

const hasSalePrice = (productName) => Boolean(productMarketPrices[productName]);

const getPriceMarkup = (productName, salePrice = productPrices[productName]) => {
  const marketPrice = productMarketPrices[productName];

  if (!marketPrice) {
    return `<span class="price-current">${salePrice || ""}</span>`;
  }

  return `
    <span class="price-row">
      <span class="price-market">${marketPrice}</span>
      <span class="price-current">${salePrice}</span>
    </span>
    <span class="sale-badge">Summer Sale</span>
  `;
};

const productDetails = {
  "Satin Pillowcase": {
    description: "A smooth satin pillowcase designed for a cooler, softer night.",
    price: productPrices["Satin Pillowcase"],
    colors: ["Champagne", "Black", "Pink", "Rose", "White", "Navy Blue"],
    images: {
      Champagne: "assets/product-pillowcase-new.png",
      Black: "assets/product-pillowcase-new.png",
      Pink: "assets/product-pillowcase-new.png",
      Rose: "assets/product-pillowcase-new.png",
      White: "assets/product-pillowcase-new.png",
      "Navy Blue": "assets/product-pillowcase-new.png",
    },
  },
  "Satin Eyemask": {
    description: "A soft blackout layer for deeper rest and a polished bedside ritual.",
    price: productPrices["Satin Eyemask"],
    colors: ["Champagne", "Black", "Pink", "Rose", "White", "Navy Blue"],
    images: {
      Champagne: "assets/product-eyemask-new.png",
      Black: "assets/product-eyemask-new.png",
      Pink: "assets/product-eyemask-new.png",
      Rose: "assets/product-eyemask-new.png",
      White: "assets/product-eyemask-new.png",
      "Navy Blue": "assets/product-eyemask-new.png",
    },
  },
  "Satin Scrunchie": {
    description: "Low tension, high gloss, made for all-day wear and low-crease styling.",
    price: productPrices["Satin Scrunchie"],
    colors: ["Navy", "Black", "Light Green", "Red"],
    images: {
      Navy: "assets/product-scrunchies-platter.webp",
      Black: "assets/product-scrunchies-platter.webp",
      "Light Green": "assets/product-scrunchies-platter.webp",
      Red: "assets/product-scrunchies-platter.webp",
    },
  },
  "Satin Bonnet": {
    description: "A polished silhouette with a secure satin band for overnight protection.",
    price: productPrices["Satin Bonnet"],
    colors: ["Light Pink", "Black", "Coffee Brown", "Navy Blue", "Red"],
    images: {
      "Light Pink": "assets/product-bonnet-blush.webp",
      Black: "assets/product-bonnet-blush.webp",
      "Coffee Brown": "assets/product-bonnet-blush.webp",
      "Navy Blue": "assets/product-bonnet-blush.webp",
      Red: "assets/product-bonnet-blush.webp",
    },
  },
  "Satin Twin Bedding Set": {
    description: "A compact satin bedding set for a smooth, luminous sleep surface.",
    price: productPrices["Satin Twin Bedding Set"],
    colors: ["Light Champagne", "Black", "Green", "Pink"],
    images: {
      "Light Champagne": "assets/product-twin-bedding-set.webp",
      Black: "assets/product-twin-bedding-set.webp",
      Green: "assets/product-twin-bedding-set.webp",
      Pink: "assets/product-twin-bedding-set.webp",
    },
  },
  "Satin Full Bedding Set": {
    description: "A full-size satin bedding set with a refined, glossy hand-feel.",
    price: productPrices["Satin Full Bedding Set"],
    colors: ["Light Champagne", "Black", "Green", "Pink"],
    images: {
      "Light Champagne": "assets/product-full-bedding-set.webp",
      Black: "assets/product-full-bedding-set.webp",
      Green: "assets/product-full-bedding-set.webp",
      Pink: "assets/product-full-bedding-set.webp",
    },
  },
  "Satin Queen Bedding Set": {
    description: "A queen satin set made for everyday luxury and a softer bedroom mood.",
    price: productPrices["Satin Queen Bedding Set"],
    colors: ["Light Champagne", "Black", "Green", "Pink"],
    images: {
      "Light Champagne": "assets/product-queen-bedding-set.webp",
      Black: "assets/product-queen-bedding-set.webp",
      Green: "assets/product-queen-bedding-set.webp",
      Pink: "assets/product-queen-bedding-set.webp",
    },
  },
  "Satin King Bedding Set": {
    description: "A generous king satin set with a smooth finish and elevated drape.",
    price: productPrices["Satin King Bedding Set"],
    colors: ["Light Champagne", "Black", "Green", "Pink"],
    images: {
      "Light Champagne": "assets/product-king-bedding-set.webp",
      Black: "assets/product-king-bedding-set.webp",
      Green: "assets/product-king-bedding-set.webp",
      Pink: "assets/product-king-bedding-set.webp",
    },
  },
  "Satin Blanket": {
    description: "A luminous satin blanket for layered warmth and a finished bed.",
    price: productPrices["Satin Blanket"],
    colors: ["Black"],
    images: { Black: "assets/product-satin-blanket.webp" },
  },
  "Luxury Slippers": {
    description: "Soft house slippers made to complete the DRIFT evening ritual.",
    price: productPrices["Luxury Slippers"],
    colors: ["Red", "Black", "Light Pink", "Light Champagne"],
    images: {
      Red: "assets/product-slippers-new.png",
      Black: "assets/product-slippers-new.png",
      "Light Pink": "assets/product-slippers-new.png",
      "Light Champagne": "assets/product-slippers-new.png",
    },
    shopifyAvailable: false,
    unavailableMessage: "Luxury Slippers are not available for checkout yet.",
  },
  "Satin Nightgown": {
    description: "A fluid satin nightgown with adjustable straps, a soft lace neckline, and an easy midi drape for elevated sleepwear.",
    price: productPrices["Satin Nightgown"],
    colors: ["Black", "Pink", "Navy", "Champagne", "Red"],
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    features: [
      "Smooth satin finish with a soft, cool hand-feel",
      "Adjustable straps for a more comfortable fit",
      "Midi length with a relaxed, elegant drape",
    ],
    images: {
      Black: "assets/nightgown-black.png",
      Pink: "assets/nightgown-pink.png",
      Navy: "assets/nightgown-navy.png",
      Champagne: "assets/nightgown-champagne.png",
      Red: "assets/nightgown-red.png",
    },
    shopifyAvailable: false,
    unavailableMessage: "Satin Nightgown variants are being verified.",
  },
  "The Nightstand Essentials Trio": {
    description: "A curated bedside set for smoother hair, softer skin, and a quieter night routine.",
    price: productPrices["The Nightstand Essentials Trio"],
    colors: ["Light Champagne", "Pink", "Rose", "Black"],
    // Bundle photos will be added in the next deployment.
    images: {
      "Light Champagne": "assets/product-gift-set.webp",
      Pink: "assets/product-gift-set.webp",
      Black: "assets/product-gift-set.webp",
      Rose: "assets/product-gift-set.webp",
    },
  },
  "The Ultimate Hair Care Duo": {
    description: "A satin bonnet and scrunchie pairing made to protect texture and reduce overnight frizz.",
    price: productPrices["The Ultimate Hair Care Duo"],
    colors: ["Light Champagne", "Pink", "Rose", "Black"],
    // Bundle photos will be added in the next deployment.
    images: {
      "Light Champagne": "assets/product-scrunchies-box.webp",
      Pink: "assets/product-scrunchies-box.webp",
      Rose: "assets/product-scrunchies-box.webp",
      Black: "assets/product-scrunchies-box.webp",
    },
    shopifyAvailable: false,
    unavailableMessage: "This bundle is not available for checkout yet.",
  },
  "The Beauty Sleep Bundle": {
    description: "A polished sleep-care set built for a softer bedtime ritual.",
    price: productPrices["The Beauty Sleep Bundle"],
    colors: ["Light Champagne", "Pink", "Rose", "Black"],
    // Bundle photos will be added in the next deployment.
    images: {
      "Light Champagne": "assets/product-box-upright.webp",
      Pink: "assets/product-box-upright.webp",
      Rose: "assets/product-box-upright.webp",
      Black: "assets/product-box-upright.webp",
    },
  },
  "The College / Dorm Starter": {
    description: "A student-ready satin starter set for comfort, polish, and hair and skin protection.",
    price: productPrices["The College / Dorm Starter"],
    colors: ["Light Champagne", "Pink", "Rose", "Black"],
    // Bundle photos will be added in the next deployment.
    images: {
      "Light Champagne": "assets/product-drape-set.webp",
      Pink: "assets/product-drape-set.webp",
      Rose: "assets/product-drape-set.webp",
      Black: "assets/product-drape-set.webp",
    },
    shopifyAvailable: false,
    unavailableMessage: "This bundle is not available for checkout yet.",
  },
};

const productReviewState = new Map();

const bundleDetails = [
  {
    id: "nightstand-essentials-trio",
    name: "The Nightstand Essentials Trio",
    items: [
      { product: "Satin Pillowcase", price: "$29.99" },
      { product: "Satin Eyemask", price: "$10.99" },
      { product: "Satin Scrunchie", price: "$7.99" },
    ],
    retailValue: "$48.97",
    bundlePrice: "$39.99",
    focus: "Hair and skin protection while sleeping",
    note: "",
  },
  {
    id: "ultimate-hair-care-duo",
    name: "The Ultimate Hair Care Duo",
    items: [
      { product: "Satin Bonnet", price: "$15.99" },
      { product: "Satin Scrunchie", price: "$7.99" },
    ],
    retailValue: "$23.98",
    bundlePrice: "$19.99",
    focus: "Protecting hair texture and reducing frizz overnight",
    note: "",
  },
  {
    id: "beauty-sleep-bundle",
    name: "The Beauty Sleep Bundle",
    items: [
      { product: "Satin Pillowcase", price: "$29.99" },
      { product: "Satin Eyemask", price: "$10.99" },
      { product: "Satin Scrunchie", price: "$7.99" },
    ],
    retailValue: "$48.97",
    bundlePrice: "$44.99",
    focus: "A polished sleep-care set built for a softer bedtime ritual",
    note: "",
  },
  {
    id: "college-dorm-starter",
    name: "The College / Dorm Starter",
    items: [
      { product: "Satin Twin Bedding Set", price: "$30.99" },
      { product: "Satin Bonnet", price: "$15.99" },
      { product: "Satin Pillowcase", price: "$29.99" },
    ],
    retailValue: "$76.97",
    bundlePrice: "$64.99",
    focus: "Students heading to school who want comfort and hair/skin protection",
    note: "",
  },
];

let activeProductName = "";
let activeColor = "";
let activeSize = "";
let bag = JSON.parse(window.localStorage.getItem("driftBag") || "[]")
  .map(({ image, ...item }) => item)
  .filter((item) => {
    const product = productDetails[item.product];
    const variantKey = getVariantKey(product, item.color, item.size);
    const hasVariant = product?.availableVariantKeys ? product.availableVariantKeys.includes(variantKey) : (product?.colors || []).includes(item.color);
    return product?.shopifyAvailable !== false && hasVariant;
  });

document.body.classList.add("reveal-ready");

document.querySelectorAll(".product-photo").forEach((image) => {
  image.loading = "lazy";
  image.decoding = "async";
});

const syncProductCardPrices = () => {
  document.querySelectorAll(".product-card").forEach((card) => {
    const productName = card.querySelector("h3")?.textContent;
    const price = productPrices[productName];
    const priceElement = card.querySelector("strong");

    if (price && priceElement) {
      priceElement.innerHTML = getPriceMarkup(productName, price);
    }
  });
};

const syncProductCardAvailability = () => {
  document.querySelectorAll(".product-card").forEach((card) => {
    const productName = card.querySelector("h3")?.textContent;
    const product = productDetails[productName];
    card.classList.toggle("product-card-unavailable", product?.shopifyAvailable === false);
  });
};

const syncProductCardImages = () => {
  document.querySelectorAll(".product-card").forEach((card) => {
    const productName = card.querySelector("h3")?.textContent;
    const product = productDetails[productName];
    const image = card.querySelector(".product-photo");

    if (!product || !image) return;

    const cardImage = product.cardImage || getProductImage(product, product.colors[0]);
    if (cardImage) {
      image.src = cardImage;
      image.alt = "";
    }
  });
};

const applyShopifyCatalogAudit = (audit) => {
  if (!audit?.products) return;

  Object.entries(productDetails).forEach(([productName, product]) => {
    const shopifyProduct = audit.products[productName];
    const variantMap = audit.variantIds?.[productName] || {};

    if (!shopifyProduct) {
      product.shopifyAvailable = false;
      product.unavailableMessage = `${productName} is not available for checkout yet.`;
      return;
    }

    product.shopifyAvailable = true;
    product.availableVariantKeys = Object.keys(variantMap);
    product.cardImage =
      shopifyProduct.image ||
      shopifyProduct.variants?.find((variant) => variant.image)?.image ||
      product.cardImage;

    const firstVariant = shopifyProduct.variants?.find((variant) => variant.price);
    if (firstVariant?.price && !hasSalePrice(productName)) {
      product.price = firstVariant.price;
      productPrices[productName] = firstVariant.price;
    }

    shopifyProduct.variants?.forEach((variant) => {
      if (variant.color && variant.image) {
        product.images[variant.color] = variant.image;
      }
    });

    if (product.availableVariantKeys.length === 0) {
      product.shopifyAvailable = false;
      product.unavailableMessage = `${productName} is missing matching Shopify variants.`;
    }
  });

  if (
    audit.missingProducts?.length ||
    audit.missingSiteVariants?.length ||
    audit.missingSiteColors?.length ||
    audit.missingSiteSizes?.length
  ) {
    console.warn("[DRIFT Shopify] Catalog needs attention", {
      missingProducts: audit.missingProducts,
      missingSiteVariants: audit.missingSiteVariants,
      missingSiteColors: audit.missingSiteColors,
      missingSiteSizes: audit.missingSiteSizes,
      titleMappings: audit.titleMappings,
    });
  }

  syncProductCardPrices();
  syncProductCardImages();
  syncProductCardAvailability();
  renderBag();
};

const hydrateShopifyCatalog = async () => {
  if (window.location.protocol === "file:") return;

  try {
    const response = await fetch("/api/shopify/catalog-audit", { cache: "no-store" });
    if (!response.ok) return;
    applyShopifyCatalogAudit(await response.json());
  } catch (error) {
    console.warn("[DRIFT Shopify] Catalog audit unavailable", error);
  }
};

const starRow = (rating) => {
  const count = Math.max(0, Math.min(5, Number(rating) || 0));
  return `${"\u2605".repeat(count)}${"\u2606".repeat(5 - count)}`;
};

const getReviewState = (productName) =>
  productReviewState.get(productName) || {
    reviews: [],
    summary: { average: 0, count: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } },
    pagination: { page: 1, pageSize: 8, total: 0, hasMore: false },
    sort: "recent",
    isLoading: false,
    message: "",
  };

const setReviewState = (productName, nextState) => {
  productReviewState.set(productName, { ...getReviewState(productName), ...nextState });
};

const getReviewHelpfulKey = () => {
  let key = window.localStorage.getItem("driftReviewHelpfulKey");
  if (!key) {
    key = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    window.localStorage.setItem("driftReviewHelpfulKey", key);
  }
  return key;
};

const formatReviewDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
};

const getReviewInitials = (name = "DRIFT Customer") =>
  String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "D";

const getProductReviewPhotos = (productName) =>
  getReviewState(productName).reviews.flatMap((review) =>
    (review.photos || []).map((photo) => ({
      ...photo,
      reviewId: review.id,
      caption: `${review.displayName} on ${productName}`,
    }))
  );

const renderReviewPlatform = (productName) => {
  const state = getReviewState(productName);
  const { summary } = state;
  const maxBreakdown = Math.max(1, ...Object.values(summary.breakdown || {}));
  const photos = getProductReviewPhotos(productName);
  const userName = currentAuthUser?.name || window.localStorage.getItem(profileNameStorageKey) || "";
  const userEmail = currentAuthUser?.email || "";

  productDetailReviews.innerHTML = `
    <summary>Reviews</summary>
    <div class="review-platform" data-product="${productName}">
      <div class="review-summary">
        <div>
          <div class="review-summary-stars" aria-label="${summary.average || 0} out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <strong>${summary.average ? summary.average.toFixed(1) : "0.0"}</strong>
          <span>${summary.count} ${summary.count === 1 ? "review" : "reviews"}</span>
        </div>
        <div class="review-breakdown">
          ${[5, 4, 3, 2, 1]
            .map((rating) => {
              const count = summary.breakdown?.[rating] || 0;
              const width = `${Math.round((count / maxBreakdown) * 100)}%`;
              return `
                <div class="review-breakdown-row">
                  <span>${starRow(rating)}</span>
                  <div><i style="width: ${width}"></i></div>
                  <strong>(${count})</strong>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="review-controls">
        <label>
          <span>Sort reviews</span>
          <select class="review-sort">
            <option value="recent"${state.sort === "recent" ? " selected" : ""}>Most Recent</option>
            <option value="highest"${state.sort === "highest" ? " selected" : ""}>Highest Rating</option>
            <option value="lowest"${state.sort === "lowest" ? " selected" : ""}>Lowest Rating</option>
            <option value="helpful"${state.sort === "helpful" ? " selected" : ""}>Most Helpful</option>
            <option value="verified"${state.sort === "verified" ? " selected" : ""}>Verified Buyers</option>
            <option value="photos"${state.sort === "photos" ? " selected" : ""}>Newest Photos</option>
          </select>
        </label>
      </div>

      <section class="customer-gallery" aria-label="Customer photo gallery">
        <div class="customer-gallery-heading">
          <h4>Customer Gallery</h4>
          <span>${photos.length} ${photos.length === 1 ? "photo" : "photos"}</span>
        </div>
        ${
          photos.length
            ? `<div class="customer-gallery-grid">${photos
                .map(
                  (photo, index) => `
                    <button class="customer-photo" type="button" data-photo-index="${index}" aria-label="Open customer photo">
                      <img src="${photo.url}" alt="${photo.alt || photo.caption}" loading="lazy" decoding="async">
                    </button>
                  `
                )
                .join("")}</div>`
            : '<p class="review-empty">Customer photos will appear here once shoppers add them.</p>'
        }
      </section>

      <form class="review-form" enctype="multipart/form-data">
        <h4>Write a review</h4>
        <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="review-form-grid">
          <label>Name<input name="name" value="${userName}" required></label>
          <label>Email<input name="email" type="email" value="${userEmail}" required></label>
          <label>Country
            <select name="country" required>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </label>
          <label>Rating
            <select name="rating" required>
              <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
              <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734;</option>
              <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734;</option>
              <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734;</option>
              <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734;</option>
            </select>
          </label>
        </div>
        <label>Review Title<input name="title" maxlength="120" required></label>
        <label>Review Body<textarea name="body" rows="4" maxlength="1500" required></textarea></label>
        <label>Optional Photos<input name="photos" type="file" accept="image/png,image/jpeg,image/webp" multiple></label>
        <button type="submit">Submit Review</button>
        <p class="review-form-message">${state.message || ""}</p>
      </form>

      <section class="review-list-section" aria-label="Individual product reviews">
        <div class="review-list-heading">
          <h4>Individual Reviews</h4>
          <span>${state.pagination?.total || summary.count} total</span>
        </div>
        <div class="review-list">
          ${
            state.isLoading
              ? '<p class="review-empty">Loading reviews...</p>'
              : state.reviews.length
                ? state.reviews.map(renderReviewCard).join("")
                : '<p class="review-empty">No reviews yet. Be the first to review this DRIFT piece.</p>'
          }
        </div>

        ${
          state.pagination?.hasMore
            ? `<button class="review-load-more" type="button">Load more reviews</button>`
            : ""
        }
      </section>
    </div>
  `;

  bindReviewPlatform(productName);
};

const renderReviewCard = (review) => {
  const photoCount = review.photos?.length || 0;

  return `
    <article class="product-review" data-review-id="${review.id}">
      <div class="product-review-header">
        <div class="reviewer-avatar" aria-hidden="true">${getReviewInitials(review.displayName)}</div>
        <div class="reviewer-identity">
          <div class="reviewer-name-line">
            <strong>${review.displayName}</strong>
            ${review.verifiedBuyer ? '<span class="verified-buyer">&#10003; Verified Buyer</span>' : ""}
          </div>
          <span class="review-country">${review.countryFlag ? `${review.countryFlag} ` : ""}${review.country}</span>
        </div>
        <time class="review-date" datetime="${review.createdAt || ""}">${formatReviewDate(review.createdAt)}</time>
      </div>
      <div class="review-card-body">
        <div class="review-stars" aria-label="${review.rating} out of 5 stars">${starRow(review.rating)}</div>
        <h4>${review.title}</h4>
        <p>${review.body}</p>
      </div>
      <div class="review-card-footer">
        ${
          photoCount
            ? `<button class="review-photo-count" type="button" data-review-id="${review.id}">&#128247; ${photoCount} ${photoCount === 1 ? "Photo" : "Photos"}</button>`
            : "<span></span>"
        }
        <button class="review-helpful" type="button" data-review-id="${review.id}">&#128077; Helpful <span>${review.helpfulCount || 0}</span></button>
      </div>
    </article>
  `;
};

let activeCustomerGallery = [];
let activeCustomerGalleryIndex = 0;

const openCustomerGalleryLightbox = (photos, index) => {
  if (!photos.length) return;

  activeCustomerGallery = photos;
  activeCustomerGalleryIndex = index;
  productLightboxImage.src = photos[index].url;
  productLightboxImage.alt = photos[index].alt || photos[index].caption || "DRIFT customer photo";
  productLightbox.hidden = false;
  productLightbox.classList.add("is-customer-gallery");
  document.body.classList.add("has-product-lightbox");
  productLightboxClose.focus();
};

const showCustomerGalleryPhoto = (direction) => {
  if (!activeCustomerGallery.length || productLightbox.hidden) return;

  activeCustomerGalleryIndex =
    (activeCustomerGalleryIndex + direction + activeCustomerGallery.length) % activeCustomerGallery.length;
  const photo = activeCustomerGallery[activeCustomerGalleryIndex];
  productLightboxImage.src = photo.url;
  productLightboxImage.alt = photo.alt || photo.caption || "DRIFT customer photo";
};

const loadProductReviews = async (productName, sort = getReviewState(productName).sort || "recent", page = 1, append = false) => {
  setReviewState(productName, { isLoading: true, sort, message: "" });
  renderReviewPlatform(productName);

  if (window.location.protocol === "file:") {
    setReviewState(productName, { isLoading: false, message: "Reviews load when the storefront is served from the app." });
    renderReviewPlatform(productName);
    return;
  }

  try {
    const response = await fetch(
      `/api/reviews?product=${encodeURIComponent(productName)}&sort=${encodeURIComponent(sort)}&page=${page}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to load reviews.");
    }

    setReviewState(productName, {
      reviews: append ? [...getReviewState(productName).reviews, ...(data.reviews || [])] : data.reviews || [],
      summary: data.summary || getReviewState(productName).summary,
      pagination: data.pagination || getReviewState(productName).pagination,
      sort,
      isLoading: false,
      message: data.message || "",
    });
  } catch (error) {
    setReviewState(productName, { isLoading: false, message: error.message || "Unable to load reviews." });
  }

  if (activeProductName === productName) {
    renderProductRatingHeader(productName);
  }
  renderReviewPlatform(productName);
};

const uploadReviewPhotos = async (productName, files) => {
  if (!files?.length) return [];

  const formData = new FormData();
  formData.append("productName", productName);
  [...files].slice(0, 6).forEach((file) => formData.append("photos", file));

  const response = await fetch("/api/reviews/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Unable to upload photos.");
  }

  return data.photos || [];
};

const submitReviewForm = async (productName, form) => {
  const message = form.querySelector(".review-form-message");
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);

  submitButton.disabled = true;
  message.textContent = "Submitting review...";

  try {
    const photos = await uploadReviewPhotos(productName, formData.getAll("photos"));
    const payload = {
      productName,
      name: formData.get("name"),
      email: formData.get("email"),
      rating: formData.get("rating"),
      title: formData.get("title"),
      body: formData.get("body"),
      country: formData.get("country"),
      website: formData.get("website"),
      photos,
    };
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to submit review.");
    }

    form.reset();
    setReviewState(productName, { message: "Thank you. Your review has been added." });
    await loadProductReviews(productName);
  } catch (error) {
    message.textContent = error.message || "Unable to submit review.";
  } finally {
    submitButton.disabled = false;
  }
};

const bindReviewPlatform = (productName) => {
  const platform = productDetailReviews.querySelector(".review-platform");
  if (!platform) return;

  platform.querySelector(".review-sort")?.addEventListener("change", (event) => {
    loadProductReviews(productName, event.target.value);
  });

  platform.querySelector(".review-load-more")?.addEventListener("click", () => {
    const state = getReviewState(productName);
    loadProductReviews(productName, state.sort, (state.pagination?.page || 1) + 1, true);
  });

  platform.querySelector(".review-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitReviewForm(productName, event.currentTarget);
  });

  platform.querySelectorAll(".review-helpful").forEach((button) => {
    const reviewId = button.dataset.reviewId;
    const voteKey = `driftHelpfulReview:${reviewId}`;
    if (window.localStorage.getItem(voteKey)) button.disabled = true;

    button.addEventListener("click", async () => {
      if (window.localStorage.getItem(voteKey)) return;
      button.disabled = true;

      try {
        const response = await fetch("/api/reviews/helpful", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviewId, voterKey: getReviewHelpfulKey() }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to record helpful vote.");
        }

        button.querySelector("span").textContent = data.helpfulCount;
        window.localStorage.setItem(voteKey, "true");
      } catch {
        button.disabled = false;
      }
    });
  });

  const photos = getProductReviewPhotos(productName);
  platform.querySelectorAll(".customer-photo").forEach((button) => {
    button.addEventListener("click", () => openCustomerGalleryLightbox(photos, Number(button.dataset.photoIndex) || 0));
  });

  platform.querySelectorAll(".review-photo-count").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Math.max(0, photos.findIndex((photo) => photo.reviewId === button.dataset.reviewId));
      openCustomerGalleryLightbox(photos, index);
    });
  });
};

const recentlyViewedKey = "driftRecentlyViewed";

const productMaterialCopy = {
  "Luxury Slippers": "Soft satin uppers with a cushioned lounge sole, selected for a polished at-home finish.",
  "Satin Nightgown": "Premium satin and silk blends chosen for smooth drape, soft sheen, and comfortable evening wear.",
  "Satin Blanket": "Premium satin and silk blends selected for a smooth, cool hand feel and an elevated bed layer.",
};

const productCareCopy = {
  "Luxury Slippers": "Spot clean gently and air dry. Keep away from direct heat to preserve the satin finish.",
  "Satin Nightgown": "Machine wash cold on delicate or hand wash, then hang dry. Avoid bleach and high heat.",
  "Satin Blanket": "Machine wash cold with like colors, use mild detergent, and tumble dry low or air dry.",
};

const defaultMaterialCopy =
  "DRIFT uses premium satin and silk blends to deliver the luxury feel you expect, while keeping our products accessible and affordable.";

const defaultCareCopy =
  "Machine wash cold with like colors, use mild detergent, avoid bleach, and air dry or tumble dry low. Store folded away from direct sunlight.";

const productFaqs = [
  {
    question: "Why satin?",
    answer: "Satin creates a smoother surface than cotton, helping reduce friction against hair and skin while you rest.",
  },
  {
    question: "How does checkout work?",
    answer: "Your DRIFT bag moves into Shopify's secure checkout for payment and order completion.",
  },
  {
    question: "Can I return it?",
    answer: "Eligible unused items can be reviewed through the returns page, with support details kept easy to find.",
  },
];

const getProductRatingSummary = (productName) => {
  const { summary } = getReviewState(productName);

  if (!summary.count) {
    return { average: "New", count: 0 };
  }

  return {
    average: Number(summary.average).toFixed(1),
    count: summary.count,
  };
};

const renderProductRatingHeader = (productName) => {
  const ratingSummary = getProductRatingSummary(productName);

  productDetailRating.innerHTML = ratingSummary.count
    ? `<span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><strong>${ratingSummary.average}</strong><a href="/reviews">${ratingSummary.count} reviews</a>`
    : `<span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><strong>New</strong><a href="/reviews">No reviews yet</a>`;
};

const getProductMaterials = (productName) => productMaterialCopy[productName] || defaultMaterialCopy;

const getProductCare = (productName) => productCareCopy[productName] || defaultCareCopy;

const renderProductFaqs = () =>
  productFaqs
    .map(
      (faq) => `
        <article class="product-detail-faq">
          <h4>${faq.question}</h4>
          <p>${faq.answer}</p>
        </article>
      `
    )
    .join("");

const getRecentlyViewedProducts = () => {
  try {
    return JSON.parse(window.localStorage.getItem(recentlyViewedKey) || "[]");
  } catch {
    return [];
  }
};

const saveRecentlyViewedProduct = (productName) => {
  const nextProducts = [productName, ...getRecentlyViewedProducts().filter((name) => name !== productName)].slice(0, 6);
  window.localStorage.setItem(recentlyViewedKey, JSON.stringify(nextProducts));
};

const createMiniProductButton = (productName) => {
  const product = productDetails[productName];
  const button = document.createElement("button");
  const image = document.createElement("img");
  const copy = document.createElement("span");
  const title = document.createElement("strong");
  const price = document.createElement("small");

  button.type = "button";
  button.className = "product-mini-card";
  button.setAttribute("aria-label", `View ${productName}`);
  image.src = product.cardImage || getProductImage(product, product.colors[0]);
  image.alt = "";
  image.loading = "lazy";
  image.decoding = "async";
  title.textContent = productName;
  price.innerHTML = getPriceMarkup(productName, product.price);
  copy.append(title, price);
  button.append(image, copy);
  button.addEventListener("click", () => openProductDetail(productName));

  return button;
};

const renderRelatedProducts = (productName) => {
  if (!productRelatedList) return;

  productRelatedList.innerHTML = "";
  Object.keys(productDetails)
    .filter((name) => name !== productName && productDetails[name]?.shopifyAvailable !== false)
    .slice(0, 3)
    .forEach((name) => productRelatedList.append(createMiniProductButton(name)));
};

const renderRecentlyViewedProducts = (productName) => {
  if (!productRecentList) return;

  productRecentList.innerHTML = "";
  const recentProducts = getRecentlyViewedProducts().filter((name) => name !== productName && productDetails[name]).slice(0, 3);

  if (!recentProducts.length) {
    const empty = document.createElement("p");
    empty.className = "product-recent-empty";
    empty.textContent = "Recently viewed products will appear here as you explore DRIFT.";
    productRecentList.append(empty);
    return;
  }

  recentProducts.forEach((name) => productRecentList.append(createMiniProductButton(name)));
};

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

animated.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 55, 240)}ms`;
  observer.observe(element);
});

const isSupabaseConfigured = () =>
  Boolean(supabaseConfig.url && supabaseConfig.anonKey && supabaseConfig.table);

const saveWaitlistSignup = async (email) => {
  const payload = {
    email,
    source: "drift_landing_page",
    page_url: window.location.href,
    user_agent: window.navigator.userAgent,
  };

  window.localStorage.setItem("driftWaitlistEmail", email);

  if (!isSupabaseConfigured()) {
    return { mode: "local" };
  }

  const endpoint = `${supabaseConfig.url.replace(/\/$/, "")}/rest/v1/${supabaseConfig.table}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to save signup.");
  }

  return { mode: "supabase" };
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const getProductImage = (product, color) =>
  product.images[color] || product.images.Champagne || Object.values(product.images)[0];

const getDisplayColor = (color) => (color === "Default Title" ? "Bundle" : color);

function getVariantKey(product, color, size = "") {
  return product?.sizes?.length ? [color, size].filter(Boolean).join(" / ") : color;
}

const getSelectedVariantKey = (product, color) => getVariantKey(product, color, activeSize);

const isVariantAvailable = (product, color, size = activeSize) => {
  if (!product || product.shopifyAvailable === false) return false;
  const key = getVariantKey(product, color, size);
  return product.availableVariantKeys ? product.availableVariantKeys.includes(key) : product.colors.includes(color);
};

const getUniqueProductImages = (product) => {
  const seen = new Set();

  return Object.entries(product.images).reduce((images, [color, image]) => {
    if (!seen.has(image)) {
      seen.add(image);
      images.push({ color, image });
    }

    return images;
  }, []);
};

const setProductDetailImage = (product, color) => {
  const image = getProductImage(product, color);
  const canCheckoutVariant = isVariantAvailable(product, color);
  const variantLabel = getSelectedVariantKey(product, color);

  productDetailImage.src = image;
  productDetailImage.alt = `${activeProductName} in ${getDisplayColor(color)}`;
  productDetailImage.loading = "eager";
  productDetailImage.decoding = "async";
  productDetailSelection.textContent = getDisplayColor(color);
  activeColor = color;
  productDetailAdd.disabled = !canCheckoutVariant;
  productDetailAdd.textContent = canCheckoutVariant ? "Add to bag" : "Unavailable";
  productDetailBuy.disabled = !canCheckoutVariant;
  productDetailBuy.textContent = canCheckoutVariant ? "Buy Now" : "Unavailable";
  mobileStickyAdd.disabled = !canCheckoutVariant;
  mobileStickyAdd.textContent = canCheckoutVariant ? "Add to Cart" : "Unavailable";
  productDetailNote.textContent =
    product.shopifyAvailable === false
      ? product.unavailableMessage || "This product is not available for checkout yet."
      : canCheckoutVariant
        ? "Your selections are saved in your DRIFT bag."
        : `${variantLabel} is not available for checkout yet.`;

  productDetailSwatches.querySelectorAll(".product-detail-swatch").forEach((swatch) => {
    swatch.classList.toggle("is-active", swatch.dataset.color === color);
  });

  productDetailThumbnails.querySelectorAll(".product-detail-thumb").forEach((thumbnail) => {
    thumbnail.classList.toggle("is-active", thumbnail.dataset.color === color || thumbnail.dataset.image === image);
  });
};

const openProductLightbox = () => {
  if (!activeProductName || !productLightbox || !productLightboxImage) return;

  activeCustomerGallery = [];
  productLightboxImage.src = productDetailImage.src;
  productLightboxImage.alt = productDetailImage.alt;
  productLightbox.hidden = false;
  productLightbox.classList.remove("is-customer-gallery");
  document.body.classList.add("has-product-lightbox");
  productLightboxClose.focus();
};

const closeProductLightbox = () => {
  if (!productLightbox) return;

  productLightbox.hidden = true;
  productLightbox.classList.remove("is-customer-gallery");
  activeCustomerGallery = [];
  document.body.classList.remove("has-product-lightbox");
};

const openProductDetail = (productName) => {
  const product = productDetails[productName];
  const uniqueImages = getUniqueProductImages(product);
  const isAvailable = product.shopifyAvailable !== false;

  activeProductName = productName;
  activeSize = product.sizes?.[0] || "";
  productDetailTitle.textContent = productName;
  renderProductRatingHeader(productName);
  productDetailDescription.textContent = product.description;
  productDetailFeatures.innerHTML = "";
  productDetailPrice.innerHTML = getPriceMarkup(productName, product.price);
  productDetailEditorialDescription.textContent = product.description;
  productDetailMaterials.textContent = getProductMaterials(productName);
  productDetailCare.textContent = getProductCare(productName);
  productDetailFaqs.innerHTML = renderProductFaqs();
  mobileStickyTitle.textContent = productName;
  mobileStickyPrice.innerHTML = getPriceMarkup(productName, product.price);
  mobileStickyCart.hidden = false;
  productDetailSwatches.innerHTML = "";
  productDetailSizes.innerHTML = "";
  productDetailSizeSelection.textContent = "";
  productDetailThumbnails.innerHTML = "";
  productDetailQuantity.value = "1";
  productDetailAdd.textContent = "Add to bag";
  productDetailAdd.disabled = !isAvailable;
  productDetailAdd.textContent = isAvailable ? "Add to bag" : "Unavailable";
  productDetailNote.textContent = isAvailable
    ? "Your selections are saved in your DRIFT bag."
    : product.unavailableMessage || "This product is not available for checkout yet.";
  renderReviewPlatform(productName);
  loadProductReviews(productName);
  productDetailOptions.hidden = product.colors.length === 1 && product.colors[0] === "Default Title";
  productDetailSizeOptions.hidden = !product.sizes?.length;

  (product.features || []).forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    productDetailFeatures.append(item);
  });

  (product.sizes || []).forEach((size, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "product-detail-size";
    button.dataset.size = size;
    button.textContent = size;
    button.setAttribute("aria-label", `Select size ${size}`);
    button.addEventListener("click", () => {
      productDetailSizes.querySelectorAll(".product-detail-size").forEach((sizeButton) => {
        sizeButton.classList.toggle("is-active", sizeButton.dataset.size === size);
      });
      activeSize = size;
      productDetailSizeSelection.textContent = `Size ${size}`;
      setProductDetailImage(product, activeColor || product.colors[0]);
    });
    productDetailSizes.append(button);

    if (index === 0) {
      button.classList.add("is-active");
      productDetailSizeSelection.textContent = `Size ${size}`;
    }
  });

  product.colors.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = `product-detail-swatch ${colorClassByName[color]}`;
    swatch.dataset.color = color;
    swatch.title = color;
    swatch.setAttribute("aria-label", `Select ${getDisplayColor(color)}`);
    swatch.addEventListener("click", () => setProductDetailImage(product, color));
    productDetailSwatches.append(swatch);
  });

  productDetailGallery.classList.toggle("has-single-image", uniqueImages.length <= 1);
  productDetailThumbnails.hidden = uniqueImages.length <= 1;

  uniqueImages.forEach(({ color, image: imageSrc }) => {
    const thumbnail = document.createElement("button");
    thumbnail.type = "button";
    thumbnail.className = "product-detail-thumb";
    thumbnail.dataset.color = color;
    thumbnail.dataset.image = imageSrc;
    thumbnail.title = color;
    thumbnail.setAttribute("aria-label", `View ${getDisplayColor(color)}`);

    const image = document.createElement("img");
    image.src = imageSrc;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    thumbnail.append(image);
    thumbnail.addEventListener("click", () => setProductDetailImage(product, color));
    productDetailThumbnails.append(thumbnail);
  });

  renderRelatedProducts(productName);
  renderRecentlyViewedProducts(productName);
  saveRecentlyViewedProduct(productName);
  setProductDetailImage(product, product.colors[0]);
  productDetail.hidden = false;
  document.body.classList.add("has-product-detail");
  productDetailClose.focus();
};

const closeProductDetail = () => {
  productDetail.hidden = true;
  mobileStickyCart.hidden = true;
  document.body.classList.remove("has-product-detail");
};

const getProductPrice = (productName) =>
  Number(productDetails[productName].price.replace(/[^0-9.]/g, "")) || 0;

const saveBag = () => {
  window.localStorage.setItem("driftBag", JSON.stringify(bag));
};

const renderBag = () => {
  bagItems.innerHTML = "";

  bag.forEach((item) => {
    const row = document.createElement("article");
    const image = document.createElement("img");
    const copy = document.createElement("div");
    const title = document.createElement("h3");
    const meta = document.createElement("span");
    const controls = document.createElement("div");
    const quantity = document.createElement("div");
    const decrease = document.createElement("button");
    const amount = document.createElement("span");
    const increase = document.createElement("button");
    const remove = document.createElement("button");

    row.className = "bag-item";
    image.src = getProductImage(productDetails[item.product], item.color);
    image.alt = `${item.product} in ${getDisplayColor(item.color)}`;
    copy.className = "bag-item-copy";
    title.textContent = item.product;
    meta.className = "bag-item-meta";
    meta.textContent = `${[getDisplayColor(item.color), item.size].filter(Boolean).join(" / ")} / $${item.price.toFixed(2)}`;
    controls.className = "bag-item-controls";
    quantity.className = "bag-item-quantity";
    decrease.type = "button";
    decrease.textContent = "-";
    decrease.setAttribute("aria-label", `Decrease ${item.product} quantity`);
    amount.textContent = item.quantity;
    increase.type = "button";
    increase.textContent = "+";
    increase.setAttribute("aria-label", `Increase ${item.product} quantity`);
    remove.type = "button";
    remove.className = "bag-item-remove";
    remove.textContent = "Remove";

    decrease.addEventListener("click", () => updateBagQuantity(item.id, item.quantity - 1));
    increase.addEventListener("click", () => updateBagQuantity(item.id, item.quantity + 1));
    remove.addEventListener("click", () => removeBagItem(item.id));

    quantity.append(decrease, amount, increase);
    controls.append(quantity, remove);
    copy.append(title, meta, controls);
    row.append(image, copy);
    bagItems.append(row);
  });

  const itemCount = bag.reduce((total, item) => total + item.quantity, 0);
  const subtotal = bag.reduce((total, item) => total + item.price * item.quantity, 0);

  bagCount.textContent = itemCount;
  bagSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  bagEmpty.hidden = bag.length > 0;
  bagCheckout.disabled = bag.length === 0;
  saveBag();
};

const updateBagQuantity = (itemId, quantity) => {
  if (quantity <= 0) {
    removeBagItem(itemId);
    return;
  }

  bag = bag.map((item) => (item.id === itemId ? { ...item, quantity } : item));
  renderBag();
};

const removeBagItem = (itemId) => {
  bag = bag.filter((item) => item.id !== itemId);
  renderBag();
};

const addProductToBag = (productName, color, quantity = 1, size = "") => {
  const product = productDetails[productName];
  const variantKey = getVariantKey(product, color, size);

  if (!product || !isVariantAvailable(product, color, size)) {
    return false;
  }

  const id = `${productName}::${variantKey}`;
  const existingItem = bag.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    bag.push({
      id,
      product: productName,
      color,
      size,
      variantKey,
      price: getProductPrice(productName),
      quantity,
    });
  }

  renderBag();
  return true;
};

const openBag = () => {
  renderBag();
  bagPanel.hidden = false;
  document.body.classList.add("has-bag");
  bagClose.focus();
};

const closeBag = () => {
  bagPanel.hidden = true;
  document.body.classList.remove("has-bag");
};

document.querySelectorAll(".product-card").forEach((card) => {
  const productName = card.querySelector("h3").textContent;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `View ${productName}`);
  card.addEventListener("click", () => openProductDetail(productName));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductDetail(productName);
    }
  });
});

productDetailClose.addEventListener("click", closeProductDetail);
productDetail.addEventListener("click", (event) => {
  if (event.target === productDetail) {
    closeProductDetail();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (productLightbox && !productLightbox.hidden) {
      closeProductLightbox();
    } else if (!bagPanel.hidden) {
      closeBag();
    } else if (!productDetail.hidden) {
      closeProductDetail();
    }
  }
});

const addActiveProductSelectionToBag = () => {
  const quantity = Number(productDetailQuantity.value);

  if (addProductToBag(activeProductName, activeColor, quantity, activeSize)) {
    productDetailAdd.textContent = `Added ${quantity} to bag`;
    mobileStickyAdd.textContent = "Added";
    window.setTimeout(() => {
      if (!productDetail.hidden) {
        productDetailAdd.textContent = "Add to bag";
        mobileStickyAdd.textContent = "Add to Cart";
      }
    }, 1500);
    return true;
  }

  return false;
};

productDetailAdd.addEventListener("click", addActiveProductSelectionToBag);

productDetailBuy.addEventListener("click", () => {
  if (addActiveProductSelectionToBag()) {
    closeProductDetail();
    openBag();
    bagCheckout.focus();
  }
});

mobileStickyAdd.addEventListener("click", addActiveProductSelectionToBag);

productDetailImageWrap.addEventListener("click", openProductLightbox);
productLightboxClose.addEventListener("click", closeProductLightbox);
productLightboxBackdrop.addEventListener("click", closeProductLightbox);
customerGalleryPrev.addEventListener("click", () => showCustomerGalleryPhoto(-1));
customerGalleryNext.addEventListener("click", () => showCustomerGalleryPhoto(1));

document.querySelectorAll(".bundle-add").forEach((button) => {
  const productName = button.dataset.bundleProduct;
  const product = productDetails[productName];

  if (!product || product.shopifyAvailable === false) {
    button.disabled = true;
    button.textContent = "Unavailable";
    return;
  }

  button.addEventListener("click", () => {
    const color = product.colors[0];

    if (addProductToBag(productName, color, 1)) {
      button.textContent = "Added to Bag";
      window.setTimeout(() => {
        button.textContent = "Add to Bag";
      }, 1600);
    }
  });
});

document.querySelectorAll(".comparison-slider").forEach((slider) => {
  const beforeImage = slider.querySelector(".comparison-before");
  const afterImage = slider.querySelector(".comparison-after");
  const beforeImg = beforeImage.querySelector("img");
  const afterImg = afterImage.querySelector("img");
  const beforeImageUrl = slider.dataset.beforeImage;
  const afterImageUrl = slider.dataset.afterImage;
  let isDraggingComparison = false;

  if (beforeImageUrl && beforeImg) {
    beforeImg.src = beforeImageUrl;
    beforeImg.decoding = "async";
    beforeImage.querySelector("span")?.remove();
  }

  if (afterImageUrl && afterImg) {
    afterImg.src = afterImageUrl;
    afterImg.decoding = "async";
    afterImage.querySelector("span")?.remove();
  }

  const setComparisonSplit = (clientX) => {
    const bounds = slider.getBoundingClientRect();
    const rawPercent = ((clientX - bounds.left) / bounds.width) * 100;
    const percent = Math.min(92, Math.max(8, rawPercent));
    slider.style.setProperty("--split", `${percent}%`);
    slider.setAttribute("aria-valuenow", Math.round(percent));
  };

  slider.setAttribute("role", "slider");
  slider.setAttribute("aria-valuemin", "8");
  slider.setAttribute("aria-valuemax", "92");
  slider.setAttribute("aria-valuenow", "50");
  slider.setAttribute("aria-valuetext", "Cotton and DRIFT satin comparison");

  slider.addEventListener("pointerdown", (event) => {
    isDraggingComparison = true;
    slider.classList.add("is-dragging");
    slider.setPointerCapture?.(event.pointerId);
    setComparisonSplit(event.clientX);
  });

  slider.addEventListener("pointermove", (event) => {
    if (!isDraggingComparison) {
      return;
    }

    setComparisonSplit(event.clientX);
  });

  const stopComparisonDrag = (event) => {
    isDraggingComparison = false;
    slider.classList.remove("is-dragging");
    slider.releasePointerCapture?.(event.pointerId);
  };

  slider.addEventListener("pointerup", stopComparisonDrag);
  slider.addEventListener("pointercancel", stopComparisonDrag);
  slider.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const current = Number.parseFloat(slider.style.getPropertyValue("--split")) || 50;
    let next = current;

    if (event.key === "ArrowLeft") next = current - 4;
    if (event.key === "ArrowRight") next = current + 4;
    if (event.key === "Home") next = 8;
    if (event.key === "End") next = 92;

    const percent = Math.min(92, Math.max(8, next));
    slider.style.setProperty("--split", `${percent}%`);
    slider.setAttribute("aria-valuenow", Math.round(percent));
  });
});

bagTrigger.addEventListener("click", openBag);
bagClose.addEventListener("click", closeBag);
bagBackdrop.addEventListener("click", closeBag);
bagCheckout.addEventListener("click", async () => {
  if (window.location.protocol === "file:") {
    return;
  }

  bagCheckout.disabled = true;
  bagCheckout.textContent = "Opening secure checkout";
  bagCheckoutNote.textContent = "";

  try {
    console.info("[DRIFT Shopify] Sending bag to checkout", {
      items: bag.map(({ product, color, quantity }) => ({ product, color, quantity })),
    });
    const response = await fetch("/api/shopify/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: bag }),
    });
    const payload = await response.json();

    if (!response.ok || !payload.checkoutUrl) {
      console.error("[DRIFT Shopify] Checkout API returned an error", {
        status: response.status,
        payload,
      });
      throw new Error(payload.error || "Unable to open Shopify checkout.");
    }

    console.info("[DRIFT Shopify] Redirecting to secure checkout", payload.checkoutUrl);
    window.location.href = payload.checkoutUrl;
  } catch (error) {
    bagCheckoutNote.textContent = error.message || "Unable to open secure checkout. Please try again.";
    console.error("[DRIFT Shopify] Checkout failed", error);
  } finally {
    bagCheckout.disabled = bag.length === 0;
    bagCheckout.textContent = "Continue to secure checkout";
  }
});

renderBag();
syncProductCardPrices();
syncProductCardImages();
syncProductCardAvailability();
hydrateShopifyCatalog();

let joinPopupHasOpened = false;
let currentAuthUser = null;
let authSessionChecked = false;

const isJoinPopupDismissed = () => window.sessionStorage.getItem(joinPopupSessionKey) === "true";
const hasCompletedJoinAuth = () => window.localStorage.getItem(joinPopupCompletedKey) === "true";

const getCustomerDisplayName = (user) => {
  const savedName = window.localStorage.getItem(profileNameStorageKey);
  const name = user?.name || savedName;

  if (name) {
    return String(name).trim().split(/\s+/)[0];
  }

  if (user?.email) {
    return user.email.split("@")[0];
  }

  return "Login";
};

const userHasProfileName = (user) => {
  return Boolean(user?.name || window.localStorage.getItem(profileNameStorageKey));
};

const setJoinPopupMessage = (message = "", mode = "") => {
  joinPopupMessage.textContent = message;
  joinPopupMessage.classList.toggle("is-success", mode === "success");
  joinPopupMessage.classList.toggle("is-error", mode === "error");
};

const setAuthLoading = (isLoading) => {
  joinAuthSignup.disabled = isLoading;
  joinAuthLogin.disabled = isLoading;
  joinAuthPassword.disabled = isLoading;
  joinAuthName.disabled = isLoading;
  joinAuthEmail.disabled = isLoading;
  if (joinAuthReset) joinAuthReset.disabled = isLoading;
  if (authLogout) authLogout.disabled = isLoading;
};

const openProfileDropdown = () => {
  if (!profileDropdown) return;
  profileDropdown.hidden = false;
  profileTrigger?.setAttribute("aria-expanded", "true");
};

const closeProfileDropdown = () => {
  if (!profileDropdown) return;
  profileDropdown.hidden = true;
  profileTrigger?.setAttribute("aria-expanded", "false");
};

const updateAuthStatus = (user) => {
  currentAuthUser = user;
  authStatus.classList.toggle("is-logged-in", Boolean(user));
  authStatusEmail.textContent = user ? getCustomerDisplayName(user) : "Sign in";
  authLogout.hidden = !user;
  profileMenuProfile.hidden = !user;
  profileMenuOrders.hidden = !user;
  profileMenuAuth.hidden = Boolean(user);

  if (user) {
    window.localStorage.setItem(joinPopupCompletedKey, "true");
    closeJoinPopup();
    maybeOpenNamePopup(user);
  }
};

const openNamePopup = () => {
  if (!namePopup || !currentAuthUser) {
    return;
  }

  namePopup.hidden = false;
  document.body.classList.add("has-name-popup");
  profileNameMessage.textContent = "";

  window.requestAnimationFrame(() => {
    namePopup.classList.add("is-open");
    profileNameInput.focus();
  });
};

const closeNamePopup = () => {
  if (!namePopup) {
    return;
  }

  window.sessionStorage.setItem(profileNamePromptSessionKey, "true");
  namePopup.classList.remove("is-open");
  document.body.classList.remove("has-name-popup");

  window.setTimeout(() => {
    namePopup.hidden = true;
  }, 280);
};

const maybeOpenNamePopup = (user) => {
  if (
    !namePopup ||
    !user ||
    userHasProfileName(user) ||
    window.sessionStorage.getItem(profileNamePromptSessionKey) === "true" ||
    !bagPanel.hidden ||
    !productDetail.hidden
  ) {
    return;
  }

  window.setTimeout(openNamePopup, 500);
};

const refreshAuthSession = async () => {
  try {
    const response = await fetch("/api/auth/me", { cache: "no-store" });
    const data = await response.json();

    if (!response.ok || data.configured === false) {
      throw new Error(data.error || "DRIFT accounts are not configured yet.");
    }

    updateAuthStatus(data.user || null);
  } catch (error) {
    console.info("[DRIFT Auth] Account session unavailable", error.message);
    updateAuthStatus(null);
  } finally {
    authSessionChecked = true;
  }
};

const openJoinPopup = (force = false) => {
  if (
    (!force && !authSessionChecked) ||
    (!force && joinPopupHasOpened) ||
    (!force && isJoinPopupDismissed()) ||
    (!force && hasCompletedJoinAuth()) ||
    (!force && currentAuthUser) ||
    !bagPanel.hidden ||
    !productDetail.hidden
  ) {
    return;
  }

  joinPopupHasOpened = true;
  joinPopup.hidden = false;
  document.body.classList.add("has-join-popup");
  setJoinPopupMessage("");

  window.requestAnimationFrame(() => {
    joinPopup.classList.add("is-open");
    joinAuthEmail.focus();
  });
};

const closeJoinPopup = () => {
  window.sessionStorage.setItem(joinPopupSessionKey, "true");
  joinPopup.classList.remove("is-open");
  document.body.classList.remove("has-join-popup");

  window.setTimeout(() => {
    joinPopup.hidden = true;
  }, 280);
};

const handleJoinAuth = async (mode) => {
  const name = joinAuthName.value.trim();
  const email = joinAuthEmail.value.trim();
  const password = joinAuthPassword.value;

  if (mode === "signup" && !name) {
    setJoinPopupMessage("Add your name to create your DRIFT account.", "error");
    return;
  }

  if (!email) {
    setJoinPopupMessage("Enter your email to continue.", "error");
    return;
  }

  if (!password) {
    setJoinPopupMessage("Enter your password to continue.", "error");
    return;
  }

  if (password.length < 8) {
    setJoinPopupMessage("Password must be at least 8 characters.", "error");
    return;
  }

  setAuthLoading(true);
  setJoinPopupMessage(mode === "signup" ? "Creating your DRIFT account..." : "Signing you in...");

  try {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to connect right now. Please try again.");
    }

    if (data.requiresEmailConfirmation) {
      setJoinPopupMessage(data.message || "Check your email to confirm your DRIFT account.", "success");
      window.sessionStorage.setItem(joinPopupSessionKey, "true");
      return;
    }

    window.localStorage.setItem(joinPopupCompletedKey, "true");
    updateAuthStatus(data.user);
    setJoinPopupMessage(data.message || "You are signed in to DRIFT.", "success");
    window.setTimeout(closeJoinPopup, 900);
  } catch (error) {
    setJoinPopupMessage(error.message || "Unable to connect right now. Please try again.", "error");
  } finally {
    setAuthLoading(false);
  }
};

const maybeOpenJoinPopup = () => {
  const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollableDistance <= 0) {
    return;
  }

  if (window.scrollY / scrollableDistance >= 0.24) {
    openJoinPopup();
  }
};

window.addEventListener("scroll", maybeOpenJoinPopup, { passive: true });
joinPopupClose.addEventListener("click", closeJoinPopup);
joinPopupBackdrop.addEventListener("click", closeJoinPopup);
joinAuthForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleJoinAuth("signup");
});
joinAuthLogin.addEventListener("click", () => handleJoinAuth("login"));
authLogout.addEventListener("click", async () => {
  setAuthLoading(true);

  try {
    await fetch("/api/auth/logout", { method: "POST" });
    window.localStorage.removeItem(joinPopupCompletedKey);
    updateAuthStatus(null);
    closeProfileDropdown();
  } catch (error) {
    console.info("[DRIFT Auth] Logout failed", error.message);
  } finally {
    setAuthLoading(false);
  }
});
profileTrigger?.addEventListener("click", () => {
  if (!currentAuthUser) {
    joinPopupHasOpened = false;
    openJoinPopup(true);
    return;
  }

  window.location.href = "/account";
});
profileMenuClose?.addEventListener("click", closeProfileDropdown);
profileMenuAuth?.addEventListener("click", () => {
  closeProfileDropdown();
  joinPopupHasOpened = false;
  openJoinPopup(true);
});
profileMenuProfile?.addEventListener("click", () => {
  closeProfileDropdown();
  if (currentAuthUser) {
    window.location.href = "/account";
  } else {
    joinPopupHasOpened = false;
    openJoinPopup(true);
  }
});
profileMenuOrders?.addEventListener("click", () => {
  closeProfileDropdown();
  window.location.href = currentAuthUser ? "/account/orders" : "/storefront.html#drift-list";
});
joinAuthReset?.addEventListener("click", async () => {
  const email = joinAuthEmail.value.trim();

  if (!email) {
    setJoinPopupMessage("Enter your email first, then request a reset link.", "error");
    return;
  }

  setAuthLoading(true);
  setJoinPopupMessage("Sending reset link...");

  try {
    const response = await fetch("/api/auth/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to send reset link.");
    }

    setJoinPopupMessage(data.message || "Check your email for a reset link.", "success");
  } catch (error) {
    setJoinPopupMessage(error.message || "Unable to send reset link.", "error");
  } finally {
    setAuthLoading(false);
  }
});
namePopupClose?.addEventListener("click", closeNamePopup);
namePopupBackdrop?.addEventListener("click", closeNamePopup);
profileNameForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = profileNameInput.value.trim();

  if (!name) {
    profileNameMessage.textContent = "Add a name to save your profile.";
    profileNameMessage.classList.add("is-error");
    return;
  }

  profileNameForm.querySelector("button").disabled = true;
  profileNameMessage.textContent = "Saving your name...";
  profileNameMessage.classList.remove("is-error");

  try {
    const response = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to save your profile.");
    }

    window.localStorage.setItem(profileNameStorageKey, name);
    updateAuthStatus(data.user || { ...currentAuthUser, name });
    profileNameMessage.textContent = "Saved.";
    window.setTimeout(closeNamePopup, 600);
  } catch (error) {
    profileNameMessage.textContent = error.message || "Unable to save your profile.";
    profileNameMessage.classList.add("is-error");
  } finally {
    profileNameForm.querySelector("button").disabled = false;
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !joinPopup.hidden) {
    closeJoinPopup();
  } else if (event.key === "Escape" && namePopup && !namePopup.hidden) {
    closeNamePopup();
  } else if (event.key === "Escape" && profileDropdown && !profileDropdown.hidden) {
    closeProfileDropdown();
  }
});
document.addEventListener("click", (event) => {
  if (profileDropdown?.hidden || event.target.closest(".profile-menu")) {
    return;
  }

  closeProfileDropdown();
});
refreshAuthSession();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = new FormData(form).get("email");

  submitButton.disabled = true;
  submitButton.textContent = "Sending";
  note.textContent = "";

  try {
    const result = await saveWaitlistSignup(email);
    note.textContent =
      result.mode === "supabase"
        ? `${email} has been added to the DRIFT updates list.`
        : `${email} has been saved for this demo. Add Supabase keys to collect live signups.`;
    form.reset();
  } catch (error) {
    note.textContent = "Something went wrong. Please try again in a moment.";
    console.error(error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Join the list";
  }
});



