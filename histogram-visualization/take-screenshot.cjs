const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1400, height: 1000 });
  
  // Navigate to the histogram app on port 5179
  await page.goto('http://localhost:5179', { waitUntil: 'networkidle0' });
  
  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/histogram-visualization.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Screenshot saved to screenshots/histogram-visualization.png');
})();
