document.addEventListener("DOMContentLoaded", function () {
    const funFacts = [
        `"Sharma Ji ka Beta Approved" ✅ – CVFY makes sure your resume is so perfect that even Sharma Ji’s beta would be like, "Bhai, yeh toh next level hai!"`,
        `"No More Uncle-Approved Resume Advice" 😤 – You don’t need uncles telling you, "Beta, resume mein 'hardworking' likho!" CVFY actually knows what works.`,
        `"Ek Dum Tandoori Resume" 🔥 – Your old resume was like bland khichdi, but after CVFY, it’s a full spicy tandoori platter—crispy, flavorful, and recruiter-approved!`,
        `"ATS = Aapka Toh Selection?" 🤔 – Think of the ATS as a tough sanskari rishta aunty, rejecting everyone. CVFY helps your resume pass all the sanskari filters.`,
        `"Chatty = Career Ka Bollywood Sidekick" 🎬 – Chatty is like Circuit to your Munna Bhai, Tuffy to your Hum Aapke Hain Koun, guiding you through your job hunt with full desi dedication.`,
        `"Indian Moms Would Love CVFY" 👩‍👦 – Imagine telling your mom, "Maa, CVFY ne bola ki mera resume perfect hai!"—She will finally stop saying "Beta, kuch aur try kar le na?" 😆`,
        `"Garam Chai & Perfect Resume = Best Combo" ☕ – Just like how a cutting chai wakes you up, CVFY wakes up your dead resume and makes it job-ready!`,
        `"CVFY is Like Jugaad for Your Career" 🛠️ – Why struggle to write resumes manually when CVFY is here? Jugaad lagao, cover letter banwao, aur aish karo!`,
        `"Recruiters Be Like ‘Ye Ladka Toh ChatGPT Use Karta Hai’" 😎 – With CVFY fixing your resume, recruiters will wonder if you secretly have an AI-powered Buddha brain for job applications!`,
        `"Missing Skills? Like Masala Missing in Biryani!" 🍛 – CVFY finds your missing skills faster than Indians find a lack of spice in foreign food and immediately suggests the perfect recipe to fix it!`
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
        delay: 5.5,
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
