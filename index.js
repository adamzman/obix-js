const { createInstance } = require('./src/axios');
const { RawRequestInstance } = require('./src/requests/raw');
const { HistoryRequestInstance } = require('./src/requests/history');
const { BatchRequestInstance } = require('./src/requests/batch');
const { StandardRequestInstance } = require('./src/requests/standard');
const { WatcherRequestInstance } = require('./src/requests/watcher');

class ObixInstance {
  constructor({ protocol = 'https', host = 'localhost', port = '443', username, password }) {
    const axiosInstance = createInstance({ protocol, host, port, username, password });
    this.rawRequestInstance = new RawRequestInstance({ axiosInstance });
    this.historyRequestInstance = new HistoryRequestInstance({ axiosInstance });
    this.batchRequestInstance = new BatchRequestInstance({ axiosInstance });
    this.standardRequestInstance = new StandardRequestInstance({ axiosInstance });
    this.watcherRequestInstance = new WatcherRequestInstance({ axiosInstance });
  }

  /**
   * @param {string} payload - Should be an xml string and replace any special characters like the following: https://stackoverflow.com/questions/1091945/what-characters-do-i-need-to-escape-in-xml-documents#:~:text=XML%20escape%20characters,the%20W3C%20Markup%20Validation%20Service
   */
  async post({ path, payload }) {
    return await this.rawRequestInstance.post({ path, payload });
  }
  async get({ path }) {
    return await this.rawRequestInstance.get({ path });
  }

  async history({ path, query }) {
    return await this.historyRequestInstance.historyRequest({ path, query });
  }

  async batch({ batch }) {
    return await this.batchRequestInstance.batchRequest({ batch });
  }

  async read({ path }) {
    return await this.standardRequestInstance.readRequest({ path });
  }
  async write({ path, value }) {
    return await this.standardRequestInstance.writeRequest({ path, value });
  }

  async watcherCreate() {
    return await this.watcherRequestInstance.watcherCreate();
  }
  async watcherUpdateDefaultLease({ leaseTime }) {
    return await this.watcherRequestInstance.watcherUpdateDefaultLease({ leaseTime });
  }
}

module.exports = { ObixInstance };
