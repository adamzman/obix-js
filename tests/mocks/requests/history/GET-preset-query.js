const convert = require('xml-js');

const initialResponseData = `
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<obj href="https://localhost/obix/histories/Test/Ramp/" is="obix:History" display="com.tridium.history.db.BLocalDbHistory" icon="/ord?module://icons/x16/history.png" xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <int name="count" val="2736"/>
    <abstime name="start" val="2021-06-15T14:10:00.034-04:00" tz="America/New_York"/>
    <abstime name="end" val="2023-08-20T20:00:00.009-04:00" tz="America/New_York"/>
    <op name="query" href="~historyQuery/" in="/obix/def/obix:HistoryFilter" out="/obix/def/obix:HistoryQueryOut"/>
    <op name="rollup" href="~historyRollup/" in="/obix/def/obix:HistoryRollupIn" out="/obix/def/obix:HistoryRollupOut"/>
    <feed name="feed" href="~historyFeed/" of="/obix/def/obix:HistoryRecord" in="/obix/def/obix:HistoryFilter"/>
    <op name="append" href="~historyAppend/" in="/obix/def/obix:HistoryAppendIn" out="/obix/def/obix:HistoryAppendOut"/>
    <ref name="unboundedQuery" href="~historyQuery?limit=1000"/>
    <ref name="today" href="~historyQuery?start=2023-08-20T00:00:00.000-04:00&amp;end=2023-08-20T20:00:22.919-04:00"/>
    <ref name="last24Hours" href="~historyQuery?start=2023-08-19T20:00:22.919-04:00&amp;end=2023-08-20T20:00:22.919-04:00"/>
    <ref name="yesterday" href="~historyQuery?start=2023-08-19T00:00:00.000-04:00&amp;end=2023-08-19T23:59:59.999-04:00"/>
    <ref name="weekToDate" href="~historyQuery?start=2023-08-20T00:00:00.000-04:00&amp;end=2023-08-20T20:00:22.919-04:00"/>
    <ref name="lastWeek" href="~historyQuery?start=2023-08-13T23:59:59.999-04:00&amp;end=2023-08-19T23:59:59.999-04:00"/>
    <ref name="last7Days" href="~historyQuery?start=2023-08-13T20:00:22.919-04:00&amp;end=2023-08-20T20:00:22.919-04:00"/>
    <ref name="monthToDate" href="~historyQuery?start=2023-08-01T00:00:00.000-04:00&amp;end=2023-08-20T20:00:22.919-04:00"/>
    <ref name="lastMonth" href="~historyQuery?start=2023-07-01T00:00:00.000-04:00&amp;end=2023-07-31T23:59:59.999-04:00"/>
    <ref name="yearToDate (limit=1000)" href="~historyQuery?start=2023-01-01T00:00:00.000-05:00&amp;end=2023-08-20T20:00:22.919-04:00&amp;limit=1000"/>
    <ref name="lastYear (limit=1000)" href="~historyQuery?start=2022-01-01T00:00:00.000-05:00&amp;end=2022-12-31T23:59:59.999-05:00&amp;limit=1000"/>
</obj>`;

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<obj href="https://localhost/obix/histories/Test/Ramp/~historyQuery/" is="obix:HistoryQueryOut" xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <list name="data" of="#RecordDef obix:HistoryRecord">
        <obj>
            <abstime name="timestamp" val="2023-08-19T15:06:08.527-04:00" tz="America/New_York"/>
            <real name="value" val="88.54000091552734"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-19T15:08:39.270-04:00" tz="America/New_York"/>
            <real name="value" val="67.913330078125"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-19T15:15:00.026-04:00" tz="America/New_York"/>
            <real name="value" val="61.97999954223633"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-19T15:20:00.023-04:00" tz="America/New_York"/>
            <real name="value" val="43.22666549682617"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-19T15:25:00.010-04:00" tz="America/New_York"/>
            <real name="value" val="54.37333297729492"/>
        </obj>
    </list>
    <int name="count" val="103"/>
    <abstime name="start" val="2023-08-19T15:06:08.527-04:00" tz="America/New_York"/>
    <abstime name="end" val="2023-08-20T20:05:00.007-04:00" tz="America/New_York"/>
    <obj href="#RecordDef" is="obix:HistoryRecord">
        <abstime name="timestamp" tz="America/New_York"/>
        <real name="value" unit="obix:units/null"/>
    </obj>
</obj>`;

const responseDataConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });
const initialResponseDataConverted = convert.xml2js(initialResponseData, { compact: true, spaces: 4 });

module.exports = {
  getPresetQueryResponse: responseDataConverted,
  getInitialPresetQueryResponse: initialResponseDataConverted,
};
