import { useEffect, useState } from "react";
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
                setLoading(false);
                return;
            }

            const data = await getRecommendations(email);

            setRecommendations(data?.recommendations || []);

        } catch (err) {
            console.log("Error fetching recommendations:", err);
            setError("Failed to load recommendations. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommendation-page">

            <h2>Recommended Schemes</h2>

            {/* Loading */}
            {loading && <p>Loading recommendations...</p>}

            {/* Error */}
            {error && !loading && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {/* Empty state */}
            {!loading && !error && recommendations.length === 0 && (
                <p>No recommendations found for your profile.</p>
            )}

            {/* Recommendation list */}
            {!loading && !error && recommendations.map((scheme, index) => (

                <div key={index} className="scheme-card">

                    <h3>{scheme.scheme_name}</h3>

                    <p>
                        <b>Category:</b> {scheme.category}
                    </p>

                    <p>
                        <b>Match Score:</b> {scheme.score}</p>

                    <p>
                        <b>Reason:</b> {scheme.reason}
                    </p>

                    {/* Progress Bar */}
                    <div
                        style={{
                            width: "100%",
                            background: "#eee",
                            borderRadius: "10px",
                            marginTop: "10px",
                            height: "10px"
                        }}
                    >
                        <div
                            style={{
                                width: `${Math.min(scheme.score || 0, 100)}%`,
                                background:
                                    (scheme.score || 0) > 80
                                        ? "green"
                                        : (scheme.score || 0) > 60
                                        ? "orange"
                                        : "red",
                                height: "10px",
                                borderRadius: "10px",
                                transition: "0.3s"
                            }}
                        />
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Recommendations;