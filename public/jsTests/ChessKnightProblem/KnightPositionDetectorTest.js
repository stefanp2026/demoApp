import { BoardPosition, KnightPositionDetector } from '../../js/ChessKnightProblem/KnightPositionDetector.js';

QUnit.test('Row must be inside the chess board', function (assert) {
  var createPositionFunction = function () {
    var currentPosition = new BoardPosition(10, 2);
  };

  assert.throws(createPositionFunction, "row must be between 0 and 8");
});

QUnit.test('Column must be inside the chess board', function (assert) {
  var createPositionFunction = function () {
    var currentPosition = new BoardPosition(3, 10);
  };

  assert.throws(createPositionFunction, "column must be between 0 and 8");
});

QUnit.test("should be able to detect the next positions for 0,0", function (assert) {
  var currentPosition = new BoardPosition(0, 0);
  var positionDetector = new KnightPositionDetector();
  var possiblePositions = positionDetector.getPosiblePositions(currentPosition);

  assert.equal(possiblePositions.length, 2);
  expectArrayContainsPosition(possiblePositions, 1, 2);
  expectArrayContainsPosition(possiblePositions, 2, 1);
});

QUnit.test("should be able to detect the next positions for 1,1", function (assert) {
  var currentPosition = new BoardPosition(1, 1);
  var positionDetector = new KnightPositionDetector();
  var possiblePositions = positionDetector.getPosiblePositions(currentPosition);

  assert.equal(possiblePositions.length, 4);
  expectArrayContainsPosition(possiblePositions, 0, 3);
  expectArrayContainsPosition(possiblePositions, 2, 3);
  expectArrayContainsPosition(possiblePositions, 3, 2);
  expectArrayContainsPosition(possiblePositions, 3, 0);
});

QUnit.test("should be able to detect the next positions for 1,6", function (assert) {
  var currentPosition = new BoardPosition(1, 6);
  var positionDetector = new KnightPositionDetector();
  var possiblePositions = positionDetector.getPosiblePositions(currentPosition);

  assert.equal(possiblePositions.length, 4);
  expectArrayContainsPosition(possiblePositions, 3, 7);
  expectArrayContainsPosition(possiblePositions, 3, 5);
  expectArrayContainsPosition(possiblePositions, 2, 4);
  expectArrayContainsPosition(possiblePositions, 0, 4);
});

QUnit.test("should be able to detect the next possible position for 1,6 and 3,5", function (assert) {
  var startPosition = new BoardPosition(1, 6);
  var currentPosition = new BoardPosition(3, 5);
  var positionDetector = new KnightPositionDetector();

  var detectedPosition = positionDetector.getNextPosition(startPosition, currentPosition);
  assert.equal(detectedPosition.row, 2);
  assert.equal(detectedPosition.column, 4);
});

QUnit.test("should be able to detect the next possible position for 7,7 and null", function (assert) {
  var startPosition = new BoardPosition(7, 7);
  var currentPosition = null;
  var positionDetector = new KnightPositionDetector();

  var detectedPosition = positionDetector.getNextPosition(startPosition, currentPosition);
  assert.equal(detectedPosition.row, 6);
  assert.equal(detectedPosition.column, 5);
});

QUnit.test("should be able to detect the next possible position for 7,7 and 6,5", function (assert) {
  var startPosition = new BoardPosition(7, 7);
  var currentPosition = new BoardPosition(6, 5);
  var positionDetector = new KnightPositionDetector();

  var detectedPosition = positionDetector.getNextPosition(startPosition, currentPosition);
  assert.equal(detectedPosition.row, 5);
  assert.equal(detectedPosition.column, 6);
});

QUnit.test("should be able to detect the next possible position for 7,7 and 5,6", function (assert) {
  var startPosition = new BoardPosition(7, 7);
  var currentPosition = new BoardPosition(5, 6);
  var positionDetector = new KnightPositionDetector();

  var detectedPosition = positionDetector.getNextPosition(startPosition, currentPosition);
  assert.equal(detectedPosition, null);
});

function expectArrayContainsPosition(positions, expectedRow, expectedColumn) {
  var result = arrayContainsPosition(positions, expectedRow, expectedColumn);
  QUnit.assert.equal(result, true);
}

// helper functions. Should be put in a helper class
function arrayContainsPosition(positions, expectedRow, expectedColumn) {
  for (var i = 0; i < positions.length; i++) {
    if (positions[i].row === expectedRow && positions[i].column === expectedColumn)
      return true;
  }

  return false;
}