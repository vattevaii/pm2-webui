const config = require("../config");
const { setEnvDataSync } = require("../utils/env.util");
const { hashPasswordSync, comparePassword } = require("../utils/password.util");

const createAdminUser = (username, password) => {
  const adminUser = {
    ADMIN_APP_USERNAME: username,
    ADMIN_APP_PASSWORD: hashPasswordSync(password),
  };
  setEnvDataSync(config.APP_DIR, adminUser);
};

const createNormalUser = (username, password) => {
  const adminUser = {
    APP_USERNAME: username,
    APP_PASSWORD: hashPasswordSync(password),
  };
  setEnvDataSync(config.APP_DIR, adminUser);
};

const validateAdminUser = async (username, password) => {
  if (username === config.ADMIN_APP_USERNAME) {
    const isPasswordCorrect = await comparePassword(
      password,
      config.ADMIN_APP_PASSWORD
    );
    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }
    return true;
  }
  if (username === config.APP_USERNAME) {
    const isPasswordCorrect = await comparePassword(
      password,
      config.APP_PASSWORD
    );
    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }
    return true;
  }
  throw new Error("User does not exist");
};

module.exports = {
  createAdminUser,
  createNormalUser,
  validateAdminUser,
};
