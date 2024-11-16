import './App.css'
import ChessBoard from "./assets/components/ChessBoard.tsx";
import BotSelector from "./assets/components/BotSelector.tsx";
import {useState} from "react";
function App() {
    const [currentBot, setCurrentBot] = useState<string>("easy_default");
    return (
        <>
            <div className="center">
                <ChessBoard backendSocketUrl={"ws://localhost:8080/bot_socket"} botId={currentBot}/>
                <BotSelector setCallback={selectedBot => setCurrentBot(selectedBot)}/>
            </div>
        </>
    )
}

export default App
