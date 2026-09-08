import {build} from 'esbuild';
import fs from 'node:fs';
await build({entryPoints:['tools/transcription/worker.js'],bundle:true,platform:'browser',format:'esm',outfile:'public/tools/transcribe-worker.js',minify:true});
fs.mkdirSync('public/tools/vendor',{recursive:true});
for(const name of fs.readdirSync('node_modules/onnxruntime-web/dist'))if(/ort-wasm.*\.(wasm|mjs)$/.test(name))fs.copyFileSync('node_modules/onnxruntime-web/dist/'+name,'public/tools/vendor/'+name);
