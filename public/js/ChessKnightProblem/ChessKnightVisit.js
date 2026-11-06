import { KnightPositionDetector } from './KnightPositionDetector.js';

/**
 * Visits the chess board using a knight.
 */
export function ChessKnightVisitor(positionDetector){

    this.positionDetector = positionDetector;
    this.visitedPositions = [];

    this.visitChessBoard = function(startPosition){
        this.visitedPositions.push(startPosition);

        while (this.visitedPositions.length > 0 && this.visitedPositions.length < 64 ) {
            var currentPosition = this.visitedPositions[this.visitedPositions.length - 1];
            var nextPosition = this.getTheNextUnvisitedPositionFor(currentPosition, null);

            while (nextPosition == null && this.visitedPositions.length>0) {
                var positionTried = this.visitedPositions.pop();
                currentPosition = this.visitedPositions[this.visitedPositions.length - 1];
                
                nextPosition = this.getTheNextUnvisitedPositionFor(currentPosition, positionTried);                
            }

            if(nextPosition != null)
                this.visitedPositions.push(nextPosition);
        }   

        console.log(this.visitedPositions);
    };

    this.isPositionVisited=function(position){
        if(position == null)
            return false;

        for (var i = 0; i < this.visitedPositions.length; i++) {
            var element = this.visitedPositions[i];

            if(element.row == position.row && element.column == position.column){
                return true;
            }            
        }

        return false;
    };

    this.getTheNextUnvisitedPositionFor = function(startPosition, currentPosition){
        var positionDetector = new KnightPositionDetector();
        var nextPosition = positionDetector.getNextPosition(startPosition, currentPosition);

        while (this.isPositionVisited(nextPosition) && nextPosition != null) {
            nextPosition = positionDetector.getNextPosition(startPosition, nextPosition);
        }
        
        return nextPosition;
    };
};