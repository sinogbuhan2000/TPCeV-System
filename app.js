/* ============ DATA (replace with database later) ============ */
const EVENTS = [
  {id:1,title:"Intramurals 2025",desc:"Join us for a week of exciting sports competitions and camaraderie.",start:"2025-06-10",end:"2025-06-14",place:"TPC Gymnasium",aud:"Open to all students",status:"upcoming",icon:"ball",color:["#c2541a","#7a2e0c"],regs:120},
  {id:2,title:"IT Week 2025",desc:"A celebration of technology and innovation.",start:"2025-06-17",end:"2025-06-20",place:"Audio Visual Room",aud:"Open to all students",status:"upcoming",icon:"chip",color:["#1e3fae","#0b1b5e"],regs:86},
  {id:3,title:"Community Outreach Program",desc:"Giving back to the community through outreach initiatives.",start:"2025-06-24",end:"2025-06-24",place:"Talibon, Bohol",aud:"Volunteers only",status:"upcoming",icon:"tree",color:["#2f7a3a","#154a1f"],regs:45},
  {id:4,title:"Christmas Party 2025",desc:"Year-end celebration for students and faculty.",start:"2025-12-15",end:"2025-12-15",place:"TPC Covered Court",aud:"Open to all students",status:"upcoming",icon:"leaf",color:["#a3262a","#4d0f12"],regs:200},
  {id:5,title:"Foundation Day",desc:"Celebrating the founding anniversary of the college.",start:"2025-05-15",end:"2025-05-15",place:"TPC Campus",aud:"Open to all",status:"ongoing",icon:"cap",color:["#166534","#0b3d1e"],regs:310},
  {id:6,title:"Career Orientation",desc:"Guidance for graduating students on career paths.",start:"2025-05-22",end:"2025-05-22",place:"Audio Visual Room",aud:"Graduating students",status:"ongoing",icon:"mic",color:["#6d3aa8","#361b5c"],regs:74},
  {id:7,title:"Nutrition Month Forum",desc:"Health talks and cooking demonstrations.",start:"2025-05-29",end:"2025-05-29",place:"TPC Gymnasium",aud:"Open to all students",status:"ongoing",icon:"leaf",color:["#3b8a55","#1a4a2c"],regs:58},
  {id:8,title:"Enrollment Orientation",desc:"Orientation for incoming first-year students.",start:"2025-05-02",end:"2025-05-02",place:"TPC Gymnasium",aud:"New students",status:"completed",icon:"mic",color:["#8a6a10","#4a3908"],regs:140},
  {id:9,title:"Tree Planting Day",desc:"Planting native trees around the campus.",start:"2025-05-26",end:"2025-05-26",place:"TPC Campus",aud:"Volunteers only",status:"completed",icon:"tree",color:["#2f7a3a","#154a1f"],regs:63},
  {id:10,title:"Recognition Program",desc:"Awarding outstanding students and faculty.",start:"2025-05-31",end:"2025-05-31",place:"TPC Covered Court",aud:"Invited guests",status:"completed",icon:"cap",color:["#166534","#0b3d1e"],regs:95}
];
// Add filler so totals look realistic (24 total, 8 upcoming, 3 ongoing, 13 completed)
const EXTRA = {upcoming:4,ongoing:0,completed:10};
const ANNOUNCEMENTS = [
  {t:"Announcement",m:"For more information about the events, please visit the respective offices or contact the organizers. Stay tuned and be part of our upcoming activities!",d:"Posted May 27, 2025"},
  {t:"IT Week schedule released",m:"The full program for IT Week 2025 is now available at the Audio Visual Room.",d:"Posted May 26, 2025"},
  {t:"Intramurals registration open",m:"Team captains may submit their rosters at the Student Affairs Office.",d:"Posted May 24, 2025"}
];
const ACTIVITY = [
  {ic:"users",t:"12 new registrations for Intramurals 2025",d:"Today, 9:20 AM"},
  {ic:"comment",t:"New comment on IT Week 2025",d:"Today, 8:45 AM"},
  {ic:"star",t:"New feedback received for Foundation Day",d:"Yesterday, 4:10 PM"},
  {ic:"mega",t:"Announcement published: IT Week schedule",d:"May 26, 2025"},
  {ic:"img",t:"8 photos added to Gallery",d:"May 26, 2025"}
];
const ADMIN = {user:"admin",pass:"admin123"};
const TODAY = new Date(2025,4,29); // matches reference (May 29, 2025). Use `new Date()` for live date.

