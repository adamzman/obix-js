const { stripPaths, replaceSpecialChars } = require('../helpers');
const { buildOutputList } = require('../parsers/values');
const { UnknownTypeError } = require('../errors');

class WatcherRequestInstance {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
  }

  async watcherUpdateDefaultLease({ leaseTime }) {
    await this.axiosInstance.put('/watchService/defaultLeaseTime/', this.#buildLeaseBody(leaseTime));
  }

  async watcherCreate() {
    const { data: watchCreateData } = await this.axiosInstance.post('/watchService/make');
    const watcherName = watchCreateData.obj._attributes.href.split('/').at(-2);
    const watcherOperations = watchCreateData.obj.op;
    const findAtt = this.#findAttributeByName.bind(this, watcherOperations);
    return {
      name: watcherName,
      add: this.#watcherAdd.bind(this, findAtt('add')?.href),
      remove: this.#watcherRemovePath.bind(this, findAtt('remove')?.href),
      delete: this.#watcherDelete.bind(this, findAtt('delete')?.href),
      pollChanges: this.#watcherPollChanges.bind(this, findAtt('pollChanges')?.href),
      pollRefresh: this.#watcherPollRefresh.bind(this, findAtt('pollRefresh')?.href),
      lease: this.#watcherUpdateLease.bind(this, watchCreateData.obj.reltime._attributes.href),
    };
  }

  async #watcherAdd(endpoint, { paths }) {
    paths = stripPaths(paths);
    const { data } = await this.axiosInstance.post(
      endpoint,
      `<obj>
          <list>
            ${paths.map((p) => `<uri val="/obix/config/${replaceSpecialChars(p)}/" />`).join('\n')}
          </list>
        </obj>`
    );
    return this.#buildOutputList(data);
  }

  async #watcherRemovePath(endpoint, { paths }) {
    paths = stripPaths(paths);
    await this.axiosInstance.post(
      endpoint,
      `<obj>
          <list>
            ${paths.map((p) => `<uri val="/obix/config/${replaceSpecialChars(p)}/" />`).join('\n')}
          </list>
        </obj>`
    );
    return;
  }

  async #watcherDelete(endpoint) {
    await this.axiosInstance.post(endpoint);
    return;
  }

  async #watcherPollChanges(endpoint) {
    const { data } = await this.axiosInstance.post(endpoint);
    return this.#buildOutputList(data);
  }

  async #watcherPollRefresh(endpoint) {
    const { data } = await this.axiosInstance.post(endpoint);
    return this.#buildOutputList(data);
  }

  async #watcherUpdateLease(endpoint, { leaseTime }) {
    await this.axiosInstance.put(endpoint, this.#buildLeaseBody(leaseTime));
    return;
  }

  #findAttributeByName(dataArray, name) {
    return dataArray.find((d) => d._attributes.name == name)?._attributes;
  }

  #buildLeaseBody(leaseTime) {
    if (Number.isInteger(Number(leaseTime))) {
      return `<real val="${Number(leaseTime)}" />`;
    } else if (typeof leaseTime == 'string') {
      return `<reltime val="${leaseTime}" />`;
    } else {
      throw new UnknownTypeError();
    }
  }

  #buildOutputList(data) {
    return buildOutputList(data).map((v) => ({ ...v, action: 'read' }));
  }
}

module.exports = { WatcherRequestInstance };
