import {test,expect} from '@playwright/test';
test('Original navigation, literature, formulas and embedded data',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await page.getByRole('tab',{name:'Repository',exact:true}).click();await expect(page.getByRole('heading',{name:'Literature register'})).toBeVisible();
 await page.getByRole('button',{name:'Next sources'}).click();await expect(page.getByText('Page 2 / 7',{exact:true})).toBeVisible();
 await page.getByRole('textbox',{name:'Search literature'}).fill('Alcubierre');await expect(page.getByRole('link',{name:/Alcubierre warp metric/})).toBeVisible();
 await page.goto('/#paper');await expect(page.locator('.katex-display').first()).toBeVisible();await expect(page.locator('.recharts-wrapper')).toBeVisible();await expect(page.getByRole('button',{name:'Read aloud',exact:true})).toBeVisible();
 const download=page.waitForEvent('download');await page.getByRole('link',{name:'Download Markdown',exact:true}).click();expect((await download).suggestedFilename()).toBe('REPORT-source.md');
 await page.goto('/#network');await expect(page.getByRole('heading',{name:'Research atlas',exact:true})).toBeVisible();await page.getByRole('textbox',{name:'Search subjects'}).fill('Nature of gravity');await page.locator('summary').filter({hasText:'Nature of gravity'}).first().click();await expect(page.getByRole('button',{name:'Contribute to this subject'}).first()).toBeVisible();
 await page.setViewportSize({width:390,height:844});await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();expect(errors).toEqual([]);
});
test('Browser account and video publishing',async({page})=>{
 await page.goto('/account');await page.getByRole('button',{name:'Create free account'}).click();await expect(page.getByLabel('Save this recovery key now')).toBeVisible();await page.getByRole('button',{name:'Generate / rotate API key'}).click();await expect(page.getByLabel('Copy your API key')).toHaveValue(/^of_/);
 await page.goto('/videos');await expect(page.locator('iframe').first()).toBeVisible();await page.getByLabel('Title',{exact:true}).fill('Browser test research video');await page.getByLabel('Video URL').fill('https://www.youtube.com/watch?v=bY1EQ6HD-ao');await page.getByLabel('Research relevance and evidence limits').fill('A test submission with explicit limitations; no experimental evidence is claimed.');await page.getByRole('button',{name:'Publish video submission'}).click();await expect(page.getByRole('heading',{name:'Browser test research video'})).toBeVisible();
 await page.goto('/#questions');await page.getByRole('button',{name:'Post a new question'}).click();await expect(page.getByRole('heading',{name:'Add to the investigation'})).toBeVisible();
});
