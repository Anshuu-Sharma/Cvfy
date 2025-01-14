import { COMMON_KEYWORDS } from './keywords.js';

export function analyzeResume(text) {
  document.querySelector(".ats-drop-zone").style.display = "none";
  const content = text.toLowerCase();
  const matches = COMMON_KEYWORDS.filter(keyword => content.includes(keyword));
  const score = Math.round((matches.length / COMMON_KEYWORDS.length) * 100);

  return { score, matches };
}

export function getScoreClass(score) {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
}