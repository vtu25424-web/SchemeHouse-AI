import { useEffect, useState } from "react";
import UserProfileForm from "../components/forms/UserProfileForm";
import { getUserProfile } from "../services/authService";

function Profile() {
  const [profile, setProfile] = useState(null);

  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      if (!email) return;

      const res = await getUserProfile(email);

      console.log("PROFILE DATA:", res);

      const data = res?.data;

      setProfile(data);

      // ⭐ SAFE STORAGE FIX
      if (data) {
        localStorage.setItem(
          "profile",
          JSON.stringify(data)
        );
      }

    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  return (
    <div>
      <UserProfileForm />

      {/* Optional preview (safe debug UI) */}
      {profile && (
        <div style={{ marginTop: "20px" }}>
          <h3>Current Profile</h3>
          <p>Age: {profile.age}</p>
          <p>Income: {profile.income}</p>
          <p>Occupation: {profile.occupation}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;