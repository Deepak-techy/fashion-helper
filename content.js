function scrapeProducts() {
  const products = [];

  // Scrape the product title
  const title = document.querySelector("#productTitle")?.innerText.trim() || "Unknown Product";

  // Scrape the product price (handles different formats)
  const priceWhole = document.querySelector(".a-price .a-price-whole")?.innerText.trim() || null;
  const priceFraction = document.querySelector(".a-price .a-price-fraction")?.innerText.trim() || "00";
  const price = priceWhole ? `${priceWhole}.${priceFraction}` : "N/A";

  // Scrape the product image
  const imageUrl = document.querySelector("#imgTagWrapperId img")?.src || "Image not available";

  // Push product details to the array
  products.push({ title, price, imageUrl });

  return products;
}

function sendScrapedData() {
  const data = scrapeProducts();
  chrome.runtime.sendMessage({ action: "sendProducts", data });
}

// Wait for the page to fully load before scraping
window.addEventListener("load", () => {
  sendScrapedData();

  // Observe DOM changes to handle dynamically loaded content
  const observer = new MutationObserver(() => {
    sendScrapedData();
  });

  // Observe changes in the entire document
  observer.observe(document.body, { childList: true, subtree: true });

  // Disconnect the observer after a delay (optional, to limit resource usage)
  setTimeout(() => {
    observer.disconnect();
  }, 10000); // Stops observing after 10 seconds
});

// Listen for requests to rescrape
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "rescrape") {
    sendScrapedData();
  }
});
