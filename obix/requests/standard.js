const { parseValueType } = require('../parsers/values');
const { stripPaths, replaceSpecialChars } = require('../helpers');

class StandardRequestInstance {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
  }
  async writeRequest({ path, value }) {
    path = stripPaths(path)[0];
    const { data } = await this.axiosInstance.post(`config/${path}/set/`, `<real val="${replaceSpecialChars(value)}"/>`);
    return { ...parseValueType(data), path, action: 'write' };
  }

  async readRequest({ path }) {
    path = stripPaths(path)[0];
    const { data } = await this.axiosInstance.get(`config/${path}/out/`);
    return { ...parseValueType(data), path, action: 'read' };
  }
}

module.exports = { StandardRequestInstance };
