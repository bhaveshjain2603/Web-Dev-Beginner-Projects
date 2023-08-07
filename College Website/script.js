function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

var clutter = "";

document.querySelector("#page2>h3").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`

    document.querySelector("#page2>h3").innerHTML = clutter;
})


gsap.to("#page2>h3>span",{
  scrollTrigger:{
      trigger:`#page2>h3>span`,
      start:`top bottom`,
      end:`bottom top`,
      scroller:`#main`,
      scrub:.5,
  },
  stagger:.2,
  color:`yellow`
})


// function canvas(){
//   const canvas = document.querySelector("#page3>canvas");
//   const context = canvas.getContext("2d");

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;


// window.addEventListener("resize", function () {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   render();
// });

// function files(index) {
//   var data = `
//     ./4-Innovation.jpg
//     ./36th-Induction.jpg
//     ./37th-Induction-Program-Invite.jpg
//     ./Aerodrone.jpg
//     ./almn.jpg
//     ./CET-2023-Winners.jpg
//     ./CET-Banner-2022.jpg
//     ./chancellor.jpg
//     ./covid19.jpg
//     ./EduSkills.jpg
//     ./Gold-Rush-2022.jpg
//     ./IIC.jpg
//     ./ME-Banner.jpg
//     ./Microsoft-Learn.jpg
//     ./Naac-Banner.jpg
//     ./NAAC-Certificate.jpg
//     ./Project-Expo.jpg
//     ./PTM.jpg
//     ./Qspider.jpg
//     ./rank-holder-2023.jpg
//     ./RatingCertificate_2021-2022.jpg
//     ./Super30.jpg
//     ./Thriveni-EarthM.jpg
//     ./VTU-Rank9.jpg
//     ./VTU.jpg
//     ./YouthEmpowerment.jpg
//     `;
//   return data.split("\n")[index];
// }

// const frameCount = 26;
// const images = [];
// const imageSeq = {
//   frame: 1,
// };

// for (let i = 0; i < frameCount; i++) {
//   const img = new Image();
//   img.src = files(i);
//   images.push(img);
// }

// gsap.to(imageSeq, {
//   frame: frameCount - 1,
//   snap: "frame",
//   ease: `none`,
//   scrollTrigger: {
//   scrub: .5,
//   trigger: `#page3`,
//   start: `top top`,
//   end: `150% top`,
//   scroller: `#main`,
// },
// onUpdate: render,
// });

// images[1].onload = render;

// function render() {
//   scaleImage(images[imageSeq.frame], context);
// }

// function scaleImage(img, ctx) {
// var canvas = ctx.canvas;
// var hRatio = canvas.width / img.width;
// var vRatio = canvas.height / img.height;
// var ratio = Math.max(hRatio, vRatio);
// var centerShift_x = (canvas.width - img.width * ratio) / 2;
// var centerShift_y = (canvas.height - img.height * ratio) / 2;
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// ctx.drawImage(
//   img,
//   0,
//   0,
//   img.width,
//   img.height,
//   centerShift_x,
//   centerShift_y,
//   img.width * ratio,
//   img.height * ratio
// );
// }
// ScrollTrigger.create({

//   trigger: "#page3",
//   pin: true,
//   scroller: `#main`,
//   start: `top top`,
//   end: `100% top`,
// });
// }
// canvas()

// Chatbot

// Image slider
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);


// Departments
var swiper = new Swiper(".slide-content", {
  slidesPerView: 4,
  centeredSlides: true,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// Chatbot in website
// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");
// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");

// let userMessage = null; // Variable to store user's message
// const API_KEY = "https://drttit.netlify.app/"; // Paste your API key here
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
//     // Create a chat <li> element with passed message and className
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", `${className}`);
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi; // return chat <li> element
// }

// const generateResponse = (chatElement) => {
//     const API_URL = "https://drttit.netlify.app/";
//     const messageElement = chatElement.querySelector("p");

//     // Define the properties and message for the API request
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [{role: "user", content: userMessage}],
//         })
//     }

//     // Send POST request to API, get response and set the reponse as paragraph text
//     fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
//         messageElement.textContent = data.choices[0].message.content.trim();
//     }).catch(() => {
//         messageElement.classList.add("error");
//         messageElement.textContent = "Oops! Something went wrong. Please try again.";
//     }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// }

// const handleChat = () => {
//     userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
//     if(!userMessage) return;

//     // Clear the input textarea and set its height to default
//     chatInput.value = "";
//     chatInput.style.height = `${inputInitHeight}px`;

//     // Append the user's message to the chatbox
//     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//     chatbox.scrollTo(0, chatbox.scrollHeight);
    
//     setTimeout(() => {
//         // Display "Thinking..." message while waiting for the response
//         const incomingChatLi = createChatLi("Thinking...", "incoming");
//         chatbox.appendChild(incomingChatLi);
//         chatbox.scrollTo(0, chatbox.scrollHeight);
//         generateResponse(incomingChatLi);
//     }, 600);
// }

// chatInput.addEventListener("input", () => {
//     // Adjust the height of the input textarea based on its content
//     chatInput.style.height = `${inputInitHeight}px`;
//     chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//     // If Enter key is pressed without Shift key and the window 
//     // width is greater than 800px, handle the chat
//     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//         e.preventDefault();
//         handleChat();
//     }
// });

// sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));