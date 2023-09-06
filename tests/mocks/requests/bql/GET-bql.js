const responseData = `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html>
    <head>
        <title>Table</title>
        <style type='text/css'>
		body {
			font: 10pt verdana;
		}

		table {
			border: 0px;
			border-spacing: 0px;
		}

		th {
			white-space: nowrap;
			text-align: left;
			padding: 1px 8px;
			background: #BFBFBF;
		}

		td {
			white-space: nowrap;
			padding: 1px 8px;
			margin: 0px;
		}

		.odd {
			background: #F7F7F7
		}

		.fill {
			width: 100%;
		}
	</style>
    </head>
    <body>
        <table class='fill'>
            <tr>
                <th>Slot Path</th>
                <th>To String</th>
                <th>Facets</th>
                <th>Proxy Ext</th>
                <th class='fill'>

                </td>
            </tr>
            <tr class='odd'>
                <td>slot:/Test/Ramp</td>
                <td>44.8 {ok}</td>
                <td>units=null,precision=1,min=-inf,max=+inf</td>
                <td>null</td>
                <td class='fill'></td>
            </tr>
            <tr class='even'>
                <td>slot:/Test/BooleanWritable</td>
                <td>false {ok} @ def</td>
                <td>trueText=True,falseText=false</td>
                <td>null</td>
                <td class='fill'></td>
            </tr>
            <tr class='odd'>
                <td>slot:/Test/NumericWritable</td>
                <td>50.0 {ok} @ def</td>
                <td>units=null,precision=1,min=-inf,max=+inf</td>
                <td>null</td>
                <td class='fill'></td>
            </tr>
            <tr class='even'>
                <td>slot:/Test/EnumWritable</td>
                <td>Test2 {ok} @ def</td>
                <td>range={Test=0,Test2=1,Test6=2}</td>
                <td>null</td>
                <td class='fill'></td>
            </tr>
            <tr class='odd'>
                <td>slot:/Test/BooleanWritable1</td>
                <td>true {ok} @ def</td>
                <td>trueText=true,falseText=false</td>
                <td>null</td>
                <td class='fill'></td>
            </tr>
            <tr class='even'>
                <td>slot:/Test/StringWritable</td>
                <td>T2esting {ok} @ def</td>
                <td></td>
                <td>null</td>
                <td class='fill'></td>
            </tr>
        </table>
    </body>
</html>`;

module.exports = { getBQLResponse: responseData };
