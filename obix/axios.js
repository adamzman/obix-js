const axios = require('axios');
const https = require('https');
const convert = require('xml-js');
const { HTTPError } = require('./errors');
const { parseError } = require('./parsers/errors');

class ProtocolError extends Error {
  constructor() {
    super('Invalid Security Protocol');
    this.name = 'ProtocolError';
    this.friendlyError = this.message;
    this.inDepthError = 'Invalid Security Protocol:\nProtocol must be either "https" or "http"';
  }
}

const createInstance = ({ mode, host, port, username, password }) => {
  if (mode != 'https' && mode != 'http') throw new ProtocolError();
  const axiosInstance = axios.create({
    baseURL: `${mode}://${host}:${port}/obix/`,
    timeout: 2000,
    auth: { username, password },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    transformResponse: [
      function (data) {
        try {
          return convert.xml2js(data, { compact: true, spaces: 4 });
        } catch (error) {
          return data;
        }
      },
    ],
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      parseError(response.data?.err);
      return response;
    },
    (error) => {
      throw new HTTPError(error);
    }
  );
  return axiosInstance;
};

module.exports = { createInstance };
