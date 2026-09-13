import {test,expect} from '@playwright/test';
test('Library supports author search, filters, clear and selection export',async({page})=>{
 await page.goto('/literature');
 await page.getByRole('textbox',{name:'Search literature'}).fill('Harrow');
 await expect(page.locator('.source-count').getByRole('status')).toContainText('1 matching sources');
 await expect(page.getByRole('link',{name:/Quantum algorithm for solving linear systems/})).toBeVisible();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export these results'}).click();expect((await download).suggestedFilename()).toBe('open-field-literature-selection.json');
 await page.getByRole('combobox',{name:'Research field',exact:true}).selectOption('Screened fields');await expect(page.getByRole('heading',{name:'No sources match these filters.'})).toBeVisible();
 await page.getByRole('button',{name:'Clear filters'}).click();await expect(page.locator('.source-count').getByRole('status')).toContainText('96 matching sources');
});
test('Dossier links, equations, model controls and mobile layouts',async({page})=>{
 await page.goto('/');await page.screenshot({path:'test-results/dossier-home-desktop.png',fullPage:true});
 await page.goto('/investigations');await expect(page.locator('.frontier-card')).toHaveCount(6);
 await page.getByRole('slider',{name:/Relative coupling/}).press('Home');await expect(page.locator('.model-readout')).toContainText('-73.58%');
 await page.getByRole('button',{name:'Reset parameters'}).click();await expect(page.locator('.model-readout')).toContainText('14.72%');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export model CSV'}).click();expect((await download).suggestedFilename()).toContain('yukawa-model');
 await page.locator('.frontier-card').first().click();await expect(page.locator('.katex-display').first()).toBeVisible();await expect(page.getByRole('link',{name:'Prepare a review'})).toHaveAttribute('href',/github.com.*issues\/new/);
 for(const url of ['/','/literature','/investigations','/investigations/screening']){await page.setViewportSize({width:390,height:844});await page.goto(url);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();await page.screenshot({path:'test-results/dossier-mobile-'+(url.replaceAll('/','-')||'home')+'.png',fullPage:true})}
});

test('Source documentation is readable locally with complementary original links',async({page})=>{
 await page.goto('/literature');
 await page.locator('.literature h3 a').first().click();
 await expect(page.getByRole('heading',{name:'Source summary',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'Open original source'})).toHaveAttribute('href',/^https:\/\//);
 const download=page.waitForEvent('download');await page.getByRole('link',{name:'Download source notes'}).click();expect((await download).suggestedFilename()).toBe('AG-001.md');
 await page.goto('/literature/documentation');await expect(page.locator('.documentation-index>a')).toHaveCount(102);
 await page.setViewportSize({width:390,height:844});await page.goto('/literature/SRC-086');
 await expect(page.getByRole('heading',{name:'Source summary',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();
 await page.screenshot({path:'test-results/dossier-source-mobile.png',fullPage:true});
 const sqlite=await page.request.get('/research/documentation/library.sqlite');expect(sqlite.status()).toBe(200);expect((await sqlite.body()).subarray(0,15).toString()).toBe('SQLite format 3');
});
