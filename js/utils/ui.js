import { getScoreClass } from './resumeAnalyzer.js';

export function updateUI(results, elements) {
  const { score, matches } = results;
  
  elements.score.textContent = `${score}%`;
  elements.score.className = `ats-score ${getScoreClass(score)}`;
  
  elements.keywords.innerHTML = matches
    .map(keyword => `<span class="keyword-chip">${keyword}</span>`)
    .join('');

  elements.loading.style.display = 'none';
  elements.results.style.display = 'block';
}