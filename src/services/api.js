import axios from 'axios';
import { membit } from '@bandprotocol/membit';

let membitClient = null;

export const setMembitKey = (key) => {
    membitClient = membit({
        apiKey: key,
        apiBaseURL: '/api'
    });
};

export const fetchTrendingClusters = async (query = 'technology', limit = 10) => {
    if (!membitClient) {
        console.warn("Membit client not initialized");
        return [];
    }
    try {
        console.log("Calling SDK cluster_search:", query);
        const result = await membitClient.cluster_search(query, { limit });
        console.log("SDK Result (Raw):", result);
        return result;
    } catch (error) {
        console.error("Error fetching clusters:", error);
        return [];
    }
};

export const fetchClusterDetails = async (label, limit = 5) => {
    if (!membitClient) return null;
    try {
        const result = await membitClient.cluster_info(label, { limit });
        return result;
    } catch (error) {
        console.error("Error fetching cluster details:", error);
        return null;
    }
};

export const geminiApi = axios.create({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
});

export const analyzeWithGemini = async (apiKey, prompt) => {
    console.log("API: analyzeWithGemini called with key length:", apiKey?.length); // DEBUG
    try {
        // Using Gemini 2.0 Flash as seen in user's billing
        const response = await geminiApi.post('/models/gemini-2.0-flash:generateContent', {
            contents: [{ parts: [{ text: prompt }] }],
        }, {
            params: { key: apiKey }
        });
        console.log("API: Response received", response.status); // DEBUG
        return response.data;
    } catch (error) {
        console.error("API: Axios Error", error.response?.data || error.message); // DEBUG
        throw error;
    }
};
