import "../styles/settings.css"
import {getKey, setKey} from "../persistentStore"
import {useEffect, useState, type SyntheticEvent} from "react"

export const SettingsWindow = () => {
	const [twitchChannel, setTwitchChannel] = useState<string>("")

	const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const formJson = Object.fromEntries(formData.entries())

		setTwitchChannel(formJson.twitchChannel as string)
		await setKey("twitchChannel", formJson.twitchChannel as string)
	}

	useEffect(() => {
		;(async () => {
			const x = await getKey<string>("twitchChannel")
			if (x !== undefined) {
				setTwitchChannel(x)
			}
		})()
	}, [])

	return (
		<main id="settingsContainer">
			{/* <button onClick={closeSelf}>Close</button> */}
			<form onSubmit={onSubmit}>
				<div className="input">
					<label htmlFor="twitchChannel">Twitch Channel</label>
					<input
						type="text"
						id="twitchChannel"
						name="twitchChannel"
						defaultValue={twitchChannel}
					/>
				</div>
				<button type="submit">Save</button>
			</form>
		</main>
	)
}
