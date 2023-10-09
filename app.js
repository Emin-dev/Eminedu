"use strict";

document.body.style.overflow = 'hidden';


// Disable scrolling
document.body.addEventListener('touchmove', preventScroll, { passive: false });

// Function to prevent scrolling
function preventScroll(event) {
  event.preventDefault();
}


const userAgent = navigator.userAgent;
const mobileAgents = ["Android", "iPad", "iPhone"];
const isMobile = mobileAgents.some(agent => userAgent.includes(agent));

if (!isMobile) {
  document.body.innerHTML = '';
  document.body.style.cssText = 'background:#ffff';

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Zəhmət olmasa smartfondan daxil olun.<br>Digər brauzerdən istifadə edin.';
  h1.style.cssText = 'font-weight:bold;color:red;font-size:2em;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);animation:pulse 2s infinite alternate';

  const style = document.createElement('style');
  style.innerHTML = '@keyframes pulse {0% {transform:translate(-50%,-50%) scale(1);}100% {transform:translate(-50%,-50%) scale(1.1);}}';

  document.head.appendChild(style);
  document.body.appendChild(h1);
}








$(document).ready(function () {


  const scrollToTop = () => window.scrollTo(0, 0);

  ["DOMContentLoaded", "load", "beforeunload"].forEach(event => window.addEventListener(event, scrollToTop));

  const animate = star => {
    const setProperty = (property, min, max) => star.style.setProperty(property, `${Math.floor(Math.random() * (max - min + 1)) + min}%`);

    setProperty("--star-left", -10, 100);
    setProperty("--star-top", -40, 80);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  }

  Array.from(document.getElementsByClassName("magic-star")).forEach((star, index) => {
    setTimeout(() => {
      animate(star);
      setInterval(() => animate(star), 1000);
    }, index * 333.33);
  });









  const config = {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png',
    rows: 15,
    cols: 7
  };

  const randomRange = (min, max) => min + Math.random() * (max - min);
  const randomIndex = (array) => randomRange(0, array.length) | 0;
  const removeFromArray = (array, i) => array.splice(i, 1)[0];
  const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));
  const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));
  const getRandomFromArray = (array) => array[randomIndex(array) | 0];

  const resetPeep = ({ stage, peep }) => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random());
    const startY = stage.height - peep.height + offsetY;
    let startX;
    let endX;

    if (direction === 1) {
      startX = -peep.width;
      endX = stage.width;
      peep.scaleX = 1;
    } else {
      startX = stage.width + peep.width;
      endX = 0;
      peep.scaleX = -1;
    }

    peep.x = startX;
    peep.y = startY;
    peep.anchorY = startY;

    return { startX, startY, endX };
  };

  const normalWalk = ({ peep, props }) => {
    const { startX, startY, endX } = props;
    const xDuration = 10;
    const yDuration = 0.25;

    const tl = gsap.timeline();
    tl.timeScale(randomRange(0.4, 2));
    tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0);
    tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 }, 0);

    return tl;
  };

  const walks = [normalWalk];

  class Peep {
    constructor({ image, rect }) {
      this.image = image;
      this.setRect(rect);
      this.x = 0;
      this.y = 0;
      this.anchorY = 0;
      this.scaleX = 1;
      this.walk = null;
    }

    setRect(rect) {
      this.rect = rect;
      this.width = rect[2];
      this.height = rect[3];
      this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
    }

    render(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scaleX, 1);
      ctx.drawImage(...this.drawArgs);
      ctx.restore();
    }
  }

  const img = document.createElement('img');
  img.onload = init;
  img.src = config.src;

  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  const stage = { width: 0, height: 0 };
  const allPeeps = [];
  const availablePeeps = [];
  const crowd = [];

  function init() {
    createPeeps();
    resize();
    gsap.ticker.add(render);
    window.addEventListener('resize', resize);
  }

  function createPeeps() {
    const { rows, cols } = config;
    const { naturalWidth: width, naturalHeight: height } = img;
    const total = rows * cols;
    const rectWidth = width / rows;
    const rectHeight = height / cols;

    for (let i = 0; i < total; i++) {
      allPeeps.push(new Peep({
        image: img,
        rect: [(i % rows) * rectWidth, (i / rows | 0) * rectHeight, rectWidth, rectHeight],
      }));
    }
  }

  function resize() {
    stage.width = canvas.clientWidth;
    stage.height = canvas.clientHeight;
    canvas.width = stage.width * devicePixelRatio;
    canvas.height = stage.height * devicePixelRatio;
    crowd.forEach((peep) => peep.walk.kill());
    crowd.length = 0;
    availablePeeps.length = 0;
    availablePeeps.push(...allPeeps);
    initCrowd();
  }

  function initCrowd() {
    while (availablePeeps.length) {
      addPeepToCrowd().walk.progress(Math.random());
    }
  }

  function addPeepToCrowd() {
    const peep = removeRandomFromArray(availablePeeps);
    const walk = getRandomFromArray(walks)({ peep, props: resetPeep({ peep, stage }) }).eventCallback('onComplete', () => {
      removePeepFromCrowd(peep);
      addPeepToCrowd();
    });

    peep.walk = walk;
    crowd.push(peep);
    crowd.sort((a, b) => a.anchorY - b.anchorY);

    return peep;
  }

  function removePeepFromCrowd(peep) {
    removeItemFromArray(crowd, peep);
    availablePeeps.push(peep);
  }

  function render() {
    canvas.width = canvas.width;
    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    crowd.forEach((peep) => peep.render(ctx));
    ctx.restore();
  }












  document.body.style.overflow = 'hidden';

  setTimeout(function () {
    document.getElementById('preloader1').style.display = 'none';
    document.getElementById('preloader2').style.display = 'flex';

    setTimeout(function () {
      document.getElementById('preloader2').style.display = 'none';

      window.scrollTo(0, 0);

    }, 6000);
  }, 4000);











  let faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      let currentAnswer = this.nextElementSibling;

      // Close any currently open answers
      let openAnswer = document.querySelector('.faq-answer.show');
      if (openAnswer && openAnswer !== currentAnswer) {
        openAnswer.classList.remove('show');
      }

      // Toggle current answer
      if (currentAnswer.classList.contains('show')) {
        currentAnswer.classList.remove('show');
      } else {
        currentAnswer.classList.add('show');
      }
    });
  });












  ////////
  // Create the scroll indicator element
  const scrollIndicator = document.createElement("div");
  scrollIndicator.classList.add("scroll-indicator");
  document.body.appendChild(scrollIndicator);

  // Create the arrow element
  const arrow = document.createElement("div");
  arrow.classList.add("arrow");
  scrollIndicator.appendChild(arrow);

  // Create the CSS styles dynamically with a glassmorphism design
  const q = document.createElement("style");
  q.textContent = `
  .scroll-indicator {
    position: fixed;
    bottom: 20vh;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: opacity 0.5s;
  }

  .arrow {
    width: 80px;
    height: 80px;
    border: 4px solid rgba(255, 255, 255, 0.5);
    border-width: 2px 2px 0 0;
    transform: rotate(-45deg);
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(15px);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: bounce 4s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
  }
`;

  // Flag to track whether the user has scrolled
  let userScrolled = false;

  // Function to handle scroll event
  function handleScroll() {
    userScrolled = true;
    // Hide the scroll indicator with a smooth fade-out
    scrollIndicator.style.opacity = 0;
    // Remove the scroll event listener
    window.removeEventListener("scroll", handleScroll);
  }

  setTimeout(function () {
    window.addEventListener("scroll", handleScroll);
    document.head.appendChild(q);
  }, 15000);
  ////////









  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const navBg = document.createElement('div');
  navBg.id = 'nav-bg';
  navBg.classList.add('btn');

  const toggleBtn = document.createElement('div');
  toggleBtn.id = 'toggle-btn';
  toggleBtn.classList.add('btn');

  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span');
    toggleBtn.appendChild(span);
  }

  const content = document.createElement('div');
  content.id = 'content';

  const heading = document.createElement('h1');
  // ... (Your existing code)

  // Create the nav element
  const nav = document.createElement("nav");

  // Create the ul element for the navigation list
  const ul = document.createElement("ul");

  // Create an array of link names
  const linkNames = ["Projects", "About", "Contact"];

  // Loop through the link names and create list items and links
  linkNames.forEach((name) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.classList.add("link");
    link.href = "#0";
    link.textContent = name;
    listItem.appendChild(link);
    ul.appendChild(listItem);
  });

  // Append the ul to the nav element
  nav.appendChild(ul);

  // Append the nav element to your existing wrapper
  wrapper.appendChild(nav);

  // Function to toggle the 'shown' class on the nav element
  const toggleNav = () => {
    nav.classList.toggle('shown');
  };

  toggleBtn.addEventListener('click', toggleNav, false);
  // ... (The rest of your existing code)

  // Add the event listener for the animationend event to handle visibility
  nav.addEventListener('animationend', () => {
    if (!nav.classList.contains('shown')) {
      // Hide the nav after animation ends
      nav.style.visibility = 'hidden';
    }
  }, false);

  content.appendChild(heading);
  wrapper.appendChild(navBg);
  wrapper.appendChild(toggleBtn);
  wrapper.appendChild(content);
  document.body.appendChild(wrapper);

  const style = document.createElement('style');
  style.innerHTML = `
      @import url('https://fonts.googleapis.com/css?family=Encode+Sans+Condensed:400,600');
    
      :root {
        --offset-value: 30;
        --btn-size: 60;
        --green: #4ECA78;
      }
    
      .wrapper {
        font-weight: 600;
        width: 100%;
        position: relative;
      }
    
      #nav-bg {
        transform-origin: center center;
        transition: transform .3s;
        transform: translate(var(--translate-x), var(--translate-y)) scale(var(--scale));
        will-change: transform;
        pointer-events: none;
      }
    
      .btn {
        position: fixed;
        height: calc(var(--btn-size)*1px);
        width: calc(var(--btn-size)*1px);
        bottom: calc((var(--offset-value))*1px);
        left: calc(var(--offset-value)*1px);
        border-radius: 50%;
        background: #fafafa;
        cursor: pointer;
        margin: 0;
        padding: 0 15px;
        border: none;
        z-index: 100;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
    
      #toggle-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--green);
      }
    
      #toggle-btn span {
        position: relative;
        width: 100%;
      }
    
      #toggle-btn span {
        margin-top: -4px;
      }
      #toggle-btn span + span {
        margin-top: 8px;
      }
    
      #toggle-btn span:before,
      #toggle-btn span:after {
        content: '';
        position: absolute;
        top: 0;
        background: currentColor;
        opacity: .8;
        height: 100%;
        width: 50%;
        height: 4px;
        transition: .25s cubic-bezier(.6,0,.3,1);
        transform-origin: center center;
      }
    
      #toggle-btn span:before {
        left: 0;
        border-radius: 3px 0 0 3px;
      }
    
      #toggle-btn span:after {
        right: 0;
        border-radius: 0 3px 3px 0;
      }
    
      #toggle-btn.shown span:nth-of-type(1):before {
        transform: translate3d(3px, 3.5px, 0) rotate(45deg);
      }
    
      #toggle-btn.shown span:nth-of-type(1):after {
        transform: translate3d(-3px, 3.5px, 0) rotate(-45deg);
      }
    
      #toggle-btn.shown span:nth-of-type(3):before {
        transform: translate3d(3px, -3.5px, 0) rotate(-45deg);
      }
    
      #toggle-btn.shown span:nth-of-type(3):after {
        transform: translate3d(-3px, -3.5px, 0) rotate(45deg);
      }
    
      #toggle-btn.shown span:nth-of-type(2):before,
      #toggle-btn.shown span:nth-of-type(2):after {
        opacity: 0.0001;
      }
    
      #toggle-btn.shown span:nth-of-type(2):before {
        transform: translateX(-200%);
      }
    
      #toggle-btn.shown span:nth-of-type(2):after {
        transform: translateX(200%);
      }
    
      #toggle-btn.shown:before {
        transform: scale(.6);
        transition: .2s;
      }
    
      #toggle-btn:before {
        content: '';
        transition: .2s .2s;
        position: absolute;
        top: 3px;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.1);
        border-radius: inherit;
        filter: blur(5px);
        z-index: -2;
      }
      #toggle-btn:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: #fafafa;
        z-index: -1;
      }
    
      nav {
        width: 100%;
        height: 100%;
        background: transparent;
        position: fixed;
        top: 0;
        left: 0;
        overflow: hidden;
        display: flex;
        z-index: 200;
        pointer-events: none;
      }
    
      nav ul {
        margin: auto;
        pointer-events: auto;
        text-align
            text-align: center;
      }
    
      nav li {
        font-size: 30px;
        color: #212121;
        user-select: none;
        transform: translate(-20px,20px) scale(.9);
        transition: 0s;
        opacity: 0.0001;
        visibility: hidden;
        will-change: transform;
      }
    
      nav li + li {
        margin-top: 30px;
      }
    
      #toggle-btn.shown ~ .wrapper nav li {
        transform: none;
        opacity: 1;
        visibility: visible;
        transition: .35s cubic-bezier(.4,2.08,.55,1);
      }
    
      #toggle-btn.shown ~ .wrapper nav li:nth-child(1) {
        transition-delay: .15s;
      }
      #toggle-btn.shown ~ .wrapper nav li:nth-child(2) {
        transition-delay: .125s;
      }
      #toggle-btn.shown ~ .wrapper nav li:nth-child(3) {
        transition-delay: .1s;
      }
    
      .link {
        position: relative;
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
    
      .link:before,
      .link:after {
        position: absolute;
        content: '';
        height: 3px;
        width: 50%;
        background: #4ECA78;
        top: calc(50% + 2px);
        transition: transform .3s cubic-bezier(.5,.5,0,1);
      }
    
      .link:before {
        left: 0;
        transform: translateX(calc(-100% - 10px)) scaleX(0);
        transform-origin: left;
      }
    
      .link:after {
        right: 0;
        transform: translateX(calc(100% + 10px)) scaleX(0);
        transform-origin: right;
      }
    
      .link:hover:before {
        transform: translateX(calc(-100% - 10px)) scaleX(1);
        transform-origin: right;
      }
    
      .link:hover:after {
        transform: translateX(calc(100% + 10px)) scaleX(1);
        transform-origin: left;
      }
    
      #content {
        display: flex;
        height: 100%;
      }
    
      #content h1 {
        font-size: calc(4vmin + 1em);
        text-align: center;
        margin: auto;
        color: #fff;
        text-shadow: 0 6px 18px rgba(0,0,0,.1);
      }
    
    
      a,
      a:visited,
      a:focus,
      a:active,
      a:link {
        text-decoration: none;
        outline: 0;
      }
    
      a {
        color: currentColor;
        transition: .2s ease-in-out;
      }
    
      ul {
        padding: 0;
        list-style: none;
      }
    
      img {
        vertical-align: middle;
        height: auto;
        width: 100%;
      }
    `;

  document.head.appendChild(style);

  const elemH = navBg.getBoundingClientRect().height;
  const elemW = navBg.getBoundingClientRect().width;

  let open = false;
  let scale, offsetX, offsetY;

  const calculateValues = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const offsetValue = Number(getComputedStyle(navBg).getPropertyValue('--offset-value'));

    offsetX = (w / 2) - (elemW / 2) - offsetValue;
    offsetY = (h / 2) - (elemH / 2) - offsetValue;

    const radius = Math.sqrt((h ** 2) + (w ** 2));
    scale = radius / (elemW / 2) / 2 + .1;
    return scale;
  };

  const openMenu = () => {
    navBg.style.setProperty("--translate-x", `${offsetX}px`);
    navBg.style.setProperty("--translate-y", `-${offsetY}px`);
    navBg.style.setProperty("--scale", scale);
  };

  const closeMenu = () => {
    navBg.style.setProperty("--scale", 1);
    navBg.style.setProperty("--translate-x", 0);
    navBg.style.setProperty("--translate-y", 0);
  };

  const animateMenu = () => {
    open ? openMenu() : closeMenu();
  };

  const toggleMenu = () => {
    open = !open;
    animateMenu();
    toggleBtn.classList.toggle('shown');
  };

  const resizeHandler = () => {
    window.requestAnimationFrame(() => {
      calculateValues();
      animateMenu();
    });
  };

  calculateValues();
  toggleBtn.addEventListener('click', toggleMenu, false);
  window.addEventListener("resize", resizeHandler, false);


















  //////////











  window.scrollTo(0, 0);
});




setTimeout(function () {
  window.scrollTo(0, 0);
}, 6000);



setTimeout(function () {
  window.scrollTo(0, 0);
}, 8000);

setTimeout(function () {
  window.scrollTo(0, 0);
  document.body.style.overflow = "auto";

  // Re-enable scrolling
  document.body.removeEventListener('touchmove', preventScroll, { passive: true });
}, 12000);

