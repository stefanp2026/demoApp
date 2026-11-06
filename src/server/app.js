import express from 'express';
import path from 'node:path';
import pug from 'pug';
import { ChessBoardV3 } from '../client/ChessBoardV3.js';

var rootDir = path.join(import.meta.dirname, '..', '..');
var clientDir = path.join(import.meta.dirname, '..', 'client');
var viewsDir = path.join(import.meta.dirname, '..', 'views');

var app = express();
var chessBoard = new ChessBoardV3();

initApp(app, pug);

function initApp(app, pug) {
    console.log('app: begin initialisation');

    app.use(express.static(path.join(rootDir, 'public')));
    // client modules live in src/client but keep their public URL /js
    app.use('/js', express.static(clientDir));

    var pageTitle = 'Stefan Prodana: Demo mit node.js, express, pug, jQuery gehostet im AWS';

    getPage(app, pug, '/', 'ChessBoardDemo.pug', pageTitle, 'Schachbrett');
    getPage(app, pug, '/ChessBoard.html', 'ChessBoardDemo.pug', pageTitle, 'Schachbrett');
    getPage(app, pug, '/Chessgame.html', 'Chessgame.pug', pageTitle, 'Schachspiel');
    getPage(app, pug, '/KnightProblem.html', 'KnightProblem.pug', pageTitle, 'Schach Springer Problem');
    getPage(app, pug, '/Description.html', 'Description.pug', pageTitle, 'Kurze Beschreibung');
    getPage(app, pug, '/JsTests.html', 'jsTests.pug', pageTitle, 'JavaScript Teste');

    app.listen(3001, function () {
        console.log('started to listen to serve client requests');
    });

    console.log('app: end initialisation');
}

/**
 * Gets the page with the specified relative url. 
 * @param {string} app: the express app instance.
 * @param {string} relativePageUrl: the relative url to the page. 
 */
function getPage(app, pug, relativePageUrl, templateFileName, thePageTitle, thePageName) {
    app.get(relativePageUrl, function (req, res) {

        var templateFilePath = path.join(viewsDir, templateFileName);
        var compiledFunction = pug.compileFile(templateFilePath);
        var html = compiledFunction({
            pageTitle: thePageTitle,
            pageName: thePageName,
            chessBoard : chessBoard,
        });

        console.log('served the page ' + relativePageUrl);
        res.send(html);
    });
}