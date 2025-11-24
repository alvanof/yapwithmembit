import { membit } from '@bandprotocol/membit';

const apiKey = 'u-kdijHNzOVjhfUyCQXonAQJZcFgx4l3PMhwvlAk93h5LJprfi';

const membitClient = membit({
    apiKey: apiKey,
    apiBaseURL: 'https://api.membit.ai/v1'
});

async function testSearch() {
    console.log("Testing search with key:", apiKey);
    try {
        const result = await membitClient.cluster_search('technology', { limit: 10 });
        console.log("Search Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Search Error:", error);
    }
}

testSearch();
