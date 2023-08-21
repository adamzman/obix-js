const { HistoryRequestInstance } = require('../../src/requests/history');

//#region Import Mocks
const { getCustomQueryResponse } = require('../mocks/requests/history/GET-custom-query');
const { getPresetQueryResponse, getInitialPresetQueryResponse } = require('../mocks/requests/history/GET-preset-query');
//#endregion Import Mocks

describe('HistoryRequestInstance', () => {
  let historyRequestInstance;
  let axiosGet = jest.fn();

  beforeEach(() => {
    const mockAxiosInstance = {
      get: axiosGet,
    };

    historyRequestInstance = new HistoryRequestInstance({ axiosInstance: mockAxiosInstance });
  });

  describe('historyRequest', () => {
    describe('presetQuery', () => {
      test('should get history with correct presetQuery string', async () => {
        historyRequestInstance.axiosInstance.get.mockResolvedValueOnce({ data: getInitialPresetQueryResponse });
        historyRequestInstance.axiosInstance.get.mockResolvedValueOnce({ data: getPresetQueryResponse });
        const query = 'yesterday';

        const result = await historyRequestInstance.historyRequest({ path: 'Test/Ramp', query });

        expect(axiosGet).toHaveBeenCalledWith('histories/Test/Ramp');
        expect(axiosGet).toHaveBeenCalledWith(
          'histories/Test/Ramp~historyQuery?start=2023-08-19T00:00:00.000-04:00&end=2023-08-19T23:59:59.999-04:00'
        );
        expect(result).toEqual({
          history: 'Test/Ramp',
          start: 'Saturday, August 19, 2023 3:06 PM EDT',
          end: 'Sunday, August 20, 2023 8:05 PM EDT',
          limit: '103',
          timezone: 'America/New_York',
          results: [
            {
              timestamp: 'Saturday, August 19, 2023 3:06 PM EDT',
              value: '88.54000091552734',
            },
            {
              timestamp: 'Saturday, August 19, 2023 3:08 PM EDT',
              value: '67.913330078125',
            },
            {
              timestamp: 'Saturday, August 19, 2023 3:15 PM EDT',
              value: '61.97999954223633',
            },
            {
              timestamp: 'Saturday, August 19, 2023 3:20 PM EDT',
              value: '43.22666549682617',
            },
            {
              timestamp: 'Saturday, August 19, 2023 3:25 PM EDT',
              value: '54.37333297729492',
            },
          ],
        });
      });
      test('should throw InvalidHistoryPresetQuery if an invalid presetQuery string is passed', async () => {
        expect.assertions(4);

        try {
          await historyRequestInstance.historyRequest({
            path: 'History/Test/BooleanWritable',
            query: 'invalid',
          });
        } catch (error) {
          expect(error.message).toBe('Invalid preset history query: invalid');
          expect(error.name).toBe('InvalidHistoryPresetQuery');
          expect(error.friendlyError).toBe('Invalid preset history query: invalid');
          expect(error.inDepthError).toEqual(expect.any(String));
        }
      });
    });
    describe('customQuery', () => {
      test('should get history with correct custom query', async () => {
        historyRequestInstance.axiosInstance.get.mockResolvedValue({ data: getCustomQueryResponse });
        const query = {
          start: '2023-08-15T09:51:15.062Z',
          end: '2023-08-20T09:51:15.062Z',
          limit: 10,
        };

        const result = await historyRequestInstance.historyRequest({ path: 'Test/Ramp', query });

        expect(axiosGet).toHaveBeenCalledWith('histories/Test/Ramp/~historyQuery/', {
          params: query,
        });
        expect(result).toEqual({
          end: 'Friday, August 18, 2023 11:00 AM EDT',
          history: 'Test/Ramp',
          limit: '10',
          results: [
            { timestamp: 'Tuesday, August 15, 2023 8:31 PM EDT', value: '2.6066665649414062' },
            { timestamp: 'Tuesday, August 15, 2023 8:35 PM EDT', value: '56.253334045410156' },
            { timestamp: 'Tuesday, August 15, 2023 8:40 PM EDT', value: '43.540000915527344' },
            { timestamp: 'Tuesday, August 15, 2023 9:42 PM EDT', value: '15.626667022705078' },
            { timestamp: 'Wednesday, August 16, 2023 12:42 AM EDT', value: '41.459999084472656' },
            { timestamp: 'Friday, August 18, 2023 10:38 AM EDT', value: '32.606666564941406' },
            { timestamp: 'Friday, August 18, 2023 10:45 AM EDT', value: '75.83333587646484' },
            { timestamp: 'Friday, August 18, 2023 10:50 AM EDT', value: '68.33333587646484' },
            { timestamp: 'Friday, August 18, 2023 10:55 AM EDT', value: '76.66666412353516' },
            { timestamp: 'Friday, August 18, 2023 11:00 AM EDT', value: '69.27333068847656' },
          ],
          start: 'Tuesday, August 15, 2023 8:31 PM EDT',
          timezone: 'America/New_York',
        });
      });
      test('should throw InvalidHistoryQueryParameter error if start is not correct datetime format', async () => {
        expect.assertions(4);

        try {
          await historyRequestInstance.historyRequest({
            path: 'History/Test/BooleanWritable',
            query: {
              start: 'invalid',
              end: new Date().getTime(),
              limit: 5,
            },
          });
        } catch (error) {
          expect(error.message).toBe('Invalid parameter in history query: start');
          expect(error.name).toBe('InvalidHistoryQueryParameter');
          expect(error.friendlyError).toBe('Invalid parameter in history query: start');
          expect(error.inDepthError).toBe("'start' parameter must be a valid date but received : invalid");
        }
      });
      test('should throw InvalidHistoryQueryParameter error if end is not correct datetime format', async () => {
        expect.assertions(4);

        try {
          await historyRequestInstance.historyRequest({
            path: 'History/Test/BooleanWritable',
            query: {
              start: new Date().getTime(),
              end: 'invalid',
              limit: 5,
            },
          });
        } catch (error) {
          expect(error.message).toBe('Invalid parameter in history query: end');
          expect(error.name).toBe('InvalidHistoryQueryParameter');
          expect(error.friendlyError).toBe('Invalid parameter in history query: end');
          expect(error.inDepthError).toBe("'end' parameter must be a valid date but received : invalid");
        }
      });
      test('should throw InvalidHistoryQueryParameter error if limit is not an integer', async () => {
        expect.assertions(4);

        try {
          await historyRequestInstance.historyRequest({
            path: 'History/Test/BooleanWritable',
            query: {
              start: new Date().getTime(),
              end: new Date().getTime(),
              limit: 'invalid',
            },
          });
        } catch (error) {
          expect(error.message).toBe('Invalid parameter in history query: limit');
          expect(error.name).toBe('InvalidHistoryQueryParameter');
          expect(error.friendlyError).toBe('Invalid parameter in history query: limit');
          expect(error.inDepthError).toBe("'limit' parameter must be an number but received : invalid");
        }
      });
    });
    test('should throw MissingHistoryQuery if the query is missing', async () => {
      expect.assertions(4);

      try {
        await historyRequestInstance.historyRequest({ path: 'History/Test/BooleanWritable' });
      } catch (error) {
        expect(error.message).toBe('Missing history query');
        expect(error.name).toBe('MissingHistoryQuery');
        expect(error.friendlyError).toBe('Missing history query');
        expect(error.inDepthError).toBe('Missing history query');
      }
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      historyRequestInstance.axiosInstance.get.mockRejectedValue(new Error());

      try {
        await historyRequestInstance.historyRequest({ path: 'History/Test/BooleanWritable', query: 'yesterday' });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
