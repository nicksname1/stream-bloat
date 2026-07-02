import {useEffect, useRef, useState} from "react"
import "./App.css"
import "./preflight.css"
import tmi from "tmi.js"
import {getEmoteAsUrl, parseEmotesInMessage} from "tmi-utils"
import {Titlebar} from "./titlebar/titlebar"
import {SettingsWindow} from "./titlebar/settingsWindow"

type Chat = {
	source: "twitch" | "youtube"
	key: string | null
	author: string
	message: string
	color: string | undefined
	emotes:
		| {
				[emoteid: string]: string[]
		  }
		| undefined
}

function App() {
	const [chat, setChat] = useState<Chat[]>([])
	const [twitchStatus, setTwitchStatus] = useState<
		"connected" | "connecting" | "disconnected"
	>("disconnected")
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	const client = new tmi.Client({
		channels: ["nickchunk"],
	})

	client.connect()

	client.on("connected", () => setTwitchStatus("connected"))

	client.on("message", (_channel, tags, message, _self) => {
		const chat: Chat = {
			source: "twitch",
			key: tags.id || null,
			author: `${tags["display-name"]}`,
			message: message,
			color: tags.color,
			emotes: tags.emotes,
		}

		setChat((prev) => {
			if (prev.some((x) => x.key === chat.key)) return prev
			return [...prev, chat]
		})
	})

	const restoredMessage = (
		emotes: Record<string, string[]>,
		message: string
	) => {
		const splitMessage = parseEmotesInMessage(emotes, message)

		const x = splitMessage.map((i) => {
			const {type, value, raw} = i

			if (type === "emote") {
				const url = getEmoteAsUrl(value)
				return (
					<img
						src={url}
						alt={raw}
					/>
				)
			} else return <span>{value}</span>
		})

		return x
	}

	const isSettings = window.location.hash === "#settings"

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
	}, [chat])

	return isSettings ? (
		<SettingsWindow />
	) : (
		<>
			<Titlebar />
			<main className="container">
				<div className="chat-box">
					{twitchStatus === "connected" && "Connected to Twitch"}
					{chat.map((i, index) => {
						return (
							<div key={index}>
								<span>
									{i.source === "twitch" ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											viewBox="0 0 256 256">
											<path
												fill="#b446ed"
												d="M208 32H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h16v32a8 8 0 0 0 13.12 6.15L122.9 208h42.2a16 16 0 0 0 10.25-3.71l42.89-35.75a15.93 15.93 0 0 0 5.76-12.29V48a16 16 0 0 0-16-16m-80 104a8 8 0 0 1-16 0V88a8 8 0 0 1 16 0Zm48 0a8 8 0 0 1-16 0V88a8 8 0 0 1 16 0Z"></path>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											viewBox="0 0 256 256">
											<path
												fill="#ed4646"
												d="M234.33 69.52a24 24 0 0 0-14.49-16.4C185.56 39.88 131 40 128 40s-57.56-.12-91.84 13.12a24 24 0 0 0-14.49 16.4C19.08 79.5 16 97.74 16 128s3.08 48.5 5.67 58.48a24 24 0 0 0 14.49 16.41C69 215.56 120.4 216 127.34 216h1.32c6.94 0 58.37-.44 91.18-13.11a24 24 0 0 0 14.49-16.41c2.59-10 5.67-28.22 5.67-58.48s-3.08-48.5-5.67-58.48m-73.74 65l-40 28A8 8 0 0 1 108 156v-56a8 8 0 0 1 12.59-6.55l40 28a8 8 0 0 1 0 13.1Z"></path>
										</svg>
									)}
								</span>

								<span
									style={{
										color: i.color,
										fontWeight: "bold",
									}}>
									{i.author}
								</span>
								{": "}
								<span className="chat">
									{i.emotes
										? restoredMessage(i.emotes, i.message)
										: i.message}
								</span>
							</div>
						)
					})}
					<div ref={messagesEndRef}></div>
				</div>
			</main>
		</>
	)
}

export default App
