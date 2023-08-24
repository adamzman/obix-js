const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<obj is="obix:WatchOut" xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <list name="values" of="obix:obj">
        <bool val="false" href="/obix/config/Test/BooleanWritable/" is="/obix/def/control:BooleanWritable /obix/def/control:BooleanPoint obix:Point" display="false {ok} @ def" icon="/ord?module://icons/x16/control/booleanPoint.png" range="/obix/config/Test/BooleanWritable/out/~bool">
            <str name="facets" val="trueText=s:True|falseText=s:false" href="/obix/config/Test/BooleanWritable/facets/" display="trueText=True,falseText=false" displayName="Facets" writable="true"/>
            <ref name="proxyExt" href="/obix/config/Test/BooleanWritable/proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
            <bool name="out" val="false" href="/obix/config/Test/BooleanWritable/out/" is="/obix/def/baja:StatusBoolean" display="false {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/out/~bool">
   </bool>
            <bool name="in1" val="false" href="/obix/config/Test/BooleanWritable/in1/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in1/~bool">
   </bool>
            <bool name="in2" val="false" href="/obix/config/Test/BooleanWritable/in2/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in2/~bool">
   </bool>
            <bool name="in3" val="false" href="/obix/config/Test/BooleanWritable/in3/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in3/~bool">
   </bool>
            <bool name="in4" val="false" href="/obix/config/Test/BooleanWritable/in4/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in4/~bool">
   </bool>
            <bool name="in5" val="false" href="/obix/config/Test/BooleanWritable/in5/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in5/~bool">
   </bool>
            <bool name="in6" val="false" href="/obix/config/Test/BooleanWritable/in6/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in6/~bool">
   </bool>
            <bool name="in7" val="false" href="/obix/config/Test/BooleanWritable/in7/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in7/~bool">
   </bool>
            <bool name="in8" val="false" href="/obix/config/Test/BooleanWritable/in8/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in8/~bool">
   </bool>
            <bool name="in9" val="false" href="/obix/config/Test/BooleanWritable/in9/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in9/~bool">
   </bool>
            <bool name="in10" val="false" href="/obix/config/Test/BooleanWritable/in10/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in10/~bool">
   </bool>
            <bool name="in11" val="false" href="/obix/config/Test/BooleanWritable/in11/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in11/~bool">
   </bool>
            <bool name="in12" val="false" href="/obix/config/Test/BooleanWritable/in12/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in12/~bool">
   </bool>
            <bool name="in13" val="false" href="/obix/config/Test/BooleanWritable/in13/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in13/~bool">
   </bool>
            <bool name="in14" val="false" href="/obix/config/Test/BooleanWritable/in14/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in14/~bool">
   </bool>
            <bool name="in15" val="false" href="/obix/config/Test/BooleanWritable/in15/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in15/~bool">
   </bool>
            <bool name="in16" val="false" href="/obix/config/Test/BooleanWritable/in16/" is="/obix/def/baja:StatusBoolean" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/in16/~bool">
   </bool>
            <bool name="fallback" val="false" href="/obix/config/Test/BooleanWritable/fallback/" is="/obix/def/baja:StatusBoolean" display="false {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusBoolean.png" range="/obix/config/Test/BooleanWritable/fallback/~bool">
   </bool>
            <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="/obix/config/Test/BooleanWritable/overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
            <reltime name="minActiveTime" val="PT0S" href="/obix/config/Test/BooleanWritable/minActiveTime/" display="0 ms" displayName="Min Active Time" writable="true"/>
            <reltime name="minInactiveTime" val="PT0S" href="/obix/config/Test/BooleanWritable/minInactiveTime/" display="0 ms" displayName="Min Inactive Time" writable="true"/>
            <bool name="setMinInactiveTimeOnStart" val="false" href="/obix/config/Test/BooleanWritable/setMinInactiveTimeOnStart/" displayName="Set Min Inactive Time On Start" writable="true"/>
            <op name="emergencyActive" href="/obix/config/Test/BooleanWritable/emergencyActive/" displayName="Emergency Active"/>
            <op name="emergencyInactive" href="/obix/config/Test/BooleanWritable/emergencyInactive/" displayName="Emergency Inactive"/>
            <op name="emergencyAuto" href="/obix/config/Test/BooleanWritable/emergencyAuto/" displayName="Emergency Auto"/>
            <op name="active" href="/obix/config/Test/BooleanWritable/active/" in="/obix/def/control:Override" displayName="Active"/>
            <op name="inactive" href="/obix/config/Test/BooleanWritable/inactive/" in="/obix/def/control:Override" displayName="Inactive"/>
            <op name="auto" href="/obix/config/Test/BooleanWritable/auto/" displayName="Auto"/>
            <op name="set" href="/obix/config/Test/BooleanWritable/set/" in="obix:bool" displayName="Set"/>
            <str name="wsAnnotation" val="28,12,12" href="/obix/config/Test/BooleanWritable/wsAnnotation/"/>
        </bool>
        <real val="50.0" href="/obix/config/Test/NumericWritable/" is="/obix/def/control:NumericWritable /obix/def/control:NumericPoint obix:Point" display="50.0 {ok} @ def" icon="/ord?module://icons/x16/control/numericPoint.png" unit="obix:units/null">
            <str name="facets" val="units=u:null;;;;|precision=i:1|min=d:-inf|max=d:+inf" href="/obix/config/Test/NumericWritable/facets/" display="units=null,precision=1,min=-inf,max=+inf" displayName="Facets" writable="true"/>
            <ref name="proxyExt" href="/obix/config/Test/NumericWritable/proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
            <real name="out" val="50.0" href="/obix/config/Test/NumericWritable/out/" is="/obix/def/baja:StatusNumeric" display="50.0 {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in1" val="0.0" href="/obix/config/Test/NumericWritable/in1/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in2" val="0.0" href="/obix/config/Test/NumericWritable/in2/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in3" val="0.0" href="/obix/config/Test/NumericWritable/in3/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in4" val="0.0" href="/obix/config/Test/NumericWritable/in4/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in5" val="0.0" href="/obix/config/Test/NumericWritable/in5/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in6" val="0.0" href="/obix/config/Test/NumericWritable/in6/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in7" val="0.0" href="/obix/config/Test/NumericWritable/in7/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in8" val="0.0" href="/obix/config/Test/NumericWritable/in8/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in9" val="0.0" href="/obix/config/Test/NumericWritable/in9/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in10" val="0.0" href="/obix/config/Test/NumericWritable/in10/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in11" val="0.0" href="/obix/config/Test/NumericWritable/in11/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in12" val="0.0" href="/obix/config/Test/NumericWritable/in12/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in13" val="0.0" href="/obix/config/Test/NumericWritable/in13/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in14" val="0.0" href="/obix/config/Test/NumericWritable/in14/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in15" val="0.0" href="/obix/config/Test/NumericWritable/in15/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="in16" val="0.0" href="/obix/config/Test/NumericWritable/in16/" is="/obix/def/baja:StatusNumeric" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <real name="fallback" val="50.0" href="/obix/config/Test/NumericWritable/fallback/" is="/obix/def/baja:StatusNumeric" display="50.0 {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null">
   </real>
            <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="/obix/config/Test/NumericWritable/overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
            <op name="emergencyOverride" href="/obix/config/Test/NumericWritable/emergencyOverride/" in="obix:real" displayName="Emergency Override"/>
            <op name="emergencyAuto" href="/obix/config/Test/NumericWritable/emergencyAuto/" displayName="Emergency Auto"/>
            <op name="override" href="/obix/config/Test/NumericWritable/override/" in="/obix/def/control:NumericOverride /obix/def/control:Override" displayName="Override"/>
            <op name="auto" href="/obix/config/Test/NumericWritable/auto/" displayName="Auto"/>
            <op name="set" href="/obix/config/Test/NumericWritable/set/" in="obix:real" displayName="Set"/>
            <str name="wsAnnotation" val="6,12,12" href="/obix/config/Test/NumericWritable/wsAnnotation/"/>
            <ref name="NumericInterval" href="/obix/config/Test/NumericWritable/NumericInterval/" is="/obix/def/history:NumericIntervalHistoryExt" display="Numeric Interval History Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
        </real>
        <str val="T2esting" href="/obix/config/Test/StringWritable/" is="/obix/def/control:StringWritable /obix/def/control:StringPoint obix:Point" display="T2esting {ok} @ def" icon="/ord?module://icons/x16/control/stringPoint.png">
            <str name="facets" val="" href="/obix/config/Test/StringWritable/facets/" null="true" displayName="Facets" writable="true"/>
            <ref name="proxyExt" href="/obix/config/Test/StringWritable/proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
            <str name="out" val="T2esting" href="/obix/config/Test/StringWritable/out/" is="/obix/def/baja:StatusString" display="T2esting {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in1" val="" href="/obix/config/Test/StringWritable/in1/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in2" val="" href="/obix/config/Test/StringWritable/in2/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in3" val="" href="/obix/config/Test/StringWritable/in3/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in4" val="" href="/obix/config/Test/StringWritable/in4/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in5" val="" href="/obix/config/Test/StringWritable/in5/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in6" val="" href="/obix/config/Test/StringWritable/in6/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in7" val="" href="/obix/config/Test/StringWritable/in7/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in8" val="" href="/obix/config/Test/StringWritable/in8/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in9" val="" href="/obix/config/Test/StringWritable/in9/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in10" val="" href="/obix/config/Test/StringWritable/in10/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in11" val="" href="/obix/config/Test/StringWritable/in11/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in12" val="" href="/obix/config/Test/StringWritable/in12/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in13" val="" href="/obix/config/Test/StringWritable/in13/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in14" val="" href="/obix/config/Test/StringWritable/in14/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in15" val="" href="/obix/config/Test/StringWritable/in15/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="in16" val="" href="/obix/config/Test/StringWritable/in16/" is="/obix/def/baja:StatusString" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <str name="fallback" val="T2esting" href="/obix/config/Test/StringWritable/fallback/" is="/obix/def/baja:StatusString" display="T2esting {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusString.png">
   </str>
            <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="/obix/config/Test/StringWritable/overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
            <op name="emergencyOverride" href="/obix/config/Test/StringWritable/emergencyOverride/" in="/obix/def/baja:String" displayName="Emergency Override"/>
            <op name="emergencyAuto" href="/obix/config/Test/StringWritable/emergencyAuto/" displayName="Emergency Auto"/>
            <op name="override" href="/obix/config/Test/StringWritable/override/" in="/obix/def/control:StringOverride /obix/def/control:Override" displayName="Override"/>
            <op name="auto" href="/obix/config/Test/StringWritable/auto/" displayName="Auto"/>
            <op name="set" href="/obix/config/Test/StringWritable/set/" in="/obix/def/baja:String" displayName="Set"/>
            <str name="wsAnnotation" val="8,34,8" href="/obix/config/Test/StringWritable/wsAnnotation/"/>
            <obj name="subscriberLink" href="/obix/config/Test/StringWritable/subscriberLink/" is="/obix/def/baja:Link /obix/def/baja:Relation" display="Indirect: h:9e8e.out &#x2192; slot:/Test/StringWritable.na" icon="/ord?module://icons/x16/link.png">
                <uri name="sourceOrd" val="h:9e8e" href="/obix/config/Test/StringWritable/subscriberLink/sourceOrd/" displayName="Source Ord" writable="true"/>
                <str name="sourceSlotName" val="out" href="/obix/config/Test/StringWritable/subscriberLink/sourceSlotName/" displayName="Source Slot Name" writable="true"/>
                <str name="targetSlotName" val="na" href="/obix/config/Test/StringWritable/subscriberLink/targetSlotName/" displayName="Target Slot Name" writable="true"/>
                <bool name="enabled" val="true" href="/obix/config/Test/StringWritable/subscriberLink/enabled/" displayName="Enabled" writable="true"/>
            </obj>
        </str>
        <enum val="Test2" href="/obix/config/Test/EnumWritable/" is="/obix/def/control:EnumWritable /obix/def/control:EnumPoint obix:Point" display="Test2 {ok} @ def" icon="/ord?module://icons/x16/control/enumPoint.png" range="/obix/config/Test/EnumWritable/out/~range">
            <str name="facets" val="range=E:{Test=0,Test2=1,Test6=2}" href="/obix/config/Test/EnumWritable/facets/" display="range={Test=0,Test2=1,Test6=2}" displayName="Facets" writable="true"/>
            <ref name="proxyExt" href="/obix/config/Test/EnumWritable/proxyExt/" is="/obix/def/control:NullProxyExt" null="true" display="null" displayName="Proxy Ext" icon="/ord?module://icons/x16/control/controlExtension.png"/>
            <enum name="out" val="Test2" href="/obix/config/Test/EnumWritable/out/" is="/obix/def/baja:StatusEnum" display="Test2 {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/out/~range">
   </enum>
            <enum name="in1" val="Test" href="/obix/config/Test/EnumWritable/in1/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In1" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in1/~range">
   </enum>
            <enum name="in2" val="Test" href="/obix/config/Test/EnumWritable/in2/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In2" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in2/~range">
   </enum>
            <enum name="in3" val="Test" href="/obix/config/Test/EnumWritable/in3/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In3" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in3/~range">
   </enum>
            <enum name="in4" val="Test" href="/obix/config/Test/EnumWritable/in4/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In4" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in4/~range">
   </enum>
            <enum name="in5" val="Test" href="/obix/config/Test/EnumWritable/in5/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In5" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in5/~range">
   </enum>
            <enum name="in6" val="Test" href="/obix/config/Test/EnumWritable/in6/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In6" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in6/~range">
   </enum>
            <enum name="in7" val="Test" href="/obix/config/Test/EnumWritable/in7/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In7" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in7/~range">
   </enum>
            <enum name="in8" val="Test" href="/obix/config/Test/EnumWritable/in8/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In8" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in8/~range">
   </enum>
            <enum name="in9" val="Test" href="/obix/config/Test/EnumWritable/in9/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In9" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in9/~range">
   </enum>
            <enum name="in10" val="Test" href="/obix/config/Test/EnumWritable/in10/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In10" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in10/~range">
   </enum>
            <enum name="in11" val="Test" href="/obix/config/Test/EnumWritable/in11/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In11" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in11/~range">
   </enum>
            <enum name="in12" val="Test" href="/obix/config/Test/EnumWritable/in12/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In12" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in12/~range">
   </enum>
            <enum name="in13" val="Test" href="/obix/config/Test/EnumWritable/in13/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In13" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in13/~range">
   </enum>
            <enum name="in14" val="Test" href="/obix/config/Test/EnumWritable/in14/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In14" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in14/~range">
   </enum>
            <enum name="in15" val="Test" href="/obix/config/Test/EnumWritable/in15/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In15" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in15/~range">
   </enum>
            <enum name="in16" val="Test" href="/obix/config/Test/EnumWritable/in16/" is="/obix/def/baja:StatusEnum" null="true" display="- {null}" displayName="In16" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/in16/~range">
   </enum>
            <enum name="fallback" val="Test2" href="/obix/config/Test/EnumWritable/fallback/" is="/obix/def/baja:StatusEnum" display="Test2 {ok}" displayName="Fallback" icon="/ord?module://icons/x16/statusEnum.png" range="/obix/config/Test/EnumWritable/fallback/~range">
   </enum>
            <abstime name="overrideExpiration" val="1969-12-31T19:00:00.000-05:00" href="/obix/config/Test/EnumWritable/overrideExpiration/" null="true" display="null" displayName="Override Expiration" tz="America/New_York"/>
            <op name="emergencyOverride" href="/obix/config/Test/EnumWritable/emergencyOverride/" in="obix:enum" displayName="Emergency Override"/>
            <op name="emergencyAuto" href="/obix/config/Test/EnumWritable/emergencyAuto/" displayName="Emergency Auto"/>
            <op name="override" href="/obix/config/Test/EnumWritable/override/" in="/obix/def/control:EnumOverride /obix/def/control:Override" displayName="Override"/>
            <op name="auto" href="/obix/config/Test/EnumWritable/auto/" displayName="Auto"/>
            <op name="set" href="/obix/config/Test/EnumWritable/set/" in="obix:enum" displayName="Set"/>
            <str name="wsAnnotation" val="6,24,12" href="/obix/config/Test/EnumWritable/wsAnnotation/"/>
        </enum>
    </list>
</obj>`;

const responseConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });
const payload = `<obj>
<list>
  <uri val="/obix/config/Test/BooleanWritable/" />
  <uri val="/obix/config/Test/NumericWritable/" />
  <uri val="/obix/config/Test/StringWritable/" />
  <uri val="/obix/config/Test/EnumWritable/" />
</list>
</obj>`;

module.exports = { postWatcherAddResponse: responseConverted, postWatcherAddPayload: payload };