/* ============ HELPERS ============ */
const $ = s => document.querySelector(s);
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MSHORT = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const pd = s => { const [y,m,d] = s.split("-").map(Number); return new Date(y,m-1,d); };
const fmtRange = e => {
  const a=pd(e.start), b=pd(e.end);
  if(e.start===e.end) return `${MONTHS[a.getMonth()]} ${a.getDate()}, ${a.getFullYear()}`;
  return `${MONTHS[a.getMonth()]} ${a.getDate()} - ${b.getDate()}, ${a.getFullYear()}`;
};
const icon = (n,cls="i") => `<svg class="${cls}"><use href="#i-${n}"/></svg>`;
const counts = () => {
  const c = {upcoming:EXTRA.upcoming,ongoing:EXTRA.ongoing,completed:EXTRA.completed};
  EVENTS.forEach(e=>c[e.status]++);
  c.total = c.upcoming+c.ongoing+c.completed; return c;
};
function toast(msg){
  const t=document.createElement("div"); t.className="toast"; t.textContent=msg; document.body.appendChild(t);
  setTimeout(()=>t.remove(),2200);
}
const store = {
  get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},
  set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},
  del(k){try{sessionStorage.removeItem(k)}catch(e){}}
};

/* ============ SHARED COMPONENTS ============ */
function statCards(){
  const c = counts();
  return [
    ["cal","Total Events",c.total,"All scheduled events"],
    ["calclock","Upcoming Events",c.upcoming,"Happening soon"],
    ["users","Ongoing Events",c.ongoing,"Currently ongoing"],
    ["check","Completed Events",c.completed,"Successfully concluded"]
  ].map(([i,t,n,s])=>`<div class="stat"><div class="ic">${icon(i)}</div><div><h4>${t}</h4><div class="n">${n}</div><small>${s}</small></div></div>`).join("");
}
function eventCard(e){
  return `<article class="ev">
    <div class="ev-cover" style="background:linear-gradient(135deg,${e.color[0]},${e.color[1]})">
      ${icon(e.icon)}
      <div class="ev-date"><span>${MSHORT[pd(e.start).getMonth()]}</span><b>${pd(e.start).getDate()}</b><i>${pd(e.start).getFullYear()}</i></div>
    </div>
    <div class="ev-body">
      <h5>${e.title}</h5><p>${e.desc}</p>
      <div class="meta">${icon("clock")}${fmtRange(e)}</div>
      <div class="meta">${icon("pin")}${e.place}</div>
      <div class="meta">${icon("users")}${e.aud}</div>
      <span class="badge b-${e.status}">${e.status.toUpperCase()}</span>
    </div></article>`;
}

