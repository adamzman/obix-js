const { createInstance } = require('./obix/axios');
const { HistoryRequestInstance } = require('./obix/requests/history');
const { BatchRequestInstance } = require('./obix/requests/batch');
const { StandardRequestInstance } = require('./obix/requests/standard');
const { WatcherRequestInstance } = require('./obix/requests/watcher');

class ObixInstance {
  constructor({ protocol = 'https', host = 'localhost', port = '443', username, password }) {
    const axiosInstance = createInstance({ protocol, host, port, username, password });
    this.historyRequestInstance = new HistoryRequestInstance({ axiosInstance });
    this.batchRequestInstance = new BatchRequestInstance({ axiosInstance });
    this.standardRequestInstance = new StandardRequestInstance({ axiosInstance });
    this.watcherRequestInstance = new WatcherRequestInstance({ axiosInstance });
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
