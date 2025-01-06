function scanPage() {
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

  return products; // Return the products to the popup
}

// Send the scraped product details to the background script
chrome.runtime.sendMessage({ action: "sendProducts", data: scanPage() });
