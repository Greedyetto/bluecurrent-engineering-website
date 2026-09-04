document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",event=>{const target=document.querySelector(link.getAttribute("href"));if(!target)return;event.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}));

(async()=>{
  const hero=document.getElementById("hero-cover-image");
  if(!hero)return;
  try{
    const parts=await Promise.all([0,1,2,3,4,5].map(async i=>{
      const response=await fetch(`assets/hero/part${i}.txt`,{cache:"force-cache"});
      if(!response.ok)throw new Error(`Hero chunk ${i} failed: ${response.status}`);
      return (await response.text()).trim();
    }));
    hero.src=`data:image/jpeg;base64,${parts.join("")}`;
  }catch(error){
    console.error("BlueCurrent hero image failed to load",error);
  }
})();
