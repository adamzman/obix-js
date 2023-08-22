const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<bool val="false" is="/obix/def/control:BooleanWritable /obix/def/control:BooleanPoint obix:Point" display="false {ok} @ def" icon="/ord?module://icons/x16/control/booleanPoint.png" range="/obix/config/Test/BooleanWritable/out/~bool"
  xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <str name="facets" val="trueText=s:True|falseText=s:false" href="facets/" display="trueText=True,falseText=false" displayName="Facets" writable="true"/>
  <ref name="proxyExt" href="proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
  <bool name="out" val="false" href="out/" is="/obix/def/baja:StatusBoolean" display="false {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusBoolean.png" range="out/~bool">
  </bool>
  <bool name="in1" val="false" href="in1/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusBoolean.png" range="in1/~bool">
  </bool>
  <bool name="in2" val="false" href="in2/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusBoolean.png" range="in2/~bool">
  </bool>
  <bool name="in3" val="false" href="in3/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusBoolean.png" range="in3/~bool">
  </bool>
  <bool name="in4" val="false" href="in4/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusBoolean.png" range="in4/~bool">
  </bool>
  <bool name="in5" val="false" href="in5/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusBoolean.png" range="in5/~bool">
  </bool>
  <bool name="in6" val="false" href="in6/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusBoolean.png" range="in6/~bool">
  </bool>
  <bool name="in7" val="false" href="in7/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusBoolean.png" range="in7/~bool">
  </bool>
  <bool name="in8" val="false" href="in8/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusBoolean.png" range="in8/~bool">
  </bool>
  <bool name="in9" val="false" href="in9/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusBoolean.png" range="in9/~bool">
  </bool>
  <bool name="in10" val="false" href="in10/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusBoolean.png" range="in10/~bool">
  </bool>
  <bool name="in11" val="false" href="in11/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusBoolean.png" range="in11/~bool">
  </bool>
  <bool name="in12" val="false" href="in12/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusBoolean.png" range="in12/~bool">
  </bool>
  <bool name="in13" val="false" href="in13/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusBoolean.png" range="in13/~bool">
  </bool>
  <bool name="in14" val="false" href="in14/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusBoolean.png" range="in14/~bool">
  </bool>
  <bool name="in15" val="false" href="in15/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusBoolean.png" range="in15/~bool">
  </bool>
  <bool name="in16" val="false" href="in16/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusBoolean.png" range="in16/~bool">
  </bool>
  <bool name="fallback" val="false" href="fallback/" is="/obix/def/baja:StatusBoolean" display="false {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusBoolean.png" range="fallback/~bool">
  </bool>
  <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
  <reltime name="minActiveTime" val="PT0S" href="minActiveTime/" display="0 ms" displayName="Min Active Time" writable="true"/>
  <reltime name="minInactiveTime" val="PT0S" href="minInactiveTime/" display="0 ms" displayName="Min Inactive Time" writable="true"/>
  <bool name="setMinInactiveTimeOnStart" val="false" href="setMinInactiveTimeOnStart/" displayName="Set Min Inactive Time On Start" writable="true"/>
  <op name="emergencyActive" href="emergencyActive/" displayName="Emergency Active"/>
  <op name="emergencyInactive" href="emergencyInactive/" displayName="Emergency Inactive"/>
  <op name="emergencyAuto" href="emergencyAuto/" displayName="Emergency Auto"/>
  <op name="active" href="active/" in="/obix/def/control:Override" displayName="Active"/>
  <op name="inactive" href="inactive/" in="/obix/def/control:Override" displayName="Inactive"/>
  <op name="auto" href="auto/" displayName="Auto"/>
  <op name="set" href="set/" in="obix:bool" displayName="Set"/>
  <str name="wsAnnotation" val="28,12,12" href="wsAnnotation/"/>
</bool>`;

const responseConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });
const payload = `<real val="false"/>`;

module.exports = { postBooleanResponse: responseConverted, postBooleanPayload: payload };
