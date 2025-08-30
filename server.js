const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Load local cse-config.json if present (server-side)
let CSE_KEY = process.env.CSE_KEY || '';
let CSE_CX = process.env.CSE_CX || '';
try{
  const cfgPath = path.join(__dirname, 'cse-config.json');
  if(fs.existsSync(cfgPath)){
    const j = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
    if(j.key) CSE_KEY = j.key;
    if(j.cx) CSE_CX = j.cx;
  }
}catch(e){ console.error('failed to read cse-config.json', e); }

if(!CSE_KEY || !CSE_CX){
  console.warn('Warning: CSE_KEY or CSE_CX not configured. Create cse-config.json or set env vars.');
}

app.get('/search', async (req, res) => {
  const q = req.query.q || '';
  if(!q) return res.status(400).json({error:'missing q parameter'});
  if(!CSE_KEY || !CSE_CX) return res.status(500).json({error:'CSE not configured on server'});
  try{
    const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(CSE_KEY)}&cx=${encodeURIComponent(CSE_CX)}&q=${encodeURIComponent(q)}&num=8`;
    const r = await axios.get(url, { timeout: 10000 });
    return res.json(r.data);
  }catch(err){
    console.error('proxy error', err.message || err);
    return res.status(502).json({ error: 'proxy error', detail: err.message || String(err) });
  }
});

app.use(express.static(__dirname));

app.listen(port, ()=>{
  console.log('Server listening on http://localhost:' + port);
});
