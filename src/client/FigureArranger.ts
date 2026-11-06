import { ChessBoardV3, type FigureColor, type FigureName } from './ChessBoardV3.ts';

/**
 * Arranges the chess figures on a chess board.
 */
export class FigureArranger {
    chessBoard = new ChessBoardV3();

    /**
     * Arranges all the figures on the specified chess board.
     */
    arrangeFiguresOnChessBoard(chessBoardId: string): void {
        this.arrangeNotPawns(chessBoardId, 'white');

        for (let i = 1; i <= 8; i++) {
            this.arrangeFigure(chessBoardId, 2, i, 'white', 'pawn');
        }

        this.arrangeNotPawns(chessBoardId, 'black');

        for (let i = 1; i <= 8; i++) {
            this.arrangeFigure(chessBoardId, 7, i, 'black', 'pawn');
        }
    }

    arrangeNotPawns(chessBoardId: string, color: FigureColor): void {
        let line = 1;

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

    getCell(chessBoardId: string, row: number, column: number): JQuery {
        const cellId = this.chessBoard.getCellId(row, column);
        return $('#' + chessBoardId + ' #' + cellId + '');
    }

    arrangeText(chessBoardId: string, row: number, column: number, text: string): void {
        const cell = this.getCell(chessBoardId, row, column);

        $(cell).html(text);
    }

    arrangeFigure(chessBoardId: string, row: number, column: number, color: FigureColor, figure: FigureName): void {
        const cell = this.getCell(chessBoardId, row, column);
        const figureId = this.chessBoard.getFigureId(color, figure);
        const htmlForFigure =
            '<div id="' + figureId + '" style="' + this.chessBoard.getStyleFor(color, figure) + '"></div>';
        cell.html(htmlForFigure);

        this.makeFigureDraggable(chessBoardId, row, column, color, figure);
    }

    /**
     * Makes the specified figure.Specify the Figure.
     */
    makeFigureDraggable(
        chessBoardId: string,
        row: number,
        column: number,
        color: FigureColor,
        figure: FigureName,
    ): void {
        const cellId = this.chessBoard.getCellId(row, column);
        const figureId = this.chessBoard.getFigureId(color, figure);

        const cell = $('#' + chessBoardId + ' #' + cellId + '');
        // was named "figure" and shadowed the parameter with a different type
        const figureElement = $('#' + cellId + ' #' + figureId + '');

        let currentParent: string | undefined;

        figureElement.draggable({
            revert: 'invalid',
            start(this: HTMLElement) {
                $(this).css('z-index', '1000');
                currentParent = $(this).parent().attr('id');
            },

            stop(this: HTMLElement) {
                $(this).css('z-index', '1');
            },
        });

        let cellsToWhomItCanBeDropped = '#' + this.chessBoard.getCellId(3, 3) + ',';
        cellsToWhomItCanBeDropped += '#' + this.chessBoard.getCellId(5, 5) + ',';
        cellsToWhomItCanBeDropped += '#' + this.chessBoard.getCellId(8, 8);

        $(cellsToWhomItCanBeDropped).droppable({
            accept: '#' + figureId,
            drop(event, ui) {
                // if (currentParent != $(this).attr('id')) {
                //     $(ui.draggable).appendTo($(this)).removeAttr('style');
                // }
            },
        });
    }
}
