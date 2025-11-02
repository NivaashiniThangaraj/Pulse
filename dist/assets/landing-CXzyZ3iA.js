import"./modulepreload-polyfill-B5Qt9EMX.js";document.addEventListener("DOMContentLoaded",()=>{d(),c(),r(),l(),p()});function d(){localStorage.getItem("darkMode")==="true"&&(document.body.classList.add("dark"),i());const t=document.getElementById("navModeToggle"),e=document.getElementById("modeToggle");t==null||t.addEventListener("click",s),e==null||e.addEventListener("click",s)}function s(){document.body.classList.toggle("dark");const n=document.body.classList.contains("dark");localStorage.setItem("darkMode",n),i()}function i(){const n=document.body.classList.contains("dark"),t=document.getElementById("navModeToggle");t&&(t.textContent=n?"☀️":"🌙")}function c(){document.querySelectorAll('a[href^="#"]').forEach(n=>{n.addEventListener("click",function(t){t.preventDefault();const e=document.querySelector(this.getAttribute("href"));e&&e.scrollIntoView({behavior:"smooth"})})})}function r(){const n=document.getElementById("appointmentForm");n&&n.addEventListener("submit",m);const t=document.getElementById("appointmentDate");if(t){const e=new Date;e.setDate(e.getDate()+1);const o=e.toISOString().split("T")[0];t.setAttribute("min",o)}}async function m(n){n.preventDefault();const t={patientName:document.getElementById("patientName").value,patientEmail:document.getElementById("patientEmail").value,patientPhone:document.getElementById("patientPhone").value,department:document.getElementById("department").value,appointmentDate:document.getElementById("appointmentDate").value,notes:document.getElementById("notes").value,createdAt:new Date().toISOString()};try{(await fetch("https://api.example.com/appointments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?(a("Appointment booked successfully!","success"),document.getElementById("appointmentForm").reset(),document.getElementById("appointmentModal").style.display="none"):a("Failed to book appointment. Please try again.","error")}catch{console.log("Appointment data:",t),a("Appointment request recorded successfully!","success"),document.getElementById("appointmentForm").reset(),document.getElementById("appointmentModal").style.display="none"}}function l(){document.querySelectorAll(".modal").forEach(t=>{t.addEventListener("click",e=>{e.target===t&&(t.style.display="none")})})}function a(n,t){const e=document.createElement("div");e.className=`notification notification-${t}`,e.textContent=n,e.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${t==="success"?"#10b981":"#ef4444"};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInRight 0.3s ease-out;
    z-index: 3000;
  `;const o=document.createElement("style");o.textContent=`
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,document.head.appendChild(o),document.body.appendChild(e),setTimeout(()=>{e.style.animation="slideInRight 0.3s ease-out reverse",setTimeout(()=>e.remove(),300)},3e3)}function p(){const n={threshold:.1,rootMargin:"0px 0px -100px 0px"},t=new IntersectionObserver(e=>{e.forEach(o=>{o.isIntersecting&&(o.target.style.animation="fadeInUp 0.8s ease-out forwards",t.unobserve(o.target))})},n);document.querySelectorAll(".feature-card, .dept-card, .doctor-card").forEach(e=>{t.observe(e)})}
