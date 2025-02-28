// Generate cover letter using Gemini API
// Generate cover letter using Gemini API
async function generateCoverLetter(resumeText) {
    try {
        const prompt1 = `You have to behave as an ats score checker and rate this resume out of 100. 
        return only in this format:(Dont give text in bold or italics)
        score_here/100
        Resume content:
        ${resumeText}`;

        const prompt2 = `Analyze this resume and based on it give suggestions on how one can improve it (make sure that I have given you text only, so don't give suggestions on the structure and format because you can't see it).(Dont give text in bold or italics)
        
        Give in this format:
        Suggestions(give 5):
        (space)
        1. ..
        2. ..
        so on
        
        Resume content:
        ${resumeText}`;

        // Make both fetch calls concurrently
        const [response1, response2] = await Promise.all([
            fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt1 }] }] })
            }),
            fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt2 }] }] })
            })
        ]);

        // Check if both responses are OK
        if (!response1.ok || !response2.ok) {
            throw new Error('Failed to generate content');
        }

        document.querySelector(".card").style.display = "none";
        document.querySelector(".ats-score-hero").style.display = "none";

        // Parse JSON responses
        const data1 = await response1.json();
        const data2 = await response2.json();

        // Ensure response format is correct
        return {
            atsScore: data1.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No ATS score received",
            suggestions: data2.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No suggestions received"
        };
    } catch (error) {
        console.error('AI generation error:', error);
        throw new Error('Failed to generate ATS score and suggestions. Please try again.');
    }
}
