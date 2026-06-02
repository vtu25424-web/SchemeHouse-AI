import SchemeCard from "./SchemeCard";

function RecommendationPanel({ recommendations }) {

    if (!recommendations || recommendations.length === 0) {
        return (
            <div>
                <h3>No recommendations available.</h3>
            </div>
        );
    }

    return (
        <div className="recommendation-panel">
            {recommendations.map((scheme, index) => (
                <SchemeCard
                    key={index}
                    scheme={scheme}
                />
            ))}
        </div>
    );
}

export default RecommendationPanel;