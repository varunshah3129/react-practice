const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 900 });
  
  // Navigate to the Connect 4 app (make sure it's running on port 5173)
  // If FAQ is on 5173, Connect 4 might be on 5174 or another port
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait for page to load
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Check if this is the Connect 4 page by looking for the title
  const pageTitle = await page.title();
  const pageContent = await page.content();
  
  // If it's not Connect 4, try port 5174
  if (!pageContent.includes('Connect 4') && !pageContent.includes('connect4')) {
    console.log('Not Connect 4 on 5173, trying 5174...');
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Wait a bit for any animations
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Play the game - click on columns to drop discs
  // Get all cells in the first row (these are the column headers/clickable areas)
  const boardRows = await page.$$('div.board-row');
  if (boardRows.length > 0) {
    // Get the first row (top row) - clicking cells here will drop discs
    const firstRowCells = await boardRows[0].$$('.cell');
    
    if (firstRowCells.length > 0) {
      // Click column 0 (first column) - Red player
      await firstRowCells[0].click();
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Click column 1 (second column) - Yellow player
      if (firstRowCells.length > 1) {
        await firstRowCells[1].click();
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      // Click column 0 again - Red player
      await firstRowCells[0].click();
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Click column 2 - Yellow player
      if (firstRowCells.length > 2) {
        await firstRowCells[2].click();
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      // Click column 0 again - Red player (3rd time)
      await firstRowCells[0].click();
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/connect4-game.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Connect 4 screenshot saved to screenshots/connect4-game.png');
})();
