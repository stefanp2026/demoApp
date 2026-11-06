/**
 * Detects the next possible positions.
 */
export class KnightPositionDetector {
    /**
     * Gets the possible positions of the specified position.
     * @param currentPosition The current position on the board.
     */
    getPosiblePositions(currentPosition: BoardPosition): BoardPosition[] {
        const possiblePositions: BoardPosition[] = [];

        const positionDeltas = [
            new BoardPositionDelta(-2, 1),
            new BoardPositionDelta(-1, 2),
            new BoardPositionDelta(1, 2),
            new BoardPositionDelta(2, 1),
            new BoardPositionDelta(2, -1),
            new BoardPositionDelta(1, -2),
            new BoardPositionDelta(-1, -2),
            new BoardPositionDelta(-2, -1),
        ];

        for (let i = 0; i < positionDeltas.length; i++) {
            const newRow = currentPosition.row + positionDeltas[i].rowDelta;
            const newColumn = currentPosition.column + positionDeltas[i].columnDelta;

            if (0 <= newRow && newRow < 8 && 0 <= newColumn && newColumn < 8)
                possiblePositions.push(new BoardPosition(newRow, newColumn));
        }

        return possiblePositions;
    }

    /**
     * gets the next posible position , after the current position.
     *
     */
    getNextPosition(startPosition: BoardPosition, currentPosition: BoardPosition | null): BoardPosition | null {
        const allPossiblePositions = this.getPosiblePositions(startPosition);

        if (allPossiblePositions.length === 0) {
            return null;
        }

        if (currentPosition == null) {
            return allPossiblePositions[0];
        }

        for (let i = 0; i < allPossiblePositions.length; i++) {
            if (
                allPossiblePositions[i].row === currentPosition.row &&
                allPossiblePositions[i].column === currentPosition.column
            ) {
                if (i < allPossiblePositions.length - 1) {
                    return allPossiblePositions[i + 1];
                } else {
                    return null;
                }
            }
        }

        return null;
    }
}

/**
 * Describes a position on the chess board.
 */
export class BoardPosition {
    row: number;
    column: number;

    /**
     * @param theRow The row on the board.
     * @param theColumn The column on the board.
     */
    constructor(theRow: number, theColumn: number) {
        if (0 > theRow || theRow > 8) throw new Error('row must be between 0 and 8');

        if (0 > theColumn || theColumn > 8) throw new Error('column must be between 0 and 8');

        this.row = theRow;
        this.column = theColumn;
    }
}

class BoardPositionDelta {
    rowDelta: number;
    columnDelta: number;

    constructor(theRowDelta: number, theColumnDelta: number) {
        this.rowDelta = theRowDelta;
        this.columnDelta = theColumnDelta;
    }
}
