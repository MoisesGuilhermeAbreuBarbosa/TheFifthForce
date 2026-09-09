import {test,expect} from '@playwright/test';
test('Original navigation, literature, formulas and embedded data',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await page.getByRole('navigation',{name:'Research navigation'}).getByRole('link',{name:'Literature',exact:true}).click();await expect(page.getByRole('heading',{name:'Literature register'})).toBeVisible();
 await page.getByRole('button',{name:'Next sources'}).click();await expect(page.getByText('Page 2 / 7',{exact:true})).toBeVisible();
 await page.getByRole('textbox',{name:'Search literature'}).fill('Alcubierre');await expect(page.getByRole('link',{name:/Alcubierre warp metric/})).toBeVisible();
 await page.goto('/#paper');await expect(page.locator('.katex-display').first()).toBeVisible();await expect(page.locator('.recharts-wrapper')).toBeVisible();await expect(page.getByRole('button',{name:'Read aloud',exact:true})).toBeVisible();
 const download=page.waitForEvent('download');await page.getByRole('link',{name:'Download Markdown',exact:true}).click();expect((await download).suggestedFilename()).toBe('REPORT-source.md');
 await page.goto('/#network');await expect(page.getByRole('heading',{name:'Research atlas',exact:true})).toBeVisible();await page.getByRole('textbox',{name:'Search subjects'}).fill('Nature of gravity');await page.locator('summary').filter({hasText:'Nature of gravity'}).first().click();await expect(page.getByRole('button',{name:'Contribute to this subject'}).first()).toBeVisible();
 await page.setViewportSize({width:390,height:844});await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();expect(errors).toEqual([]);
});
test('GitHub publishing prepares a draft without pretending to publish',async({page})=>{
 await page.route('**/api/v1/posts*',route=>route.fulfill({json:{items:[],next_before:null}}));
 await page.goto('/account');await expect(page.getByRole('link',{name:'Sign in and contribute on GitHub'})).toHaveAttribute('href',/github.com.*issues\/new/);
 await page.goto('/videos');await expect(page.locator('iframe').first()).toBeVisible();
 await page.evaluate(()=>{(window as any).__opened='';window.open=((url:any)=>{(window as any).__opened=String(url);return null;}) as any;});
 await page.getByLabel('Title',{exact:true}).fill('Research video review');await page.getByLabel('Source / video URL').fill('https://www.youtube.com/watch?v=bY1EQ6HD-ao');await page.getByLabel('Contribution',{exact:true}).fill('A reproducible review is needed; this video is not experimental evidence.');
 await page.getByRole('button',{name:'Review & publish on GitHub'}).click();
 const url=new URL(await page.evaluate(()=>(window as any).__opened));expect(url.hostname).toBe('github.com');expect(url.searchParams.get('title')).toBe('[video] Research video review');expect(url.searchParams.get('body')).toContain('bY1EQ6HD-ao');await expect(page.getByText('This draft has not been submitted by the website.',{exact:false})).toBeVisible();
 await page.goto('/#questions');await page.getByRole('button',{name:'Post a new question'}).click();await expect(page.getByRole('heading',{name:'Add to the investigation'})).toBeVisible();
 await page.goto('/#newsroom');await page.getByRole('button',{name:'Generate draft'}).click();await page.getByRole('button',{name:'Save in this browser',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Generate draft'}).click();await page.getByRole('button',{name:'Save in this browser',exact:true}).click();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('open-field-local-briefs-v1')||'[]').length)).toBe(2);
});
test('Compact Home navigation and web Wiki',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{name:'Gravity? Anti-gravity evidence?'})).toBeVisible();
 await expect(page.locator('.collaboration-note')).not.toHaveAttribute('open','');
 await expect(page.locator('header img')).toHaveAttribute('src','/open-field-mark.svg');
 const menu=page.getByRole('navigation',{name:'Research navigation'});await expect(menu.getByRole('link',{name:'Videos & submissions'}).locator('svg')).toBeVisible();await expect(menu.getByRole('link',{name:'Wiki',exact:true}).locator('svg')).toBeVisible();
 expect(await menu.evaluate(e=>e.getBoundingClientRect().top)).toBeLessThan(480);
 await page.getByRole('navigation',{name:'Research navigation'}).getByRole('link',{name:'Repository',exact:true}).click();await expect(page.locator('.intro')).toHaveCount(0);
 await page.getByRole('link',{name:'Home',exact:true}).click();await expect(page.locator('.intro')).toBeVisible();
 await page.goto('/wiki?page=AI-Human-Collaboration');await expect(page.locator('.wiki-article .scientific-prose')).toContainText('research');
 await expect(page.getByRole('link',{name:'Edit this page on GitHub',exact:true})).toHaveAttribute('href',/AI-Human-Collaboration\/_edit$/);
 await page.getByRole('navigation',{name:'Wiki pages'}).getByRole('link',{name:'Roadmap',exact:true}).click();await expect(page).toHaveURL(/page=Roadmap/);await expect(page.locator('.wiki-article h1')).toContainText('Roadmap');
 await page.getByRole('link',{name:'Home',exact:true}).first().click();await expect(page.locator('.intro')).toBeVisible();
});
test('Quantum Advances runs simulation, circuit, benchmark and evidence ledger',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/quantum-advances');
 await expect(page.getByRole('heading',{name:/Quantum advances/})).toBeVisible();
 await expect(page.getByRole('link',{name:'Quantum Advances',exact:true})).toHaveAttribute('aria-current','page');
 await page.getByRole('button',{name:'Run simulation',exact:true}).click();await expect(page.getByText(/Verified append/)).toBeVisible();
 await page.getByRole('button',{name:'Execute state-vector circuit',exact:true}).click();await expect(page.getByText('OpenQASM 3',{exact:true})).toBeVisible();await expect(page.getByText(/state-vector/).first()).toBeVisible();
 await page.getByRole('button',{name:'Run benchmark',exact:true}).click();await expect(page.getByText('Classical accuracy',{exact:true})).toBeVisible();await expect(page.getByText('Quantum-feature accuracy',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Generate hypothesis',exact:true}).click();await expect(page.getByText(/Structured fallback|Vercel AI Gateway/)).toBeVisible();await expect(page.locator('article').filter({hasText:/Predictions/}).first()).toBeVisible();
 await page.getByRole('button',{name:'Verify chain',exact:true}).click();await expect(page.getByText(/SHA-256 chain verified/)).toBeVisible();
 expect(errors).toEqual([]);
});

test('Separate repository, rich archive reader and incoming references',async({page})=>{
 await page.route('**/api/v1/posts*',route=>route.fulfill({json:{items:[{id:'5',kind:'paper',title:'Quantum-processor research contribution',body:'Primary source annotation with explicit limitations.',author:'test-agent',url:'https://www.nature.com/articles/s41586-022-05424-3',github_url:'https://github.com/MoisesGuilhermeAbreuBarbosa/TheFifthForce/issues/5'}],next_before:null}}));
 await page.goto('/repository');await expect(page.getByRole('heading',{name:'The research repository'})).toBeVisible();await expect(page.getByRole('heading',{name:'Literature register'})).toHaveCount(0);
 await page.getByRole('link',{name:/Initial physics investigation/}).click();await expect(page).toHaveURL(/documents\/early-working-paper/);await expect(page.locator('.document-html svg').first()).toBeVisible();
 const download=page.waitForEvent('download');await page.getByRole('link',{name:'Download original source',exact:true}).click();expect((await download).suggestedFilename()).toBe('early-working-paper.txt');
 await page.goto('/research/early-working-paper.txt');await expect(page).toHaveURL(/documents\/early-working-paper/);
 await page.goto('/literature');await expect(page.getByRole('heading',{name:'Quantum-processor research contribution'})).toBeVisible();await page.getByRole('link',{name:'Add a reference',exact:true}).click();await expect(page.getByLabel('Contribution type',{exact:true})).toHaveValue('reference');
});
