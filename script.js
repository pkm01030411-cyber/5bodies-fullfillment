const senseData={
  sight:{no:"01",en:"SIGHT → DISCOVERY",title:"보는 순간,",em:"새로운 것을 발견한다.",copy:"산지, 단면, 조합, 조리 장면을 눈앞에 펼쳐 검색하지 않았던 상품과 마주치게 합니다.",use:"입구 · 농산 · 메뉴 큐레이션"},
  smell:{no:"02",en:"SMELL → DESIRE",title:"향을 맡는 순간,",em:"먹고 싶은 욕구가 깨어난다.",copy:"인공 향이 아닌 실제 굽고 조리하는 과정의 향을 가장 강력한 상품 광고로 활용합니다.",use:"베이커리 · 델리 · 정육"},
  sound:{no:"03",en:"SOUND → IMAGINATION",title:"소리를 듣는 순간,",em:"사용 장면을 상상한다.",copy:"치이익 굽는 소리와 바삭한 조리음으로 정적인 매대에 살아 있는 현장감을 더합니다.",use:"라이브 키친 · 정육 · 수산"},
  touch:{no:"04",en:"TOUCH → CONFIDENCE",title:"직접 만지는 순간,",em:"구매 확신을 얻는다.",copy:"무게, 질감, 신선도, 그립감을 고객이 직접 확인해 리뷰로는 채울 수 없는 확신을 만듭니다.",use:"농산 · 주방용품 · 패브릭"},
  taste:{no:"05",en:"TASTE → VALIDATION",title:"맛보는 순간,",em:"선택을 검증한다.",copy:"구매 전에 실패 가능성을 낮추고, 단일 시식을 메뉴와 연관상품의 선택 경험으로 확장합니다.",use:"델리 · 농산 · Meal Solution"}
};

const journeyData=[
  {sense:"시각",label:"오늘의 발견",title:"검색보다 먼저,",em:"호기심을 켜다.",action:"발견",copy:"오늘의 메뉴와 제철 상품을 입구에서 예고합니다."},
  {sense:"시각 + 촉각",label:"상품 비교",title:"직접 고르는",em:"재미를 되돌리다.",action:"비교",copy:"색, 크기, 단면과 식감을 직접 확인합니다."},
  {sense:"후각",label:"다음 굽는 시간",title:"향이 고객의",em:"발걸음을 움직이다.",action:"욕구",copy:"완성되는 순간과 실제 향을 매장 콘텐츠로 만듭니다."},
  {sense:"청각",label:"LIVE COOKING",title:"상품이 요리가 되는",em:"장면을 상상하다.",action:"상상",copy:"조리음과 현장 설명으로 오늘 저녁의 모습을 보여줍니다."},
  {sense:"미각",label:"TRY & CHOOSE",title:"맛보고 고르며",em:"선택을 검증하다.",action:"체험",copy:"시식을 판촉에서 참여형 선택 이벤트로 바꿉니다."},
  {sense:"미각 + 후각",label:"TODAY’S PAIRING",title:"상품 하나보다",em:"완성된 조합을 사다.",action:"조합",copy:"와인·치즈·육류를 하나의 저녁 경험으로 제안합니다."},
  {sense:"촉각",label:"REVIEW TO REALITY",title:"리뷰를 읽는 대신",em:"직접 확인하다.",action:"확신",copy:"무게와 질감, 그립감을 만져보고 비교합니다."},
  {sense:"시각",label:"오늘의 오체FULL",title:"경험을 돌아보며",em:"다음 방문을 기억하다.",action:"기억",copy:"오늘의 발견과 선택을 앱·매장 화면으로 회상시킵니다."}
];

const panel=document.querySelector("#sense-panel");
document.querySelectorAll(".sense-tabs button").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".sense-tabs button").forEach(item=>item.setAttribute("aria-selected","false"));
  button.setAttribute("aria-selected","true");
  const data=senseData[button.dataset.sense];
  panel.innerHTML=`<div class="sense-symbol" aria-hidden="true">${data.no}</div><div><p class="sense-en">${data.en}</p><h3>${data.title}<br><em>${data.em}</em></h3><p>${data.copy}</p></div><div class="sense-use"><span>적용 장면</span><strong>${data.use}</strong></div>`;
}));

const journeyDetail=document.querySelector("#journey-detail");
document.querySelectorAll(".journey-route button").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".journey-route button").forEach(item=>{item.classList.remove("active");item.setAttribute("aria-selected","false")});
  button.classList.add("active");button.setAttribute("aria-selected","true");
  const index=Number(button.dataset.step),data=journeyData[index];
  journeyDetail.innerHTML=`<span class="journey-no">${String(index+1).padStart(2,"0")} / 08</span><div class="journey-sense"><small>HERO SENSE</small><strong>${data.sense}</strong></div><div class="journey-main"><p>${data.label}</p><h3>${data.title}<br><em>${data.em}</em></h3></div><div class="journey-action"><small>CUSTOMER ACTION</small><strong>${data.action}</strong><p>${data.copy}</p></div>`;
}));

const menuButton=document.querySelector(".menu-toggle"),nav=document.querySelector(".primary-nav");
menuButton.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")==="true";menuButton.setAttribute("aria-expanded",String(!open));nav.classList.toggle("open",!open)});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false")}));

const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduceMotion){document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"))}else{
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
}

const sections=[...document.querySelectorAll("main section[id]")],navLinks=[...nav.querySelectorAll("a[href^='#']")];
function updateScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  document.querySelector(".scroll-progress span").style.width=`${max>0?(window.scrollY/max)*100:0}%`;
  document.querySelector(".site-header").classList.toggle("scrolled",window.scrollY>20);
  let current="";sections.forEach(section=>{if(window.scrollY>=section.offsetTop-180)current=section.id});
  navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
}
window.addEventListener("scroll",updateScroll,{passive:true});updateScroll();
