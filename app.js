const T={bi:{lang:"Choose language",form:"Choose form",subj:"Choose subject",chap:"Choose chapter",all:"All chapters",study:"Study",quiz:"Quiz",show:"Reveal all",hide:"Hide all",shuf:"Shuffle",tap:"Tap a blurred box to reveal the definition.",q:"Which definition matches this term?",next:"Next",fin:"Finish",sc:"Your score",again:"Try again",home:"Back to start",back:"← Back",items:"terms",PHY:"Physics",CHE:"Chemistry",ok:"Correct!",no:"Not quite.",w:"Write the definition of",ph:"Type your answer here…",chk:"Check",cov:"Match",miss:"Missing keywords",model:"Model answer",rule:"Pass mark: at least 80% match and ALL keywords included."},
bm:{lang:"Pilih bahasa",form:"Pilih tingkatan",subj:"Pilih subjek",chap:"Pilih bab",all:"Semua bab",study:"Belajar",quiz:"Kuiz",show:"Tunjuk semua",hide:"Sembunyi semua",shuf:"Kocok",tap:"Ketik kotak kabur untuk lihat definisi.",q:"Definisi manakah yang sepadan dengan istilah ini?",next:"Seterusnya",fin:"Tamat",sc:"Markah anda",again:"Cuba lagi",home:"Kembali ke awal",back:"← Kembali",items:"istilah",PHY:"Fizik",CHE:"Kimia",ok:"Betul!",no:"Kurang tepat.",w:"Tulis definisi bagi",ph:"Taip jawapan anda di sini…",chk:"Semak",cov:"Padanan",miss:"Kata kunci tertinggal",model:"Jawapan model",rule:"Lulus: padanan sekurang-kurangnya 80% dan SEMUA kata kunci ada."}};
const S={lang:null,form:null,sub:null,ch:null,mode:"study",rev:false,qs:[],qi:0,sc:0,ans:null};
const $=document.getElementById("app");
const sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const e=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const t=()=>T[S.lang];
function items(){const L=D[S.sub][S.form];const cs=S.ch==="all"?L:[L[S.ch]];return cs.flatMap(c=>c[S.lang])}
function back(){return `<button class="back" onclick="go('back')">${t().back}</button>`}
function go(a){
 if(a==="back"){if(S.ch!==null){S.ch=null}else if(S.sub){S.sub=null}else if(S.form){S.form=null}else{S.lang=null}S.mode="study";render();return}
 if(a==="home"){S.lang=S.form=S.sub=S.ch=null;S.mode="study";render()}
}
function pick(k,v){S[k]=v;S.mode="study";S.rev=false;render();window.scrollTo(0,0)}
function head(){
 const p=[];if(S.lang)p.push(S.lang==="bi"?"BI":"BM");if(S.form)p.push(S.form);if(S.sub)p.push(t()[S.sub]);
 return `<h1>Infinity Tuition Centre · SPM</h1><div class="crumb">${p.join(" › ")}</div>`}
