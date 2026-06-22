import {useEffect, useRef, useState} from "react"
import "./App.css"
import "./preflight.css"
import tmi from "tmi.js"
type Chat = {
	key: string | null
	author: string
	message: string
	color: string | undefined
}

function App() {
	const [chat, setChat] = useState<Chat[]>([])
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	const client = new tmi.Client({
		channels: ["nickchunk"],
	})

	client.connect()

	client.on("message", (_channel, tags, message, _self) => {
		const chat = {
			key: tags.id || null,
			author: `${tags["display-name"]}`,
			message: message,
			color: tags.color,
		}

		setChat((prev) => {
			if (prev.some((x) => x.key === chat.key)) return prev
			return [...prev, chat]
		})
	})

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
	}, [chat])

	return (
		<main className="container">
			<div className="chat-box">
				{chat.map((i, index) => {
					return (
						<div key={index}>
							<span
								style={{
									color: i.color,
									fontWeight: "bold",
								}}>
								{i.author}:
							</span>{" "}
							&nbsp;
							{i.message}
						</div>
					)
				})}
				<div ref={messagesEndRef}></div>
			</div>
		</main>
	)
}

export default App
