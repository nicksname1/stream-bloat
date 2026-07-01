// import {getCurrentWebviewWindow} from "@tauri-apps/api/webviewWindow"

export const SettingsWindow = () => {
	// const closeSelf = () => getCurrentWebviewWindow().close()

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
