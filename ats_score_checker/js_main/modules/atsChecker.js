import { COMMON_KEYWORDS } from '../utils/keywords.js';
import { handleDragAndDrop } from '../utils/dragDrop.js';
import { analyzeResume } from '../utils/resumeAnalyzer.js';
import { updateUI } from '../utils/ui.js';

export function initializeAtsChecker() {
  const elements = {
    dropZone: document.getElementById('ats-drop-zone'),
    fileInput: document.getElementById('ats-file-input'),
    loading: document.getElementById('ats-loading'),
    results: document.getElementById('ats-results'),
    score: document.getElementById('ats-score'),
    keywords: document.getElementById('ats-keywords')
  };

  handleDragAndDrop(elements);

  elements.fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      processFile(e.target.files[0], elements);
    }
  });
}

function processFile(file, elements) {
  if (file.type !== 'application/pdf') {
    alert('Please upload a PDF file');
    return;
  }

  elements.loading.style.display = 'flex';
  elements.results.style.display = 'none';

  const reader = new FileReader();
  reader.onload = (e) => {
    const results = analyzeResume(e.target.result);
    updateUI(results, elements);
  };
  reader.readAsText(file);
}