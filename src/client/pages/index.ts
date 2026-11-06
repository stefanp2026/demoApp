import { ChessBoardV3 } from '../ChessBoardV3.ts';
import { renderChessBoard } from '../ChessBoardRenderer.ts';
import { FigureArranger } from '../FigureArranger.ts';
import { getRequiredElement } from './dom.ts';

renderChessBoard(getRequiredElement('theChessBoardInstance'), new ChessBoardV3());

// the figures need the rendered cells, so this must run after renderChessBoard
new FigureArranger().arrangeFiguresOnChessBoard('theChessBoardInstance');
