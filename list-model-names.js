import axios from 'axios';

const API_KEY = 'AIzaSyBb3OlWs9UAdNZc4fbsDo6CzqdqlEmSfMY';
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModelNames() {
    try {
        const response = await axios.get(URL);
        const names = response.data.models.map(m => m.name);
        console.log(names.join('\n'));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

listModelNames();
