const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 800 });
  
  // Try different ports to find the security code input app
  const ports = [5173, 5174, 5175, 5176, 5177];
  let foundApp = false;
  let correctPort = 5173;
  
  for (const port of ports) {
    try {
      console.log(`Trying port ${port}...`);
      await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 5000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check page content to see if it's the security code input
      const pageText = await page.evaluate(() => document.body.innerText);
      const pageTitle = await page.title();
      
      // Look for security code input indicators (not Connect 4)
      if ((pageText.includes('Submit') && pageText.includes('Reset') && pageText.includes('Attempts')) 
          && !pageText.includes('Connect 4') 
          && !pageText.includes('Current Player')
          && !pageText.includes('Red') 
          && !pageText.includes('Yellow')) {
        console.log(`Found security code input on port ${port}!`);
        foundApp = true;
        correctPort = port;
        break;
      }
    } catch (e) {
      console.log(`Port ${port} failed: ${e.message}`);
      continue;
    }
  }
  
  if (!foundApp) {
    console.log('Security code input not found. Trying to navigate to correct port...');
    // Try the security code input port specifically
    try {
      await page.goto(`http://localhost:5175`, { waitUntil: 'networkidle0', timeout: 5000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.log('Could not find app');
    }
  }
  
  // Wait for page to fully load
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Enter some digits to show the input in action
  try {
    const inputs = await page.$$('.code-input');
    if (inputs.length >= 4) {
      console.log('Entering digits in security code input...');
      await inputs[0].type('6');
      await new Promise(resolve => setTimeout(resolve, 400));
      await inputs[1].type('1');
      await new Promise(resolve => setTimeout(resolve, 400));
      await inputs[2].type('7');
      await new Promise(resolve => setTimeout(resolve, 400));
      await inputs[3].type('9');
      await new Promise(resolve => setTimeout(resolve, 600));
    } else {
      console.log('Could not find code inputs');
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

