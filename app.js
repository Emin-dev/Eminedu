"use strict";

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
            // Show main content
            document.body.style.overflow = 'auto'; // re-enable scrolling
        }, 6000);
    }, 4000);



    window.addEventListener('load', function () {
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 5000);
    });
});




setTimeout(function () {
    window.scrollTo(0, 0);
}, 5000); 
