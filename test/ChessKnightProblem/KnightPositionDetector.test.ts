import { expect, test } from 'vitest';
import { BoardPosition, KnightPositionDetector } from '../../src/client/ChessKnightProblem/KnightPositionDetector.ts';

test('Row must be inside the chess board', function () {
    expect(function () { new BoardPosition(10, 2); }).toThrow('row must be between 0 and 8');
});

test('Column must be inside the chess board', function () {
    expect(function () { new BoardPosition(3, 10); }).toThrow('column must be between 0 and 8');
});

test('should be able to detect the next positions for 0,0', function () {
    var currentPosition = new BoardPosition(0, 0);
    var positionDetector = new KnightPositionDetector();
    var possiblePositions = positionDetector.getPosiblePositions(currentPosition);

    expect(possiblePositions.length).toBe(2);
    expectArrayContainsPosition(possiblePositions, 1, 2);
    expectArrayContainsPosition(possiblePositions, 2, 1);
});

test('should be able to detect the next positions for 1,1', function () {
    var currentPosition = new BoardPosition(1, 1);
    var positionDetector = new KnightPositionDetector();
    var possiblePositions = positionDetector.getPosiblePositions(currentPosition);

    expect(possiblePositions.length).toBe(4);
    expectArrayContainsPosition(possiblePositions, 0, 3);
    expectArrayContainsPosition(possiblePositions, 2, 3);
    expectArrayContainsPosition(possiblePositions, 3, 2);
    expectArrayContainsPosition(possiblePositions, 3, 0);
});

test('should be able to detect the next positions for 1,6', function () {
    var currentPosition = new BoardPosition(1, 6);
    var positionDetector = new KnightPositionDetector();
    var possiblePositions = positionDetector.getPosiblePositions(currentPosition);

    expect(possiblePositions.length).toBe(4);
    expectArrayContainsPosition(possiblePositions, 3, 7);
    expectArrayContainsPosition(possiblePositions, 3, 5);
    expectArrayContainsPosition(possiblePositions, 2, 4);
    expectArrayContainsPosition(possiblePositions, 0, 4);
});

test('should be able to detect the next possible position for 1,6 and 3,5', function () {
    var startPosition = new BoardPosition(1, 6);
    var currentPosition = new BoardPosition(3, 5);
    var positionDetector = new KnightPositionDetector();

    var detectedPosition = positionDetector.getNextPosition(startPosition, currentPosition);
    expect(detectedPosition).toMatchObject({ row: 2, column: 4 });
});

test('should be able to detect the next possible position for 7,7 and null', function () {
    var startPosition = new BoardPosition(7, 7);
    var positionDetector = new KnightPositionDetector();

    var detectedPosition = positionDetector.getNextPosition(startPosition, null);
    expect(detectedPosition).toMatchObject({ row: 6, column: 5 });
});

test('should be able to detect the next possible position for 7,7 and 6,5', function () {
    var startPosition = new BoardPosition(7, 7);
    var currentPosition = new BoardPosition(6, 5);
    var positionDetector = new KnightPositionDetector();

    var detectedPosition = positionDetector.getNextPosition(startPosition, currentPosition);
    expect(detectedPosition).toMatchObject({ row: 5, column: 6 });
});

test('should be able to detect the next possible position for 7,7 and 5,6', function () {
    var startPosition = new BoardPosition(7, 7);
    var currentPosition = new BoardPosition(5, 6);
    var positionDetector = new KnightPositionDetector();

    var detectedPosition = positionDetector.getNextPosition(startPosition, currentPosition);
    expect(detectedPosition).toBe(null);
});

function expectArrayContainsPosition(positions: BoardPosition[], expectedRow: number, expectedColumn: number): void {
    expect(positions).toContainEqual(expect.objectContaining({ row: expectedRow, column: expectedColumn }));
}
