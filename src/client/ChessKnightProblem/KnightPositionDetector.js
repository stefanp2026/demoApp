/**
 * Detects the next possible positions.
 */
export function KnightPositionDetector() {

    /**
     * Gets the possible positions of the specified position.
     * @param {BoardPosition} currentPosition The current position on the board.
     */
    this.getPosiblePositions = function (currentPosition) {
        var possiblePositions = [];

        var positionDeltas = [
            new BoardPositionDelta(-2, 1),
            new BoardPositionDelta(-1, 2),
            new BoardPositionDelta(1, 2),
            new BoardPositionDelta(2, 1),
            new BoardPositionDelta(2, -1),
            new BoardPositionDelta(1, -2),
            new BoardPositionDelta(-1, -2),
            new BoardPositionDelta(-2, -1),
        ];

        for (var i = 0; i < positionDeltas.length; i++) {
            var newRow = currentPosition.row + positionDeltas[i].rowDelta;
            var newColumn = currentPosition.column + positionDeltas[i].columnDelta;

            if (0 <= newRow && newRow < 8 && 0 <= newColumn && newColumn < 8)
                possiblePositions.push(new BoardPosition(newRow, newColumn));
        }

        return possiblePositions;
    };

    /**
     * gets the next posible position , after the current position.
     * 
     */
    this.getNextPosition = function (startPosition, currentPosition) {

        var allPossiblePositions = this.getPosiblePositions(startPosition);

        if (allPossiblePositions.length == 0) {
            return null;
        }

        if (currentPosition == null) {
            return allPossiblePositions[0];
        }

        for (var i = 0; i < allPossiblePositions.length; i++) {
            if (allPossiblePositions[i].row == currentPosition.row && allPossiblePositions[i].column == currentPosition.column) {
                if (i < allPossiblePositions.length - 1) {
                    return allPossiblePositions[i + 1];
                }
                else {
                    return null;
                }
            }
        }

        return null;
    };
};

/**
 * Describes a position on the chess board.
 * @param {string} theRow The row on the board.
 * @param {string} theColumn The column on the board.   
 */
export function BoardPosition(theRow, theColumn) {

    if (0 > theRow || theRow > 8)
        throw new Error('row must be between 0 and 8');

    if (0 > theColumn || theColumn > 8)
        throw new Error('column must be between 0 and 8');

    this.row = theRow;
    this.column = theColumn;
};

function BoardPositionDelta(theRowDelta, theColumnDelta) {
    this.rowDelta = theRowDelta;
    this.columnDelta = theColumnDelta;
};
