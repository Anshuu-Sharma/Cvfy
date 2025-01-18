// Generate cover letter using Gemini API
async function generateCoverLetter(resumeText, jobTitle, company) {
    try {
        const prompt = `Based on the following resume, create a professional cover letter for a ${jobTitle} position at ${company}. 
        Make it engaging, highlight relevant experience, and keep it under 400 words.
        
        Resume content:
        ${resumeText}`;

        const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate cover letter');
        }
        document.querySelector(".card").style.display = "none";
        document.querySelector(".ats-score-hero").style.display = "none";
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('AI generation error:', error);
        throw new Error('Failed to generate cover letter. Please try again.');
    }
}