// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeDragDrop();

    UI.elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('fileInput');
        const jobTitle = document.getElementById('jobTitle').value;
        const company = document.getElementById('company').value;

        if (!fileInput.files[0] || !jobTitle || !company) {
            UI.showError('Please fill in all fields and upload a resume');
            return;
        }

        try {
            UI.showLoading();
            
            const resumeText = await extractTextFromPDF(fileInput.files[0]);
            const coverLetter = await generateCoverLetter(resumeText, jobTitle, company);
            
            UI.showResult(coverLetter);
        } catch (err) {
            UI.showError(err.message);
        } finally {
            UI.hideLoading();
        }
    });
});