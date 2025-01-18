// Generate cover letter using Gemini API
// Generate cover letter using Gemini API
async function generateCoverLetter(resumeText, jobTitle, company) {
    try {
        const prompt1 = `Analyze this resume and return missing skills (that are not in the resume) based on the job title: ${jobTitle} and company: ${company}. You must also provide learning resources for each skill.

### **Strict Formatting Rules (Follow Exactly):**
1 **Provide at least 10 missing skills.**  
2 **Format the output exactly as follows (without extra text or explanation):**

Missing skills:
1. Skill_Name1: (<paste her the link1>, <paste here the  link 2>)
2. Skill_Name2: (<paste her the link1>, <paste here the  link 2>)
...
10. Skill_Name10: (<paste her the link1>, <paste here the  link 2>)

### **Important Instructions:**
- Ensure the links are correct and doesnt give 404 errors and relevant to the missing skills.
- Do NOT add extra text, explanations, or descriptions.
- Do NOT repeat "https://" twice in the links.
- Do NOT add skill variations in parentheses (e.g., avoid "https://Git or Mercurial").
- Do NOT output bold or formatted text.
- Ensure proper JSON-friendly structure.
- Do NOT include any unnecessary bullet points or list formats.
- The response must be **structured, clean, and formatted exactly as instructed.**

Resume content:
${resumeText}`;

        // Make both fetch calls concurrently
        const response1 = await (
            fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt1 }] }] })
            })
        );

        // Check if both responses are OK
        if (!response1.ok) {
            throw new Error('Failed to generate content');
        }

        document.querySelector(".card").style.display = "none";
        document.querySelector(".ats-score-hero").style.display = "none";

        // Parse JSON responses
        const data1 = await response1.json();

        // Ensure response format is correct
        return data1.candidates?.[0]?.content?.parts?.[0]?.text;
    
    } catch (error) {
        console.error('AI generation error:', error);
        throw new Error('Failed to generate Missing Skills. Please try again.');
    }
}