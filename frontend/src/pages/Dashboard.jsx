import { useEffect, useState } from "react";
import { getRecommendations } from "../services/schemeService";
import api from "../services/api";
import RecommendationPanel from "../components/scheme/RecommendationPanel";

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [profile, setProfile] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [authError, setAuthError] = useState(false);
  const [email, setEmail] = useState(null);

  // =========================
  // FORMAT INCOME
  // =========================
  const formatIncome = (value) => {
    if (!value) return "Not specified";
    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  // =========================
  // LOAD EMAIL ON MOUNT
  // =========================
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);

    if (!storedEmail) {
      setAuthError(true);
    }
  }, []);

  // =========================
  // FETCH DATA AFTER EMAIL SET
  // =========================
  useEffect(() => {
    if (!email) return;

    fetchRecommendations();
    fetchProfile();
    loadRecentSearches();
  }, [email]);

  // =========================
  // Fetch recommendations
  // =========================
  const fetchRecommendations = async () => {
    try {
      const res = await getRecommendations(email);

      console.log("API RESPONSE:", res);

      const data = res?.recommendations || [];
      setRecommendations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Recommendation error:", err);
      setRecommendations([]);
    }
  };

  // =========================
  // Fetch profile
  // =========================
  const fetchProfile = async () => {
    try {
      const res = await api.get(`/user/profile/${email}`);
      const profileData = res?.data;

      setProfile(profileData);
      localStorage.setItem("profile", JSON.stringify(profileData));
    } catch (err) {
      console.log("Profile fetch error:", err);

      try {
        const storedProfile = localStorage.getItem("profile");

        if (storedProfile && storedProfile !== "undefined") {
          setProfile(JSON.parse(storedProfile));
        } else {
          setProfile(null);
        }
      } catch {
        setProfile(null);
      }
    }
  };

  // =========================
  // Load recent searches
  // =========================
  const loadRecentSearches = () => {
    const searches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(searches);
  };

  // =========================
  // STATS CALCULATION
  // =========================
  const eligibleSchemes = recommendations.filter(
    (s) => s.eligible === true
  ).length;

  const perfectMatches = recommendations.filter(
    (s) => s.score === 100
  ).length;

  const avgScore =
    recommendations.length > 0
      ? Math.round(
          recommendations.reduce((acc, s) => acc + (s.score || 0), 0) /
            recommendations.length
        )
      : 0;

  // =========================
  // AUTH ERROR UI
  // =========================
  if (authError) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        ⚠️ Session expired. Please login again.
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      <h2 className="full-width">📊 Dashboard</h2>

      {/* STATS */}
      <div className="stats-container">

        <div className="stat-card">
          <h4>Eligible</h4>
          <p>{eligibleSchemes}</p>
        </div>

        <div className="stat-card">
          <h4>Top</h4>
          <p>{perfectMatches}</p>
        </div>

        <div className="stat-card">
          <h4>Avg</h4>
          <p>{avgScore}%</p>
        </div>

      </div>

      {/* PROFILE + INSIGHT */}
      <div className="dashboard-grid">

        <div className="card">
          <h3>👤 Profile Status</h3>

          {profile ? (
            <div>
              <p><b>Age:</b> {profile.age}</p>
              <p><b>Income:</b> {formatIncome(profile.income)}</p>
              <p><b>Occupation:</b> {profile.occupation}</p>
              <p><b>Category:</b> {profile.category}</p>
              <p><b>State:</b> {profile.state}</p>

              <p style={{ color: "green", fontWeight: "bold" }}>
                ✔ Profile Completed
              </p>
            </div>
          ) : (
            <p style={{ color: "red" }}>❌ Profile Incomplete</p>
          )}
        </div>

        <div className="card">
          <h3>💡 Smart Insight</h3>
          <p>Based on your profile, you are highly eligible for:</p>

          <ul>
            <li>Agriculture subsidies</li>
            <li>Crop insurance schemes</li>
            <li>Farmer income support</li>
          </ul>
        </div>

      </div>

      {/* RECOMMENDATIONS */}
      <div className="card full-width">
        <h3>🧠 Recommended Schemes</h3>

        {recommendations.length === 0 ? (
          <>
            <p style={{ color: "red", fontWeight: "bold" }}>
              ⚠ Recommendations temporarily unavailable
            </p>
            <p style={{ fontSize: "12px", color: "gray" }}>
              Please ensure backend server is running.
            </p>
          </>
        ) : (
          <RecommendationPanel schemes={recommendations} />
        )}
      </div>

      {/* RECENT SEARCHES */}
      <div className="card full-width">
        <h3>🔎 Recent Searches</h3>

        {recentSearches.length === 0 ? (
          <p>No recent searches</p>
        ) : (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {recentSearches.map((item, index) => (
              <span
                key={index}
                style={{
                  padding: "5px 10px",
                  background: "#f0f0f0",
                  borderRadius: "20px",
                  fontSize: "12px"
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;