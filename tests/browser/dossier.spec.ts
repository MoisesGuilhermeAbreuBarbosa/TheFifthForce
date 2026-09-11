import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import manifest from '../../public/research/dossier/manifest.json' with {type:'json'};
import fixtures from '../../public/research/dossier/benchmark-fixtures.json' with {type:'json'};

test('Dossier chapters render mathematics, navigation and downloadable sources',async({page,request})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/quantum-advances');
  await page.getByRole('link',{name:'Read the research dossier',exact:true}).click();
  await expect(page.getByRole('heading',{name:/force discrimination/i})).toBeVisible();
  for(const chapter of manifest.chapters){
    const response=await page.goto('/quantum-advances/research/'+chapter.slug);
    expect(response?.status()).toBe(200);
    await expect(page.locator('article h1')).toBeVisible();
    expect(await page.locator('article .katex-error').count()).toBe(0);
    await expect(page.getByRole('navigation',{name:'Dossier chapters'}).getByRole('link',{name:chapter.title,exact:true})).toHaveAttribute('aria-current','page');
    const raw=await request.get('/research/dossier/'+chapter.slug+'.md');
    expect(raw.ok()).toBeTruthy();expect((await raw.text()).length).toBeGreaterThan(1000);
  }
  await page.goto('/quantum-advances/research/coherence');
  expect(await page.locator('article .katex-display').count()).toBeGreaterThan(5);
  expect((await request.get('/quantum-advances/research/not-a-chapter')).status()).toBe(404);
  for(const file of ['complete-dossier.md','hypotheses.json','sources.json','benchmark-fixtures.json','research-receipt.json','verify-research-dossier.py']){
    expect((await request.get('/research/dossier/'+file)).ok()).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test('Explorer matches independent fixtures and exports labeled results',async({page})=>{
  await page.goto('/quantum-advances/research');
  const reference=fixtures.cases.find(row=>row.eta===1&&row.kappa===0.3&&row.phase_rad===0)!;
  await expect(page.getByTestId('selected-response')).toHaveText(reference.selected_response.toFixed(5));
  await expect(page.getByTestId('unconditional-response')).toHaveText('-1.50000');
  await page.getByLabel('Calculation',{exact:true}).selectOption('weak');
  await expect(page.getByTestId('selected-response')).toHaveText('2.00000');
  await page.getByRole('slider',{name:'Coherence eta',exact:true}).fill('0');
  await expect(page.getByTestId('selected-response')).toHaveText('-1.36000');
  await page.getByRole('slider',{name:'Coherence eta',exact:true}).fill('1');
  await page.getByLabel('Calculation',{exact:true}).selectOption('finite');
  await page.getByRole('slider',{name:'Relative phase',exact:true}).fill('180');
  const reverse=fixtures.cases.find(row=>row.eta===1&&row.kappa===0.3&&row.phase_rad>3)!;
  await expect(page.getByTestId('selected-response')).toHaveText(reverse.selected_response.toFixed(5));
  const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Download benchmark JSON'}).click();
  const download=await pending;const record=JSON.parse(await readFile((await download.path())!,'utf8'));
  expect(record.kind).toBe('analytic_benchmark');expect(record.inputs.phase_deg).toBe(180);
  expect(record.result.unconditionalResponse).toBeCloseTo(-1.5,12);
});

test('Dossier and equation reader fit mobile viewport',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  for(const route of ['/quantum-advances/research','/quantum-advances/research/coherence']){
    await page.goto(route);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();
    await expect(page.getByRole('heading').first()).toBeVisible();
  }
});
