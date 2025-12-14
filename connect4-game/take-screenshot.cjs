const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 900 });
  
  // Try different ports to find Connect 4
  const ports = [5173, 5174, 5175, 5176, 5177];
  let foundConnect4 = false;
  
  for (const port of ports) {
    try {
      console.log(`Trying port ${port}...`);
      await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 5000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check page content to see if it's Connect 4
      const pageContent = await page.content();
      const pageText = await page.evaluate(() => document.body.innerText);
      
      // Look for Connect 4 indicators
      if (pageText.includes('Connect 4') || pageText.includes('Current Player') || pageContent.includes('board-row')) {
        console.log(`Found Connect 4 on port ${port}!`);
        foundConnect4 = true;
        break;
      }
    } catch (e) {
      console.log(`Port ${port} failed: ${e.message}`);
      continue;
    }
  }
  
  if (!foundConnect4) {
    console.log('Connect 4 not found on any port. Taking screenshot of last tried port.');
  }
  
  // Wait for page to fully load
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Play the game - click on columns to drop discs
  try {
    // Get all board rows
    const boardRows = await page.$$('div.board-row');
    if (boardRows.length > 0) {
      // Get the first row (top row) - clicking cells here will drop discs
      const firstRowCells = await boardRows[0].$$('.cell');
      
      if (firstRowCells.length > 0) {
        console.log('Playing Connect 4...');
        
        // Click column 0 (first column) - Red player
        await firstRowCells[0].click();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Click column 1 (second column) - Yellow player
        if (firstRowCells.length > 1) {
          await firstRowCells[1].click();
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        // Click column 0 again - Red player
        await firstRowCells[0].click();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Click column 2 - Yellow player
        if (firstRowCells.length > 2) {
          await firstRowCells[2].click();
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        // Click column 0 again - Red player
        await firstRowCells[0].click();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Click column 1 - Yellow player
        if (firstRowCells.length > 1) {
          await firstRowCells[1].click();
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }
    }
  } catch (e) {
    console.log('Error playing game:', e.message);
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/connect4-game.png',
    fullPage: true
  });
  
  await browser.close();
  console.log('Screenshot saved to screenshots/connect4-game.png');
})();

