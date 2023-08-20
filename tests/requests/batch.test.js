const { BatchRequestInstance } = require('../../src/requests/batch');

//#region Import Mocks
const {
  postBatchResponse: postBatchSomeErrorsResponse,
  postBatchPayload: postBatchSomeErrorsPayload,
} = require('../mocks/requests/batch/POST-batch-some-errors');
const {
  postBatchResponse: postBatchNoErrorsResponse,
  postBatchPayload: postBatchNoErrorsPayload,
} = require('../mocks/requests/batch/POST-batch-no-errors');
//#endregion Import Mocks

describe('BatchRequestInstance', () => {
  let batchRequestInstance;
  let axiosPost = jest.fn();

  beforeEach(() => {
    const mockAxiosInstance = {
      defaults: {
        baseURL: 'https://localhost:443/obix/',
      },
      post: axiosPost,
    };

    batchRequestInstance = new BatchRequestInstance({ axiosInstance: mockAxiosInstance });
  });

  describe('batchRequest', () => {
    test('should handle valid batch request', async () => {
      batchRequestInstance.axiosInstance.post.mockResolvedValue({ data: postBatchNoErrorsResponse });
      const batch = [
        { path: 'Test/BooleanWritable', action: 'read' },
        { path: 'Test/NumericWritable', action: 'write', value: 50 },
      ];

      const result = await batchRequestInstance.batchRequest({ batch });

      const axiosPostPayload = axiosPost.mock.calls[0][1].replace(/\s+/g, '');
      const axiosPostExpectedPayload = postBatchNoErrorsPayload.replace(/\s+/g, '');

      expect(axiosPostExpectedPayload).toEqual(axiosPostPayload);
      expect(axiosPost.mock.calls[0][0]).toBe('batch');
      expect(result).toEqual([
        { path: 'Test/NumericWritable', value: 50, action: 'write' },
        { path: 'Test/BooleanWritable', value: false, action: 'read' },
      ]);
    });
    test('should handle error in batch response', async () => {
      batchRequestInstance.axiosInstance.post.mockResolvedValue({ data: postBatchSomeErrorsResponse });
      const batch = [
        { path: 'Test/BooleanWritable2', action: 'read' },
        { path: 'Test/NumericWritable', action: 'write', value: 50 },
      ];

      const result = await batchRequestInstance.batchRequest({ batch });

      const axiosPostPayload = axiosPost.mock.calls[0][1].replace(/\s+/g, '');
      const axiosPostExpectedPayload = postBatchSomeErrorsPayload.replace(/\s+/g, '');

      expect(axiosPostExpectedPayload).toEqual(axiosPostPayload);
      expect(axiosPost.mock.calls[0][0]).toBe('batch');
      expect(result).toEqual([
        { path: 'Test/BooleanWritable2', error: true, reason: 'Invalid Path/Uri: /Test/BooleanWritable2/out' },
        { path: 'Test/NumericWritable', value: 50, action: 'write' },
      ]);
    });
    test('should remove invalid batch objects and run valid ones', async () => {
      batchRequestInstance.axiosInstance.post.mockResolvedValue({ data: postBatchNoErrorsResponse });
      const batch = [
        { path: 'Test/BooleanWritable', action: 'read' },
        { path: 'Test/NumericWritable', action: 'write', value: 50 },
        { value: 50 }, // missing path and action
        { action: 'write', value: 50 }, // missing path
        { path: 'Test/NumericWritable' }, // missing action
        { path: 'Test/NumericWritable', action: 'write' }, // missing value when action == 'write'
      ];

      const result = await batchRequestInstance.batchRequest({ batch });

      const axiosPostPayload = axiosPost.mock.calls[0][1].replace(/\s+/g, '');
      const axiosPostExpectedPayload = postBatchNoErrorsPayload.replace(/\s+/g, '');

      expect(axiosPostExpectedPayload).toEqual(axiosPostPayload);
      expect(axiosPost.mock.calls[0][0]).toBe('batch');
      expect(result).toEqual([
        {
          error: true,
          reason: `Invalid batch input format, should be formatted as: [{ path: 'test/path', action: 'read' || 'write', value: 'set value if "action" is write' }]`,
        },
        { value: 50, error: true, reason: 'No path provided' },
        {
          path: 'Test/NumericWritable',
          error: true,
          reason: 'Action needs to be set to "write" or "read"',
        },
        {
          path: 'Test/NumericWritable',
          error: true,
          reason: 'Action set to "write", but no value given',
        },
        { path: 'Test/NumericWritable', value: 50, action: 'write' },
        { path: 'Test/BooleanWritable', value: false, action: 'read' },
      ]);
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      batchRequestInstance.axiosInstance.post.mockRejectedValue(new Error());
      const batch = [
        { path: 'Test/BooleanWritable2', action: 'read' },
        { path: 'Test/NumericWritable', action: 'write', value: 50 },
      ];

      try {
        await batchRequestInstance.batchRequest({ batch });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
