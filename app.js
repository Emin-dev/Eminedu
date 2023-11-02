"use strict";






$(document).ready(function () {
  document.body.classList.add('no-scroll');


  const scrollToTop = () => window.scrollTo(0, 0);

  ["DOMContentLoaded", "load", "beforeunload"].forEach(event => window.addEventListener(event, scrollToTop));







  // CSS styles
  const styles = `

    .loading {
      color: white;
      font-size: 5em;
      margin-bottom: 50px; // Space between text and ghost
    }

    .loading span {
      display: inline-block;
      animation: bounce 0.3s ease infinite alternate;
      animation-delay: calc(0.1s * var(--i));
    }

    @keyframes bounce {
      0% {
        text-shadow: 0 1px #bbb, 0 2px #bbb, 0 3px #bbb, 0 4px #bbb, 0 5px #bbb, 0 6px #bbb, 0 7px #bbb, 0 8px #bbb, 0 9px #bbb, 0 10px rgba(0, 0, 0, 0.4);
        transform: translateY(20px);
      }
      100% {
        text-shadow: 0 1px #bbb, 0 2px #bbb, 0 3px #bbb, 0 4px #bbb, 0 5px #bbb, 0 6px #bbb, 0 7px #bbb, 0 8px #bbb, 0 9px #bbb, 0 50px 25px rgba(0, 0, 0, 0.2);
        transform: translateY(-20px);
      }
    }

    .ghost {
      animation: float 3s ease-out infinite;
      position: relative;
      filter: drop-shadow(0px 10px 5px rgba(0, 0, 0, 0.3));
    }


    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    `;









  // Display preloader1 for 4 seconds
  setTimeout(() => {

    document.getElementById('preloader2').style.display = 'flex';
    document.getElementById('preloader2').style.zIndex = '99999999';
    document.getElementById('preloader3').style.display = 'none';

    const preloader1 = document.getElementById('preloader1');
    preloader1.style.transition = 'opacity 2s';
    preloader1.style.opacity = 0;


    // Add styles and fonts for preloader2
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Dosis:wght@500&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Add the modified HTML for preloader2
    document.getElementById('preloader2').innerHTML = `
        <div class="container">
          <div class="loading">Yazılır...</div>
        
    <svg class="ghost" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="127.433px" height="132.743px" viewBox="0 0 127.433 132.743" enable-background="new 0 0 127.433 132.743"
    xml:space="preserve">
    <path fill="#FFF6F4" d="M116.223,125.064c1.032-1.183,1.323-2.73,1.391-3.747V54.76c0,0-4.625-34.875-36.125-44.375
    s-66,6.625-72.125,44l-0.781,63.219c0.062,4.197,1.105,6.177,1.808,7.006c1.94,1.811,5.408,3.465,10.099-0.6
    c7.5-6.5,8.375-10,12.75-6.875s5.875,9.75,13.625,9.25s12.75-9,13.75-9.625s4.375-1.875,7,1.25s5.375,8.25,12.875,7.875
    s12.625-8.375,12.625-8.375s2.25-3.875,7.25,0.375s7.625,9.75,14.375,8.125C114.739,126.01,115.412,125.902,116.223,125.064z"/>
    <circle fill="#013E51" cx="86.238" cy="57.885" r="6.667"/>
    <circle fill="#013E51" cx="40.072" cy="57.885" r="6.667"/>
    <path fill="#013E51" d="M71.916,62.782c0.05-1.108-0.809-2.046-1.917-2.095c-0.673-0.03-1.28,0.279-1.667,0.771
    c-0.758,0.766-2.483,2.235-4.696,2.358c-1.696,0.094-3.438-0.625-5.191-2.137c-0.003-0.003-0.007-0.006-0.011-0.009l0.002,0.005
    c-0.332-0.294-0.757-0.488-1.235-0.509c-1.108-0.049-2.046,0.809-2.095,1.917c-0.032,0.724,0.327,1.37,0.887,1.749
    c-0.001,0-0.002-0.001-0.003-0.001c2.221,1.871,4.536,2.88,6.912,2.986c0.333,0.014,0.67,0.012,1.007-0.01
    c3.163-0.191,5.572-1.942,6.888-3.166l0.452-0.453c0.021-0.019,0.04-0.041,0.06-0.061l0.034-0.034
    c-0.007,0.007-0.015,0.014-0.021,0.02C71.666,63.771,71.892,63.307,71.916,62.782z"/>
    <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="18.614" cy="99.426" r="3.292"/>
    <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="95.364" cy="28.676" r="3.291"/>
    <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="24.739" cy="93.551" r="2.667"/>
    <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="101.489" cy="33.051" r="2.666"/>
    <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="18.738" cy="87.717" r="2.833"/>
    <path fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" d="M116.279,55.814c-0.021-0.286-2.323-28.744-30.221-41.012
    c-7.806-3.433-15.777-5.173-23.691-5.173c-16.889,0-30.283,7.783-37.187,15.067c-9.229,9.736-13.84,26.712-14.191,30.259
    l-0.748,62.332c0.149,2.133,1.389,6.167,5.019,6.167c1.891,0,4.074-1.083,6.672-3.311c4.96-4.251,7.424-6.295,9.226-6.295
    c1.339,0,2.712,1.213,5.102,3.762c4.121,4.396,7.461,6.355,10.833,6.355c2.713,0,5.311-1.296,7.942-3.962
    c3.104-3.145,5.701-5.239,8.285-5.239c2.116,0,4.441,1.421,7.317,4.473c2.638,2.8,5.674,4.219,9.022,4.219
    c4.835,0,8.991-2.959,11.27-5.728l0.086-0.104c1.809-2.2,3.237-3.938,5.312-3.938c2.208,0,5.271,1.942,9.359,5.936
    c0.54,0.743,3.552,4.674,6.86,4.674c1.37,0,2.559-0.65,3.531-1.932l0.203-0.268L116.279,55.814z M114.281,121.405
    c-0.526,0.599-1.096,0.891-1.734,0.891c-2.053,0-4.51-2.82-5.283-3.907l-0.116-0.136c-4.638-4.541-7.975-6.566-10.82-6.566
    c-3.021,0-4.884,2.267-6.857,4.667l-0.086,0.104c-1.896,2.307-5.582,4.999-9.725,4.999c-2.775,0-5.322-1.208-7.567-3.59
    c-3.325-3.528-6.03-5.102-8.772-5.102c-3.278,0-6.251,2.332-9.708,5.835c-2.236,2.265-4.368,3.366-6.518,3.366
    c-2.772,0-5.664-1.765-9.374-5.723c-2.488-2.654-4.29-4.395-6.561-4.395c-2.515,0-5.045,2.077-10.527,6.777
    c-2.727,2.337-4.426,2.828-5.37,2.828c-2.662,0-3.017-4.225-3.021-4.225l0.745-62.163c0.332-3.321,4.767-19.625,13.647-28.995
    c3.893-4.106,10.387-8.632,18.602-11.504c-0.458,0.503-0.744,1.165-0.744,1.898c0,1.565,1.269,2.833,2.833,2.833
    c1.564,0,2.833-1.269,2.833-2.833c0-1.355-0.954-2.485-2.226-2.764c4.419-1.285,9.269-2.074,14.437-2.074
    c7.636,0,15.336,1.684,22.887,5.004c26.766,11.771,29.011,39.047,29.027,39.251V121.405z"/>
    </svg>

        `;

    // Animation for Loading text
    let loading = document.querySelector(".loading");
    let letters = loading.textContent.split("");
    loading.textContent = "";
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.setProperty('--i', i + 1); // Set custom property for delay
      loading.append(span);
    });


    // 4 seconds after showing the ghost, begin fade-out animation
    setTimeout(() => {
      const preloader2 = document.getElementById('preloader2');
      preloader2.style.transition = 'opacity .5s';
      preloader2.style.opacity = 0;
      preloader1.style.display = 'none';

      // After the fade-out animation completes, hide preloader2 and enable scrolling
      setTimeout(() => {
        preloader2.style.display = 'none';

        // document.body.style.overflow = 'auto';
      }, 1000); // 4 seconds for fade-out

    }, 2000); // 4 seconds (Loading) + 4 seconds (ghost) = 8 seconds

  }, 4000); // Display preloader1 for 4 seconds











  function showPreloader() {




    // CSS styles


    // Display preloader1 for 4 seconds
    setTimeout(() => {


      // Disable scrolling

      // Function to prevent scrolling
      function preventScroll(event) {
        event.preventDefault();
      }

      document.getElementById('preloader3').style.display = 'flex';
      document.getElementById('preloader2').style.display = 'none';
      document.getElementById('preloader3').style.opacity = '100%';
      document.getElementById('preloader3').style.zIndex = '99999999';
      // const preloader1 = document.getElementById('preloader1');
      // preloader1.style.transition = 'opacity 2s';
      // preloader1.style.opacity = 0;


      // Add styles and fonts for preloader2
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);

      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Dosis:wght@500&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);

      // Add the modified HTML for preloader2
      document.getElementById('preloader3').innerHTML = `
          <div class="container">
            <div class="loading">Oxumağı <br> unutma.</div> 
          
      <svg class="ghost" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="127.433px" height="132.743px" viewBox="0 0 127.433 132.743" enable-background="new 0 0 127.433 132.743"
      xml:space="preserve">
      <path fill="#FFF6F4" d="M116.223,125.064c1.032-1.183,1.323-2.73,1.391-3.747V54.76c0,0-4.625-34.875-36.125-44.375
      s-66,6.625-72.125,44l-0.781,63.219c0.062,4.197,1.105,6.177,1.808,7.006c1.94,1.811,5.408,3.465,10.099-0.6
      c7.5-6.5,8.375-10,12.75-6.875s5.875,9.75,13.625,9.25s12.75-9,13.75-9.625s4.375-1.875,7,1.25s5.375,8.25,12.875,7.875
      s12.625-8.375,12.625-8.375s2.25-3.875,7.25,0.375s7.625,9.75,14.375,8.125C114.739,126.01,115.412,125.902,116.223,125.064z"/>
      <circle fill="#013E51" cx="86.238" cy="57.885" r="6.667"/>
      <circle fill="#013E51" cx="40.072" cy="57.885" r="6.667"/>
      <path fill="#013E51" d="M71.916,62.782c0.05-1.108-0.809-2.046-1.917-2.095c-0.673-0.03-1.28,0.279-1.667,0.771
      c-0.758,0.766-2.483,2.235-4.696,2.358c-1.696,0.094-3.438-0.625-5.191-2.137c-0.003-0.003-0.007-0.006-0.011-0.009l0.002,0.005
      c-0.332-0.294-0.757-0.488-1.235-0.509c-1.108-0.049-2.046,0.809-2.095,1.917c-0.032,0.724,0.327,1.37,0.887,1.749
      c-0.001,0-0.002-0.001-0.003-0.001c2.221,1.871,4.536,2.88,6.912,2.986c0.333,0.014,0.67,0.012,1.007-0.01
      c3.163-0.191,5.572-1.942,6.888-3.166l0.452-0.453c0.021-0.019,0.04-0.041,0.06-0.061l0.034-0.034
      c-0.007,0.007-0.015,0.014-0.021,0.02C71.666,63.771,71.892,63.307,71.916,62.782z"/>
      <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="18.614" cy="99.426" r="3.292"/>
      <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="95.364" cy="28.676" r="3.291"/>
      <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="24.739" cy="93.551" r="2.667"/>
      <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="101.489" cy="33.051" r="2.666"/>
      <circle fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" cx="18.738" cy="87.717" r="2.833"/>
      <path fill="#FCEFED" stroke="#FEEBE6" stroke-miterlimit="10" d="M116.279,55.814c-0.021-0.286-2.323-28.744-30.221-41.012
      c-7.806-3.433-15.777-5.173-23.691-5.173c-16.889,0-30.283,7.783-37.187,15.067c-9.229,9.736-13.84,26.712-14.191,30.259
      l-0.748,62.332c0.149,2.133,1.389,6.167,5.019,6.167c1.891,0,4.074-1.083,6.672-3.311c4.96-4.251,7.424-6.295,9.226-6.295
      c1.339,0,2.712,1.213,5.102,3.762c4.121,4.396,7.461,6.355,10.833,6.355c2.713,0,5.311-1.296,7.942-3.962
      c3.104-3.145,5.701-5.239,8.285-5.239c2.116,0,4.441,1.421,7.317,4.473c2.638,2.8,5.674,4.219,9.022,4.219
      c4.835,0,8.991-2.959,11.27-5.728l0.086-0.104c1.809-2.2,3.237-3.938,5.312-3.938c2.208,0,5.271,1.942,9.359,5.936
      c0.54,0.743,3.552,4.674,6.86,4.674c1.37,0,2.559-0.65,3.531-1.932l0.203-0.268L116.279,55.814z M114.281,121.405
      c-0.526,0.599-1.096,0.891-1.734,0.891c-2.053,0-4.51-2.82-5.283-3.907l-0.116-0.136c-4.638-4.541-7.975-6.566-10.82-6.566
      c-3.021,0-4.884,2.267-6.857,4.667l-0.086,0.104c-1.896,2.307-5.582,4.999-9.725,4.999c-2.775,0-5.322-1.208-7.567-3.59
      c-3.325-3.528-6.03-5.102-8.772-5.102c-3.278,0-6.251,2.332-9.708,5.835c-2.236,2.265-4.368,3.366-6.518,3.366
      c-2.772,0-5.664-1.765-9.374-5.723c-2.488-2.654-4.29-4.395-6.561-4.395c-2.515,0-5.045,2.077-10.527,6.777
      c-2.727,2.337-4.426,2.828-5.37,2.828c-2.662,0-3.017-4.225-3.021-4.225l0.745-62.163c0.332-3.321,4.767-19.625,13.647-28.995
      c3.893-4.106,10.387-8.632,18.602-11.504c-0.458,0.503-0.744,1.165-0.744,1.898c0,1.565,1.269,2.833,2.833,2.833
      c1.564,0,2.833-1.269,2.833-2.833c0-1.355-0.954-2.485-2.226-2.764c4.419-1.285,9.269-2.074,14.437-2.074
      c7.636,0,15.336,1.684,22.887,5.004c26.766,11.771,29.011,39.047,29.027,39.251V121.405z"/>
      </svg>
  
          `;

      // Animation for Loading text
      let loading = document.querySelector(".loading");
      let letters = loading.textContent.split("");
      loading.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.setProperty('--i', i + 1); // Set custom property for delay
        loading.append(span);
      });


      // 4 seconds after showing the ghost, begin fade-out animation
      setTimeout(() => {
        const preloader3 = document.getElementById('preloader3');
        preloader3.style.transition = 'opacity 1.4s';
        preloader3.style.opacity = 0;
        // preloader1.style.display = 'none';

        // After the fade-out animation completes, hide preloader2 and enable scrolling
        setTimeout(() => {
          preloader3.style.display = 'none';

          // document.body.style.overflow = 'auto';
        }, 2000); // 4 seconds for fade-out

      }, 1500); // 4 seconds (Loading) + 4 seconds (ghost) = 8 seconds

    }, 100); // Display preloader1 for 4 seconds

  }

  const userAgent = navigator.userAgent;
  const mobileAgents = ["Android", "iPhone"];
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








  let faqQuestions = document.querySelectorAll('.faq-question');


  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      let currentAnswer = this.nextElementSibling;

      // Close any currently open answers
      let openAnswer = document.querySelector('.faq-answertt.show');
      if (openAnswer && openAnswer !== currentAnswer) {
        openAnswer.classList.remove('show');
      }

      // Toggle current answer
      if (currentAnswer.classList.contains('show')) {
        currentAnswer.classList.remove('show');
      } else {
        currentAnswer.classList.add('show');
      }

      // Wait for the potential transition to finish before scrolling
      setTimeout(() => {
        if ('scrollBehavior' in document.documentElement.style) {
          question.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback for browsers that do not support `scrollBehavior`
          question.scrollIntoView();
        }

        // Function to smoothly scroll an element to the top of the viewport
        function smoothScrollToElement(el) {
          const yPos = el.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({ top: yPos, behavior: 'smooth' });
        }

        // Use this function in place of scrollIntoView
        smoothScrollToElement(question);
        window.scrollBy(0, -100);
      }, 1000); // Adjust the timeout to the duration of your CSS transitions if needed
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
    z-index:999;
    position: fixed;
    bottom: 30vh;
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
    z-index:999;
    width: 50px;
    height: 50px;
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
    animation: bounce 2s infinite;
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

    document.body.style.overflow = 'auto';

    document.body.classList.remove('no-scroll');
  }, 8000);
  //   ////////




  setTimeout(() => {
    window.addEventListener("scroll", handleScroll);
    document.head.appendChild(q);
  }, 13000);












  const jobRoles = [
    'Front-End Web Developer', 'Front-end Developer', 'Middle Front-End Developer', 'Middle Developer', 'FRONT-END PROQRAMÇI', 'Frontend Developer', 'Frontend Developer', 'Frontend developer', 'FRONT-END PROQRAMÇI', 'FrontEnd developer', 'FRONT END DEVELOPER', 'Front-end proqramçı', 'Front End Developer', 'Full Stack Web Developer', 'Full Stack Web Developer', 'Full Stack Developer', 'Frontend-Backend Developer', 'Developer full stack', 'Full stack proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Developer proqramistler (front, back, full, app)', 'Full stack proqramçi', 'Full stack developer', 'Full stack proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Back-end programçi', 'Full stack developer', 'Full-stack software developer', 'Full stack программист', 'Full stack veb proqramçi', 'Full stack proqramçi', 'Full-stack veb proqramçi', 'Full stack veb proqramçi', 'Full stack proqramçi', 'Full stack proqramçi', 'Full-stack proqramçi', 'Full-Stack Dev', 'Back end proqramçı', 'Back End proqramçı', 'Back-end developer', 'Back-end programçi', 'Back end developer', 'Full Stack Proqramçı', 'Full Stack Proqramçı', 'Full stack web developer', 'Full Stack Proqramçı', 'Full stack developer', 'Full Stack Developer', 'Full Stack Developer'
  ];

  const companyNames = [
    'Webzool', 'AT-Geotech', 'HRcell', 'CrinfoTask', 'eMotions', 'A2Z', 'NetTech', 'Flegrei studio', 'zipmend', 'Iktex', 'KNEXEL', 'TIM Consulting', 'Abyss', 'Webzool', 'GPS Solutions', 'VMF', 'Webzool', 'Media Balans', 'Prosys', 'AİSTGroup', 'ERA Team', 'Prosys', 'HackLab', 'Prosys', 'Veb Koder', 'Prior Leasing OJSC', 'One Studio', 'Qscepter', 'S2J İnc', 'Pizza Mizza', 'Qscepter', 'FİZZA', 'Limak', 'ELVA Group', 'Agile Solutions', 'GTSolutions', 'Zəfəran', 'dreams', 'Edunex', 'Azerimed', 'New Media', 'IT Solutions', 'New Media', 'CrinfoTask', 'Innovative Solution Center', 'Veb Koder', 'eiGroup', 'HajMa Group of Companies', 'Hutovska FOP', 'QəbulOL', 'Prosys', 'Datum', 'ERA', 'RAM Holding', 'MyNextFilm', 'Safaroff Agency'
  ];

  const salaryValues = [1700, 2000, 1800, 1200, 1000, 3500, 2000, 1000, 5000, 2500, 1200, 1100, 2000, 3500, 4000, 1500, 2400, 2000, 2000, 1000, 1100, 2000, 1100, 2500, 1500, 1500, 2600, 1500, 1500, 1500, 2500, 1100, 2000, 1500, 1700, 1500, 1500, 1400, 1500, 1000, 1700, 1000, 1500, 1800, 1500, 1000, 2000, 1500, 4000, 1000, 1700, 2200, 1900, 1500, 2000, 1000];




  function getCompanyData(index) {
    return {
      companyName: companyNames[index],
      jobRole: jobRoles[index],
      salary: salaryValues[index] + 'AZN'
    };
  }



  const style = `
  <style>
  .job {
    background-color: #f1f3f7;
    padding:0px  30px 30px;
    display: block;
    align-items: start;
    justify-content: center;
    color: #333;
    // max-height: 40vh; 
    overflow-y: auto;
  }
    form {
      width: 98%;
      max-width: 98vw;
      border-radius: 20px;
      background-color: #f1f3f7;
      box-shadow: 12px 12px 24px #d0d0d0, -12px -12px 24px #ffffff;
      display: flex;
      flex-direction: column;
    }
    
    table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
    }
    thead, tr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }
    td {
      padding: 16px 12px;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: wrap;
      flex: 1;
    }
  </style>
  `;


  const tableHTML = `
  ${style}
  <form>
    <section>
      <table>
        <thead>
          <tr>
            <td>Company Name</td>
            <td>Job Role</td>
            <td>Salary</td>
          </tr>
        </thead>
        <tbody>
          ${companyNames.map((_, index) => {
    const data = getCompanyData(index);
    return `
              <tr>
                <td>${data.companyName}</td>
                <td>${data.jobRole}</td>
                <td>${data.salary}</td>
              </tr>
            `;
  }).join('')}
        </tbody>
      </table>
    </section>
  </form>
  `;

  const jobDiv = document.querySelector('.job');
  jobDiv.innerHTML = tableHTML;



  document.querySelector('.cvv').addEventListener('click', function () {
    if (this.textContent === 'Sillabusu aç') {
      this.textContent = 'Sillabusu bağla';
    } else {
      this.textContent = 'Sillabusu aç';
    }
  });





  // Create and style the button
  const button = document.createElement("button");
  const buttonText = document.createElement("span");
  buttonText.innerText = "Vakansiyaları aç";
  buttonText.style.pointerEvents = "none";  // Ensure the text doesn't capture the click event
  button.appendChild(buttonText);
  button.id = "neuButton";
  button.addEventListener("click", toggleSection);

  // Combined events for both Desktop and Mobile
  button.addEventListener("pointerdown", function (event) {
    button.classList.add("pressed");
    event.preventDefault();
  });
  button.addEventListener("pointerup", function () {
    button.classList.remove("pressed");
  });

  document.body.appendChild(button);

  // Add the button to the top of the 'personSection'
  const personSection = document.getElementById("job");
  if (personSection) {
    personSection.prepend(button);
    personSection.classList.add("js-animated-section");
  }

  const style1 = document.createElement("style");
  style1.innerHTML = `
      #neuButton {
          display: block;
          position: relative;
          z-index: 999;
          margin: 40px auto;
          background-color: #f1f3f7;
          color: #333;
          border: none;
          padding: 15px 30px;
          border-radius: 15px;
          font-size: 16px;
          box-shadow: 5px 5px 8px #babecc, -5px -5px 8px #ffffff;
          transition: transform 0.2s;
      }
      
      #neuButton {
        pointer-events: auto; // Ensure the button responds to pointer events
    }
    
    #neuButton * {
        pointer-events: none; // Ensure child elements (like text) don't capture the event instead of the button
    }
      #job.js-animated-section.show {
          opacity: 1;
          height: 60vh;  // Assuming this height is enough for the content; adjust if necessary
          overflow: visible;
          transition: opacity 5s,height 3s;
      }
  
      #job.js-animated-section:not(.show) {
          
        height: 200px;
          overflow: hidden;
          transition: opacity 1s, height 1s;
      }
  `;
  document.body.appendChild(style1);

  function toggleSection() {
    console.log("Button clicked");
    if (personSection) {
      if (personSection.classList.contains("show")) {
        personSection.classList.remove("show");
      } else {
        personSection.classList.add("show");
        setTimeout(() => {
          scrollIndicator.style.opacity = 1;
          window.addEventListener("scroll", handleScroll);
        }, 1000);

      }
    }
  }

  document.querySelector('#neuButton').addEventListener('click', function () {
    if (this.textContent === 'Vakansiyaları aç') {
      this.textContent = 'Vakansiyaları bağla';
    } else {
      this.textContent = 'Vakansiyaları aç';
    }
  });


  /////////////////



  const styles66 = `
  .kk {
      background-color: #f1f3f7;
      color: #333;
      display: flex;
      padding: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  
  .cvv {
      margin-top:50px;
      text-align: center;
      max-width: 160px;
      cursor: pointer;
      background-color: #f1f3f7;
      color: #333;
      border: none;
      padding: 14px 20px;
      border-radius: 15px;
      font-size: 16px;
      margin-bottom: 10px;
      box-shadow: 5px 5px 8px #babecc, -5px -5px 8px #ffffff;
      transition: opacity 1s ease;
  }
  
  .h2-group, .h3-group {
      box-shadow: 5px 5px 8px #babecc, -5px -5px 8px #ffffff;
      transition: opacity 1s ease;
      opacity: 0;
      margin: 15px 0;
      border-radius: 15px;
  }
  
  .h2-group {
    padding: 16px;
  }
  
  
  .h3-group h3 {
      margin: 16px  0 ;
  }

  .h3-group {
    padding: 15px 0 15px;
  }
  
  .aa {
      transition: height 1s ease, padding 1s ease, margin 1s ease;
      overflow: hidden;
      height:150px;
  }
  
  .expanded {
      height: 1418px;
  }
  
  .kk-padding {
      padding: 0 40px 50px 40px;
  }
  
  .visible {
      opacity: 1;
  }
  
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles66;
  document.head.appendChild(styleSheet);

  let touched = false;

  function toggleContent(event) {
    if (event.type === 'touchstart') {
      touched = true;
    }

    if (event.type === 'click' && touched) {
      return; // if it's a click event following a touch event, don't execute
    }

    const aaElement = document.querySelector(".aa");
    const kkElement = document.querySelector(".kk");
    const h2Groups = document.querySelectorAll(".h2-group");
    const h3Groups = document.querySelectorAll(".h3-group");

    if (aaElement.classList.contains("expanded")) {
      aaElement.classList.remove("expanded");
      setTimeout(() => {

        kkElement.classList.remove("kk-padding");
      }, 400);
      h2Groups.forEach(group => group.classList.remove("visible"));
      h3Groups.forEach(group => group.classList.remove("visible"));

      setTimeout(() => {
        aaElement.classList.remove("expanded");
        setTimeout(() => {

          kkElement.classList.remove("kk-padding");
        }, 400);
        h2Groups.forEach(group => group.classList.remove("visible"));
        h3Groups.forEach(group => group.classList.remove("visible"));
      }, 19000);
    } else {
      aaElement.classList.add("expanded");
      kkElement.classList.add("kk-padding");
      h2Groups.forEach(group => group.classList.add("visible"));
      h3Groups.forEach(group => group.classList.add("visible"));
    }
  }

  document.querySelector(".cvv").addEventListener("touchstart", toggleContent);
  document.querySelector(".cvv").addEventListener("click", toggleContent);




















  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 5000);



  (function () {
    let touchStartPosition = null;
    let touchEndPosition = null;
    let startTime = null;
    let isLocked = false;
    let initialScrollPosition = null;  // Store the initial scroll position

    function onTouchStart(e) {
      touchStartPosition = e.touches[0].clientY;
      startTime = new Date().getTime();
      initialScrollPosition = window.scrollY;  // Save the scroll position at touch start
    }

    function onTouchMove(e) {
      if (touchStartPosition !== null) {
        touchEndPosition = e.touches[0].clientY;
        let elapsedTime = new Date().getTime() - startTime;
        let traveledDistance = Math.abs(touchEndPosition - touchStartPosition);
        let speed = traveledDistance / elapsedTime;

        if (speed > 3 && !isLocked) {
          // Prevent the default scrolling behavior
          e.preventDefault();

          document.body.style.overflow = 'hidden';
          isLocked = true;
          showPreloader();
          setTimeout(() => {

            window.scrollTo(0, initialScrollPosition);
          }, 1000);
          setTimeout(function () {
            window.scrollTo(0, initialScrollPosition);

            setTimeout(() => {
              isLocked = false;

              document.body.style.overflow = 'auto';
            }, 1000);
          }, 2000);
        }
      }
    }

    function onTouchEnd() {
      touchStartPosition = null;
      touchEndPosition = null;
      startTime = null;
    }

    function onWheel(e) {
      if (isLocked) {
        // Prevent the default scrolling behavior
        e.preventDefault();
      }
    }

    setTimeout(function () {
      window.addEventListener('touchstart', onTouchStart, false);
      window.addEventListener('touchmove', onTouchMove, false);
      window.addEventListener('touchend', onTouchEnd, false);
      window.addEventListener('wheel', onWheel, false);
    }, 9000);
  })();
});

function clearAllSiteData() {
  // Clear cookies
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }

  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();

  // If you want to clear cache using Service Workers, you need to implement it separately.
  // This is more complicated and requires setting up a Service Worker.
  // Leaving this out for now.
}