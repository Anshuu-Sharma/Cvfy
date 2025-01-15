// UI state management
const UI = {
    elements: {
        form: document.getElementById('coverLetterForm'),
        submitBtn: document.getElementById('submitBtn'),
        btnText: document.querySelector('.btn-text'),
        loader: document.querySelector('.loader'),
        error: document.getElementById('error'),
        result: document.getElementById('result'),
        coverLetter: document.getElementById('coverLetter'),
        suggestions: document.getElementById('suggestions'),
        missingSkills: document.getElementById('missingSkills')
    },

    showLoading() {
        this.elements.submitBtn.disabled = true;
        this.elements.btnText.hidden = true;
        this.elements.loader.hidden = false;
        this.elements.error.textContent = '';
    },

    hideLoading() {
        this.elements.submitBtn.disabled = false;
        this.elements.btnText.hidden = false;
        this.elements.loader.hidden = true;
    },

    showError(message) {
        this.elements.error.textContent = message;
        this.elements.result.hidden = true;
    },

    showResult(coverLetter) {
        this.elements.result.hidden = false;
        this.elements.coverLetter.textContent = coverLetter;
    },
    showSuggestions(suggestions) {
        this.elements.result.hidden = false;
        this.elements.suggestions.textContent = suggestions;
    },
    showMissingSkills(missingSkills) {
        this.elements.result.hidden = false;
        this.elements.missingSkills.textContent = missingSkills;
    }
};