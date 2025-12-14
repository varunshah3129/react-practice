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
  
  // Click on a few columns to show some game progress
  const columns = await page.$$('div.board-row:first-child .cell');
  if (columns.length > 0) {
    // Click first column
    await columns[0].click();
    await new Promise(resolve => setTimeout(resolve, 500));
    // Click second column
    if (columns.length > 1) {
      await columns[1].click();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    // Click first column again
    await columns[0].click();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/connect4-game.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Screenshot saved to screenshots/connect4-game.png');
})();
