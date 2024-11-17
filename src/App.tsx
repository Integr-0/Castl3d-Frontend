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
                <BotSelector backendEndpoint={"http://localhost:8080/bots"} setCallback={selectedBot => setCurrentBot(selectedBot)}/>
            </div>
        </>
    )
}

export default App
