const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<obj is="obix:WatchOut" xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <list name="values" of="obix:obj">
        <real val="30.42" href="/obix/config/Test/Ramp/" is="/obix/def/kitControl:Ramp /obix/def/control:NumericPoint obix:Point" display="30.4 {ok}" icon="/ord?module://icons/x16/control/util/sine.png" unit="obix:units/null">
            <str name="facets" val="units=u:null;;;;|precision=i:1|min=d:-inf|max=d:+inf" href="/obix/config/Test/Ramp/facets/" display="units=null,precision=1,min=-inf,max=+inf" displayName="Facets" writable="true"/>
            <ref name="proxyExt" href="/obix/config/Test/Ramp/proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
            <real name="out" val="30.42" href="/obix/config/Test/Ramp/out/" is="/obix/def/baja:StatusNumeric" display="30.4 {ok}" displayName="Out" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <bool name="enabled" val="true" href="/obix/config/Test/Ramp/enabled/" displayName="Enabled" writable="true"/>
            <reltime name="period" val="PT30S" href="/obix/config/Test/Ramp/period/" display="30 seconds" displayName="Period" writable="true"/>
            <real name="amplitude" val="50.0" href="/obix/config/Test/Ramp/amplitude/" display="50.00" displayName="Amplitude" writable="true"/>
            <real name="offset" val="50.0" href="/obix/config/Test/Ramp/offset/" display="50.00" displayName="Offset" writable="true"/>
            <reltime name="updateInterval" val="PT5S" href="/obix/config/Test/Ramp/updateInterval/" display="5 seconds" displayName="Update Interval" writable="true"/>
            <enum name="waveform" val="triangle" href="/obix/config/Test/Ramp/waveform/" display="Triangle" displayName="Waveform" range="/obix/def/kitControl:RampWaveform/~range" writable="true"/>
            <str name="wsAnnotation" val="6,2,12" href="/obix/config/Test/Ramp/wsAnnotation/"/>
            <ref name="NumericInterval" href="/obix/config/Test/Ramp/NumericInterval/" is="/obix/def/history:NumericIntervalHistoryExt" display="Numeric Interval History Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
        </real>
    </list>
</obj>`;

const responseConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });

module.exports = { postWatcherPollChangesResponse: responseConverted };
