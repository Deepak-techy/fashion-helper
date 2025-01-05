function scanPage() {
    const products = [];
    
    // Select all product items
    document.querySelectorAll(".s-result-item").forEach((item) => {
      // Scrape title
      const title = item.querySelector(".a-text-normal")?.innerText || "Unknown Product";
  
      // Scrape price
      const priceWhole = item.querySelector(".a-price-whole")?.innerText || null;
      const priceFraction = item.querySelector(".a-price-fraction")?.innerText || null;
      const price = priceWhole ? `${priceWhole}.${priceFraction || "00"}` : "N/A";
  
      // Push product details to the array
      products.push({ title, price });
    });
  
    return products; // Return the products to the popup
  }
  
  // Run the scanPage function to get the products
  scanPage();
  