import { ChessBoardV3 } from './ChessBoardV3.js';

/**
 * Arranges the chess figures on a chess board.
 */
export function FigureArranger() {
    this.chessBoard = new ChessBoardV3();

    /**
     * Arranges all the figures on the specified chess board.
     */
    this.arrangeFiguresOnChessBoard = function (chessBoardId) {
        this.arrangeNotPawns(chessBoardId, 'white');

        for (var i = 1; i <= 8; i++) {
            this.arrangeFigure(chessBoardId, 2, i, 'white', 'pawn');
        }

        this.arrangeNotPawns(chessBoardId, 'black');

        for (var i = 1; i <= 8; i++) {
            this.arrangeFigure(chessBoardId, 7, i, 'black', 'pawn');
        }
    }

    this.arrangeNotPawns = function (chessBoardId, color) {
        var line = 1;

        if (color === 'black') {
            line = 8;
        }

        this.arrangeFigure(chessBoardId, line, 1, color, 'tower');
        this.arrangeFigure(chessBoardId, line, 2, color, 'knight');
        this.arrangeFigure(chessBoardId, line, 3, color, 'bishop');
        this.arrangeFigure(chessBoardId, line, 4, color, 'king');
        this.arrangeFigure(chessBoardId, line, 5, color, 'queen');
        this.arrangeFigure(chessBoardId, line, 6, color, 'bishop');
        this.arrangeFigure(chessBoardId, line, 7, color, 'knight');
        this.arrangeFigure(chessBoardId, line, 8, color, 'tower');
    }

    this.getCell = function(chessBoardId, row, column){
        var cellId = this.chessBoard.getCellId(row, column);
        return $('#' + chessBoardId + ' #' + cellId + '');        
    }

    this.arrangeText = function(chessBoardId, row, column, text){        
        var cell = this.getCell(chessBoardId, row, column);

        $(cell).html(text);        
    }

    this.arrangeFigure = function (chessBoardId, row, column, color, figure) {        
        var cell = this.getCell(chessBoardId, row, column);
        var figureId = this.chessBoard.getFigureId(color, figure); 
        var htmlForFigure = '<div id="' + figureId + '" style="' + this.chessBoard.getStyleFor(color, figure) + '"></div>';
        cell.html(htmlForFigure);

        this.makeFigureDraggable(chessBoardId, row, column, color, figure)
    }    

    /**
     * Makes the specified figure.Specify the Figure. 
     */
    this.makeFigureDraggable = function (chessBoardId, row, column, color, figure) {
        var cellId = this.chessBoard.getCellId(row, column);        
        var figureId = this.chessBoard.getFigureId(color, figure);

        var cell = $('#' + chessBoardId + ' #' + cellId + ''); 
        var figure = $('#' + cellId + ' #' + figureId + '');
        
        var currentParent;

        figure.draggable({
            revert: 'invalid',
            start: function () {
                $(this).css('z-index', '1000')
                currentParent = $(this).parent().attr('id');
            },

            stop:function(){
                $(this).css('z-index', '1')
            },
        });

        var cellsToWhomItCanBeDropped = '#' + this.chessBoard.getCellId(3, 3) + ','
        cellsToWhomItCanBeDropped += '#' + this.chessBoard.getCellId(5, 5) + ','
        cellsToWhomItCanBeDropped += '#' + this.chessBoard.getCellId(8, 8)

        $(cellsToWhomItCanBeDropped).droppable({
            accept: '#' + figureId,
            drop: function (event, ui) {
                // if (currentParent != $(this).attr('id')) {
                //     $(ui.draggable).appendTo($(this)).removeAttr('style');
                // }
            }
        });
    }
}