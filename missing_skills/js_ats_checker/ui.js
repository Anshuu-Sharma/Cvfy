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

        return `(${links.join(',  ')})`; // Reassemble links inside parentheses
    });
}

const UI = {
    elements: {
        form: document.getElementById('coverLetterForm'),
        submitBtn: document.getElementById('submitBtn'),
        btnText: document.querySelector('.btn-text'),
        loader: document.querySelector('.loader'),
        error: document.getElementById('error'),
        result: document.getElementById('result'),
        userSkills: document.getElementById('userSkills'),
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
    showMissingSkills(missingSkills) {
        this.elements.result.hidden = false;
        this.elements.missingSkills.innerHTML = makeLinksClickable(missingSkills);
    },
    showUserSkills(userSkills){
        this.elements.result.hidden = false;
        this.elements.userSkills.innerHTML = makeLinksClickable(userSkills);
    }
};