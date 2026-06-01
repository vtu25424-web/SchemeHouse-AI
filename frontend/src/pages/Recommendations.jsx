import { useEffect, useState } from "react";
import { getRecommendations } from "../services/schemeService";

function Recommendations() {

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    // IMPORTANT: matches your updated key
    const email = localStorage.getItem("userEmail");

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);

            const data = await getRecommendations(email);

            setRecommendations(data?.recommendations || []);

        } catch (error) {
            console.log("Error fetching recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recommendation-page">

            <h2>Recommended Schemes</h2>

            {/* Loading state */}
            {loading && <p>Loading recommendations...</p>}

            {/* Empty state */}
            {!loading && recommendations.length === 0 && (
                <p>No recommendations found for your profile.</p>
            )}

            {/* Recommendation list */}
            {recommendations.map((scheme, index) => (

                <div key={index} className="scheme-card">

                    <h3>{scheme.scheme_name}</h3>

                    <p>
                        <b>Category:</b> {scheme.category}
                    </p>

                    <p>
                        <b>Match Score:</b> {scheme.score}
                    </p>

                    {/* Progress bar (AI feel upgrade) */}
                    <div
                        style={{
                            width: "100%",
                            background: "#eee",
                            borderRadius: "10px",
                            marginTop: "8px",
                            height: "10px"
                        }}
                    >
                        <div
                            style={{
                                width: `${Math.min(scheme.score, 100)}%`,
                                background:
                                    scheme.score > 80
                                        ? "green"
                                        : scheme.score > 60
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