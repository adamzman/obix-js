const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<str val="Testing" is="/obix/def/control:StringWritable /obix/def/control:StringPoint obix:Point" display="Testing {ok} @ def" icon="/ord?module://icons/x16/control/stringPoint.png"
  xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <str name="facets" val="" href="facets/" null="true" displayName="Facets" writable="true"/>
  <ref name="proxyExt" href="proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
  <str name="out" val="Testing" href="out/" is="/obix/def/baja:StatusString" display="Testing {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in1" val="" href="in1/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in2" val="" href="in2/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in3" val="" href="in3/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in4" val="" href="in4/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in5" val="" href="in5/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in6" val="" href="in6/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in7" val="" href="in7/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in8" val="" href="in8/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in9" val="" href="in9/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in10" val="" href="in10/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in11" val="" href="in11/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in12" val="" href="in12/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in13" val="" href="in13/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in14" val="" href="in14/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in15" val="" href="in15/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="in16" val="" href="in16/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <str name="fallback" val="Testing" href="fallback/" is="/obix/def/baja:StatusString" display="Testing {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusString.png">
  </str>
  <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
  <op name="emergencyOverride" href="emergencyOverride/" in="/obix/def/baja:String" displayName="Emergency Override"/>
  <op name="emergencyAuto" href="emergencyAuto/" displayName="Emergency Auto"/>
  <op name="override" href="override/" in="/obix/def/control:StringOverride /obix/def/control:Override" displayName="Override"/>
  <op name="auto" href="auto/" displayName="Auto"/>
  <op name="set" href="set/" in="/obix/def/baja:String" displayName="Set"/>
  <str name="wsAnnotation" val="8,34,8" href="wsAnnotation/"/>
</str>`;

const responseConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });
const payload = `<real val="Testing"/>`;

module.exports = { postStringResponse: responseConverted, postStringPayload: payload };
