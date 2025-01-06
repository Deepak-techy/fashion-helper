// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendProducts") {
    displayProducts(message.data);
  }
});

// Display the products in the popup
function displayProducts(products) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; // Clear any existing content

  products.forEach((product) => {
    // Create a product card
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // Add the product image
    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    // Add the product title
    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);

    // Add the product price
    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: ${product.price}`;
    productCard.appendChild(productPrice);

    // Append the card to the container
    productContainer.appendChild(productCard);
  });
}

// Request the content script to send product data when the popup opens
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getProducts" });
});
