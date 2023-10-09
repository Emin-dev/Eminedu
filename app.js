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
    const style = document.createElement("style");
    style.textContent = `
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
    document.head.appendChild(style);

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

    // Set a timer to remove the scroll indicator if the user hasn't scrolled
    setTimeout(function () {
        if (!userScrolled) {
            // Hide the scroll indicator with a smooth fade-out
            scrollIndicator.style.opacity = 0;
        }
    }, 15000); // Adjust the delay as needed

    // Add a scroll event listener
    window.addEventListener("scroll", handleScroll);
    ////////






















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

