// Generate cover letter using Gemini API
// Generate cover letter using Gemini API
async function generateCoverLetter(resumeText, jobTitle, company) {
    try {
        const prompt1 = `Analyze this resume and based on it return missing skills(that arern't in the resume) based on the jobtitle:${jobTitle} and company:${company}. by job title and company you have to tell the required skills that are missing in my resume with the resources where i can learn that particular skill
        give answer in this format only:
        Missing skills:(give atleast 10 skills)
        1. missing_skill1
        (link for resource1,link for resource2 so on)
        2. missing_skill2
        (link for resource1,link for resource2 so on)
        ....so on
        
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

        document.querySelector("#coverLetterForm").style.display = "none";

        // Parse JSON responses
        const data1 = await response1.json();

        // Ensure response format is correct
        return data1.candidates?.[0]?.content?.parts?.[0]?.text;
    
    } catch (error) {
        console.error('AI generation error:', error);
        throw new Error('Failed to generate ATS score and suggestions. Please try again.');
    }
}