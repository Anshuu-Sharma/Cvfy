// Generate cover letter using Gemini API
// Generate cover letter using Gemini API
async function generateCoverLetter(resumeText) {
    try {
        const prompt1 = `You have to behave as an ats score checker and rate this resume out of 100. 
        return only in this format:
        score_here/100
        Resume content:
        ${resumeText}`;

        const prompt2 = `Analyze this resume and based on it give suggestions on how one can improve it (make sure that I have given you text only, so don't give suggestions on the structure and format because you can't see it).
        
        Give in this format:
        Suggestions(give 5):
        (space)
        1. ..
        2. ..
        so on
        
        Resume content:
        ${resumeText}`;

        const prompt3 = `Analyze this resume and based on it return missing skills(that arern't in the resume) based on the person's profile, also in other column you have to place the skill the user alrerady have.
        give answer in this format only:(make sure they are properly aligned in 2 columns with even gap)
        Your skills:            Missing skills:
        1. skill1               1. missing_skill1
        2. skill2               2. missing_skill2
        ...so on                   ....so on
        
        Resume content:
        ${resumeText}`;

        // Make both fetch calls concurrently
        const [response1, response2, response3] = await Promise.all([
            fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt1 }] }] })
            }),
            fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt2 }] }] })
            }),
            fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt3 }] }] })
            })
        ]);

        // Check if both responses are OK
        if (!response1.ok || !response2.ok || !response3.ok) {
            throw new Error('Failed to generate content');
        }

        document.querySelector("#coverLetterForm").style.display = "none";

        // Parse JSON responses
        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();

        // Ensure response format is correct
        return {
            atsScore: data1.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No ATS score received",
            suggestions: data2.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No suggestions received",
            missingSkills: data3.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No missing skills found"
        };
    } catch (error) {
        console.error('AI generation error:', error);
        throw new Error('Failed to generate ATS score and suggestions. Please try again.');
    }
}



// async function suggestions(resumeText) {
//     try {
//         const prompt = `Analyze this resume and based on it give suggestions on how one can improve it(make sure that i have given you text only so dont give suggestions on the structure and format because you cant see it)

//         Suggestions:
//         1. ..
//         2. ..
//         so on
        
//         Resume content:
//         ${resumeText}`;

//         const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{ text: prompt }]
//                 }]
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to generate Suggestions');
//         }
//         // document.querySelector("#coverLetterForm").style.display = "none";
//         const data = await response.json();
//         return data.candidates[0].content.parts[0].text;
//     } catch (error) {
//         console.error('AI generation error:', error);
//         throw new Error('Failed to generate Suggestions. Please try again.');
//     }
// }