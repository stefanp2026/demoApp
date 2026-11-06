import { type BoardPosition, KnightPositionDetector } from './KnightPositionDetector.ts';

/**
 * Visits the chess board using a knight.
 */
export class ChessKnightVisitor {
    positionDetector: KnightPositionDetector;
    visitedPositions: BoardPosition[] = [];

    constructor(positionDetector: KnightPositionDetector) {
        this.positionDetector = positionDetector;
    }

    visitChessBoard(startPosition: BoardPosition): void {
        this.visitedPositions.push(startPosition);

        while (this.visitedPositions.length > 0 && this.visitedPositions.length < 64) {
            const currentPosition = this.visitedPositions[this.visitedPositions.length - 1];
            let nextPosition = this.getTheNextUnvisitedPositionFor(currentPosition, null);

            // backtrack: drop the dead-end position and try the next alternative from its predecessor
            while (nextPosition == null) {
                const positionTried = this.visitedPositions.pop();
                const previousPosition = this.visitedPositions.at(-1);

                // start position itself is a dead end -> no tour possible, outer loop ends on the empty list
                if (positionTried === undefined || previousPosition === undefined) break;

                nextPosition = this.getTheNextUnvisitedPositionFor(previousPosition, positionTried);
            }

            if (nextPosition != null) this.visitedPositions.push(nextPosition);
        }

        console.log(this.visitedPositions);
    }

    isPositionVisited(position: BoardPosition | null): boolean {
        if (position == null) return false;

        for (let i = 0; i < this.visitedPositions.length; i++) {
            const element = this.visitedPositions[i];

            if (element.row === position.row && element.column === position.column) {
                return true;
            }
        }

        return false;
    }

    getTheNextUnvisitedPositionFor(
        startPosition: BoardPosition,
        currentPosition: BoardPosition | null,
    ): BoardPosition | null {
        const positionDetector = new KnightPositionDetector();
        let nextPosition = positionDetector.getNextPosition(startPosition, currentPosition);

        while (this.isPositionVisited(nextPosition) && nextPosition != null) {
            nextPosition = positionDetector.getNextPosition(startPosition, nextPosition);
        }

        return nextPosition;
    }
}
