const prisma = require("../config/prisma");

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

const logout = async (userId) => {
  return prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

const saveRefreshToken = (token, userId, expiresAt) => {
  return prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
};

const findRefreshToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

const deleteRefreshToken = (token) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  logout,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};
