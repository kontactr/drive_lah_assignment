import { get, set, getMany } from 'idb-keyval';

export const getValue = async (key) => {
    return await get(key)
}

export const setValue = async (key, value) => {
    try { await set(key, value); return true; } catch (idbSetError) { return false }
}

export const getValues = async (...keys) => {
    return await getMany(keys)
}
