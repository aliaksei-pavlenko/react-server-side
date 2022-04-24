import React from 'react';
import {renderToString} from 'react-dom/server';

import http from 'http';

import Component from './Component/Component';

export const sheets = {storage:[]};


function MyApp () {

    return (
        <body>
            <Component/>
        </body>
    )
}


http.createServer(async (req,res)=>{

    if(req.url === '/'){

        sheets.storage = [];

        const body = renderToString(<MyApp/>);

        // пидорский renderToString заменяет валидные для css символы на escape sequences - поэтому просто строкой отдаю
        const styleSheets = sheets.storage.map(sheet=>`<style>${sheet}</style>`).join('');
    
        res.end(
                `
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8"/>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                            <meta name="description" content="${'This page about ...'}"/>
                            <meta name="keywords" content="one,two,three"/>
                            <title>Page title</title>
                            ${styleSheets}
                        </head>
                        ${body}
                    </html>
                `
            )    

    } else {
        res.end('')
    }
  
    
}).listen(3332)

console.log('server started at 3332 port')


