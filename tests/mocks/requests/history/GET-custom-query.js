const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<obj href="https://localhost/obix/histories/Test/Ramp/~historyQuery/" is="obix:HistoryQueryOut" xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <list name="data" of="#RecordDef obix:HistoryRecord">
        <obj>
            <abstime name="timestamp" val="2023-08-15T20:31:09.560-04:00" tz="America/New_York"/>
            <real name="value" val="2.6066665649414062"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-15T20:35:00.012-04:00" tz="America/New_York"/>
            <real name="value" val="56.253334045410156"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-15T20:40:00.023-04:00" tz="America/New_York"/>
            <real name="value" val="43.540000915527344"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-15T21:42:12.509-04:00" tz="America/New_York"/>
            <real name="value" val="15.626667022705078"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-16T00:42:14.507-04:00" tz="America/New_York"/>
            <real name="value" val="41.459999084472656"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-18T10:38:11.557-04:00" tz="America/New_York"/>
            <real name="value" val="32.606666564941406"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-18T10:45:01.025-04:00" tz="America/New_York"/>
            <real name="value" val="75.83333587646484"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-18T10:50:00.015-04:00" tz="America/New_York"/>
            <real name="value" val="68.33333587646484"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-18T10:55:00.011-04:00" tz="America/New_York"/>
            <real name="value" val="76.66666412353516"/>
        </obj>
        <obj>
            <abstime name="timestamp" val="2023-08-18T11:00:00.018-04:00" tz="America/New_York"/>
            <real name="value" val="69.27333068847656"/>
        </obj>
    </list>
    <int name="count" val="10"/>
    <abstime name="start" val="2023-08-15T20:31:09.560-04:00" tz="America/New_York"/>
    <abstime name="end" val="2023-08-18T11:00:00.018-04:00" tz="America/New_York"/>
    <obj href="#RecordDef" is="obix:HistoryRecord">
        <abstime name="timestamp" tz="America/New_York"/>
        <real name="value" unit="obix:units/null"/>
    </obj>
</obj>`;

const responseDataConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });

module.exports = { getCustomQueryResponse: responseDataConverted };
