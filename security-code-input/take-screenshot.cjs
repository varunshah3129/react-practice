const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 800 });
  
  // Try different ports to find the security code input app
  const ports = [5173, 5174, 5175, 5176, 5177];
  let foundApp = false;
  
  for (const port of ports) {
    try {
      console.log(`Trying port ${port}...`);
      await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 5000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check page content to see if it's the security code input
      const pageText = await page.evaluate(() => document.body.innerText);
      
      // Look for security code input indicators
      if (pageText.includes('Submit') || pageText.includes('Reset') || pageText.includes('Attempts')) {
        console.log(`Found security code input on port ${port}!`);
        foundApp = true;
        break;
      }
    } catch (e) {
      console.log(`Port ${port} failed: ${e.message}`);
      continue;
    }
  }
  
  if (!foundApp) {
    console.log('Security code input not found on any port. Taking screenshot of last tried port.');
  }
  
  // Wait for page to fully load
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Enter some digits to show the input in action
  try {
    const inputs = await page.$$('.code-input');
    if (inputs.length >= 4) {
      console.log('Entering digits...');
      await inputs[0].type('6');
      await new Promise(resolve => setTimeout(resolve, 300));
      await inputs[1].type('1');
      await new Promise(resolve => setTimeout(resolve, 300));
      await inputs[2].type('7');
      await new Promise(resolve => setTimeout(resolve, 300));
      await inputs[3].type('9');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (e) {
    console.log('Error entering digits:', e.message);
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/security-code-input.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Screenshot saved to screenshots/security-code-input.png');
})();
