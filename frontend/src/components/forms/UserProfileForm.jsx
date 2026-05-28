import { useState } from "react";
import {
    saveUserProfile
} from "../../services/authService";


function UserProfileForm() {

    const [formData, setFormData] = useState({
        age: "",
        income: "",
        occupation: "",
        category: "",
        state: ""
    });

    const email = localStorage.getItem("userEmail");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await saveUserProfile(
                email,
                formData
            );

            alert(response.message);

        } catch (error) {

            alert("Profile save failed");
        }
    };


    return (

        <div className="profile-form">

            <h2>User Profile</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="income"
                    placeholder="Annual Income"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Save Profile
                </button>

            </form>

        </div>
    );
}

export default UserProfileForm;