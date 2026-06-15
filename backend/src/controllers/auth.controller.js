const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");

const register = async (req, res) => {
  try {
    const { password, id, ...userData } = await authService.registerUser(
      req.body,
    );
    return successResponse(res, "Register successful", userData, 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const login = async (req, res) => {
  console.log("Received login request with body:", req.body);
  console.log("Login request body:", req.body);
  try {
    const result = await authService.loginUser(req.body);

    return successResponse(res, "Login successful", result);
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

const logout = async (req, res) => {
  await authService.logout(req.user.id);

  return successResponse(res, "Logout successful");
};

const profile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    return successResponse(res, "Profile fetched successfully", user);
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const data = await authService.refreshToken(refreshToken);

  return successResponse(res, "Token refreshed successfully", data);
};

module.exports = {
  register,
  login,
  profile,
  logout,
  refreshToken,
};
