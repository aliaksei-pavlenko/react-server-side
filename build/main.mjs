import React from 'react';
import { renderToString } from 'react-dom/server';
import http from 'http';
import { JssProvider, SheetsRegistry } from 'react-jss';
import Component from './Component.mjs';

function MyApp({
  sheets
}) {
  return /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement(JssProvider, {
    registry: sheets
  }, /*#__PURE__*/React.createElement(Component, null)));
}

http.createServer(async (req, res) => {
  /* here you can make some request before make run react and make html string */
  const sheets = new SheetsRegistry();
  const body = renderToString( /*#__PURE__*/React.createElement(MyApp, {
    sheets: sheets
  })); // all createUseStyles in components fill context - that is why this line execute after all

  const styleSheet = renderToString( /*#__PURE__*/React.createElement("style", {
    type: "text/css"
  }, sheets.toString()));
  res.end(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <meta name="description" content="${'This page about ...'}"/>
                        <meta name="keywords" content="one,two,three"/>
                        <title>Page title</title>
                        ${styleSheet}
                    </head>
                    ${body}
                </html>
            `);
}).listen(3332);
console.log('server started at 3332 port');