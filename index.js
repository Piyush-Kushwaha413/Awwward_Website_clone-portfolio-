const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

var timeout;
var  element = document.querySelector("[element]");
const mini_circle = document.querySelector(".min_circle");
const circle_text = document.querySelector(".circle_text");


function firstPageAnim() { 
   
    var t1 = gsap.timeline();
    
    t1.from('#nav',{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".bounding_elm",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2
    })
    .from("#first_footer",{
        y:-10,
        opacity:0,
        delay:-1,
        duration:2,
        ease:Expo.easeInOut
    })
    .from(".smallheading",{
        x:20,
        opacity:0,
        delay:-1,
        duration:2,
        ease:Expo.easeInOut,
    })
}
// jab mouse move ho to mini_circle
function miniCircleSkoiss() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    
    window.addEventListener("mousemove",function(dets){
        // define default scale value
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8,1.1,dets.clientX-xprev);
        yscale= gsap.utils.clamp(.8,1.1,dets.clientY-yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        movingcircle(xscale,yscale);

        timeout = setTimeout(function(){
        document.querySelector(".min_circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1 ,1)`}, 100);       
    });
} 

function movingcircle(xscale,yscale) {
    window.addEventListener("mousemove",(dets)=>{
        document.querySelector(".min_circle").style.transform = `translateX(${dets.clientX}px) translateY(${dets.clientY}px) scaleX(${xscale}) scaleY(${yscale}) `;  
    } )  
}
// showe image of elem div when we hover on elem @ @ @ @
function imgShowe() {
    document.querySelectorAll("#elem").forEach(function (elem) {

        // variable to elem
        var pervrotate = 0;
        var diffrot = 0;

        // getting mouse details when we hover on elem 
        elem.addEventListener("mousemove",function(data){
            var diff = data.clientY-elem.getBoundingClientRect().top;
            diffrot= data.clientX-pervrotate;
            pervrotate = diffrot;
            // elem.ATTRIBUTE_NODE
// showe the image on elem 
            gsap.to(elem.querySelector(".img"),{
            opacity:1,
            ease:Power3,
            top: diff-150,
            left :data.clientX-150,
            rotate: gsap.utils.clamp(-20,20,diffrot * 0.8),
            position: 'absolute',
            display: 'block',
            
        }) 
        })
// remove image when cursor is not image  

        elem.addEventListener("mouseleave",function(){
           
           gsap.to(elem.querySelector(".img"),{
            opacity:0,
            display: 'none',
            ease:Power3,
            // mixBlendMode:'difference',
           }) 
        })
    })
    
}


const elems = document.querySelectorAll('#elem');

elems.forEach((elem)=>{
    elem.addEventListener("mousemove",(det)=>{
        mini_circle.style.height = `80px`;
        mini_circle.style.width = `80px`;
        document.querySelector(".circle_text").style.opacity = 1;
        mini_circle.style.mixBlendMode = 'normal';


    })
    
    elem.addEventListener("mouseleave",(dets)=>{
        mini_circle.style.height = '18px';
        mini_circle.style.width = '18px';
        circle_text.style.opacity = 0;
        mini_circle.style.mixBlendMode = 'difference';
        
})

// document.querySelector(".second").addEventListener("mousemove",()=>{
//     document.querySelector(".min_circle").classList.add('normal');

})
imgShowe();
miniCircleSkoiss();
firstPageAnim();
movingcircle();