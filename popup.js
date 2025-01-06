function displayProducts(products) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; // Clear any existing content

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: ${product.price}`;
    productCard.appendChild(productPrice);

    productContainer.appendChild(productCard);
  });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "sendProducts") {
    displayProducts(message.data);
  }
});

// Request the content script to rescrape when the popup opens
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "rescrape" });
});
