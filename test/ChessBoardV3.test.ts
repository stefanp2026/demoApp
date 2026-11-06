import { expect, test } from 'vitest';
import { ChessBoardV3, type FigureColor, type FigureName } from '../src/client/ChessBoardV3.ts';

var chessBoard = new ChessBoardV3();

test('getCellId', function () {
    var cellId = chessBoard.getCellId(3, 4);
    expect(cellId).toBe('cell_3_4');
});

test('getFigureId', function () {
    var figureId = chessBoard.getFigureId('white', 'king');
    expect(figureId).toBe('figure_white_king');
});

test('getFigures', function () {
    var figures = chessBoard.getFigures();
    expect(figures.length).toBe(6);
});

test('getDisplayRowNumber', function () {
    var rowNumber = chessBoard.getDisplayRowNumber(3);
    expect(rowNumber).toBe(6);
});

test('getDisplayColumnNumber', function () {
    var column = chessBoard.getDisplayColumnNumber(3);
    expect(column).toBe('C');
});

test.each<[FigureName, number]>([
    ['pawn', 0],
    ['knight', -54],
    ['bishop', -108],
    ['tower', -162],
    ['king', -216],
    ['queen', -270],
])('getFigureXPositionInSpriteImage - %s', function (figure: FigureName, expectedPosition: number) {
    var xPosition = chessBoard.getFigureXPositionInSpriteImage(figure);
    expect(xPosition).toBe(expectedPosition);
});

test.each<[FigureColor, number]>([
    ['white', 0],
    ['black', -54],
])('getFigureYPositionInSpriteImage - %s', function (color: FigureColor, expectedPosition: number) {
    var yPosition = chessBoard.getFigureYPositionInSpriteImage(color);
    expect(yPosition).toBe(expectedPosition);
});

test('getStyleFor', function () {
    var style = chessBoard.getStyleFor('white', 'queen');
    expect(style.length).toBeGreaterThan(0);
});
