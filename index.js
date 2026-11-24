const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'responses.json');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, {recursive:true});
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({}));
app.use(cors()); app.use(express.json({limit:'1mb'}));
function read(){ try{return JSON.parse(fs.readFileSync(dataFile,'utf8'));}catch{return {};}}
function write(data){fs.writeFileSync(dataFile,JSON.stringify(data,null,2));}
app.get('/api/health',(_,res)=>res.json({status:'ok',service:'Assessly API'}));
app.get('/api/responses/:candidateId', (req,res)=>res.json(read()[req.params.candidateId] || {}));
app.put('/api/responses/:candidateId', (req,res)=>{
  const {questionId, answer, flagged} = req.body || {};
  if(!questionId || (answer === undefined && flagged === undefined)) return res.status(400).json({error:'questionId and answer or flagged are required'});
  const all=read(); const current=all[req.params.candidateId] || {};
  current[questionId]={...(current[questionId]||{}), ...(answer !== undefined ? {answer}:{}), ...(flagged !== undefined ? {flagged}:{}), updatedAt:new Date().toISOString()};
  all[req.params.candidateId]=current; write(all); res.json({saved:true,response:current[questionId]});
});
app.post('/api/submissions', (req,res)=>{
  const {candidateId,answers,unansweredCount}=req.body||{};
  if(!candidateId || !answers || typeof answers!=='object') return res.status(400).json({error:'Invalid submission'});
  const all=read(); all[candidateId]={...(all[candidateId]||{}),submission:{answers,unansweredCount: Number(unansweredCount)||0,submittedAt:new Date().toISOString()}}; write(all);
  res.status(201).json({submitted:true,submittedAt:all[candidateId].submission.submittedAt});
});
app.listen(PORT,()=>console.log(`Assessly API running at http://localhost:${PORT}`));
