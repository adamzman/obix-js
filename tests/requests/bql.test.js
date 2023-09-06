const { BQLQueryInstance } = require('../../src/requests/bql');

//#region Import Mocks
const { getBQLResponse } = require('../mocks/requests/bql/GET-bql');
//#endregion Import Mocks

describe('BQLQueryInstance', () => {
  let bqlQueryInstance;
  let axiosGet = jest.fn();

  beforeEach(() => {
    const mockAxiosInstance = {
      get: axiosGet,
    };

    bqlQueryInstance = new BQLQueryInstance({ axiosInstance: mockAxiosInstance });
  });

  describe('bqlQuery', () => {
    test('should handle valid bql request', async () => {
      bqlQueryInstance.axiosInstance.get.mockResolvedValueOnce({ data: getBQLResponse });
      const query = 'station:|history:/Test|bql:select%20*';

      const result = await bqlQueryInstance.bqlQuery({ query });

      expect(axiosGet).toHaveBeenCalledWith('ord?station:|history:/Test|bql:select%20*|view:file:ITableToHtml');
      expect(result).toEqual([
        {
          Slot_Path: 'slot:/Test/Ramp',
          To_String: '44.8 {ok}',
          Facets: 'units=null,precision=1,min=-inf,max=+inf',
          Proxy_Ext: null,
        },
        {
          Slot_Path: 'slot:/Test/BooleanWritable',
          To_String: 'false {ok} @ def',
          Facets: 'trueText=True,falseText=false',
          Proxy_Ext: null,
        },
        {
          Slot_Path: 'slot:/Test/NumericWritable',
          To_String: '50.0 {ok} @ def',
          Facets: 'units=null,precision=1,min=-inf,max=+inf',
          Proxy_Ext: null,
        },
        {
          Slot_Path: 'slot:/Test/EnumWritable',
          To_String: 'Test2 {ok} @ def',
          Facets: 'range={Test=0,Test2=1,Test6=2}',
          Proxy_Ext: null,
        },
        {
          Slot_Path: 'slot:/Test/BooleanWritable1',
          To_String: 'true {ok} @ def',
          Facets: 'trueText=true,falseText=false',
          Proxy_Ext: null,
        },
        {
          Slot_Path: 'slot:/Test/StringWritable',
          To_String: 'T2esting {ok} @ def',
          Facets: '',
          Proxy_Ext: null,
        },
      ]);
    });
    test('should throw MissingBQLQuery if no query is passed', async () => {
      expect.assertions(4);

      try {
        await bqlQueryInstance.bqlQuery();
      } catch (error) {
        expect(error.message).toBe('Missing BQL query');
        expect(error.name).toBe('MissingBQLQuery');
        expect(error.friendlyError).toBe('Missing BQL query');
        expect(error.inDepthError).toBe('Query parameter missing from request');
      }
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      bqlQueryInstance.axiosInstance.get.mockRejectedValue(new Error());
      const query = 'station:|history:/Test|bql:select%20*';

      try {
        await bqlQueryInstance.bqlQuery({ query });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
