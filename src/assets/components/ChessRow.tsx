import ChessField from "./ChessField.tsx";


export default function ChessRow({rowIndex}: {rowIndex: number}) {
    return (
        <tr>
            {constructRow(rowIndex)}
        </tr>
    )
}

const constructRow = (rowIndex: number) => {
    const fields = [];

    fields.push(<td key={0}>{rowIndex}</td>);

    for (let i = 1; i <= 8; i++) {
        fields.push(<ChessField rowIndex={rowIndex} index={i} key={i}></ChessField>);
    }

    return fields;
};