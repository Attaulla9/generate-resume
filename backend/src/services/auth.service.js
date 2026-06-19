const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/auth.repository");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if email already exists
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = await authRepository.createUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate Tokens
  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  // Save Refresh Token in Database
  await authRepository.saveRefreshToken(
    refreshToken,
    user.id,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const logout = async (userId) => {
  await authRepository.logout(userId);

  return {
    success: true,
  };
};

const getProfile = async (userId) => {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

const refreshToken = async (token) => {
  // Find token in database
  const savedToken = await authRepository.findRefreshToken(token);

  if (!savedToken) {
    throw new Error("Invalid Refresh Token");
  }

  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  // Find User
  const user = await authRepository.findUserById(payload.id);

  if (!user) {
    throw new Error("User not found");
  }

  // Generate New Access Token
  const accessToken = generateAccessToken(user);

  return {
    accessToken,
  };
};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logout,
  refreshToken,
};
