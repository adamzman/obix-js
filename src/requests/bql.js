const { parse } = require('node-html-parser');

//#region Errors
class MissingBQLQuery extends Error {
  constructor() {
    super('Missing BQL query');
    this.name = 'MissingBQLQuery';
    this.friendlyError = this.message;
    this.inDepthError = 'Query parameter missing from request';
  }
}
//#endregion Errors

class BQLQueryInstance {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
  }

  async bqlQuery({ query } = {}) {
    if (!query) throw new MissingBQLQuery();

    const { data } = await this.axiosInstance.get(`ord?${query}|view:file:ITableToHtml`);

    const root = parse(data);
    const table = root.querySelector('table');

    const rows = table.querySelectorAll('tr');
    const headers = rows[0].querySelectorAll('th');

    const parsedDataArray = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.querySelectorAll('td');
      const rowData = {};

      for (let j = 0; j < headers.length - 1; j++) {
        // Exclude the last "class" cell
        const headerText = headers[j].text.trim().replace(' ', '_');
        const cellText = cells[j].text.trim();
        rowData[headerText] = this.#convertType(cellText);
      }

      parsedDataArray.push(rowData);
    }
    return parsedDataArray;
  }

  //#region Helpers
  #convertType(value) {
    // Check for specific values and convert them
    if (value === 'null') {
      return null;
    } else if (value === '') {
      return value;
    } else if (value === 'true' || value === 'false') {
      return value === 'true';
    } else if (!isNaN(value)) {
      return parseFloat(value); // Convert to number
    } else {
      return value; // Keep as is
    }
  }
  //#endregion Helpers
}

module.exports = { BQLQueryInstance };
