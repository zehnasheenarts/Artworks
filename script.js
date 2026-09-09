const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxTitle=document.getElementById("lightboxTitle");

document.querySelectorAll(".feature-card,.collection-card").forEach(card=>{
  card.addEventListener("click",()=>{
    lightboxImage.src=card.dataset.image;
    lightboxImage.alt=card.dataset.title;
    lightboxTitle.textContent=card.dataset.title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});
function closeBox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelector(".close")?.addEventListener("click",closeBox);
lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeBox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeBox()});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const filters=document.querySelectorAll(".filter");
const cards=document.querySelectorAll(".collection-card");
const emptyNote=document.getElementById("emptyNote");
filters.forEach(filter=>{
  filter.addEventListener("click",()=>{
    filters.forEach(f=>f.classList.remove("active"));
    filter.classList.add("active");
    const value=filter.dataset.filter;
    let visible=0;
    cards.forEach(card=>{
      const categories=card.dataset.category||"";
      const show=value==="all" || categories.includes(value);
      card.classList.toggle("is-hidden",!show);
      if(show) visible++;
    });
    if(emptyNote) emptyNote.hidden=visible!==0;
  });
});
