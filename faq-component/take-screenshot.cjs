const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 800 });
  
  // Navigate to the app
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait a bit for any animations
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Click on the first FAQ item to expand it
  const buttons = await page.$$('button');
  if (buttons.length > 0) {
    await buttons[0].click();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/faq-component.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Screenshot saved to screenshots/faq-component.png');
})();
