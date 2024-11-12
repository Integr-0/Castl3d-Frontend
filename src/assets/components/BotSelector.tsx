import React from "react";

export default function BotSelector({style, className, setCallback}: {style?: React.CSSProperties | undefined, className?: string | undefined, setCallback: (bot: string) => void}) {
    const [bot, setBot] = React.useState<string>("easy_default");

    return (
        <div className={className} style={style}>
            <div className="bot_selector">
                <select onChange={e => setBot(e.target.value)}>
                    <option value="easy_default">Easy</option>
                    <option value="medium_default">Medium</option>
                    <option value="hard_default">Hard</option>
                </select>

                <button onClick={() => setCallback(bot)}>Play</button>
            </div>
        </div>
    )
}