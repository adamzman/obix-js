const { StandardRequestInstance } = require('../../src/requests/standard');

//#region Import Mocks
const { postBooleanResponse, postBooleanPayload } = require('../mocks/requests/standard/POST-boolean');
const { postEnumResponse, postEnumPayload } = require('../mocks/requests/standard/POST-enum');
const { postNumericResponse, postNumericPayload } = require('../mocks/requests/standard/POST-numeric');
const { postStringResponse, postStringPayload } = require('../mocks/requests/standard/POST-string');

const { getBooleanResponse } = require('../mocks/requests/standard/GET-boolean');
const { getEnumResponse } = require('../mocks/requests/standard/GET-enum');
const { getNumericResponse } = require('../mocks/requests/standard/GET-numeric');
const { getStringResponse } = require('../mocks/requests/standard/GET-string');
//#endregion Import Mocks

describe('StandardRequestInstance', () => {
  let standardRequestInstance;
  let axiosPost = jest.fn();
  let axiosGet = jest.fn();

  beforeEach(() => {
    const mockAxiosInstance = {
      post: axiosPost,
      get: axiosGet,
    };

    standardRequestInstance = new StandardRequestInstance({ axiosInstance: mockAxiosInstance });
  });

  describe('writeRequest', () => {
    test('should handle valid boolean request', async () => {
      standardRequestInstance.axiosInstance.post.mockResolvedValue({ data: postBooleanResponse });
      const path = 'Test/Path';
      const value = false;

      const result = await standardRequestInstance.writeRequest({ path, value });

      expect(axiosPost).toHaveBeenCalledWith('config/Test/Path/set/', postBooleanPayload);
      expect(result).toEqual({ action: 'write', path: 'Test/Path', value: false });
    });
    test('should handle valid enum request', async () => {
      standardRequestInstance.axiosInstance.post.mockResolvedValue({ data: postEnumResponse });
      const path = 'Test/Path';
      const value = '1';

      const result = await standardRequestInstance.writeRequest({ path, value });

      expect(axiosPost).toHaveBeenCalledWith('config/Test/Path/set/', postEnumPayload);
      expect(result).toEqual({ action: 'write', path: 'Test/Path', value: 'Test2' });
    });
    test('should handle valid numeric request', async () => {
      standardRequestInstance.axiosInstance.post.mockResolvedValue({ data: postNumericResponse });
      const path = 'Test/Path';
      const value = 200.15;

      const result = await standardRequestInstance.writeRequest({ path, value });

      expect(axiosPost).toHaveBeenCalledWith('config/Test/Path/set/', postNumericPayload);
      expect(result).toEqual({ action: 'write', path: 'Test/Path', value: 200.15 });
    });
    test('should handle valid string request', async () => {
      standardRequestInstance.axiosInstance.post.mockResolvedValue({ data: postStringResponse });
      const path = 'Test/Path';
      const value = 'Testing';

      const result = await standardRequestInstance.writeRequest({ path, value });

      expect(axiosPost).toHaveBeenCalledWith('config/Test/Path/set/', postStringPayload);
      expect(result).toEqual({ action: 'write', path: 'Test/Path', value: 'Testing' });
    });
    test('should handle a trailing path', async () => {
      standardRequestInstance.axiosInstance.post.mockResolvedValue({ data: postBooleanResponse });
      const path = '/Test/Path/';
      const value = false;

      const result = await standardRequestInstance.writeRequest({ path, value });

      expect(axiosPost).toHaveBeenCalledWith('config/Test/Path/set/', postBooleanPayload);
      expect(result).toEqual({ action: 'write', path: 'Test/Path', value: false });
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      standardRequestInstance.axiosInstance.post.mockRejectedValue(new Error());
      const path = 'Test/Path';
      const value = false;

      try {
        await standardRequestInstance.post({ path, value });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
  describe('readRequest', () => {
    test('should handle valid boolean request', async () => {
      standardRequestInstance.axiosInstance.get.mockResolvedValue({ data: getBooleanResponse });
      const path = 'Test/Path';

      const result = await standardRequestInstance.readRequest({ path });

      expect(axiosGet).toHaveBeenCalledWith('config/Test/Path/out/');
      expect(result).toEqual({ action: 'read', path: 'Test/Path', value: false });
    });
    test('should handle valid enum request', async () => {
      standardRequestInstance.axiosInstance.get.mockResolvedValue({ data: getEnumResponse });
      const path = 'Test/Path';

      const result = await standardRequestInstance.readRequest({ path });

      expect(axiosGet).toHaveBeenCalledWith('config/Test/Path/out/');
      expect(result).toEqual({ action: 'read', path: 'Test/Path', value: 'Test' });
    });
    test('should handle valid numeric request', async () => {
      standardRequestInstance.axiosInstance.get.mockResolvedValue({ data: getNumericResponse });
      const path = 'Test/Path';

      const result = await standardRequestInstance.readRequest({ path });

      expect(axiosGet).toHaveBeenCalledWith('config/Test/Path/out/');
      expect(result).toEqual({ action: 'read', path: 'Test/Path', value: 6.88 });
    });
    test('should handle valid string request', async () => {
      standardRequestInstance.axiosInstance.get.mockResolvedValue({ data: getStringResponse });
      const path = 'Test/Path';

      const result = await standardRequestInstance.readRequest({ path });

      expect(axiosGet).toHaveBeenCalledWith('config/Test/Path/out/');
      expect(result).toEqual({ action: 'read', path: 'Test/Path', value: 'Test' });
    });
    test('should handle a trailing path', async () => {
      standardRequestInstance.axiosInstance.get.mockResolvedValue({ data: getBooleanResponse });
      const path = '/Test/Path/';

      const result = await standardRequestInstance.readRequest({ path });

      expect(axiosGet).toHaveBeenCalledWith('config/Test/Path/out/');
      expect(result).toEqual({ action: 'read', path: 'Test/Path', value: false });
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      standardRequestInstance.axiosInstance.get.mockRejectedValue(new Error());
      const path = 'Test/Path';

      try {
        await standardRequestInstance.post({ path });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
