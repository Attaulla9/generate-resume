import api from "../api/axios";

// Login
const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

// Register
const registerUser = async (registerData) => {
  const response = await api.post("/auth/register", registerData);
  return response.data;
};

// Logout
const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Refresh Token
const refreshAccessToken = async (refreshToken) => {
  const response = await api.post("/auth/refresh-token", {
    refreshToken,
  });

  return response.data;
};

const authService = {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
};

export default authService;
