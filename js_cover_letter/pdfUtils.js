// Load PDF.js dynamically
const pdfjsScript = document.createElement('script');
pdfjsScript.src = CONFIG.PDF_CDN;
document.head.appendChild(pdfjsScript);

// Initialize PDF.js when loaded
pdfjsScript.onload = () => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = CONFIG.PDF_WORKER_CDN;
};

// Extract text from PDF file
async function extractTextFromPDF(file) {
    try {
        if (typeof pdfjsLib === 'undefined') {
            throw new Error('PDF.js is still loading. Please try again.');
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + ' ';
        }

        return fullText.trim();
    } catch (error) {
        console.error('Error extracting PDF text:', error);
        throw new Error('Failed to extract text from PDF. Please try again.');
    }
}