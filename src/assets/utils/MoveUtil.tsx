// noinspection DuplicatedCode

import {BISHOP, KING, KNIGHT, NONE, PAWN, QUEEN, ROOK} from "../components/Pieces.tsx";
import {ChessFieldData} from "../components/ChessBoard.tsx";

export function getValidMoves(x: number, y: number, boardContext: ChessFieldData[][]): number[][] {
    const data = boardContext[x][y];
    if (data.piece.piece == -1) {
        return [];
    }

    switch (data.piece.piece) {
        case PAWN: return getValidMovesPawn(x, y, boardContext);
        case ROOK: return getValidMovesRook(x, y, boardContext);
        case KNIGHT: return getValidMovesKnight(x, y);
        case BISHOP: return getValidMovesBishop(x, y, boardContext);
        case QUEEN: return getValidMovesQueen(x, y, boardContext);
        case KING: return getValidMovesKing(x, y, boardContext);
        default: return [];
    }
}

export function getValidMovesPawn(x: number, y: number, boardContext: ChessFieldData[][]): number[][] {
    const moves = [];
    if (y == 7) {
        if (boardContext[x][y-1].piece.piece == NONE) moves.push([x, y-1]);
        if (boardContext[x][y-2].piece.piece == NONE) moves.push([x, y-2]);
    } else {
        if (boardContext[x][y-1].piece.piece == NONE) moves.push([x, y-1]);
    }

    if (x > 0 && boardContext[x-1][y-1].piece.piece != NONE) moves.push([x-1, y-1]);
    if (x < 7 && boardContext[x+1][y-1].piece.piece != NONE) moves.push([x+1, y-1]);

    if (y == 2) {
        if (x > 0 && boardContext[x-1][y].piece.piece == PAWN && boardContext[x-1][y+1].piece.piece == NONE && boardContext[x-1][y].piece.moveCount == 1 && boardContext[x-1][y].piece.hasJustMoved) moves.push([x-1, y-1]);
        if (x < 7 && boardContext[x+1][y].piece.piece == PAWN && boardContext[x+1][y+1].piece.piece == NONE && boardContext[x+1][y].piece.moveCount == 1 && boardContext[x+1][y].piece.hasJustMoved) moves.push([x+1, y-1]);
    }

    return moves;
}

export function getValidMovesRook(x: number, y: number, boardContext: ChessFieldData[][]): number[][] {
    const moves = [];

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
            moves.push([i, j]);
            if (boardContext[i][j].piece.piece != NONE) break;
            i += dx;
            j += dy;
        }
    }

    return moves;
}

export function getValidMovesKing(x: number, y: number, boardContext: ChessFieldData[][]): number[][] {
    const moves = [];

    const directions = [
        [-1, -1], [1, -1], [-1, 1], [1, 1],
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (const [dx, dy] of directions) {
        const i = x + dx, j = y + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
            if (coordinateCanBeHit(i, j, boardContext, boardContext[x][y].piece.color)) continue;
            moves.push([i, j]);
        }
    }

    if (boardContext[x][y].piece.moveCount == 0) {
        if (!coordinateCanBeHit(x, y, boardContext, boardContext[x][y].piece.color)) {
            // Castle
            const leftRook = boardContext[0][y].piece;
            const rightRook = boardContext[7][y].piece;

            if (leftRook.piece == ROOK && leftRook.color == boardContext[x][y].piece.color && leftRook.moveCount == 0) {
                let canCastle = true;
                for (let i = 1; i < x; i++) {
                    if (boardContext[i][y].piece.piece != NONE) {
                        canCastle = false;
                        break;
                    } else if (coordinateCanBeHit(i, y, boardContext, boardContext[x][y].piece.color)) {
                        canCastle = false;
                        break;
                    }
                }

                if (canCastle) {
                    moves.push([x-2, y]);
                }
            }

            if (rightRook.piece == ROOK && rightRook.color == boardContext[x][y].piece.color && rightRook.moveCount == 0) {
                let canCastle = true;
                for (let i = x+1; i < 7; i++) {
                    if (boardContext[i][y].piece.piece != NONE) {
                        canCastle = false;
                        break;
                    } else if (coordinateCanBeHit(i, y, boardContext, boardContext[x][y].piece.color)) {
                        canCastle = false;
                        break;
                    }
                }

                if (canCastle) {
                    moves.push([x+2, y]);
                }
            }
        }
    }

    return moves;
}

export function getValidMovesKnight(x: number, y: number): number[][] {
    const moves = [];

    if (x > 1 && y > 0) moves.push([x-2, y-1]);
    if (x > 1 && y < 7) moves.push([x-2, y+1]);
    if (x < 6 && y > 0) moves.push([x+2, y-1]);
    if (x < 6 && y < 7) moves.push([x+2, y+1]);
    if (x > 0 && y > 1) moves.push([x-1, y-2]);
    if (x > 0 && y < 6) moves.push([x-1, y+2]);
    if (x < 7 && y > 1) moves.push([x+1, y-2]);
    if (x < 7 && y < 6) moves.push([x+1, y+2]);

    return moves;
}

export function getValidMovesBishop(x: number, y: number, boardContext: ChessFieldData[][]): number[][] {
    const moves = [];

    const directions = [
        [-1, -1], [1, -1], [-1, 1], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
            moves.push([i, j]);
            if (boardContext[i][j].piece.piece != NONE) break;
            i += dx;
            j += dy;
        }
    }

    return moves;
}

export function getValidMovesQueen(x: number, y: number, boardContext: ChessFieldData[][]): number[][] {
    const moves = [];

    const directions = [
        [-1, -1], [1, -1], [-1, 1], [1, 1],
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
            moves.push([i, j]);
            if (boardContext[i][j].piece.piece != NONE) break;
            i += dx;
            j += dy;
        }
    }

    return moves;
}

export function coordinateCanBeHit(x: number, y: number, boardContext: ChessFieldData[][], color: number): boolean {
    const directions = [
        [-1, -1], [1, -1], [-1, 1], [1, 1],
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (const [dx, dy] of directions) {
        let i = x + dx, j = y + dy;
        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
            const data = boardContext[i][j];
            if (data.piece.piece != NONE) {
                if (data.piece.color == color) break;
                return true;
            }

            i += dx;
            j += dy;
        }
    }

    const knightMoves = [
        [-2, -1], [-2, 1], [2, -1], [2, 1],
        [-1, -2], [-1, 2], [1, -2], [1, 2]
    ];

    for (const [dx, dy] of knightMoves) {
        const i = x + dx, j = y + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
            const data = boardContext[i][j];
            if (data.piece.piece == KNIGHT && data.piece.color != color) {
                return true;
            }
        }
    }

    const pawnMoves = [
        [-1, -1], [1, -1], [-1, 1], [1, 1]
    ];

    for (const [dx, dy] of pawnMoves) {
        const i = x + dx, j = y + dy;
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
            const data = boardContext[i][j];
            if (data.piece.piece == PAWN && data.piece.color != color) {
                return true;
            }
        }
    }

    return false;
}
