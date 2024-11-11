import './App.css'
import ChessBoard from "./assets/components/ChessBoard.tsx";
function App() {
    return (
        <>
            <div className="center">
                <ChessBoard style={{marginTop: "90px"}} backendSocketUrl="wss://castl3d.com/new_connection"/>
            </div>
        </>
    )
}

export default App
