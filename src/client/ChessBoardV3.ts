export type FigureColor = 'white' | 'black';
export type FigureName = 'pawn' | 'knight' | 'bishop' | 'tower' | 'king' | 'queen';

/**
 * Describes a chess board.
 */
export class ChessBoardV3 {
    /**
     * Gets the id of the specified cell.
     * @param row: the row of the cell.
     * @param column: the column of the cell.
     */
    getCellId(row: number, column: number): string {
        return 'cell_' + row + '_' + column;
    }

    /**
     * Gets the id of the specified figure.
     */
    getFigureId(color: FigureColor, figure: FigureName): string {
        return 'figure_' + color + '_' + figure;
    }

    /**
     * Gets the row number to display.
     */
    getDisplayRowNumber(rowNumber: number): number {
        return 9 - rowNumber;
    }

    /**
     * Gets the column number to display.
     */
    getDisplayColumnNumber(columnNumber: number): string {
        var columns = ['A','B','C','D','E','F','G','H'];

        return columns[columnNumber-1];
    }

    /**
     * Gets all the figures.
     */
    getFigures(): FigureName[] {
        return ['pawn', 'knight', 'bishop', 'tower', 'king', 'queen'];
    }

    /**
     * Gets the x position inside the sprite image for the specified figure.
     */
    getFigureXPositionInSpriteImage(figure: FigureName): number {
        var figures = this.getFigures();
        var figureIndex = figures.indexOf(figure);
        var figureOffset = 54;
        // subtract from 0 instead of multiplying by -1, which would yield -0 for the first figure
        return 0 - figureIndex * figureOffset;
    }

    /**
     * Gets the Y position inside the sprite image for the specified figure's color.
     */
    getFigureYPositionInSpriteImage(color: FigureColor): number {
        var colors: FigureColor[] = ['white', 'black'];
        var colorIndex = colors.indexOf(color);
        var figurOffset = 54;
        // subtract from 0 instead of multiplying by -1, which would yield -0 for the first color
        return 0 - colorIndex * figurOffset;
    }

    /**
     * Gets the style for the specified color and figure.
     */
    getStyleFor(color: FigureColor, figure: FigureName): string {
        var style = "background-image: url('/img/ChessFigures.png');"
        style += "background-position-x: " + this.getFigureXPositionInSpriteImage(figure) + "px;"
        style += "background-position-y: " + this.getFigureYPositionInSpriteImage(color) + "px;";
        style += 'height: 54px;';
        return style;
    }
}
