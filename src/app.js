import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
 // import Swiper styles
 import 'swiper/swiper.min.css';

gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }


  /* pinType: document.querySelector(".smooth-scroll").style.transform
    ? "transform"
    : "fixed"*/
});

locoScroll.on('scroll', (args) => {
    const st = Math.floor(args.scroll.y / 10)
    gsap.to('.circleAnim__wrapper', {rotate: st, ease: 'linear'})
});

gsap.set('.hero__content .logo-wrapper', { rotate: 45,opacity:0 }, 0)
gsap.set('.hero__content .line', { scaleX: 0, transformOrigin: 'left top'})
gsap.set('.hero__content .contact-information', { x:'-5%', opacity:0 }, 0)
gsap.set('.hero__content .hero-text', { x:'-5%', opacity:0 }, 0)

const introStart = ()=>{
    const introTL = gsap.timeline();

    introTL
        .to('.hero__content .logo-wrapper', { rotate:0, opacity:1, ease: 'power2.out', duration: 1.5, }, 0)
        .to('.hero__content .line', { scaleX: 1, ease: 'power4.inOut', duration: 1.5,}, '-=1.5')
        .to('.hero__content .contact-information', { x: 0, opacity: 1, ease: 'power4.out', duration: 1, onComplete: ()=>{ScrollTrigger.refresh();} }, 1)
        .to('.hero__content .hero-text', { x:0, opacity: 1, ease: 'power4.out', duration: 1, }, 1)
}

let isPreload = true
const introDelay = 1800
const amoMain = document.querySelector('.amo-main')
const preloader = document.querySelector('#preloader')
window.onload = ()=>{
    const preloadTL = gsap.timeline({paused: true});
    preloadTL
        .to(amoMain, {
            clipPath: 'polygon(40% 20%, 60% 20%, 60% 80%, 40% 80%)',
            ease: 'expo.inOut', 
            duration: 2,
        })
        .to(amoMain, {
            delay:.3, 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
            ease: 'expo.inOut', 
            delay: -.4,
            duration: 2,
            onStart: ()=>{
                setTimeout( ()=>{
                    isPreload = false
                    introStart()
                    amoMain.style.height = 'auto'
                },introDelay )
            },
            onComplete: ()=>{
                preloader.style.display = 'none'
            }
        })
    if(isPreload){
        preloadTL.play()
    }else{
        return null
    }
}

const burgerMenu = document.querySelector('.navbar-toggle')
const menuContainer = document.querySelector('#amoMenu')
let anchors = document.querySelectorAll('.menu-link')

let isMenuOpen = false

const menuTL = gsap.timeline({paused: true})
  menuTL.from('.stagger-item', {opacity:0, y:50, ease: 'power4.out', stagger: .1})

const menuOpen = () => {
  menuContainer.classList.add('active')
  menuTL.play()
}

const menuClose = () => {
  menuTL.reverse()
    if(menuTL.reversed()){
      menuContainer.classList.remove('active')
    }
}
anchors.forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault()
    isMenuOpen = !isMenuOpen;
    let target = document.querySelector(el.attributes.href.value)
    if(!isMenuOpen){
      burgerMenu.classList.remove('active')
      menuClose()
    }

    locoScroll.scrollTo(target)
  })
});
burgerMenu.addEventListener('click', (e)=>{
  isMenuOpen = !isMenuOpen;
  
  if(isMenuOpen){
    e.target.classList.add('active')
    menuOpen()
  }else{
    e.target.classList.remove('active')
    menuClose()
  }
})

const target = document.getElementById('about')


const swiper = new Swiper('.amosign-huge-slider', {
    // Optional parameters
    spaceBetween: 0,
    centeredSlides: true,
    speed: 700,
    slidesPerView: 'auto',
    loop: true,
    grabCursor: true,
    pauseOnMouseEnter: true,
    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  // swiper.on('transitionEnd', (e)=>{
  //   e.autoplay.start()
  //   swiper.updateProgress()
  // })


const partnerSwiper = new Swiper('.partner-slider', {
    // Optional parameters
    spaceBetween: 0,
    speed: 5000,
    slidesPerView: 6,
    autoplay: {
      delay: 0.01,
    },
    loop: true,
    grabCursor: true,
    pauseOnMouseEnter: true,
    freeMode: {
      enabled: true,
      sticky: false,
      minimumVelocity: 0.01
    },
  });
  // partnerSwiper.on('setTranslate', function onSliderMove() {
  //   console.log(this.translate);
  // });

  partnerSwiper.on('transitionEnd', (e)=>{
    e.autoplay.start()
  })

const footerSwiper = new Swiper('.footer-slider', {
    // Optional parameters
    spaceBetween: 20,
    speed: 5000,
    slidesPerView: 4,
    autoplay: {
      delay: 0.01,
    },
    loop: true,
    grabCursor: true,
    pauseOnMouseEnter: true,
    freeMode: {
      enabled: true,
      sticky: false,
      minimumVelocity: 0.01
    },
  });
  // partnerSwiper.on('setTranslate', function onSliderMove() {
  //   console.log(this.translate);
  // });

  footerSwiper.on('transitionEnd', (e)=>{
    e.autoplay.start()
  })


  const headerTL = gsap.timeline({
    scrollTrigger: {
        trigger: '.hero__content',
        scroller: ".smooth-scroll",
        start: "top top", 
        end: "bottom top",
        scrub: .4,
      }
  });

  headerTL
    .to('.hero__content .line', { scaleX: 0, transformOrigin: 'right top'})

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();