import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as $}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";import{getDatabase as w,ref as f,onValue as u}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";const C={apiKey:"",authDomain:"pulse-6ab9f.firebaseapp.com",databaseURL:"https://pulse-6ab9f-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"pulse-6ab9f",storageBucket:"pulse-6ab9f.appspot.com",messagingSenderId:"51405793087",appId:"1:51405793087:web:b9c59d4a29b59e0b8ef8a3"},T=$(C),g=w(T),M=f(g,"beds/"),k=f(g,"events/"),E=document.getElementById("beds-container"),L=document.getElementById("events-table"),D=document.getElementById("totalBeds"),x=document.getElementById("occupiedBeds"),N=document.getElementById("vacantBeds"),_=document.getElementById("cleanedBeds");document.getElementById("modeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark"),localStorage.setItem("darkMode",document.body.classList.contains("dark"))});localStorage.getItem("darkMode")==="true"&&document.body.classList.add("dark");function m(e){if(!e)return"N/A";try{const t=e.replace(" ","T"),n=new Date(t);return isNaN(n)?e:n.toLocaleString("en-IN",{weekday:"short",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})}catch{return e}}u(M,e=>{var c;const t=e.val();E.innerHTML="";let n=0,o=0,s=0,a=0;for(const l in t){a++;const r=t[l],d=((c=r.status)==null?void 0:c.toLowerCase())||"unknown";d==="occupied"&&n++,d==="vacant"&&o++,d==="cleaned"&&s++;const i=document.createElement("div");i.className="card",i.innerHTML=`
      <h3>${l.toUpperCase()}</h3>
      <p><strong>Status:</strong> <span class="status ${d}">${r.status}</span></p>
      <p><strong>Patient UID:</strong> ${r.patient_uid||"None"}</p>
      <p><strong>Last Updated:</strong> ${m(r.timestamp)}</p>
    `,i.addEventListener("click",()=>S(l)),E.appendChild(i)}D.textContent=a,x.textContent=n,N.textContent=o,_.textContent=s});let p=[];u(k,e=>{const t=e.val()||{};p=Object.values(t).sort((n,o)=>{const s=new Date((n.timestamp||"").replace(" ","T"));return new Date((o.timestamp||"").replace(" ","T"))-s}),v(p)});function v(e){L.innerHTML="",e.forEach(t=>{var a;const n=((a=t.role)==null?void 0:a.toLowerCase())||"unknown",o=`<span class="role-badge role-${n}">${n}</span>`,s=`
      <tr>
        <td>${t.bed}</td>
        <td>${t.event}</td>
        <td>${o}</td>
        <td>${t.uid}</td>
        <td>${m(t.timestamp)}</td>
      </tr>
    `;L.innerHTML+=s})}document.getElementById("searchInput").addEventListener("input",e=>{const t=e.target.value.toLowerCase(),n=p.filter(o=>{var s,a,c;return((s=o.role)==null?void 0:s.toLowerCase().includes(t))||((a=o.event)==null?void 0:a.toLowerCase().includes(t))||((c=o.bed)==null?void 0:c.toLowerCase().includes(t))});v(n)});function S(e){const t=document.getElementById("staffModal"),n=document.getElementById("staffDetails"),o=document.getElementById("modalBedTitle");o.textContent=`Staff Details - ${e.toUpperCase()}`,t.style.display="flex";const s=f(g,`beds/${e}/staff_logs`);u(s,a=>{const c=a.val();if(!c){n.innerHTML="<p>No staff logs found for this bed.</p>";return}let l="";for(const r in c){const d=c[r],i=d.entry_time?new Date(d.entry_time.replace(" ","T")):null,b=d.exit_time?new Date(d.exit_time.replace(" ","T")):null;let y="N/A";if(i&&b){const B=(b-i)/1e3,h=Math.floor(B/60),I=Math.floor(B%60);y=`${h} min ${I} sec`}l+=`
        <div class="staff-log">
          <h4 class="role-${r.toLowerCase()}">${r.toUpperCase()}</h4>
          <p>🕓 <strong>Entry:</strong> ${m(d.entry_time)}</p>
          <p>🕒 <strong>Exit:</strong> ${m(d.exit_time)}</p>
          <p>⏱️ <strong>Duration:</strong> ${y}</p>
        </div>
        <hr>
      `}n.innerHTML=l})}document.getElementById("closeModal").addEventListener("click",()=>{document.getElementById("staffModal").style.display="none"});window.addEventListener("click",e=>{e.target.id==="staffModal"&&(document.getElementById("staffModal").style.display="none")});
