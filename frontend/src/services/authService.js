import API from "./api";


// REGISTER USER
export const registerUser = async (userData) => {

  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};


// LOGIN USER
export const loginUser = async (userData) => {

  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};


// SAVE USER PROFILE
export const saveUserProfile = async (
  email,
  profileData
) => {

  const response = await API.post(
    `/user/profile/${email}`,
    profileData
  );

  return response.data;
};


// GET USER PROFILE
export const getUserProfile = async (
  email
) => {

  const response = await API.get(
    `/user/profile/${email}`
  );

  return response.data;
};