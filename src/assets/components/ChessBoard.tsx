import React, {createContext, useEffect, useRef, useState} from "react";
import ChessRow from "./ChessRow.tsx";
import {BISHOP, BLACK, KING, KNIGHT, NO_COLOR, NONE, PAWN, QUEEN, ROOK, WHITE} from "./Pieces.tsx";
import {getValidMoves} from "../utils/MoveUtil.tsx";

export const ClickContext = createContext<((x: number, y: number) => void) | undefined>(undefined);
export const FieldContext = createContext<ChessFieldData[][] | undefined>(undefined);

export default function ChessBoard({style, className, backendSocketUrl}: {style?: React.CSSProperties | undefined, className?: string | undefined, backendSocketUrl: string}) {
    const [fields, setFields] = useState<ChessFieldData[][]>(Array.from({length: 8}, () => Array.from({length: 8}, () => ({
        highlighted: false, circled: false, selected: false, piece: {piece: NONE, color: NO_COLOR, moveCount: 0, hasJustMoved: false}
    }))));

    const init = () => {
        clearHighlights();
        clearPieces();

        putPiece(0, 7, ROOK, WHITE, 0, false);
        putPiece(3, 7, KING, WHITE, 0, false);
        putPiece(7, 7, ROOK, WHITE, 0, false);
        putPiece(4, 0, ROOK, BLACK, 0, false);
        putPiece(4, 6, PAWN, WHITE, 0, false);
    }

    const [selX, setSelX] = useState(-1);
    const [selY, setSelY] = useState(-1);

    const onClick = (x: number, y: number) => {
        if (selX != -1 && selY != -1) {
            const moves = getValidMoves(selX, selY, fields);

            if (moves.find(move => move[0] == x && move[1] == y) != null) {
                console.log(`Move [${fields[selX][selY].piece.color} :: ${fields[selX][selY].piece.piece}] from ${selX}, ${selY} to ${x}, ${y}`);
                clearHighlights();
                return;
            }
        }

        clearHighlights();
        const piece = fields[x][y].piece;
        if (piece.piece != -1) {
            const newFields = Array.from(fields);
            const moves = getValidMoves(x, y, fields);

            newFields[x][y].selected = true;
            setSelX(x);
            setSelY(y);

            for (const move of moves) {
                const [mX, mY] = move;

                if (newFields[mX][mY].piece.piece == NONE) {
                    newFields[mX][mY].highlighted = true;
                } else {
                    if (newFields[x][y].piece.color != newFields[mX][mY].piece.color) {
                        newFields[mX][mY].circled = true;
                    }
                }

                setFields(newFields);
            }
        }
    };

    const clearPieces = () => {
        const newFields = Array.from(fields);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                newFields[i][j].piece.piece = NONE;
                newFields[i][j].piece.color = NO_COLOR;
                newFields[i][j].piece.moveCount = 0;
            }
        }
        setFields(newFields);
    }

    const clearHighlights = () => {
        setSelX(-1);
        setSelY(-1);

        const newFields = Array.from(fields);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                newFields[i][j].highlighted = false;
                newFields[i][j].circled = false;
                newFields[i][j].selected = false;
            }
        }
        setFields(newFields);
    }

    const putPiece = (x: number, y: number, piece: number, color: number, moveCount: number, hasJustMoved: boolean) => {
        const newFields = Array.from(fields);
        newFields[x][y].piece.piece = piece;
        newFields[x][y].piece.color = color;
        newFields[x][y].piece.moveCount = moveCount;
        newFields[x][y].piece.hasJustMoved = hasJustMoved;
        setFields(newFields);
    }

    return (
        <div className={className} style={style}>
            <button onClick={init}>Init</button>
            <table className={"chess-board"}>
                <tbody>
                    <ClickContext.Provider value={onClick}>
                        <FieldContext.Provider value={fields}>
                            {constructBoard()}
                        </FieldContext.Provider>
                    </ClickContext.Provider>
                </tbody>
            </table>
        </div>
    )
};

const constructBoard = () => {
    const rows = [];

    rows.push(
        <tr key={0}>
            <td style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <img src={"./src/assets/logo-green.png"} alt={"Logo"} style={{width: "40%"}}/>
            </td>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            <td>E</td>
            <td>F</td>
            <td>G</td>
            <td>H</td>
        </tr>
    );

    for (let i = 1; i <= 8; i++) {
        rows.push(<ChessRow rowIndex={i} key={i}></ChessRow>)
    }
    
    return rows;
};


export interface ChessFieldData {
    highlighted: boolean;
    circled: boolean;
    selected: boolean;
    piece: ChessPieceData;
}

export interface ChessPieceData {
    piece: number;
    color: number;
    moveCount: number;
    hasJustMoved: boolean;
}
