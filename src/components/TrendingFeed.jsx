import React, { useEffect, useState } from 'react';
import { fetchTrendingClusters, fetchClusterDetails } from '../services/api';
import PostCard from './PostCard';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const TrendingFeed = ({ query, selectedCluster, onClusterSelect }) => {
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clusterPosts, setClusterPosts] = useState([]);

    useEffect(() => {
        const loadClusters = async () => {
            setLoading(true);
            try {
                console.log("Fetching clusters for query:", query); // DEBUG
                const data = await fetchTrendingClusters(query);
                console.log("Clusters data received:", data); // DEBUG
                if (Array.isArray(data)) {
                    setClusters(data);
                } else if (data && Array.isArray(data.clusters)) {
                    setClusters(data.clusters);
                } else if (data && Array.isArray(data.data)) {
                    setClusters(data.data);
                } else {
                    console.log("Unexpected data format or empty"); // DEBUG
                    setClusters([]);
                }
            } catch (error) {
                console.error("Error loading clusters:", error);
            }
            setLoading(false);
        };
        loadClusters();
    }, [query]);

    const handleClusterClick = async (cluster) => {
        onClusterSelect(cluster);
        setLoading(true);
        try {
            const details = await fetchClusterDetails(cluster.label);
            setClusterPosts(details?.posts || []);
        } catch (error) {
            console.error("Error loading cluster details:", error);
        }
        setLoading(false);
    };

    const handleBackToClusters = () => {
        onClusterSelect(null);
        setClusterPosts([]);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* If a cluster is selected, show ONLY the posts (Full Width) */}
            {selectedCluster ? (
                <div className="w-full">
                    <button
                        onClick={handleBackToClusters}
                        className="mb-6 bg-white border-3 border-neo-black px-4 py-2 font-black uppercase shadow-neo hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
                    >
                        <ArrowLeft size={20} /> Back to Clusters
                    </button>

                    <div className="bg-neo-blue border-3 border-neo-black p-6 shadow-neo mb-8 transform rotate-1">
                        <h2 className="text-4xl md:text-5xl font-black text-neo-black uppercase tracking-tighter">
                            {selectedCluster.label}
                        </h2>
                        <p className="font-bold text-neo-black/80 uppercase mt-2 border-t-3 border-neo-black pt-2">
                            {selectedCluster.summary}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clusterPosts.length > 0 ? (
                            clusterPosts.map((post, index) => (
                                <PostCard key={index} post={post} index={index} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-2xl font-black uppercase animate-pulse">Loading Yaps...</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* Otherwise, show the Clusters List */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clusters.slice(0, 9).map((cluster, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleClusterClick(cluster)}
                            className="cursor-pointer bg-white border-3 border-neo-black p-6 shadow-neo hover:shadow-neo-lg transition-all relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 bg-neo-yellow border-l-3 border-b-3 border-neo-black px-3 py-1 font-black text-xs uppercase">
                                {cluster.volume || 'HOT'}
                            </div>

                            <h3 className="text-2xl font-black uppercase leading-tight mb-4 mt-2 group-hover:text-neo-main transition-colors">
                                {cluster.label.replace('Cluster ', '')}
                            </h3>

                            <p className="text-sm font-bold text-gray-600 line-clamp-3 mb-4 font-mono">
                                {cluster.summary}
                            </p>

                            <div className="flex gap-2 flex-wrap">
                                {cluster.keywords?.slice(0, 3).map((keyword, i) => (
                                    <span key={i} className="text-xs font-black bg-neo-bg border-2 border-neo-black px-2 py-1 uppercase">
                                        #{keyword}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingFeed;
