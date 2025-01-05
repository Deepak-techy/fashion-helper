document.getElementById("scan-btn").addEventListener("click", function () {
  // Inject the content script to scrape the products
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      },
      function (injectionResults) {
        // Once the content is scraped, show it in the popup
        if (injectionResults && injectionResults[0].result) {
          displayProducts(injectionResults[0].result);
        }
      }
    );
  });
});

// Function to display products in the popup
function displayProducts(products) {
  const productListDiv = document.getElementById("product-list");
  productListDiv.innerHTML = ''; // Clear any previous results

  if (products.length === 0) {
    productListDiv.innerHTML = "<p>No products found.</p>";
    return;
  }

  // Loop through the products and display them
  products.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const productTitle = document.createElement("div");
    productTitle.classList.add("product-title");
    productTitle.innerText = product.title;

    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.innerText = product.price;

    productItem.appendChild(productTitle);
    productItem.appendChild(productPrice);
    productListDiv.appendChild(productItem);
  });
}
