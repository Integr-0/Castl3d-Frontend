import {faChessRook, faChessKnight, faChessBishop, faChessKing, faChessPawn, faChessQueen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE} from "./Pieces.tsx";
import React from "react";

export default function ChessPiece({type, color}: {type: number, color: number}) {
    const style: React.CSSProperties = {
        color: color == WHITE ? "#eee" : "#2b2c2b"
    };

    switch (type) {
        case BISHOP: return (<FontAwesomeIcon icon={faChessBishop} style={style} className={"piece"}/>)
        case KNIGHT: return (<FontAwesomeIcon icon={faChessKnight} style={style} className={"piece"}/>)
        case ROOK: return (<FontAwesomeIcon icon={faChessRook} style={style} className={"piece"}/>)
        case QUEEN: return (<FontAwesomeIcon icon={faChessQueen} style={style} className={"piece"}/>)
        case KING: return (<FontAwesomeIcon icon={faChessKing} style={style} className={"piece"}/>)
        case PAWN: return (<FontAwesomeIcon icon={faChessPawn} style={style} className={"piece"}/>)
        default: return (<div/>)
    }
}