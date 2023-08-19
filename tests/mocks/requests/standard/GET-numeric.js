const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<real val="6.88" href="https://localhost/obix/config/Test/Ramp/out/" is="/obix/def/baja:StatusNumeric" display="6.9 {ok}" displayName="Out" icon="/ord?module://icons/x16/statusNumeric.png" unit="obix:units/null"
  xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"></real>`;

const responseDataConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });

module.exports = { getNumericResponse: responseDataConverted };
