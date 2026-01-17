const userModel = require("../models/user.js");

const UserService = {
  createUser: async (userData) => {
    try {
      const result = await userModel.create(userData);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      return await userModel.findOne({ email: email.toLowerCase() });
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (userId, userData) => {
    try {
      return await userModel.findByIdAndUpdate(userId, userData, { new: true });
    } catch (error) {
      throw error;
    }
  },
  updateUserStatus: async (userId, status) => {
    try {
      const result = await userModel.findByIdAndUpdate(userId, { status }, { new: true });
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (userId) => {
    try {
      const result = await userModel.findByIdAndDelete(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = UserService;
