const { WatcherRequestInstance } = require('../../src/requests/watcher');

//#region Import Mocks
const { postWatcherCreateResponse } = require('../mocks/requests/watcher/POST-watcher-create');
const { postWatcherAddPayload, postWatcherAddResponse } = require('../mocks/requests/watcher/POST-watcher-add');
const { postWatcherRemovePayload, postWatcherRemoveResponse } = require('../mocks/requests/watcher/POST-watcher-remove');
const { postWatcherDeleteResponse } = require('../mocks/requests/watcher/POST-watcher-delete');
const { postWatcherPollChangesResponse } = require('../mocks/requests/watcher/POST-watcher-pollChanges');
const { postWatcherPollRefreshResponse } = require('../mocks/requests/watcher/POST-watcher-pollRefresh');
//#endregion Import Mocks

describe('WatcherRequestInstance', () => {
  let watcherRequestInstance;
  let axiosPost = jest.fn();
  let axiosGet = jest.fn();
  let axiosPut = jest.fn();

  beforeEach(() => {
    const mockAxiosInstance = {
      post: axiosPost,
      get: axiosGet,
      put: axiosPut,
    };

    watcherRequestInstance = new WatcherRequestInstance({ axiosInstance: mockAxiosInstance });
  });

  describe('watcherUpdateDefaultLease', () => {
    test('should update the default watcher lease time with number', async () => {
      await watcherRequestInstance.watcherUpdateDefaultLease({ leaseTime: 10 });
      expect(axiosPut).toHaveBeenCalledWith('/watchService/defaultLeaseTime/', '<real val="10" />');
    });
    test('should update the default watcher lease time with string', async () => {
      await watcherRequestInstance.watcherUpdateDefaultLease({ leaseTime: 'PT4M30S' });
      expect(axiosPut).toHaveBeenCalledWith('/watchService/defaultLeaseTime/', '<reltime val="PT4M30S" />');
    });
    test('should throw error if axios fails', async () => {
      expect.assertions(1);
      watcherRequestInstance.axiosInstance.put.mockRejectedValueOnce(new Error());
      try {
        await watcherRequestInstance.watcherUpdateDefaultLease({ leaseTime: 10 });
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  describe('watcherCreate', () => {
    test('should return an object that contains all the methods available to the watcher', async () => {
      watcherRequestInstance.axiosInstance.post.mockResolvedValue({ data: postWatcherCreateResponse });
      const result = await watcherRequestInstance.watcherCreate();

      expect(result).toEqual({
        name: 'watch101',
        add: expect.any(Function),
        remove: expect.any(Function),
        delete: expect.any(Function),
        pollChanges: expect.any(Function),
        pollRefresh: expect.any(Function),
        lease: expect.any(Function),
      });
    });
    describe('watcherAdd', () => {
      test('should be able to add a set of paths to the created watcher', async () => {
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherCreateResponse });
        const watcher = await watcherRequestInstance.watcherCreate();
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherAddResponse });
        const result = await watcher.add({ paths: ['Test/BooleanWritable', '/Test/NumericWritable/', '/Test/StringWritable', 'Test/EnumWritable/'] });

        const axiosPostPayload = axiosPost.mock.calls[1][1].replace(/\s+/g, '');
        const axiosPostExpectedPayload = postWatcherAddPayload.replace(/\s+/g, '');

        expect(axiosPostExpectedPayload).toEqual(axiosPostPayload);
        expect(axiosPost.mock.calls[1][0]).toBe('https://localhost/obix/watchService/watch101/add/');
        expect(result).toEqual([
          {
            path: 'Test/NumericWritable',
            value: 50,
            action: 'read',
          },
          {
            path: 'Test/BooleanWritable',
            value: false,
            action: 'read',
          },
          {
            path: 'Test/StringWritable',
            value: 'T2esting',
            action: 'read',
          },
          {
            path: 'Test/EnumWritable',
            value: 'Test2',
            action: 'read',
          },
        ]);
      });
    });
    describe('watcherRemovePath', () => {
      test('should be able to remove a set of paths in the created watcher', async () => {
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherCreateResponse });
        const watcher = await watcherRequestInstance.watcherCreate();
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherRemoveResponse });
        await watcher.remove({ paths: 'Test/BooleanWritable' });

        const axiosPostPayload = axiosPost.mock.calls[1][1].replace(/\s+/g, '');
        const axiosPostExpectedPayload = postWatcherRemovePayload.replace(/\s+/g, '');

        expect(axiosPostExpectedPayload).toEqual(axiosPostPayload);
        expect(axiosPost.mock.calls[1][0]).toBe('https://localhost/obix/watchService/watch101/remove/');
      });
    });
    describe('watcherDelete', () => {
      test('should be able to delete the created watcher', async () => {
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherCreateResponse });
        const watcher = await watcherRequestInstance.watcherCreate();
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherDeleteResponse });
        await watcher.delete();

        expect(axiosPost.mock.calls[1][0]).toBe('https://localhost/obix/watchService/watch101/delete/');
      });
    });
    describe('watcherPollChanges', () => {
      test('should poll the changes in values from the created watcher', async () => {
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherCreateResponse });
        const watcher = await watcherRequestInstance.watcherCreate();
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherPollChangesResponse });
        const result = await watcher.pollChanges();

        expect(axiosPost.mock.calls[1][0]).toBe('https://localhost/obix/watchService/watch101/pollChanges/');
        expect(result).toEqual([
          {
            path: 'Test/Ramp',
            value: 30.42,
            action: 'read',
          },
        ]);
      });
    });
    describe('watcherPollRefresh', () => {
      test('should poll all values from the created watcher', async () => {
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherCreateResponse });
        const watcher = await watcherRequestInstance.watcherCreate();
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherPollRefreshResponse });
        const result = await watcher.pollRefresh();

        expect(axiosPost.mock.calls[1][0]).toBe('https://localhost/obix/watchService/watch101/pollRefresh/');
        expect(result).toEqual([
          {
            path: 'Test/Ramp',
            value: 31.979999999999997,
            action: 'read',
          },
          {
            path: 'Test/NumericWritable',
            value: 50,
            action: 'read',
          },
          {
            path: 'Test/StringWritable',
            value: 'T2esting',
            action: 'read',
          },
          {
            path: 'Test/EnumWritable',
            value: 'Test2',
            action: 'read',
          },
        ]);
      });
    });
    describe('watcherUpdateLease', () => {
      test('should update the watcher lease time with number', async () => {
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherCreateResponse });
        const watcher = await watcherRequestInstance.watcherCreate();
        await watcher.lease({ leaseTime: 10 });

        expect(axiosPut).toHaveBeenCalledWith('https://localhost/obix/watchService/watch101/lease/', '<real val="10" />');
      });
      test('should update the watcher lease time with string', async () => {
        watcherRequestInstance.axiosInstance.post.mockResolvedValueOnce({ data: postWatcherCreateResponse });
        const watcher = await watcherRequestInstance.watcherCreate();
        await watcher.lease({ leaseTime: 'PT4M30S' });

        expect(axiosPut).toHaveBeenCalledWith('https://localhost/obix/watchService/watch101/lease/', '<reltime val="PT4M30S" />');
      });
    });
  });
});
