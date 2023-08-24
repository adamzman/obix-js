const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<real val="200.15" is="/obix/def/control:NumericWritable /obix/def/control:NumericPoint obix:Point" display="200.2 {ok} @ def" icon="/ord?module://icons/x16/control/numericPoint.png" unit="obix:units/null"
  xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <str name="facets" val="units=u:null;;;;|precision=i:1|min=d:-inf|max=d:+inf" href="facets/" display="units=null,precision=1,min=-inf,max=+inf" displayName="Facets" writable="true"/>
  <ref name="proxyExt" href="proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
  <real name="out" val="200.15" href="out/" is="/obix/def/baja:StatusNumeric" display="200.2 {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in1" val="0.0" href="in1/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in2" val="0.0" href="in2/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in3" val="0.0" href="in3/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in4" val="0.0" href="in4/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in5" val="0.0" href="in5/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in6" val="0.0" href="in6/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in7" val="0.0" href="in7/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in8" val="0.0" href="in8/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in9" val="0.0" href="in9/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in10" val="0.0" href="in10/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in11" val="0.0" href="in11/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in12" val="0.0" href="in12/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in13" val="0.0" href="in13/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in14" val="0.0" href="in14/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in15" val="0.0" href="in15/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="in16" val="0.0" href="in16/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <real name="fallback" val="200.15" href="fallback/" is="/obix/def/baja:StatusNumeric" display="200.2 {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
  </real>
  <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
  <op name="emergencyOverride" href="emergencyOverride/" in="obix:real" displayName="Emergency Override"/>
  <op name="emergencyAuto" href="emergencyAuto/" displayName="Emergency Auto"/>
  <op name="override" href="override/" in="/obix/def/control:NumericOverride /obix/def/control:Override" displayName="Override"/>
  <op name="auto" href="auto/" displayName="Auto"/>
  <op name="set" href="set/" in="obix:real" displayName="Set"/>
  <str name="wsAnnotation" val="6,12,12" href="wsAnnotation/"/>
  <ref name="NumericInterval" href="NumericInterval/" is="/obix/def/history:NumericIntervalHistoryExt" display="Numeric Interval History Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
</real>`;

const responseConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });
const payload = `<real val="200.15"/>`;

module.exports = { postNumericResponse: responseConverted, postNumericPayload: payload };
