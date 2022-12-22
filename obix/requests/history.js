const moment = require('moment-timezone');
const { stripPaths, makeArray } = require('../helpers');

//#region Errors
class MissingHistoryQuery extends Error {
  constructor() {
    super('Missing history query');
    this.name = 'MissingHistoryQuery';
    this.friendlyError = this.message;
    this.inDepthError = this.message;
  }
}

class InvalidHistoryPresetQuery extends Error {
  constructor(query, presetOptions) {
    super(`Invalid preset history query: ${query}`);
    this.name = 'InvalidHistoryPresetQuery';
    this.friendlyError = this.message;
    this.inDepthError = `Valid preset queries include:\n${presetOptions.join('\n')}`;
  }
}

class InvalidHistoryQueryParameter extends Error {
  constructor(parameter, paramValue) {
    super(`Invalid parameter in history query: ${parameter}`);
    this.name = 'InvalidHistoryQueryParameter';
    if (parameter == 'limit') {
      this.friendlyError = this.message;
      this.inDepthError = `'limit' parameter must be an number but received : ${paramValue}`;
    } else if (parameter == 'start' || parameter == 'end') {
      this.friendlyError = this.message;
      this.inDepthError = `'${parameter}' parameter must be a valid date but received : ${paramValue}`;
    }
  }
}
//#endregion Errors

class HistoryRequestInstance {
  constructor({ axiosInstance }) {
    this.axiosInstance = axiosInstance;
  }

  async historyRequest({ path, query }) {
    if (!query) throw new MissingHistoryQuery();
    path = stripPaths(path)[0];
    let historyData;

    // Check if query is a presetQuery or custom timestamps
    if (typeof query == 'string') {
      const presetOptions = [
        'yesterday',
        'last24Hours',
        'weekToDate',
        'lastWeek',
        'last7Days',
        'monthToDate',
        'lastMonth',
        'yearToDate (limit=1000)',
        'lastYear (limit=1000)',
        'unboundedQuery',
      ];
      if (!presetOptions.some((option) => option == query)) {
        throw new InvalidHistoryPresetQuery(query, presetOptions);
      }

      // Call to get all preset queries
      const { data: presetQueryData } = await this.axiosInstance.get(`histories/${path}`);
      query = presetQueryData.obj.ref.find((presetQuery) => presetQuery._attributes.name == query)?._attributes.href;
      historyData = (await this.axiosInstance.get(`histories/${path}${query}`)).data;
    } else {
      if (query.start) {
        try {
          query.start = new Date(query.start).toISOString();
        } catch (error) {
          throw new InvalidHistoryQueryParameter('start', query.start);
        }
      }
      if (query.end) {
        try {
          query.end = new Date(query.end).toISOString();
        } catch (error) {
          throw new InvalidHistoryQueryParameter('end', query.end);
        }
      }
      if (query.limit) {
        if (!Number.isInteger(Number(query.limit))) {
          throw new InvalidHistoryQueryParameter('limit', query.limit);
        }
      }

      historyData = (await this.axiosInstance.get(`histories/${path}/~historyQuery/`, { params: query })).data;
    }
    return this.#parseHistoryDataHelper({ data: historyData.obj, path });
  }

  #parseHistoryDataHelper({ data, path }) {
    const values = [];
    const timezone = data.obj.abstime._attributes.tz;
    const limit = data.int._attributes.val;
    let start = data.abstime.find((abstime) => abstime._attributes.name == 'start')._attributes.val;
    let end = data.abstime.find((abstime) => abstime._attributes.name == 'end')._attributes.val;
    start = moment(data.abstime[0]._attributes.val).tz(timezone).format('LLLL z');
    end = moment(data.abstime[1]._attributes.val).tz(timezone).format('LLLL z');

    const dataObjList = makeArray(data.list.obj);
    dataObjList.forEach((dataObj) =>
      values.push({
        timestamp: moment(dataObj.abstime._attributes.val).tz(timezone).format('LLLL z'),
        value: String(dataObj.real._attributes.val),
      })
    );

    return {
      history: path,
      start,
      end,
      limit,
      timezone,
      results: values,
    };
  }
}

module.exports = { HistoryRequestInstance };
