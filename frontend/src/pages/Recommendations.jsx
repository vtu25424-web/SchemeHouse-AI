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

    // =========================
    // LOAD RECOMMENDATIONS
    // =========================
    const loadRecommendations = async () => {
        try {
            setLoading(true);
            setError(null);

            // ✅ FIXED EMAIL KEY
            const email = localStorage.getItem("email");

            console.log("User Email:", email);

            if (!email) {
                setError("User email not found. Please login again.");
                setLoading(false);
                return;
            }

            const data = await getRecommendations(email);

            console.log("API RESPONSE:", data);

            // ✅ FIXED: backend returns { recommendations: [...] }
            const recs = data?.recommendations || [];

            setRecommendations(recs);

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

            {/* LOADING STATE */}
            {loading && <p>Loading recommendations...</p>}

            {/* ERROR STATE */}
            {error && !loading && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {/* EMPTY STATE */}
            {!loading && !error && recommendations.length === 0 && (
                <p>No recommendations found for your profile.</p>
            )}

            {/* DATA STATE */}
            {!loading && !error && recommendations.length > 0 && (
                <RecommendationPanel schemes={recommendations} />
            )}
        </div>
    );
}

export default Recommendations;