const userModel = require("../models/User.js");

const UserService = {
  createUser: async (userData) => {
    try {
      const result = await userModel.create(userData);
      return result;
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
