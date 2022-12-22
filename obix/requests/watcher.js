const { stripPaths, replaceSpecialChars } = require('../helpers');
const { buildOutputList } = require('../parsers/values');
const { UnknownTypeError } = require('../errors');

class WatcherRequestInstance {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
    this.watchers = {};
  }

  async watcherCreate() {
    const { data: watchCreateData } = await this.axiosInstance.post('/watchService/make');
    const watcherName = watchCreateData.obj._attributes.href.split('/').at(-2);
    const watcherOperations = watchCreateData.obj.op;
    this.watchers[watcherName] = {
      watcher: watcherName,
      add: this.#findAttributeByName(watcherOperations, 'add')?.href,
      remove: this.#findAttributeByName(watcherOperations, 'remove')?.href,
      pollChanges: this.#findAttributeByName(watcherOperations, 'pollChanges')?.href,
      pollRefresh: this.#findAttributeByName(watcherOperations, 'pollRefresh')?.href,
      delete: this.#findAttributeByName(watcherOperations, 'delete')?.href,
      lease: watchCreateData.obj.reltime._attributes.href,
    };
    return this.watchers[watcherName];
  }

  async watcherAdd({ watcher: watcherName, paths }) {
    paths = stripPaths(paths);
    try {
      const { data } = await this.axiosInstance.post(
        this.watchers[watcherName].add,
        `<obj>
          <list>
            ${paths.map((p) => `<uri val="/obix/config/${replaceSpecialChars(p)}/" />`).join('\n')}
          </list>
        </obj>`
      );
      return buildOutputList(data);
    } catch (error) {
      this.#removeWatcherFromList(watcherName);
      throw error;
    }
  }

  async watcherRemove({ watcher: watcherName, paths }) {
    paths = stripPaths(paths);
    try {
      await this.axiosInstance.post(
        this.watchers[watcherName].remove,
        `<obj>
          <list>
            ${paths.map((p) => `<uri val="/obix/config/${replaceSpecialChars(p)}/" />`).join('\n')}
          </list>
        </obj>`
      );
      return;
    } catch (error) {
      this.#removeWatcherFromList(watcherName);
      throw error;
    }
  }

  async watcherDelete({ watcher: watcherName }) {
    try {
      await this.axiosInstance.post(this.watchers[watcherName].delete);
      this.#removeWatcherFromList(watcherName);
      return;
    } catch (error) {
      this.#removeWatcherFromList(watcherName);
      throw error;
    }
  }

  async watcherPollChanges({ watcher: watcherName }) {
    try {
      const { data } = await this.axiosInstance.post(this.watchers[watcherName].pollChanges);
      return buildOutputList(data);
    } catch (error) {
      this.#removeWatcherFromList(watcherName);
      throw error;
    }
  }

  async watcherPollRefresh({ watcher: watcherName }) {
    try {
      const { data } = await this.axiosInstance.post(this.watchers[watcherName].pollRefresh);
      return buildOutputList(data);
    } catch (error) {
      this.#removeWatcherFromList(watcherName);
      throw error;
    }
  }

  async watcherUpdateLease({ watcher: watcherName, leaseTime }) {
    let body;
    try {
      if (Number.isInteger(Number(leaseTime))) {
        body = `<real val="${Number(leaseTime)}" />`;
      } else if (typeof leaseTime == 'string') {
        body = `<reltime val="${leaseTime}" />`;
      } else {
        throw new UnknownTypeError();
      }

      await this.axiosInstance.put(watcherName ? this.watchers[watcherName].lease : '/watchService/defaultLeaseTime/', body);
      return;
    } catch (error) {
      if (watcherName) {
        this.#removeWatcherFromList(watcherName);
      }
      throw error;
    }
  }

  #findAttributeByName(dataArray, name) {
    return dataArray.find((d) => d._attributes.name == name)?._attributes;
  }

  #removeWatcherFromList(watcher) {
    delete this.watchers[watcher];
  }
}

module.exports = { WatcherRequestInstance };
