document.addEventListener("DOMContentLoaded", function () {
    const funFacts = [
        `"Sharma Ji ka Beta Who?" 🤡 – Your resume is so perfect even Sharma Ji’s beta is jealous!`,
        `"Uncle’s Gyaan" 😤 – "Beta, thoda ‘hardworking’ likho!" Nah, we’re writing ‘Job-ready genius’ now.`,
        `"Resume itna strong ho gaya, ab toh job ki jagah usse marriage proposal milna chahiye!" 💍`,
        `"ATS = Aapka Toh Selection?" 🤔 – CVFY helps you pass the sanskari rishta aunty of job portals.`,
        `"Chatty = Job Guru" 🎬 – "Tension mat le, jaise Munna Bhai ka Circuit, waise Chatty apna career sidekick!"`,
        `"CVFY: Because every Indian mom deserves to hear, 'Beta, tumhara resume perfect hai!' instead of 'Aur kuch try kar lo?'" 😄`,
        `"Chai for Your Resume" ☕ – CVFY wakes up your dead resume faster than adrak wali chai!`,
        `"CVFY: Career ka Jugaad – resume aur cover letter ka tension gaya, ab bas success ki taraf badho!" 🚀`,
        `"Recruiters Be Like…" 🤯 – "Yeh banda kuch toh special hai, ya phir ChatGPT ka distant cousin?"`,
        '"Missing Skills? Jaise Paas Ghar Ki Chhoti Chhat!" 🏠 – "CVFY finds your missing skills like a desi mom finds missing socks!"'
    ]

    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]
    const factElement = document.getElementById('funnyfacts');
    if(factElement){
        factElement.innerHTML = randomFact
    }
    else{
        console.log("Element not found")
    }

    const counter3 = document.querySelector(".counter-3");
    
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = j;
            counter3.appendChild(div);
        }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
        const numHeight = counter.querySelector(".num").clientHeight;
        const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;
        gsap.to(counter, {
            y: -totalDistance,
            duration: duration,
            delay: delay,
            ease: "power2.inOut",
        });
    }

    // Start the animation
    animate(counter3, 5);
    animate(document.querySelector(".counter-2"), 5);
    animate(document.querySelector(".counter-1"), 2, 3);

    gsap.to(".digit", {
        top: "-150px",
        stagger: { amount: 0.25 },
        delay: 6,
        duration: 1,
        ease: "power4.inOut",
    });

    gsap.from(".loader-1", {
        width: 0,
        duration: 6,
        ease: "power2.inOut",
    });

    gsap.from(".loader-2", {
        width: 0,
        delay: 1.9,
        duration: 2,
        ease: "power2.inOut",
    });

    gsap.to(".loader", {
        background: "none",
        delay: 6,
        duration: 0.1,
    });

    gsap.to(".loader-1", {
        rotate: 90,
        y: -50,
        duration: 0.5,
        delay: 6,
    });

    gsap.to(".loader-2", {
        x: -75,
        y: 75,
        duration: 0.5,
    }, "<");

    gsap.to('.loader', {
        scale: 40,
        duration: 1,
        delay: 7,
        ease: "power2.inOut"
    });

    gsap.to('.loader', {
        rotate: 45,
        y: 500,
        x: 2000,
        duration: 1,
        delay: 7,
        ease: "power2.inOut",
    });

    // Hide the loading screen with a smooth fade-out transition
    gsap.to(".loading-screen", {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power1.inOut",
        onComplete: function () {
            document.querySelector(".loading-screen").style.display = "none";

            // Show main container and chatbot
            document.querySelector("#main_container").style.display = "flex";


            // Fade-in animation for both
            gsap.from(["#main_container"], { 
                opacity: 0, 
                duration: 1, 
                ease: "power2.inOut" 
            });
        }
    });
});
