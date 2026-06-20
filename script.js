const header = document.querySelector(".site-header");
const animated = document.querySelectorAll("[data-animate]");
const form = document.querySelector(".signup-form");
const note = document.querySelector(".form-note");
const submitButton = form.querySelector("button");
const supabaseConfig = window.DRIFT_SUPABASE || {};
const productDetail = document.querySelector(".product-detail");
const productDetailClose = document.querySelector(".product-detail-close");
const productDetailImage = document.querySelector(".product-detail-image");
const productDetailTitle = document.querySelector(".product-detail-title");
const productDetailDescription = document.querySelector(".product-detail-description");
const productDetailPrice = document.querySelector(".product-detail-price");
const productDetailSelection = document.querySelector(".product-detail-selection");
const productDetailSwatches = document.querySelector(".product-detail-swatches");
const productDetailThumbnails = document.querySelector(".product-detail-thumbnails");
const productDetailQuantity = document.querySelector(".product-detail-quantity");
const productDetailAdd = document.querySelector(".product-detail-add");
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

const colorClassByName = {
  Champagne: "swatch-champagne",
  Black: "swatch-black",
  Blush: "swatch-blush",
  Rose: "swatch-rose",
  Ivory: "swatch-ivory",
  Mocha: "swatch-mocha",
};

// Edit displayed storefront prices here. Shopify checkout prices still come from Shopify.
const productPrices = {
  "Satin Pillowcase": "$29.99",
  "Satin Eyemask": "$10.99",
  "Satin Scrunchie": "$7.99",
  "Satin Bonnet": "$15.99",
  "Satin Twin Bedding Set": "$30.99",
  "Satin Full Bedding Set": "$49.99",
  "Satin Queen Bedding Set": "$69.99",
  "Satin King Bedding Set": "$75.99",
  "Satin Blanket": "$89.99",
  "Luxury Slippers": "$35.99",
};

const productDetails = {
  "Satin Pillowcase": {
    description: "A smooth satin pillowcase designed for a cooler, softer night.",
    price: productPrices["Satin Pillowcase"],
    colors: ["Champagne", "Black", "Blush", "Rose"],
    images: {
      Champagne: "assets/pillowcase-champagne.webp",
      Black: "assets/pillowcase-black.webp",
      Blush: "assets/pillowcase-blush.webp",
      Rose: "assets/pillowcase-rose.webp",
    },
  },
  "Satin Eyemask": {
    description: "A soft blackout layer for deeper rest and a polished bedside ritual.",
    price: productPrices["Satin Eyemask"],
    colors: ["Champagne", "Black", "Rose"],
    images: {
      Champagne: "assets/eyemask-champagne.webp",
      Black: "assets/eyemask-black.webp",
      Rose: "assets/eyemask-rose.webp",
    },
  },
  "Satin Scrunchie": {
    description: "Low tension, high gloss, made for all-day wear and low-crease styling.",
    price: productPrices["Satin Scrunchie"],
    colors: ["Champagne", "Blush", "Rose", "Ivory", "Mocha", "Black"],
    images: { Champagne: "assets/product-scrunchies-platter.webp" },
  },
  "Satin Bonnet": {
    description: "A polished silhouette with a secure satin band for overnight protection.",
    price: productPrices["Satin Bonnet"],
    colors: ["Champagne", "Black", "Blush", "Rose"],
    images: { Champagne: "assets/product-bonnet-blush.webp" },
  },
  "Satin Twin Bedding Set": {
    description: "A compact satin bedding set for a smooth, luminous sleep surface.",
    price: productPrices["Satin Twin Bedding Set"],
    colors: ["Champagne", "Black", "Blush", "Rose"],
    images: { Champagne: "assets/product-twin-bedding-set.webp" },
  },
  "Satin Full Bedding Set": {
    description: "A full-size satin bedding set with a refined, glossy hand-feel.",
    price: productPrices["Satin Full Bedding Set"],
    colors: ["Champagne", "Black", "Blush", "Rose"],
    images: { Champagne: "assets/product-full-bedding-set.webp" },
  },
  "Satin Queen Bedding Set": {
    description: "A queen satin set made for everyday luxury and a softer bedroom mood.",
    price: productPrices["Satin Queen Bedding Set"],
    colors: ["Champagne", "Black", "Blush", "Rose"],
    images: { Champagne: "assets/product-queen-bedding-set.webp" },
  },
  "Satin King Bedding Set": {
    description: "A generous king satin set with a smooth finish and elevated drape.",
    price: productPrices["Satin King Bedding Set"],
    colors: ["Champagne", "Black", "Blush", "Rose"],
    images: { Champagne: "assets/product-king-bedding-set.webp" },
  },
  "Satin Blanket": {
    description: "A luminous satin blanket for layered warmth and a finished bed.",
    price: productPrices["Satin Blanket"],
    colors: ["Champagne", "Black", "Blush", "Rose"],
    images: { Champagne: "assets/product-satin-blanket.webp" },
  },
  "Luxury Slippers": {
    description: "Soft house slippers made to complete the DRIFT evening ritual.",
    price: productPrices["Luxury Slippers"],
    colors: ["Champagne", "Blush"],
    images: { Champagne: "assets/product-slippers-new.png" },
  },
};

