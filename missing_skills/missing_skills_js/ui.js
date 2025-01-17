// UI state management
function makeLinksClickable(text) {
    return text.replace(/\(([^)]+)\)/g, (match, urls) => {
        // Split multiple URLs separated by commas
        const links = urls.split(',').map(url => {
            let clickableUrl = url.trim();
            if (!clickableUrl.startsWith("http")) {
                clickableUrl = " https://" + clickableUrl;
            }
            return `<a href="${clickableUrl}" target="_blank">${clickableUrl}</a>`;
        });
        return `(${links.join(',')})`; // Reassemble links inside parentheses
    });
}
function extractSkillsWithLinks(text) {
    const skillMap = {};  // Object to store key-value pairs

    // Regular expression to match skills and links in the format: "Skill (link1, link2)"
    const regex = /(.*?)\s*\(([^)]+)\)/g;
    
    let match;
    while ((match = regex.exec(text)) !== null) {
        const skill = match[1].trim();  // Extract skill name
        const links = match[2].split(',').map(url => url.trim()); // Extract links and trim spaces
        
        skillMap[skill] = links;  // Store in key-value format
    }

    return skillMap;
}
// const roadmapCreator = (roadmapData) => {
//     const missingSkillsRoadmap = [
//         { name: "Data Structures & Algorithms", links: [
//             "https://www.coursera.org/learn/data-structures-optimizing-performance",
//             "https://www.tutorialspoint.com/data_structures_algorithms/"
//         ]},
//         { name: "Operating Systems", links: [
//             "https://www.coursera.org/specializations/operating-systems",
//             "https://www.tutorialspoint.com/operating_system/"
//         ]},
//         { name: "Cloud Computing", links: [
//             "https://www.coursera.org/specializations/google-cloud",
//             "https://www.tutorialspoint.com/amazon_web_services/"
//         ]}
//     ];

//     const roadmapContainer = document.getElementById('roadmapContainer');

//     missingSkillsRoadmap.forEach((skill, index) => {
//         // Create skill node
//         const skillElement = document.createElement('div');
//         skillElement.classList.add('skill');
//         skillElement.innerText = skill.name;
//         skillElement.setAttribute('data-index', index);
//         roadmapContainer.appendChild(skillElement);

//         // Add connectors (except last node)
//         if (index < missingSkills.length - 1) {
//             const connector = document.createElement('div');
//             connector.classList.add('connector');
//             roadmapContainer.appendChild(connector);
//         }

//         // Create hidden link box
//         const linkBox = document.createElement('div');
//         linkBox.classList.add('link-box');
//         linkBox.innerHTML = skill.links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join('');
//         skillElement.appendChild(linkBox);

//         // Toggle link box on click
//         skillElement.addEventListener('click', () => {
//             document.querySelectorAll('.link-box').forEach(box => box.style.display = 'none'); // Hide all other boxes
//             linkBox.style.display = linkBox.style.display === 'block' ? 'none' : 'block';
//         });
//     });
// }
const UI = {
    elements: {
        form: document.getElementById('coverLetterForm'),
        submitBtn: document.getElementById('submitBtn'),
        btnText: document.querySelector('.btn-text'),
        loader: document.querySelector('.loader'),
        error: document.getElementById('error'),
        result: document.getElementById('result'),
        userSkills: document.getElementById('userSkills'),
        missingSkills: document.getElementById('missingSkills'),
        roadmapBtn: document.getElementById("roadmapBtn")
    },

    showLoading() {
        this.elements.submitBtn.disabled = true;
        this.elements.roadmapBtn.disabled = true;
        this.elements.btnText.hidden = true;
        this.elements.loader.hidden = false;
        this.elements.error.textContent = '';
    },

    hideLoading() {
        this.elements.submitBtn.disabled = false;
        this.elements.roadmapBtn.disabled = false;
        this.elements.btnText.hidden = false;
        this.elements.loader.hidden = true;
    },

    showError(message) {
        this.elements.error.textContent = message;
        this.elements.result.hidden = true;
    },
    showMissingSkills(missingSkills) {
        this.elements.result.hidden = false;
        this.elements.missingSkills.innerHTML = makeLinksClickable(missingSkills);
        const roadmapData = extractSkillsWithLinks(missingSkills);
        generateRoadmap(roadmapData);
        console.log(roadmapData);
        
    }
};