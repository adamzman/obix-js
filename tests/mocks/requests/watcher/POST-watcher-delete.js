const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<obj null="true" xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>`;

const responseConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });

module.exports = { postWatcherDeleteResponse: responseConverted };
