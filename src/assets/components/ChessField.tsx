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

import {CSSProperties, useContext} from "react";
import {ClickContext, FieldContext} from "./ChessBoard.tsx";
import ChessPiece from "./ChessPiece.tsx";

export default function ChessField({rowIndex, index}: {rowIndex: number, index: number}) {
    const onClick = useContext(ClickContext)!;
    const fields = useContext(FieldContext)!;

    const offset = rowIndex % 2 == 0 ? 1 : 2;
    const dark = (index + offset) % 2 == 0;

    let extraStyle: CSSProperties = {};

    if (rowIndex == 1) {
        if (index == 1) {
            extraStyle = {borderTopLeftRadius: "20px"};
        } else if (index == 8) {
            extraStyle = {borderTopRightRadius: "20px"};
        }
    } else if (rowIndex == 8) {
        if (index == 1) {
            extraStyle = {borderBottomLeftRadius: "20px"};
        } else if (index == 8) {
            extraStyle = {borderBottomRightRadius: "20px"};
        }
    }

    if (fields[index-1][rowIndex-1].selected) {
        extraStyle.scale = "0.96";
        extraStyle.backgroundColor = "rgb(255,196,87)";
        extraStyle.outlineStyle = "solid";
        extraStyle.outlineWidth = "3px";
        extraStyle.outlineOffset = "-1px";
        extraStyle.outlineColor = "rgb(250,158,0)";
    }

    let extraFieldContent;
    const fieldContent = fields[index-1][rowIndex-1].piece.piece != -1 ? <ChessPiece type={fields[index-1][rowIndex-1].piece.piece} color={fields[index-1][rowIndex-1].piece.color}/> : null;

    if (fields[index-1][rowIndex-1].circled) {
        extraFieldContent = (
            <div style={{borderRadius: "100%", width: "80%", height: "80%", outline: "rgba(91,91,91,0.58) solid 7px"}}>
                <div className={"center"} style={{height: "100%", width: "100%"}}>
                    {fieldContent}
                </div>
            </div>
        );
    } else if (fields[index-1][rowIndex-1].highlighted) {
        extraFieldContent = (
            <div style={{borderRadius: "100%", width: "20%", height: "20%", backgroundColor: "rgba(91,91,91,0.58)"}}>
                <div className={"center"} style={{height: "100%", width: "100%"}}>
                    {fieldContent}
                </div>
            </div>
        );
    } else {
        extraFieldContent = (
            <div>
                <div className={"center"} style={{height: "100%", width: "100%"}}>
                    {fieldContent}
                </div>
            </div>
        );
    }

    if (dark) {
        return (
            <td className={"dark figure-field"} style={extraStyle} onClick={() => {onClick(index-1, rowIndex-1)}}>
                <div className={"center"} style={{height: "100%", width: "100%"}} >
                    {extraFieldContent}
                </div>
            </td>
        );
    } else {
        return (
            <td className={"light figure-field"} style={extraStyle} onClick={() => {onClick(index-1, rowIndex-1)}}>
                <div className={"center"} style={{height: "100%", width: "100%"}}>
                    {extraFieldContent}
                </div>
            </td>
        );
    }
}