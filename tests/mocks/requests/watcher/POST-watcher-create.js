const convert = require('xml-js');

const responseData = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type='text/xsl' href='/obix/xsl'?>
<obj href="https://localhost/obix/watchService/watch101/" is="obix:Watch" display="Obix Watch" xmlns="http://obix.org/ns/schema/1.0" xsi:schemaLocation="http://obix.org/ns/schema/1.0 /obix/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <reltime name="lease" val="PT4M0S" href="https://localhost/obix/watchService/watch101/lease/" display="4 minutes" displayName="Lease" writable="true"/>
    <op name="add" href="https://localhost/obix/watchService/watch101/add/" in="obix:WatchIn" out="obix:WatchOut"/>
    <op name="remove" href="https://localhost/obix/watchService/watch101/remove/" in="obix:WatchIn" out="obix:Nil"/>
    <op name="pollChanges" href="https://localhost/obix/watchService/watch101/pollChanges/" in="obix:Nil" out="obix:WatchOut"/>
    <op name="pollRefresh" href="https://localhost/obix/watchService/watch101/pollRefresh/" in="obix:Nil" out="obix:WatchOut"/>
    <op name="delete" href="https://localhost/obix/watchService/watch101/delete/" in="obix:Nil" out="obix:Nil"/>
</obj>`;

const responseConverted = convert.xml2js(responseData, { compact: true, spaces: 4 });

module.exports = { postWatcherCreateResponse: responseConverted };
