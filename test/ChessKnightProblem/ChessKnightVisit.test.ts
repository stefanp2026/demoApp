import { expect, test } from 'vitest';
import { ChessKnightVisitor } from '../../src/client/ChessKnightProblem/ChessKnightVisit.ts';
import { BoardPosition, KnightPositionDetector } from '../../src/client/ChessKnightProblem/KnightPositionDetector.ts';

// backtracking search over the whole board, so it gets more time than the 5 s default
test('should be able to visit the table', { timeout: 30000 }, () => {
    const startPosition = new BoardPosition(0, 0);
    const positionDetector = new KnightPositionDetector();

    const visitor = new ChessKnightVisitor(positionDetector);
    visitor.visitChessBoard(startPosition);

    expect(visitor.visitedPositions.length).toBe(64);
});