/* Calendar (shared by public + admin) */
const calState = {pub:{y:2025,m:4},adm:{y:2025,m:4}};
function drawCal(key, gridSel, titleSel){
  const {y,m} = calState[key];
  $(titleSel).textContent = `${MONTHS[m]} ${y}`;
  const first = new Date(y,m,1).getDay(), days = new Date(y,m+1,0).getDate(), prev = new Date(y,m,0).getDate();
  let h = ["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d=>`<div class="dow">${d}</div>`).join("");
  const cell = (d,out,dt)=>{
    const evs = EVENTS.filter(e=>pd(e.start)<=dt && dt<=pd(e.end));
    const isToday = dt.toDateString()===TODAY.toDateString();
    const dots = evs.length ? `<span class="dots">${[...new Set(evs.map(e=>e.status))].map(s=>`<i class="dot-${s}"></i>`).join("")}</span>`:"";
    const attr = evs.length ? `data-date="${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}" role="button" tabindex="0"`:"";
    return `<div class="d${out?" out":""}${isToday?" today":""}${evs.length?" has":""}" ${attr}>${d}${dots}</div>`;
  };
  for(let i=first-1;i>=0;i--) h += cell(prev-i,true,new Date(y,m-1,prev-i));
  for(let d=1;d<=days;d++) h += cell(d,false,new Date(y,m,d));
  const total = first+days, rest = (7-total%7)%7;
  for(let d=1;d<=rest;d++) h += cell(d,true,new Date(y,m+1,d));
  $(gridSel).innerHTML = h;
}
function showDay(str){
  const [y,m,d] = str.split("-").map(Number), dt = new Date(y,m-1,d);
  $("#dayTitle").textContent = `${MONTHS[m-1]} ${d}, ${y}`;
  $("#dayList").innerHTML = EVENTS.filter(e=>pd(e.start)<=dt && dt<=pd(e.end)).map(e=>
    `<li><b>${e.title}</b><small>${e.place} · ${e.status}</small></li>`).join("");
  $("#dayOverlay").classList.remove("hidden");
}
document.addEventListener("click",e=>{
  const nav = e.target.closest("[data-cal]");
  if(nav){
    const k = nav.dataset.t, s = calState[k]; s.m += Number(nav.dataset.cal);
    if(s.m<0){s.m=11;s.y--} if(s.m>11){s.m=0;s.y++}
    k==="pub" ? drawCal("pub","#pubCal","#pubCalTitle") : drawCal("adm","#admCal","#admCalTitle");
  }
  const day = e.target.closest(".d.has"); if(day) showDay(day.dataset.date);
});
document.addEventListener("keydown",e=>{
  if((e.key==="Enter"||e.key===" ") && e.target.matches(".d.has")){e.preventDefault();showDay(e.target.dataset.date)}
  if(e.key==="Escape"){ $("#loginOverlay").classList.add("hidden"); $("#dayOverlay").classList.add("hidden"); }
});
const closeDayBtn = $("#closeDay");
if(closeDayBtn) closeDayBtn.onclick = ()=>$("#dayOverlay").classList.add("hidden");
const dayOverlay = $("#dayOverlay");
if(dayOverlay) dayOverlay.onclick = e=>{ if(e.target.id==="dayOverlay") e.target.classList.add("hidden") };

function showDay(str){
  const [y,m,d]=str.split("-").map(Number),dt=new Date(y,m-1,d);
  const title=document.querySelector("#dayTitle"),list=document.querySelector("#dayList"),overlay=document.querySelector("#dayOverlay");
  if(!title||!list||!overlay)return;
  title.textContent=`${MONTHS[m-1]} ${d}, ${y}`;
  list.innerHTML=EVENTS.filter(e=>pd(e.start)<=dt&&dt<=pd(e.end)).map(e=>`<li><b>${e.title}</b><small>${e.place} · ${e.status}</small></li>`).join("");
  overlay.classList.remove("hidden");
}
function bindCalendar(key,gridSel,titleSel){
  drawCal(key,gridSel,titleSel);
  document.addEventListener("click",e=>{
    const nav=e.target.closest("[data-cal]");
    if(nav&&nav.dataset.t===key){const st=calState[key];st.m+=Number(nav.dataset.cal);if(st.m<0){st.m=11;st.y--}if(st.m>11){st.m=0;st.y++}drawCal(key,gridSel,titleSel);}
    const day=e.target.closest(".d.has");if(day)showDay(day.dataset.date);
  });
}


/* ============ PAGE NAVIGATION ============ */
document.addEventListener("click",e=>{
  const go = e.target.closest("[data-go]");
  if(go){
    e.preventDefault();
    const pages = {
      "Dashboard":"dashboard.html",
      "Events":"event.html",
      "Announcements":"announcements.html",
      "Calendar":"calendar.html",
      "Gallery":"gallery.html",
      "Comment":"comment.html",
      "Feedback":"feedback.html",
      "Setting":"settings.html"
    };
    const target = pages[go.dataset.go];
    if(target) location.href = target;
  }
});
