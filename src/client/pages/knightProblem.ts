import { ChessBoardV3 } from '../ChessBoardV3.ts';
import { renderChessBoard } from '../ChessBoardRenderer.ts';
import { App } from '../ChessKnightProblem/App.ts';
import { getRequiredElement } from './dom.ts';

renderChessBoard(getRequiredElement('theChessBoardInstance'), new ChessBoardV3());

const app = new App('theChessBoardInstance', 'FeedbackLabel');
getRequiredElement('FindSolutionButton').addEventListener('click', () => app.findAndDisplaySolution());
