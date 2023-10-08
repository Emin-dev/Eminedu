"use strict";

var userAgent = navigator.userAgent;

// List of popular mobile user agents
var mobileAgents = [
    "Android",
    "iPad",
    "iPhone"
];

var isMobile = mobileAgents.some(function (agent) {
    return userAgent.includes(agent);
});

if (!isMobile) {
    document.body.innerHTML = '';
    document.body.style.background = '#ffff'
    var h1 = document.createElement('h1');
    h1.innerHTML = 'Zəhmət olmasa smartfondan daxil olun.<br>Digər brauzerdən istifadə edin.';
    // Add styles directly to the h1 element
    h1.style.fontWeight = 'bold';
    h1.style.color = 'red';
    h1.style.fontSize = '2em';
    h1.style.textAlign = 'center';
    h1.style.position = 'absolute';
    h1.style.top = '50%';
    h1.style.left = '50%';
    h1.style.transform = 'translate(-50%, -50%)';
    h1.style.animation = 'pulse 2s infinite alternate';

    // Create and add pulse animation to the document
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% {
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Append h1 to the body
    document.body.appendChild(h1);
}

window.onload = function () {
    var userAgent = navigator.userAgent;

    // List of popular mobile user agents
    var mobileAgents = [
        "Android",
        "iPad",
        "iPhone"
    ];

    var isMobile = mobileAgents.some(function (agent) {
        return userAgent.includes(agent);
    });

    if (!isMobile) {
        document.body.innerHTML = '';
        document.body.style.background = '#ffff'
        var h1 = document.createElement('h1');
        h1.innerText = 'Zəhmət olmasa smartfondan daxil olun. Digər brauzerdən istifadə edin. Eminedu.com. © 2024';

        // Add styles directly to the h1 element
        h1.style.fontWeight = 'bold';
        h1.style.color = 'red';
        h1.style.fontSize = '2em';
        h1.style.textAlign = 'center';
        h1.style.position = 'absolute';
        h1.style.top = '50%';
        h1.style.left = '50%';
        h1.style.transform = 'translate(-50%, -50%)';
        h1.style.animation = 'pulse 2s infinite alternate';

        // Create and add pulse animation to the document
        var style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulse {
                0% {
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    transform: translate(-50%, -50%) scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);

        // Append h1 to the body
        document.body.appendChild(h1);
    }
}

































































$(document).ready(function () {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    window.addEventListener('DOMContentLoaded', scrollToTop);
    window.addEventListener('load', scrollToTop);
    window.addEventListener('beforeunload', scrollToTop);


    let index = 0,
        interval = 1000;

    const rand = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const animate = star => {
        star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
        star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

        star.style.animation = "none";
        star.offsetHeight;
        star.style.animation = "";
    }

    for (const star of document.getElementsByClassName("magic-star")) {
        setTimeout(() => {
            animate(star);

            setInterval(() => animate(star), 1000);
        }, index++ * (interval / 3))
    }




















    console.clear()
    console.log('lsakdfalskjdflnksd')

    const config = {
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png',
        rows: 15,
        cols: 7
    }

    // UTILS

    const randomRange = (min, max) => min + Math.random() * (max - min)

    const randomIndex = (array) => randomRange(0, array.length) | 0

    const removeFromArray = (array, i) => array.splice(i, 1)[0]

    const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item))

    const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array))

    const getRandomFromArray = (array) => (
        array[randomIndex(array) | 0]
    )

    // TWEEN FACTORIES

    const resetPeep = ({ stage, peep }) => {
        const direction = Math.random() > 0.5 ? 1 : -1
        // using an ease function to skew random to lower values to help hide that peeps have no legs
        const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random())
        const startY = stage.height - peep.height + offsetY
        let startX
        let endX

        if (direction === 1) {
            startX = -peep.width
            endX = stage.width
            peep.scaleX = 1
        } else {
            startX = stage.width + peep.width
            endX = 0
            peep.scaleX = -1
        }

        peep.x = startX
        peep.y = startY
        peep.anchorY = startY

        return {
            startX,
            startY,
            endX
        }
    }

    const normalWalk = ({ peep, props }) => {
        const {
            startX,
            startY,
            endX
        } = props

        const xDuration = 10
        const yDuration = 0.25

        const tl = gsap.timeline()
        tl.timeScale(randomRange(0.4, 2))
        tl.to(peep, {
            duration: xDuration,
            x: endX,
            ease: 'none'
        }, 0)
        tl.to(peep, {
            duration: yDuration,
            repeat: xDuration / yDuration,
            yoyo: true,
            y: startY - 10
        }, 0)

        return tl
    }

    const walks = [
        normalWalk,
    ]

    // CLASSES

    class Peep {
        constructor({
            image,
            rect,
        }) {
            this.image = image
            this.setRect(rect)

            this.x = 0
            this.y = 0
            this.anchorY = 0
            this.scaleX = 1
            this.walk = null
        }

        setRect(rect) {
            this.rect = rect
            this.width = rect[2]
            this.height = rect[3]

            this.drawArgs = [
                this.image,
                ...rect,
                0, 0, this.width, this.height
            ]
        }

        render(ctx) {
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.scale(this.scaleX, 1)
            ctx.drawImage(...this.drawArgs)
            ctx.restore()
        }
    }

    // MAIN

    const img = document.createElement('img')
    img.onload = init
    img.src = config.src

    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    const stage = {
        width: 0,
        height: 0,
    }

    const allPeeps = []
    const availablePeeps = []
    const crowd = []

    function init() {
        createPeeps()

        // resize also (re)populates the stage
        resize()

        gsap.ticker.add(render)
        window.addEventListener('resize', resize)
    }

    function createPeeps() {
        const {
            rows,
            cols
        } = config
        const {
            naturalWidth: width,
            naturalHeight: height
        } = img
        const total = rows * cols
        const rectWidth = width / rows
        const rectHeight = height / cols

        for (let i = 0; i < total; i++) {
            allPeeps.push(new Peep({
                image: img,
                rect: [
                    (i % rows) * rectWidth,
                    (i / rows | 0) * rectHeight,
                    rectWidth,
                    rectHeight,
                ]
            }))
        }
    }

    function resize() {
        stage.width = canvas.clientWidth
        stage.height = canvas.clientHeight
        canvas.width = stage.width * devicePixelRatio
        canvas.height = stage.height * devicePixelRatio

        crowd.forEach((peep) => {
            peep.walk.kill()
        })

        crowd.length = 0
        availablePeeps.length = 0
        availablePeeps.push(...allPeeps)

        initCrowd()
    }



    function initCrowd() {
        while (availablePeeps.length) {
            // setting random tween progress spreads the peeps out
            addPeepToCrowd().walk.progress(Math.random())
        }
    }

    function addPeepToCrowd() {
        const peep = removeRandomFromArray(availablePeeps)
        const walk = getRandomFromArray(walks)({
            peep,
            props: resetPeep({
                peep,
                stage,
            })
        }).eventCallback('onComplete', () => {
            removePeepFromCrowd(peep)
            addPeepToCrowd()
        })

        peep.walk = walk

        crowd.push(peep)
        crowd.sort((a, b) => a.anchorY - b.anchorY)

        return peep
    }

    function removePeepFromCrowd(peep) {
        removeItemFromArray(crowd, peep)
        availablePeeps.push(peep)
    }

    function render() {
        canvas.width = canvas.width
        ctx.save()
        ctx.scale(devicePixelRatio, devicePixelRatio)

        crowd.forEach((peep) => {
            peep.render(ctx)
        })

        ctx.restore()
    }






    // preloader











    // Hide main content initially
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
        document.getElementById('preloader1').style.display = 'none';
        document.getElementById('preloader2').style.display = 'flex';

        setTimeout(function () {
            document.getElementById('preloader2').style.display = 'none';

            // Show main content
            document.body.style.overflow = 'auto'; // re-enable scrolling
        }, 6000);
    }, 4000);





    setTimeout(function () {

        function scrollToTop() {
            window.scrollTo(0, 0);
        }

        window.addEventListener('DOMContentLoaded', scrollToTop);
        window.addEventListener('load', scrollToTop);
        window.addEventListener('beforeunload', scrollToTop);

    }, 2000);  // 2000 milliseconds is equal to 2 seconds
});




setTimeout(function () {

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    window.addEventListener('DOMContentLoaded', scrollToTop);
    window.addEventListener('load', scrollToTop);
    window.addEventListener('beforeunload', scrollToTop);

}, 2000);  // 2000 milliseconds is equal to 2 seconds