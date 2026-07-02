import {load} from "@tauri-apps/plugin-store"

let storePromise: Promise<Awaited<ReturnType<typeof load>>> | null = null

export function getStore() {
	if (!storePromise) {
		storePromise = load("store.json")
	}
	return storePromise
}

export async function getKey<T>(key: string): Promise<T | undefined> {
	const store = await getStore()
	return store.get<T>(key)
}

export async function setKey<T>(key: string, value: T) {
	const store = await getStore()
	await store.set(key, value)
	await store.save()
}
