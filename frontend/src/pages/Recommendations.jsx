import { useEffect, useState } from "react";
import RecommendationPanel from "../components/scheme/RecommendationPanel";
import { getRecommendations } from "../services/schemeService";

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadRecommendations();
    }, []);

    const loadRecommendations = async () => {
        try {
            setLoading(true);
            setError(null);

            const email = localStorage.getItem("userEmail");

            console.log("User Email:", email);

            if (!email) {
                setError("User email not found. Please login again.");
                setLoading(false);
                return;
            }

            const data = await getRecommendations(email);

            console.log("RECOMMENDATIONS:", data);

            setRecommendations(
                Array.isArray(data) ? data : []
            );
        } catch (err) {
            console.error(
                "Error fetching recommendations:",
                err
            );

            setError(
                "Failed to load recommendations. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommendation-page">
            <h1>Your Recommended Schemes</h1>

            {loading && (
                <p>Loading recommendations...</p>
            )}

            {error && !loading && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {!loading &&
                !error &&
                recommendations.length === 0 && (
                    <p>
                        No recommendations found for your profile.
                    </p>
                )}

            {!loading &&
                !error &&
                recommendations.length > 0 && (
                    <RecommendationPanel
                        recommendations={recommendations}
                    />
                )}
        </div>
    );
}

export default Recommendations;