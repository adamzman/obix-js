const axios = require('axios');
const https = require('https');
const convert = require('xml-js');
const { HTTPError, BQLHTTPError } = require('./errors');
const { parseError } = require('./parsers/errors');

class ProtocolError extends Error {
  constructor() {
    super('Invalid Security Protocol');
    this.name = 'ProtocolError';
    this.friendlyError = this.message;
    this.inDepthError = 'Invalid Security Protocol:\nProtocol must be either "https" or "http"';
  }
}

const createInstance = ({ protocol, host, port, username, password, isBQL = false }) => {
  if (protocol != 'https' && protocol != 'http') throw new ProtocolError();

  if (isBQL) {
    const axiosInstance = axios.create({
      baseURL: `${protocol}://${host}:${port}`,
      timeout: 10000,
      auth: { username, password },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    axiosInstance.interceptors.response.use(
      (response) => {
        const [cookie] = response.headers['set-cookie'] || [];
        if (cookie) axiosInstance.defaults.headers.Cookie = cookie;
        return response;
      },
      (error) => {
        throw new BQLHTTPError(error);
      }
    );
    return axiosInstance;
  } else {
    const axiosInstance = axios.create({
      baseURL: `${protocol}://${host}:${port}/obix/`,
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
        const [cookie] = response.headers['set-cookie'] || [];
        if (cookie) axiosInstance.defaults.headers.Cookie = cookie;
        parseError(response.data?.err);
        return response;
      },
      (error) => {
        throw new HTTPError(error);
      }
    );
    return axiosInstance;
  }
};

module.exports = { createInstance };
