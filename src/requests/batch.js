const { buildOutputList } = require('../parsers/values');
const { stripPaths, makeArray, replaceSpecialChars } = require('../helpers');

class BatchRequestInstance {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
  }

  async batchRequest({ batch }) {
    // Why? the response doesn't return the path for batch writes, so we much create an array of them to populate the paths in the output
    const writeActionPaths = [];
    const baseURL = this.axiosInstance.defaults.baseURL;
    batch = makeArray(batch);
    const { inputErrors, filteredBatch } = this.#filterInvalidBatchInputs(batch);
    filteredBatch.forEach((obj) => {
      const isRead = obj.action == 'read';
      obj.path = stripPaths(obj.path)[0];
      if (!isRead) writeActionPaths.push(obj.path);
      obj.bodyURI = `
      <uri is="obix:${isRead ? 'Read' : 'Invoke'}" val="${baseURL}config/${obj.path}/${isRead ? 'out' : 'set'}/" >
        ${obj.value != undefined ? `<real name="in" val="${replaceSpecialChars(obj.value)}" />` : ''}
      </uri>`;
    });

    const { data } = await this.axiosInstance.post(
      `batch`,
      `<list>
        ${filteredBatch.map((obj) => obj.bodyURI)}
      </list>`
    );

    const outputList = buildOutputList(data);
    const writeOutputList = outputList.filter((obj) => obj.action == 'write').map((obj, index) => ({ ...obj, path: writeActionPaths[index] }));
    const readOutputList = outputList.filter((obj) => obj.action == 'read');
    const errorOutputList = outputList.filter((obj) => obj.error);

    return [...inputErrors, ...errorOutputList, ...writeOutputList, ...readOutputList];
  }

  #filterInvalidBatchInputs(batch) {
    const inputErrors = [];
    const errorActions = (objTemp, reason) => {
      delete objTemp.action;
      inputErrors.push({ ...objTemp, error: true, reason });
      return false;
    };
    const filteredBatch = batch.filter((obj) => {
      const { path, action, value } = obj;
      if (!path && !action) {
        return errorActions(
          {},
          `Invalid batch input format, should be formatted as: [{ path: 'test/path', action: 'read' || 'write', value: 'set value if "action" is write' }]`
        );
      } else if (!path) {
        return errorActions(obj, 'No path provided');
      } else if (action != 'write' && action != 'read') {
        return errorActions(obj, 'Action needs to be set to "write" or "read"');
      } else if (action == 'write' && value == undefined) {
        return errorActions(obj, 'Action set to "write", but no value given');
      }
      return true;
    });
    return { inputErrors, filteredBatch };
  }
}

module.exports = { BatchRequestInstance };
