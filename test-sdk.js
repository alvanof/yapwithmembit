import { membit } from '@bandprotocol/membit';

const API_KEY = 'u-cEibSCb9xcMVpX4l7kUL1onrON2P50JtdPOjAJLP1HMrmcyB';

async function testSdk() {
    try {
        console.log('Testing Membit SDK...');
        const client = membit({ apiKey: API_KEY });

        console.log('Calling cluster_search...');
        const clusters = await client.cluster_search('crypto', { limit: 2 });

        console.log('Clusters type:', typeof clusters);
        console.log('Clusters full object:', JSON.stringify(clusters, null, 2));

        // Check if it's an array or object
        let clusterList = [];
        if (Array.isArray(clusters)) {
            clusterList = clusters;
        } else if (clusters && Array.isArray(clusters.data)) {
            clusterList = clusters.data;
        } else if (clusters && Array.isArray(clusters.clusters)) {
            clusterList = clusters.clusters;
        }

        if (clusterList.length > 0) {
            const label = clusterList[0].label;
            console.log(`Calling cluster_info for "${label}"...`);

            if (client.cluster_info) {
                const info = await client.cluster_info(label, { limit: 2 });
                console.log('Info type:', typeof info);
                console.log('Info sample:', JSON.stringify(info, null, 2));
            } else {
                console.log('client.cluster_info does not exist. Available methods:', Object.keys(client));
            }
        } else {
            console.log("No clusters found to test info.");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testSdk();
