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
            let currentPosition = this.visitedPositions[this.visitedPositions.length - 1];
            let nextPosition = this.getTheNextUnvisitedPositionFor(currentPosition, null);

            while (nextPosition == null && this.visitedPositions.length > 0) {
                // the loop condition guarantees a non-empty array, so pop() cannot return undefined
                const positionTried = this.visitedPositions.pop()!;
                currentPosition = this.visitedPositions[this.visitedPositions.length - 1];

                nextPosition = this.getTheNextUnvisitedPositionFor(currentPosition, positionTried);
            }

            if (nextPosition != null) this.visitedPositions.push(nextPosition);
        }

        console.log(this.visitedPositions);
    }

    isPositionVisited(position: BoardPosition | null): boolean {
        if (position == null) return false;

        for (let i = 0; i < this.visitedPositions.length; i++) {
            const element = this.visitedPositions[i];

            if (element.row == position.row && element.column == position.column) {
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
