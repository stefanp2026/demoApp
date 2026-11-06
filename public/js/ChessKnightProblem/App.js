import { FigureArranger } from '../FigureArranger.js';
import { ChessKnightVisitor } from './ChessKnightVisit.js';
import { BoardPosition, KnightPositionDetector } from './KnightPositionDetector.js';

export function App(chessBoardId, feedbackLabelId) {
    var self = this;

    this.chessBoardId = chessBoardId;
    this.feedbackLabelId = feedbackLabelId;
    this.solution = [];

    this.findAndDisplaySolution = function () {
        $('#' + this.feedbackLabelId).html('Suche nach einer Lösung...');

        setTimeout(function(){
            self.findSolution().then(self.displaySolution);
        }, 10);
    }

    this.findSolution = function () {
        return new Promise(function (resolve, reject) {
            var startPosition = new BoardPosition(0, 0);
            var positionDetector = new KnightPositionDetector();

            var visitor = new ChessKnightVisitor(positionDetector);
            visitor.visitChessBoard(startPosition);

            resolve(visitor.visitedPositions);
        });
    };

    this.displaySolution = function (solution) {
        $('#' + self.feedbackLabelId).html('Die Suche ist fertig. Eine Lösung ist gefunden!');

        var figureArranger = new FigureArranger();
        var solutionIndex = 0;

        // gets the position for each cell in the index
        solution.forEach(function (element) {
            figureArranger.arrangeText(self.chessBoardId, element.row + 1, element.column + 1, solutionIndex++);
        }, this);
    };    
};
