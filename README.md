# obix-js

Javascript library that contains the core functions for communicating with Tridium Niagara using obix protocol.

## Create Instance

### Obix

Import and create new `ObixInstance` passing the `protocol`, `host`, `port`, `username`, and `password`.

```
const { ObixInstance } = require('obix-js');
const obix = new ObixInstance({
  protocol: String ('https' or 'http'),
  host: String (Niagara IP Address),
  port: String | Number (Niagara web service port),
  username: String (Obix username),
  password: String (Obix password),
  timeout: Optional Number (ms until request timeout)
})
```

### BQL

Import and create new `BQLInstance` passing the `protocol`, `host`, `port`, `username`, and `password`.

```
const { BQLInstance } = require('obix-js');
const bql = new BQLInstance({
  protocol: String ('https' or 'http'),
  host: String (Niagara IP Address),
  port: String | Number (Niagara web service port),
  username: String (HTTPBasic username),
  password: String (HTTPBasic password),
  timeout: Optional Number (ms until request timeout)
})
```

## Obix Methods

Use newly created `ObixInstance` to call methods.

### History

```
const historyResult = await obix.history({
  path: String,
  query: String | Object
})
```

- `path`: Niagara history path... ex. `histories/TestHistories/History`, only take `"TestHistories/History"` (String)
- `query`: Time range of history data to retrieve (String | Object)

  - Preset Options (String) :
    - "yesterday"
    - "last24Hours"
    - "weekToDate"
    - "lastWeek"
    - "last7Days"
    - "monthToDate"
    - "lastMonth"
    - "yearToDate (limit=1000)"
    - "lastYear (limit=1000)"
    - "unboundedQuery"
  - Custom History (Object) :

    ```
    {
      "start": "2020-10-11T12:40:05-04:00",
      "end": "2020-10-14T12:40:05-04:00" || Date.now(),
      "limit": "2"
    }
    ```

    - **Start and end can be in any JS Date format**
    - Start and end are the periods of reading data, and the limit is the number of records returned.
    - If there are more records than the limit allows, then it returns the number of records starting from the start time.

### Batch

```
const batchResult = await obix.batch({
  batch: Object | Object[]
})
```

- `batch`: Mixture of read/write commands to be executed (String | Object)

  ```
  [
    {
      "path": "Point/Test",
      "action": "write",
      "value": "test"
    },
    {
      "path": "Point/Test1",
      "action": "read"
    },
  ]
  ```

### Read

```
const readResult = await obix.read({
  path: String
})
```

- `path`: Niagara point path... ex. `config/TestFolder/TestPoint`, only take `"TestFolder/TestPoint"` (String)

### Write

```
const writeResult = await obix.write({
  path: String,
  value: String | Boolean | Number
})
```

- `path`: Niagara point path... ex. `config/TestFolder/TestPoint`, only take `"TestFolder/TestPoint"` (String)
- `value`: Value that will be written to the point specified in the path (String)

### Get

Returns the raw JSON after being converted from the XML response

```
const getResult = await obix.get({
  path: String
})
```

- `path`: Niagara point path... ex. `config/TestFolder/TestPoint` (String)

### Post

Returns the raw JSON after being converted from the XML response

> The payload must replace any special characters: [Replace Special Characters](https://stackoverflow.com/questions/1091945/what-characters-do-i-need-to-escape-in-xml-documents#:~:text=XML%20escape%20characters,the%20W3C%20Markup%20Validation%20Service)

```
const postResult = await obix.post({
  path: String,
  payload: String
})
```

- `path`: Niagara point path... ex. `config/TestFolder/TestPoint` (String)
- `payload`: XML string that will be sent as the body of the post request... ex. `<bool val='false'/>` (String)

### Watcher Create

```
const watcher = await obix.watcherCreate();
const addResult = await watcher.add({ paths: ["Test/Path1", "Test/Path2"] });
const removeResult = await watcher.remove({ paths: ["Test/Path2"] });
const pollChangesResult = await watcher.pollChanges();
const leaseResult = await watcher.lease({ leaseTime: 5000 });
```

- Returns watcher object

  ```
  {
    name: String,
    add: Function({ paths: String[] }),
    remove: Function({ paths: String[] }),
    delete: Function,
    pollChanges: Function,
    pollRefresh: Function,
    lease: Function({ leaseTime: Number<'milliseconds'> | String<'ISO 8601 Format'> })
  }
  ```

  - `name`: Watcher name (String)
  - `add`: Add paths to watcher (Function)
  - `remove`: Remove paths from watcher (Function)
  - `delete`: Delete watcher (Function)
  - `pollChanges`: Poll all watcher's configured paths that have changed since last poll (Function)
  - `pollRefresh`: Poll all watcher's configured paths (Function)
  - `lease`: Update watcher's lease time; amount of time until watcher is automatically delete if no polling occurs (Function)

### Watcher Default Lease

```
const result = await obix.watcherUpdateDefaultLease({ leaseTime: 'PT4M30S' });
```

- `leaseTime`: Default lease time for all newly created watchers (Number<'milliseconds'> | String<'ISO 8601 Format'>)

## BQL Methods

Use newly created `BQLInstance` to call methods.

### Query

Returns an array of objects.

> Example queries can be found [here](https://gist.github.com/mrupperman/8a0761bbb416b8ef1ca4f51c228f63bf)

```
const postResult = await bql.query({
  query: String
})
```

- `query`: String that will be appended to the bql get request... ex. `station:|history:/TestStation|bql:select *` (String)