let activeProductName = "";
let activeColor = "";
let bag = JSON.parse(window.localStorage.getItem("driftBag") || "[]").map(({ image, ...item }) => item);

document.body.classList.add("reveal-ready");

const syncProductCardPrices = () => {
  document.querySelectorAll(".product-card").forEach((card) => {
    const productName = card.querySelector("h3")?.textContent;
    const price = productPrices[productName];
    const priceElement = card.querySelector("strong");

    if (price && priceElement) {
      priceElement.textContent = price;
    }
  });
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

const setProductDetailImage = (product, color) => {
  const image = getProductImage(product, color);

  productDetailImage.src = image;
  productDetailImage.alt = `${activeProductName} in ${color}`;
  productDetailSelection.textContent = color;
  activeColor = color;

  productDetailSwatches.querySelectorAll(".product-detail-swatch").forEach((swatch) => {
    swatch.classList.toggle("is-active", swatch.dataset.color === color);
  });

  productDetailThumbnails.querySelectorAll(".product-detail-thumb").forEach((thumbnail) => {
    thumbnail.classList.toggle("is-active", thumbnail.dataset.color === color);
  });
};

const openProductDetail = (productName) => {
  const product = productDetails[productName];
  const imageColors = Object.keys(product.images);

  activeProductName = productName;
  productDetailTitle.textContent = productName;
  productDetailDescription.textContent = product.description;
  productDetailPrice.textContent = product.price;
  productDetailSwatches.innerHTML = "";
  productDetailThumbnails.innerHTML = "";
  productDetailQuantity.value = "1";
  productDetailAdd.textContent = "Add to bag";

  product.colors.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = `product-detail-swatch ${colorClassByName[color]}`;
    swatch.dataset.color = color;
    swatch.title = color;
    swatch.setAttribute("aria-label", `Select ${color}`);
    swatch.addEventListener("click", () => setProductDetailImage(product, color));
    productDetailSwatches.append(swatch);
  });

  imageColors.forEach((color) => {
    const thumbnail = document.createElement("button");
    thumbnail.type = "button";
    thumbnail.className = "product-detail-thumb";
    thumbnail.dataset.color = color;
    thumbnail.title = color;
    thumbnail.setAttribute("aria-label", `View ${color}`);

    const image = document.createElement("img");
    image.src = product.images[color];
    image.alt = "";
    thumbnail.append(image);
    thumbnail.addEventListener("click", () => setProductDetailImage(product, color));
    productDetailThumbnails.append(thumbnail);
  });

  setProductDetailImage(product, product.colors[0]);
  productDetail.hidden = false;
  document.body.classList.add("has-product-detail");
  productDetailClose.focus();
};

const closeProductDetail = () => {
  productDetail.hidden = true;
  document.body.classList.remove("has-product-detail");
};

const getProductPrice = (productName) =>
  Number(productDetails[productName].price.replace(/[^0-9.]/g, ""));

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
    image.alt = `${item.product} in ${item.color}`;
    copy.className = "bag-item-copy";
    title.textContent = item.product;
    meta.className = "bag-item-meta";
    meta.textContent = `${item.color} / $${item.price.toFixed(2)}`;
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
    if (!bagPanel.hidden) {
      closeBag();
    } else if (!productDetail.hidden) {
      closeProductDetail();
    }
  }
});

productDetailAdd.addEventListener("click", () => {
  const quantity = Number(productDetailQuantity.value);
  const id = `${activeProductName}::${activeColor}`;
  const existingItem = bag.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    bag.push({
      id,
      product: activeProductName,
      color: activeColor,
      price: getProductPrice(activeProductName),
      quantity,
    });
  }

  renderBag();
  productDetailAdd.textContent = `Added ${quantity} to bag`;
});

bagTrigger.addEventListener("click", openBag);
bagClose.addEventListener("click", closeBag);
bagBackdrop.addEventListener("click", closeBag);
bagCheckout.addEventListener("click", async () => {
  if (window.location.protocol === "file:") {
    bagCheckoutNote.textContent =
      "Your bag is ready. Shopify checkout activates on the deployed site after your store products and variants are added.";
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
        ? `${email} has been added to the private DRIFT release list.`
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

