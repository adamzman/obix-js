const convert = require('xml-js');

const data = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<str val="Test" href="https://localhost/obix/config/Test/StringWritable/out/" is="/obix/def/baja:StatusString" display="Test {ok} @ def" displayName="Out" icon="/ord?module://icons/x16/statusString.png"
  xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"></str>`;

const getString = convert.xml2js(data, { compact: true, spaces: 4 });
module.exports = { getString };
