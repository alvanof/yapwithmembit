import axios from 'axios';

const API_KEY = 'AIzaSyBb3OlWs9UAdNZc4fbsDo6CzqdqlEmSfMY';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function testGemini() {
    try {
        console.log('Testing Gemini API...');
        const response = await axios.post(URL, {
            contents: [{ parts: [{ text: "Hello, suggest 3 creative content ideas about crypto." }] }]
        });
        console.log('Success! Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testGemini();
