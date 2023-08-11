const convert = require('xml-js');

const data = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<enum val="Test2" is="/obix/def/control:EnumWritable /obix/def/control:EnumPoint obix:Point" display="Test2 {ok} @ def" icon="/ord?module://icons/x16/control/enumPoint.png" range="/obix/config/Test/EnumWritable/out/~range"
  xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <str name="facets" val="range=E:{Test=0,Test2=1,Test6=2}" href="facets/" display="range={Test=0,Test2=1,Test6=2}" displayName="Facets" writable="true"/>
  <ref name="proxyExt" href="proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
  <enum name="out" val="Test2" href="out/" is="/obix/def/baja:StatusEnum" display="Test2 {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusEnum.png" range="out/~range">
  </enum>
  <enum name="in1" val="Test" href="in1/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusEnum.png" range="in1/~range">
  </enum>
  <enum name="in2" val="Test" href="in2/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusEnum.png" range="in2/~range">
  </enum>
  <enum name="in3" val="Test" href="in3/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusEnum.png" range="in3/~range">
  </enum>
  <enum name="in4" val="Test" href="in4/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusEnum.png" range="in4/~range">
  </enum>
  <enum name="in5" val="Test" href="in5/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusEnum.png" range="in5/~range">
  </enum>
  <enum name="in6" val="Test" href="in6/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusEnum.png" range="in6/~range">
  </enum>
  <enum name="in7" val="Test" href="in7/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusEnum.png" range="in7/~range">
  </enum>
  <enum name="in8" val="Test" href="in8/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusEnum.png" range="in8/~range">
  </enum>
  <enum name="in9" val="Test" href="in9/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusEnum.png" range="in9/~range">
  </enum>
  <enum name="in10" val="Test" href="in10/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusEnum.png" range="in10/~range">
  </enum>
  <enum name="in11" val="Test" href="in11/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusEnum.png" range="in11/~range">
  </enum>
  <enum name="in12" val="Test" href="in12/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusEnum.png" range="in12/~range">
  </enum>
  <enum name="in13" val="Test" href="in13/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusEnum.png" range="in13/~range">
  </enum>
  <enum name="in14" val="Test" href="in14/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusEnum.png" range="in14/~range">
  </enum>
  <enum name="in15" val="Test" href="in15/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusEnum.png" range="in15/~range">
  </enum>
  <enum name="in16" val="Test" href="in16/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusEnum.png" range="in16/~range">
  </enum>
  <enum name="fallback" val="Test2" href="fallback/" is="/obix/def/baja:StatusEnum" display="Test2 {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusEnum.png" range="fallback/~range">
  </enum>
  <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
  <op name="emergencyOverride" href="emergencyOverride/" in="obix:enum" displayName="Emergency Override"/>
  <op name="emergencyAuto" href="emergencyAuto/" displayName="Emergency Auto"/>
  <op name="override" href="override/" in="/obix/def/control:EnumOverride /obix/def/control:Override" displayName="Override"/>
  <op name="auto" href="auto/" displayName="Auto"/>
  <op name="set" href="set/" in="obix:enum" displayName="Set"/>
  <str name="wsAnnotation" val="6,24,12" href="wsAnnotation/"/>
</enum>`;

const postEnum = convert.xml2js(data, { compact: true, spaces: 4 });
module.exports = { postEnum };
