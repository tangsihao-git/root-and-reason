import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import './prepare-docs.mjs';
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1','--port','4321'], {stdio:'inherit'});
let timer;
const watcher=watch('content/docs',{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(()=>spawn(process.execPath,['tools/prepare-docs.mjs'],{stdio:'inherit'}),200);});
child.on('exit',code=>{watcher.close();clearTimeout(timer);process.exit(code??0);});
process.on('SIGINT',()=>{watcher.close();clearTimeout(timer);child.kill('SIGINT');});
