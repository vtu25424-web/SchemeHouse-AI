import SchemeCard from "./SchemeCard";

const RecommendationPanel = ({ schemes }) => {

  // =========================
  // LOADING STATE
  // =========================
  if (schemes === null || schemes === undefined) {
    return <p>Loading recommendations...</p>;
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (schemes.length === 0) {
    return <p>No recommendations found.</p>;
  }

  return (
    <div className="recommendation-panel">

      {schemes.map((scheme, index) => (
        <div key={index}>
          <SchemeCard
            scheme={scheme}
            type="recommendation"
          />
        </div>
      ))}

    </div>
  );
};

export default RecommendationPanel;