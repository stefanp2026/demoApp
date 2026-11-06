import { FigureArranger } from '../FigureArranger.ts';
import { ChessKnightVisitor } from './ChessKnightVisit.ts';
import { BoardPosition, KnightPositionDetector } from './KnightPositionDetector.ts';

export class App {
    chessBoardId: string;
    feedbackLabelId: string;
    solution: BoardPosition[] = [];

    constructor(chessBoardId: string, feedbackLabelId: string) {
        this.chessBoardId = chessBoardId;
        this.feedbackLabelId = feedbackLabelId;
    }

    findAndDisplaySolution(): void {
        $(`#${this.feedbackLabelId}`).html('Suche nach einer Lösung...');

        // arrow functions keep "this", which replaces the former "var self = this"
        setTimeout(() => {
            this.findSolution().then((solution) => this.displaySolution(solution));
        }, 10);
    }

    findSolution(): Promise<BoardPosition[]> {
        return new Promise((resolve) => {
            const startPosition = new BoardPosition(0, 0);
            const positionDetector = new KnightPositionDetector();

            const visitor = new ChessKnightVisitor(positionDetector);
            visitor.visitChessBoard(startPosition);

            resolve(visitor.visitedPositions);
        });
    }

    displaySolution(solution: BoardPosition[]): void {
        $(`#${this.feedbackLabelId}`).html('Die Suche ist fertig. Eine Lösung ist gefunden!');

        const figureArranger = new FigureArranger();
        let solutionIndex = 0;

        // gets the position for each cell in the index
        solution.forEach((element) => {
            figureArranger.arrangeText(this.chessBoardId, element.row + 1, element.column + 1, String(solutionIndex++));
        });
    }
}
