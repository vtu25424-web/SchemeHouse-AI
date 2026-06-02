import { useEffect, useState } from "react";
import RecommendationPanel from "../components/scheme/RecommendationPanel";
import { getRecommendations } from "../services/schemeService";

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Match your authentication storage key
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!email) {
                setError("User email not found. Please login again.");
                return;
            }

            const data = await getRecommendations(email);

            // Match your backend response structure
            setRecommendations(data?.recommendations || []);
        } catch (err) {
            console.error("Error fetching recommendations:", err);
            setError("Failed to load recommendations. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommendation-page">
            <h1>Your Recommended Schemes</h1>

            {/* Loading */}
            {loading && <p>Loading recommendations...</p>}

            {/* Error */}
            {error && !loading && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {/* Empty State */}
            {!loading && !error && recommendations.length === 0 && (
                <p>No recommendations found for your profile.</p>
            )}

            {/* Recommendation Cards */}
            {!loading && !error && recommendations.length > 0 && (
                <RecommendationPanel
                    recommendations={recommendations}
                />
            )}
        </div>
    );
}

export default Recommendations;