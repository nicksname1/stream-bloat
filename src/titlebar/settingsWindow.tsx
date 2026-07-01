// import {getCurrentWebviewWindow} from "@tauri-apps/api/webviewWindow"

export const SettingsWindow = () => {
	// const closeSelf = () => getCurrentWebviewWindow().close()

	return (
		<main>
			{/* <button onClick={closeSelf}>Close</button> */}
			<form action="">
				<label htmlFor="twitchAccount">Twitch Channel</label>
				<input
					type="text"
					id="twitchAccount"
				/>
				<button type="submit">Save</button>
			</form>
		</main>
	)
}