function render(){
 let h="";
 if(!S.lang){
  h=`<h1>Infinity Tuition Centre · SPM</h1><p class="sub">Definition Practice · Latihan Definisi</p><h2>Language / Bahasa</h2><div class="grid"><button class="big" onclick="pick('lang','bi')"><b>English (BI)</b><span>Physics &amp; Chemistry</span></button><button class="big" onclick="pick('lang','bm')"><b>Bahasa Melayu (BM)</b><span>Fizik &amp; Kimia</span></button></div>`;
 }else if(!S.form){
  h=head()+back()+`<h2>${t().form}</h2><div class="grid"><button class="big" onclick="pick('form','F4')"><b>${S.lang==="bi"?"Form 4":"Tingkatan 4"}</b></button><button class="big" onclick="pick('form','F5')"><b>${S.lang==="bi"?"Form 5":"Tingkatan 5"}</b></button></div>`;
 }else if(!S.sub){
  h=head()+back()+`<h2>${t().subj}</h2><div class="grid"><button class="big" onclick="pick('sub','PHY')"><b>${t().PHY}</b></button><button class="big" onclick="pick('sub','CHE')"><b>${t().CHE}</b></button></div>`;
 }else if(S.ch===null){
  const L=D[S.sub][S.form];
  h=head()+back()+`<h2>${t().chap}</h2><div class="grid">`+L.map((c,i)=>`<button class="big" onclick="pick('ch',${i})"><b>${e(c.n[S.lang==="bi"?0:1])}</b><span>${c[S.lang].length} ${t().items}</span></button>`).join("")+`<button class="big" onclick="pick('ch','all')"><b>${t().all}</b><span>${L.reduce((a,c)=>a+c[S.lang].length,0)} ${t().items}</span></button></div>`;
 }else{
  h=head()+back()+`<div class="tabs"><button class="tab ${S.mode==="study"?"on":""}" onclick="setMode('study')">${t().study}</button><button class="tab ${S.mode==="quiz"?"on":""}" onclick="setMode('quiz')">${t().quiz}</button></div>`;
  h+=S.mode==="study"?study():quiz();
 }
 $.innerHTML=h;
}
function setMode(m){S.mode=m;if(m==="quiz")startQuiz();render()}
function study(){
 const it=items();
 return `<p class="sub">${t().tap}</p><div class="tools"><button class="pill" onclick="S.rev=!S.rev;render()">${S.rev?t().hide:t().show}</button><button class="pill" onclick="S.shufd=!S.shufd;render()">${t().shuf}</button></div>`+
 (S.shufd?sh(it):it).map(d=>`<div class="card"><div class="term">${e(d[0])}</div><div class="def ${S.rev?"":"hid"}" onclick="this.classList.toggle('hid')">${e(d[1])}</div></div>`).join("");
}
const SW=new Set(("the of a an to in on at by for and or is are be as it its that which with from into than then their there this these those when where what one two can may not no only each any all both such if so but has have had been was were per yang di dan atau ke dari untuk pada dalam dengan itu ini adalah suatu satu sesuatu oleh apabila bagi atas tersebut serta akan boleh ialah iaitu secara sahaja jika kepada daripada antara mana").split(" "));
const tk=s=>s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}]+/gu," ").split(" ").filter(Boolean);
const cw=s=>[...new Set(tk(s).filter(w=>!SW.has(w)&&(w.length>1||/\d/.test(w))))];
function lev(a,b){const m=[];for(let i=0;i<=a.length;i++)m[i]=[i];for(let j=1;j<=b.length;j++)m[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]}
const MP=["meng","meny","peng","peny","mem","men","pem","pen","per","ber","ter","me","pe","di","ke","se"];
const MS=["kannya","annya","kan","an","nya","lah","kah","i"];
function bs(w){if(w.length<=5)return w;let x=w;if(S.lang==="bm"){for(const p of MP){if(x.startsWith(p)&&x.length-p.length>=4){x=(p==="meny"||p==="peny"?"s":"")+x.slice(p.length);break}}for(const s of MS){if(x.endsWith(s)&&x.length-s.length>=4){x=x.slice(0,-s.length);break}}return x}return x.replace(/(ing|ed|es|s|ly|al)$/,"")}
const hit=(w,A)=>A.some(a=>a===w||(w.length>=5&&a.length>=5&&(bs(a)===bs(w)||lev(a,w)<=1)));
function judge(txt,d){const A=tk(txt),W=cw(d[1]),K=d[2]||W.filter(w=>w.length>=7||/\d/.test(w));const miss=K.filter(w=>!hit(w,A));const got=W.filter(w=>hit(w,A)).length;const pct=W.length?Math.round(got/W.length*100):0;return{pct,miss,ok:miss.length===0&&pct>=80}}
function startQuiz(){S.qs=sh(items()).map(d=>({d}));S.qi=0;S.sc=0;S.ans=null;S.res=[]}
function submitA(){const txt=document.getElementById("ta").value.trim();const d=S.qs[S.qi].d;const r=judge(txt,d);if(!txt){r.ok=false;r.pct=0}r.txt=txt;S.res.push({d,r});if(r.ok)S.sc++;S.ans=r;render()}
function quiz(){
 if(!S.qs.length)startQuiz();
 if(S.qi>=S.qs.length){return `<div class="card"><p>${t().sc}</p><div class="score">${S.sc} / ${S.qs.length}</div><button class="pri" onclick="startQuiz();render()">${t().again}</button> <button class="pri" onclick="go('home')">${t().home}</button></div>`+(S.res||[]).map((x,i)=>`<div class="card"><div class="crumb">${i+1} · ${x.r.ok?"✓":"✗"} ${t().cov} ${x.r.pct}%</div><div class="term">${e(x.d[0])}</div><div class="opt ${x.r.ok?"ok":"bad"}" style="cursor:default">${e(x.r.txt)||"—"}</div>`+(x.r.ok&&x.r.pct===100?"":(x.r.miss.length?`<p>${t().miss}: <b>${e(x.r.miss.join(", "))}</b></p>`:"")+`<p><b>${t().model}:</b> ${e(x.d[1])}</p>`)+`</div>`).join("")}
 const q=S.qs[S.qi].d,r=S.ans;
 let h=`<p class="sub">${t().rule}</p><div class="bar"><i style="width:${S.qi/S.qs.length*100}%"></i></div><div class="card"><div class="crumb">${S.qi+1} / ${S.qs.length}</div><div>${t().w}</div><div class="term" style="font-size:1.15rem">${e(q[0])}</div>`;
 if(r){h+=`<div class="opt ${r.ok?"ok":"bad"}" style="cursor:default">${e(r.txt)||"—"}</div><p><b>${r.ok?t().ok:t().no}</b> · ${t().cov} ${r.pct}%</p>`+(r.miss.length?`<p>${t().miss}: <b>${e(r.miss.join(", "))}</b></p>`:"")+`<p class="sub">${t().model}: ${e(q[1])}</p><button class="pri" onclick="S.qi++;S.ans=null;render()">${S.qi+1>=S.qs.length?t().fin:t().next}</button>`}
 else h+=`<textarea id="ta" rows="4" placeholder="${t().ph}"></textarea><button class="pri" onclick="submitA()">${t().chk}</button>`;
 return h+`</div>`;
}
const PW="aWxvdmVpbmZpbml0eQ==";let UNL=false;try{UNL=sessionStorage.getItem("ok")==="1"}catch(x){}
function gate(m){$.innerHTML=`<h1>Infinity Tuition Centre · SPM</h1><p class="sub">Password / Kata laluan</p><div class="card"><input id="pw" type="password" autocomplete="off" placeholder="Password" onkeydown="if(event.key==='Enter')chkPw()" style="width:100%;font:inherit;color:var(--tx);background:var(--bg);border:2px solid var(--bd);border-radius:10px;padding:10px"><button class="pri" onclick="chkPw()">Enter / Masuk</button><p style="color:var(--bad)">${m||""}</p></div>`;document.getElementById("pw").focus()}
function chkPw(){const v=document.getElementById("pw").value.trim().toLowerCase();if(btoa(v)===PW){UNL=true;try{sessionStorage.setItem("ok","1")}catch(x){}render()}else gate("Wrong password · Kata laluan salah")}
UNL?render():gate();
