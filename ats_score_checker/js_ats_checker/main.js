    // Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeDragDrop();
    
    UI.elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('fileInput');


        if (!fileInput.files[0]) {
            UI.showError('Please upload a resume');
            return;
        }

        try {
            UI.showLoading();
            
            const resumeText = await extractTextFromPDF(fileInput.files[0]);
            const { atsScore, suggestions } = await generateCoverLetter(resumeText);
            
            UI.showResult(atsScore);
            UI.showSuggestions(suggestions);
        } catch (err) {
            UI.showError(err.message);
        } finally {
            UI.hideLoading();
        }
    });
});