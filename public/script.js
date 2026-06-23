const header = document.querySelector(".site-header");
const animated = document.querySelectorAll("[data-animate]");
const form = document.querySelector(".signup-form");
const note = document.querySelector(".form-note");
const submitButton = form.querySelector("button");
let supabaseConfig = window.DRIFT_SUPABASE || {};
const productDetail = document.querySelector(".product-detail");
const productDetailClose = document.querySelector(".product-detail-close");
const productDetailGallery = document.querySelector(".product-detail-gallery");
const productDetailImage = document.querySelector(".product-detail-image");
const productDetailTitle = document.querySelector(".product-detail-title");
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
const productDetailNote = document.querySelector(".product-detail-note");
const productDetailReviews = document.querySelector(".product-detail-reviews");
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

const productReviews = {
  "Satin Pillowcase": [
    { rating: "5.0", text: "Super soft and smooth. My hair feels way less tangled in the morning compared to my old cotton pillowcase." },
    { rating: "4.8", text: "The champagne color looks really nice on my bed, and the fabric feels cool and gentle. Definitely makes my night routine feel more luxurious." },
    { rating: "4.7", text: "I bought this because my hair was always frizzy when I woke up. It feels much smoother now, and the pillowcase looks beautiful." },
    { rating: "5.0", text: "Feels way more expensive than I expected. It is soft, shiny, and makes my bed look so much cleaner." },
  ],
  "Satin Bonnet": [
    { rating: "5.0", text: "This bonnet is comfortable and stays on better than others I have tried. My hair feels more protected overnight." },
    { rating: "4.8", text: "Really soft inside and not too tight. I like wearing it with the pillowcase for extra hair protection." },
    { rating: "4.7", text: "My curls look less messy in the morning. It feels gentle and looks cute too." },
    { rating: "5.0", text: "Perfect for sleeping. It is lightweight, soft, and does not feel annoying while I'm trying to relax." },
  ],
  "Satin Eyemask": [
    { rating: "5.0", text: "Very soft and comfortable. It blocks enough light for me and feels much nicer than cheaper eye masks." },
    { rating: "4.8", text: "I love how smooth this feels on my face. It does not pull at my skin, and the color looks really pretty." },
    { rating: "4.7", text: "Great for naps and sleeping in later. It feels soft, lightweight, and not too tight." },
    { rating: "5.0", text: "This makes my bedtime routine feel so much more relaxing. Simple product, but it feels premium." },
  ],
  "Satin Scrunchie": [
    { rating: "5.0", text: "Way gentler than regular hair ties. It does not pull my hair as much, and it looks cute on my wrist too." },
    { rating: "4.8", text: "I use this at night and during the day. It holds my hair without leaving a harsh dent." },
    { rating: "4.7", text: "Soft, pretty, and easy to wear. I like that it matches the pillowcase and bonnet." },
    { rating: "5.0", text: "Exactly what I wanted. Gentle hold, nice shine, and feels better than normal elastics." },
  ],
  "Satin Blanket": [
    { rating: "5.0", text: "This blanket feels so smooth and cozy. It instantly makes my bed look more expensive." },
    { rating: "4.8", text: "Soft, lightweight, and really pretty. I like using it while watching TV or relaxing before bed." },
    { rating: "4.7", text: "The fabric feels luxurious and cool. It is not too heavy, which I like." },
    { rating: "5.0", text: "Beautiful blanket. The color matches my room perfectly, and it feels very soft." },
  ],
  "Satin Twin Bedding Set": [
    { rating: "5.0", text: "This set completely changed the look of my bed. It feels soft, smooth, and very premium." },
    { rating: "4.8", text: "The bedding looks beautiful in person. It gives my room that clean hotel-bed feeling." },
    { rating: "4.7", text: "I love the smooth feel. It makes getting into bed feel so much better." },
    { rating: "5.0", text: "Really pretty and comfortable. The silk-like finish makes the whole room look more put together." },
  ],
  "Satin Queen Bedding Set": [
    { rating: "5.0", text: "This set completely changed the look of my bed. It feels soft, smooth, and very premium." },
    { rating: "4.8", text: "The bedding looks beautiful in person. It gives my room that clean hotel-bed feeling." },
    { rating: "4.7", text: "I love the smooth feel. It makes getting into bed feel so much better." },
    { rating: "5.0", text: "Really pretty and comfortable. The silk-like finish makes the whole room look more put together." },
  ],
  "Satin King Bedding Set": [
    { rating: "5.0", text: "This set completely changed the look of my bed. It feels soft, smooth, and very premium." },
    { rating: "4.8", text: "The bedding looks beautiful in person. It gives my room that clean hotel-bed feeling." },
    { rating: "4.7", text: "I love the smooth feel. It makes getting into bed feel so much better." },
    { rating: "5.0", text: "Really pretty and comfortable. The silk-like finish makes the whole room look more put together." },
  ],
  "Satin Full Bedding Set": [
    { rating: "5.0", text: "This set completely changed the look of my bed. It feels soft, smooth, and very premium." },
    { rating: "4.8", text: "The bedding looks beautiful in person. It gives my room that clean hotel-bed feeling." },
    { rating: "4.7", text: "I love the smooth feel. It makes getting into bed feel so much better." },
    { rating: "5.0", text: "Really pretty and comfortable. The silk-like finish makes the whole room look more put together." },
  ],
  "The Nightstand Essentials Trio": [
    { rating: "5.0", text: "This bundle is perfect if you want to upgrade your sleep routine without buying a full bedding set." },
    { rating: "4.8", text: "The pillowcase and eye mask feel really soft together. It is a simple upgrade but feels luxurious." },
    { rating: "4.7", text: "Great value for the two items. The eye mask is comfortable and the pillowcase feels smooth on my hair." },
    { rating: "5.0", text: "Bought this as a self-care gift for myself. It looks pretty and feels amazing." },
  ],
  "The Ultimate Hair Care Duo": [
    { rating: "5.0", text: "This is the best bundle for hair care. Everything feels gentle, and my hair is less messy in the morning." },
    { rating: "4.8", text: "I like that all three products match. The pillowcase, bonnet, and scrunchie make my night routine feel complete." },
    { rating: "4.7", text: "Good bundle if you care about frizz and breakage. Everything feels soft and comfortable." },
    { rating: "5.0", text: "This is the bundle I would recommend first. It feels like a full overnight hair protection set." },
  ],
  "The Beauty Sleep Bundle": [
    { rating: "5.0", text: "This bundle feels like a full sleep upgrade. The pillowcase is smooth, the eye mask is soft, and the bonnet is comfortable." },
    { rating: "4.8", text: "Really good for a self-care night routine. Everything feels premium and looks beautiful together." },
    { rating: "4.7", text: "I bought this because I wanted matching sleep accessories. It looks cute and feels very soft." },
    { rating: "5.0", text: "Perfect set. It makes bedtime feel more relaxing and put together." },
  ],
  "The College / Dorm Starter": [
    { rating: "5.0", text: "This bundle makes the whole bed feel upgraded. Everything matches and looks really clean." },
    { rating: "4.8", text: "Great if you want the full Drift setup. The colors are beautiful and the fabric feels smooth." },
    { rating: "4.7", text: "I like having the pillowcase, mask, bonnet, and accessories all together. It feels premium without being too much." },
    { rating: "5.0", text: "Honestly my favorite purchase for my room. It makes my bed look more luxurious and feels really comfortable." },
  ],
};

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

