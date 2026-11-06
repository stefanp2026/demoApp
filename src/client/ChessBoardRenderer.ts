import type { ChessBoardV3 } from './ChessBoardV3.ts';

/**
 * Renders the chess board markup (8 rows of cells plus row and column labels) into the container.
 * Produces the same structure, ids and classes as the former Pug mixin, so style.css and
 * FigureArranger keep working unchanged.
 */
export function renderChessBoard(container: HTMLElement, chessBoard: ChessBoardV3): void {
    for (var row = 1; row <= 8; row++) {
        // cell colors alternate per row, so even rows start with a black cell in column 1
        var classForEvenColumns = row % 2 === 0 ? 'cell-white' : 'cell-black';
        var classForOddColumns = row % 2 === 0 ? 'cell-black' : 'cell-white';

        var rowContent = createRow(container);
        appendDiv(rowContent, 'rowNumber', String(chessBoard.getDisplayRowNumber(row)));

        for (var column = 1; column <= 8; column++) {
            var cell = appendDiv(rowContent, column % 2 === 0 ? classForEvenColumns : classForOddColumns);
            cell.id = chessBoard.getCellId(row, column);
        }
    }

    var columnLabels = createRow(container);
    appendDiv(columnLabels, 'rowNumber');

    for (var column = 1; column <= 8; column++) {
        appendDiv(columnLabels, 'columnNumber', chessBoard.getDisplayColumnNumber(column));
    }
}

function createRow(container: HTMLElement): HTMLElement {
    var row = appendDiv(container, 'row');
    return appendDiv(row, 'col-md-12');
}

function appendDiv(parent: HTMLElement, className: string, text?: string): HTMLDivElement {
    var div = document.createElement('div');
    div.className = className;

    if (text !== undefined) {
        div.textContent = text;
    }

    parent.appendChild(div);
    return div;
}
