/*
 * Copyright © 2024 Integr
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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