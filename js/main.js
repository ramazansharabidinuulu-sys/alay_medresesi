/* Header/Footer жана маалыматтарды HTML'ге чыгаруу */
const $=(s,r=document)=>r.querySelector(s);
const page=location.pathname.split("/").pop()||"index.html";
const tmp=t=>`<p class="tmp">Убактылуу маалымат: ${t}</p>`;
function layout(){
 $("#hdr").outerHTML=`<header class="site"><div class="wrap bar"><a class="brand" href="index.html"><img src="images/logo.png" alt="" onerror="this.outerHTML='<span class=lt>А</span>'"><span>${SITE.name}</span></a><button id="menu-btn" aria-label="Менюну ачуу" aria-expanded="false">☰</button><nav id="nav" aria-label="Негизги меню">${NAV.map(([h,t])=>`<a href="${h}" ${h===page?'aria-current="page"':""}>${t}</a>`).join("")}</nav></div></header>`;
 $("#ftr").outerHTML=`<footer class="site"><div class="wrap"><p><strong>${SITE.name}</strong></p><p>${SITE.address} · ${SITE.phones.join(", ")} · ${SITE.email}</p><p><a href="contact.html">Байланыш</a></p></div></footer>`;
 const b=$("#menu-btn");b.onclick=()=>{const o=$("#nav").classList.toggle("open");b.setAttribute("aria-expanded",o)};
}
const rows=l=>l.map(x=>`<tr><td data-l="Күн">${x.d}</td><td data-l="Убакыт">${x.t}</td><td data-l="Сабак">${x.s}</td><td data-l="Окутуучу">${x.p}</td><td data-l="Аудитория">${x.r}</td></tr>`).join("");
function schedule(box,key,tabs){
 const draw=k=>{const p=PROGRAMS[k];box.innerHTML=(tabs?`<div class="tabs noprint">${Object.entries(PROGRAMS).map(([id,q])=>`<button class="btn" data-k="${id}" aria-pressed="${id===k}">${q.title}</button>`).join("")}<button class="btn o" onclick="print()">Басып чыгаруу</button></div>`:"")+`<h3>${p.title}</h3>${tmp("демонстрациялык мисал, чыныгы расписание эмес.")}<h3>Окуу графиги</h3><table class="rt"><thead><tr><th>Мезгил</th><th>Даталар</th><th>Эскертүү</th></tr></thead><tbody>${p.calendar.map(c=>`<tr><td data-l="Мезгил">${c.period}</td><td data-l="Даталар">${c.dates}</td><td data-l="Эскертүү">${c.note}</td></tr>`).join("")}</tbody></table><h3 style="margin-top:1.5rem">Сабактардын расписаниеси</h3><table class="rt"><thead><tr><th>Күн</th><th>Убакыт</th><th>Сабак</th><th>Окутуучу</th><th>Аудитория</th></tr></thead><tbody>${rows(p.schedule)}</tbody></table>`;
  box.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>draw(b.dataset.k))};
 draw(key)}
const cards={
 teachers:t=>`<article class="card"><img src="${t.photo}" alt="${t.name}" loading="lazy"><h3>${t.name}</h3><p><strong>${t.role}</strong></p><p>${t.subjects}</p><p class="muted">${t.bio}</p></article>`,
 news:n=>`<article class="card"><img src="${n.img}" alt="${n.title}" loading="lazy"><h3>${n.title}</h3><p class="muted">${n.date}</p><p>${n.text}</p><a href="${n.url}">Толук маалымат</a></article>`};
function init(){
 layout();
 document.querySelectorAll("[data-sched]").forEach(b=>schedule(b,b.dataset.sched,page==="schedule.html"));
 document.querySelectorAll("[data-list]").forEach(b=>{const k=b.dataset.list,n=+b.dataset.max||99;b.innerHTML=(k==="teachers"?TEACHERS:NEWS).slice(0,n).map(cards[k]).join("")});
 const g=$("#gal");if(g){g.innerHTML=GALLERY.map((s,i)=>`<button aria-label="Сүрөттү чоңойтуу ${i+1}" data-s="images/${s}"><img src="images/${s}" alt="Медресе сүрөтү ${i+1}" loading="lazy"></button>`).join("");
  const lb=$("#lb");g.onclick=e=>{const b=e.target.closest("button");if(b){$("img",lb).src=b.dataset.s;lb.classList.add("open")}};lb.onclick=()=>lb.classList.remove("open");document.onkeydown=e=>e.key==="Escape"&&lb.classList.remove("open")}
 const f=$("#faq");if(f)f.innerHTML=FAQ.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("");
 const c=$("#contact");if(c)c.innerHTML=`<p><strong>${SITE.name}</strong></p><p>Дареги: ${SITE.address}</p><p>Телефон: ${SITE.phones.join(", ")}</p><p>Email: ${SITE.email}</p><p>Иштөө убактысы: ${SITE.hours}</p>`+tmp("маалымат js/data.js ичиндеги SITE объектисинен алынат. Карта жана социалдык тармактар кийин кошулат.");
}
document.addEventListener("DOMContentLoaded",init);
