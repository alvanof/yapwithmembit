import axios from 'axios';

const API_KEY = 'u-cEibSCb9xcMVpX4l7kUL1onrON2P50JtdPOjAJLP1HMrmcyB';
const URL = 'https://api.membit.ai/v1/clusters/search';

async function testApi() {
    try {
        console.log('Testing Membit API...');
        const response = await axios.get(URL, {
            params: { q: 'crypto', limit: 5 },
            headers: { 'X-Membit-Api-Key': API_KEY }
        });
        console.log('Success! Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

testApi();
