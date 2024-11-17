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

import React, {useEffect} from "react";

export interface Bot {
    id: string,
    name: string
}

export default function BotSelector({style, className, backendEndpoint, setCallback}: {style?: React.CSSProperties | undefined, className?: string | undefined, backendEndpoint: string, setCallback: (bot: string) => void}) {
    const [bot, setBot] = React.useState<string>("easy_default");
    const [bots, setBots] = React.useState<Bot[]>([]);

    const fetchBots = async () => {
        const response = await fetch(backendEndpoint);
        const data = await response.json();
        setBots(data.bots);
    }

    useEffect(() => {
        fetchBots().catch(console.error);
    }, [backendEndpoint]);
    
    const constructOptions = () => {
        return bots.map((bot, index) => {
            return <option key={index} value={bot.id}>{bot.name}</option>
        });
    }

    return (
        <div className={className} style={style}>
            <div className="bot_selector">
                <select onChange={e => setBot(e.target.value)}>
                    {constructOptions()}
                </select>

                <button onClick={() => setCallback(bot)}>Play</button>
            </div>
        </div>
    )
}