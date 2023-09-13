const cheerio = require('cheerio');

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

    const $ = cheerio.load(data);
    const $table = $('table');

    if ($table.length === 0) {
      return []; // Handle the case where the table is not found
    }

    const $rows = $table.find('tr');
    if ($rows.length < 2) {
      return []; // Handle the case where there are no data rows
    }

    const $headers = $rows.eq(0).find('th');
    const parsedDataArray = [];

    function convertType(value) {
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

    $rows.slice(1).each(function () {
      const $cells = $(this).find('td');

      if ($cells.length !== $headers.length) {
        return; // Skip rows with mismatched cell count
      }

      const rowData = {};

      $headers.slice(0, -1).each(function (j) {
        const headerText = $(this).text().trim().replace(' ', '_');
        const cellText = convertType($cells.eq(j).text().trim());
        rowData[headerText] = cellText;
      });

      parsedDataArray.push(rowData);
    });

    return parsedDataArray;
  }
}

module.exports = { BQLQueryInstance };
