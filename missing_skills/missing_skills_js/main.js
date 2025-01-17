    // Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeDragDrop();
    const roadmapBtn = document.getElementById("roadmapBtn");
    if (!roadmapBtn) {
    console.error("Element #roadmapBtn not found.");
}
    const roadmapContainer = document.getElementById("roadmap-container");
    const roadmapClose = document.getElementById("roadmapClose");
    UI.elements.form.addEventListener('submit', async (e) => {
        roadmapBtn.style.display = "block";
        e.preventDefault();

        const fileInput = document.getElementById('fileInput');
        const jobTitle = document.getElementById('jobTitle').value;
        const company = document.getElementById('company').value;

        if (!fileInput.files[0]) {
            UI.showError('Please upload a resume');
            return;
        }

        try {
            UI.showLoading();
            
            const resumeText = await extractTextFromPDF(fileInput.files[0]);
            const missingSkills = await generateCoverLetter(resumeText, jobTitle, company);
            
            UI.showMissingSkills(missingSkills);
            
        } catch (err) {
            UI.showError(err.message);
        } finally {
            UI.hideLoading();
        }
    });
    roadmapBtn.addEventListener("click", () =>{
        roadmapClose.style.display = "block";
        roadmapContainer.style.display = "flex";
    });
    roadmapClose.addEventListener("click", () =>{
        roadmapContainer.style.display = "none";
        roadmapClose.style.display = "none";
    });
});