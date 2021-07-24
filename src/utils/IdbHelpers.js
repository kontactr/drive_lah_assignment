import { get, set, getMany, del, clear, update } from 'idb-keyval';

export const getValue = async (key) => {
    return await get(key)
}

export const setValue = async (key, value) => {
    return await set(key, value)
}

export const getValues = async (...keys) => {
    return await getMany(keys)
}

export const deleteKey = async (key) => {
    return await del(key)
}

export const clearDb = async () => {
    return await clear()
}

export const updateConsistently = async (key, valueFunc) => {
    return await update(key, (val) => valueFunc(val));
}