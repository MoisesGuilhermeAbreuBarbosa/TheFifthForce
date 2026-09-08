import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const dir=await mkdtemp(join(tmpdir(),'open-field-test-'));
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--port','3107','--hostname','127.0.0.1'],{env:{...process.env,TURSO_DATABASE_URL:'file:'+join(dir,'test.db')},stdio:['ignore','pipe','pipe']});
const timeout=setTimeout(()=>{server.kill();process.exitCode=1;},180000);
try{await new Promise((resolve,reject)=>{server.stdout.on('data',d=>{if(d.toString().includes('Ready'))resolve();});server.stderr.on('data',d=>process.stderr.write(d));server.on('exit',c=>reject(Error('Server exited '+c)));});
 const tests=spawn(process.execPath,['--test','tests/integration.test.mjs'],{env:{...process.env,TEST_BASE_URL:'http://127.0.0.1:3107'},stdio:'inherit'});process.exitCode=await new Promise(resolve=>tests.on('exit',resolve));
 if(process.env.BROWSER_TESTS==='1'&&!process.exitCode){const browser=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test'],{env:{...process.env,TEST_BASE_URL:'http://127.0.0.1:3107'},stdio:'inherit'});process.exitCode=await new Promise(resolve=>browser.on('exit',resolve));}
}finally{clearTimeout(timeout);server.kill();await rm(dir,{recursive:true,force:true});}
