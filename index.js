const { createInstance } = require('./obix/axios');
const { HistoryRequestInstance } = require('./obix/requests/history');
const { BatchRequestInstance } = require('./obix/requests/batch');
const { StandardRequestInstance } = require('./obix/requests/standard');
const { WatcherRequestInstance } = require('./obix/requests/watcher');

class ObixInstance {
  constructor({ mode = 'https', host = 'localhost', port = '443', username, password }) {
    const axiosInstance = createInstance({ mode, host, port, username, password });
    this.historyRequestInstance = new HistoryRequestInstance({ axiosInstance });
    this.batchRequestInstance = new BatchRequestInstance({ axiosInstance });
    this.standardRequestInstance = new StandardRequestInstance({ axiosInstance });
    this.watcherRequestInstance = new WatcherRequestInstance({ axiosInstance });
  }

  async obixHistory({ path, query }) {
    return await this.historyRequestInstance.historyRequest({ path, query });
  }

  async obixBatch({ batch }) {
    return await this.batchRequestInstance.batchRequest({ batch });
  }

  // #region standard requests
  async obixRead({ path }) {
    return await this.standardRequestInstance.readRequest({ path });
  }
  async obixWrite({ path, value }) {
    return await this.standardRequestInstance.writeRequest({ path, value });
  }
  // #endregion standard requests

  //#region watcher requests
  async obixWatcherCreate() {
    return await this.watcherRequestInstance.watcherCreate();
  }
  async obixWatcherAdd({ watcher, paths }) {
    return await this.watcherRequestInstance.watcherAdd({ watcher, paths });
  }
  async obixWatcherRemove({ watcher, paths }) {
    return await this.watcherRequestInstance.watcherRemove({ watcher, paths });
  }
  async obixWatcherDelete({ watcher }) {
    return await this.watcherRequestInstance.watcherDelete({ watcher });
  }
  async obixWatcherPollChanges({ watcher }) {
    return await this.watcherRequestInstance.watcherPollChanges({ watcher });
  }
  async obixWatcherPollRefresh({ watcher }) {
    return await this.watcherRequestInstance.watcherPollRefresh({ watcher });
  }
  async obixWatcherUpdateLease({ watcher, leaseTime }) {
    return await this.watcherRequestInstance.watcherUpdateLease({ watcher, leaseTime });
  }
  //#endregion watcher requests
}

module.exports = { ObixInstance };
