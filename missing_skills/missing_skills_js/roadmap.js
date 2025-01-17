function generateRoadmap(skillsMap) {
    const roadmapContainer = document.getElementById('roadmapContainer');
    roadmapContainer.innerHTML = ""; // Clear previous content

    // Convert the object into an array of objects
    const skillsArray = Object.entries(skillsMap).map(([name, links]) => ({ name, links }));

    skillsArray.forEach((skill, index) => {
        // Create skill node
        const skillElement = document.createElement('div');
        skillElement.classList.add('skill');
        skillElement.innerText = skill.name;
        skillElement.setAttribute('data-index', index);
        roadmapContainer.appendChild(skillElement);

        // Add connectors (except last node)
        if (index < skillsArray.length - 1) {
            const connector = document.createElement('div');
            connector.classList.add('connector');
            roadmapContainer.appendChild(connector);
        }

        // Create hidden link box
        const linkBox = document.createElement('div');
        linkBox.classList.add('link-box');
        linkBox.innerHTML = skill.links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join('<br>');
        skillElement.appendChild(linkBox);

        // Toggle link box on click
        skillElement.addEventListener('click', () => {
            document.querySelectorAll('.link-box').forEach(box => box.style.display = 'none'); // Hide all other boxes
            linkBox.style.display = linkBox.style.display === 'block' ? 'none' : 'block';
        });
    });
}