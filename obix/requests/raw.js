const { stripPaths } = require('../helpers');

class RawRequestInstance {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
  }

  async post({ path, payload }) {
    path = stripPaths(path)[0];
    const { data } = await this.axiosInstance.post(path, payload);
    return { data, path, action: 'rawPost' };
  }

  async get({ path }) {
    path = stripPaths(path)[0];
    const { data } = await this.axiosInstance.get(path);
    return { data, path, action: 'rawGet' };
  }
}

module.exports = { RawRequestInstance };
