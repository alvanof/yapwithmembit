import axios from 'axios';

const API_KEY = 'AIzaSyBb3OlWs9UAdNZc4fbsDo6CzqdqlEmSfMY';
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    try {
        console.log('Listing Gemini Models...');
        const response = await axios.get(URL);
        console.log('Success! Status:', response.status);
        console.log('Models:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

listModels();
