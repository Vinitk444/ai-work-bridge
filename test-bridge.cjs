const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const source = fs.readFileSync(__dirname+'/bridge.js','utf8');
const run = new AsyncFunction('require','context','github',source);
const issue = {title:'Sample task',body:'Review the selected file.',state:'open',number:1,html_url:'https://example.invalid/1'};
const hash = crypto.createHash('sha256').update(JSON.stringify([issue.title,issue.body])).digest('hex');
async function check(command, options={}) {
 const written=[];
 const context={repo:{owner:'owner',repo:'test'},payload:{repository:{private:!!options.private},issue:{...issue,pull_request:options.pr},comment:{body:command,user:{login:options.login||'owner',type:options.type||'User'}}}};
 let reads=0;
 const github={paginate:async()=>options.comments||[],rest:{issues:{get:async()=>({data:++reads>1&&options.changed?{...issue,body:'Changed'}:issue}),listComments:()=>{},createComment:async c=>written.push(c)}}};
 await run(require,context,github);
 return written;
}
(async()=>{
 assert.equal((await check('/bridge prepare')).length,1);
 const packet=await check('/bridge approve '+hash);
 assert.equal(packet.length,1);
 assert.match(packet[0].body,/automatic_execution/);
 for(const opts of [{private:true},{login:'stranger'},{type:'Bot'},{pr:{url:'x'}}]) assert.equal((await check('/bridge prepare',opts)).length,0);
 assert.equal((await check('/bridge prepare; echo unsafe')).length,0);
 await assert.rejects(check('/bridge approve '+'0'.repeat(64)),/Task changed/);
 await assert.rejects(check('/bridge prepare',{changed:true}),/changed during/);
 assert.equal((await check('/bridge prepare',{comments:[{user:{type:'Bot'},body:`<!-- bridge:prepared:${hash} -->`}]})).length,0);
 const workflow=fs.readFileSync(__dirname+'/.github/workflows/ai-bridge.yml','utf8');
 assert.ok(workflow.includes(source.trimEnd().split('\n').map(l=>'            '+l).join('\n')));
 assert.ok(!workflow.includes('pull_request_target'));
 assert.ok(!/\$\{\{\s*secrets\./.test(workflow));
 console.log('11 checks passed: preparation, approval, private/stranger/bot/PR blocking, command injection rejection, stale approval, concurrent edits, deduplication, embedded workflow integrity. No live cloud or model calls.');
})().catch(e=>{console.error(e);process.exitCode=1;});