const getReviewMarkup = (productName, compact = false) => {
  const reviews = productReviews[productName] || [];

  if (reviews.length === 0) {
    return '<p class="review-empty">No reviews yet.</p>';
  }

  const visibleReviews = compact ? reviews.slice(0, 2) : reviews;
  return visibleReviews
    .map(
      (review) => `
        <article class="product-review">
          <div class="review-stars" aria-label="${review.rating} out of 5 stars">★★★★★ <span>${review.rating}</span></div>
          <p>"${review.text}"</p>
          <span>Verified Customer</span>
        </article>
      `
    )
    .join("");
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
  productDetailSelection.textContent = getDisplayColor(color);
  activeColor = color;
  productDetailAdd.disabled = !canCheckoutVariant;
  productDetailAdd.textContent = canCheckoutVariant ? "Add to bag" : "Unavailable";
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

const openProductDetail = (productName) => {
  const product = productDetails[productName];
  const uniqueImages = getUniqueProductImages(product);
  const isAvailable = product.shopifyAvailable !== false;

  activeProductName = productName;
  activeSize = product.sizes?.[0] || "";
  productDetailTitle.textContent = productName;
  productDetailDescription.textContent = product.description;
  productDetailFeatures.innerHTML = "";
  productDetailPrice.innerHTML = getPriceMarkup(productName, product.price);
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
  productDetailReviews.innerHTML = `
    <summary>Reviews</summary>
    <div class="product-detail-review-list">${getReviewMarkup(productName)}</div>
  `;
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
    if (!bagPanel.hidden) {
      closeBag();
    } else if (!productDetail.hidden) {
      closeProductDetail();
    }
  }
});

productDetailAdd.addEventListener("click", () => {
  const quantity = Number(productDetailQuantity.value);

  if (addProductToBag(activeProductName, activeColor, quantity, activeSize)) {
    productDetailAdd.textContent = `Added ${quantity} to bag`;
  }
});

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

  if (profileDropdown?.hidden) {
    openProfileDropdown();
  } else {
    closeProfileDropdown();
  }
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

