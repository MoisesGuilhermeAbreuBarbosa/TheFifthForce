import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
const root=new URL('../public/research/',import.meta.url);
const source=fs.readFileSync(new URL('REPORT-rendered.md',root),'utf8');
const article=renderToStaticMarkup(React.createElement(Markdown,{remarkPlugins:[remarkGfm,remarkMath],rehypePlugins:[[rehypeKatex,{trust:false,throwOnError:true}]],skipHtml:true},source));
if((article.match(/class="katex-display"/g)||[]).length!==8 || !article.includes('<table>') || article.includes('katex-error')) throw Error('Typesetting check failed');
fs.mkdirSync(new URL('math/',root),{recursive:true});
fs.copyFileSync(new URL('../node_modules/katex/dist/katex.min.css',import.meta.url),new URL('math/katex.min.css',root));
fs.cpSync(new URL('../node_modules/katex/dist/fonts/',import.meta.url),new URL('math/fonts/',root),{recursive:true});
const css=`:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#091518;color:#e2ecec;font:18px/1.8 system-ui,sans-serif}main{max-width:1080px;margin:auto;padding:32px clamp(18px,5vw,64px) 80px}nav{display:flex;gap:24px;flex-wrap:wrap;margin:0 0 40px;font-size:15px}a{color:#8de0d0;text-underline-offset:4px}h1{font-size:clamp(30px,4vw,44px);line-height:1.2;letter-spacing:-.025em}h2{font-size:26px;line-height:1.35;margin:44px 0 20px;border-bottom:1px solid #345052;padding-bottom:12px}p{margin:20px 0}li{margin:12px 0}table{width:100%;border-collapse:collapse;font-size:16px;margin:28px 0}th,td{padding:14px;border-bottom:1px solid #345052;text-align:left}th{background:#203537}tr:nth-child(even){background:#122629}.katex{font-size:1.13em}.katex-display{overflow-x:auto;overflow-y:hidden;padding:24px 12px;background:#101f23;border-left:2px solid #6bcbbb;margin:28px 0}code{font-size:.9em}article{overflow-wrap:anywhere}@media(max-width:650px){table{display:block;overflow-x:auto}body{font-size:16px}}@media print{:root{color-scheme:light}body{background:white;color:black;font-size:11pt}main{max-width:none;padding:0}nav{display:none}a{color:inherit}.katex-display,th,tr:nth-child(even){background:white}h2{break-after:avoid}.katex-display,tr{break-inside:avoid}}`;
fs.writeFileSync(new URL('paper.html',root),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Finite-source fifth-force reanalysis · Open Field</title><link rel="stylesheet" href="/research/math/katex.min.css"><style>${css}</style></head><body><main><nav><a href="/#repository">← Research repository</a><a href="/research/REPORT-source.md" download>Download Markdown source</a><a href="/research/reproducibility.zip" download>Download analysis bundle</a></nav><article>${article}</article></main></body></html>`);
console.log('Paper generated: UTF-8 HTML, 8 rendered equations, real tables, local math fonts.');

const auditPath=new URL('REQUEST-AUDIT.md',root);
if(fs.existsSync(auditPath)){const audit=renderToStaticMarkup(React.createElement(Markdown,{remarkPlugins:[remarkGfm],skipHtml:true},fs.readFileSync(auditPath,'utf8')));fs.writeFileSync(new URL('audit.html',root),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Request audit · Open Field</title><style>${css}</style></head><body><main><nav><a href="/#network">Research repository</a><a href="/research/REQUEST-AUDIT.md" download>Download audit source</a></nav><article>${audit}</article></main></body></html>`);}
