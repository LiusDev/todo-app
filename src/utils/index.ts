import axios from "axios"
import useSWR from "swr"

export const instance = axios.create({
    baseURL: `https://todo-api-zoeg.onrender.com/v1`,
})

const fetcher = (url: string) => instance.get(url).then((res) => res.data)

export const doGet = (url: string) => {
    const { data, error } = useSWR(url, fetcher)
    return {
        data,
        error,
        isLoading: !error && !data,
    }
}

export const doPost = async <T>(url: string, body: T) => {
    let data = null
    let error = null
    let isLoading = true

    try {
        const res = await instance.post(url, body)
        data = res.data
    } catch (error: any) {
        error = error
    } finally {
        isLoading = false
    }

    return {
        data,
        error,
        isLoading,
    }
}

export const doPatch = async <T>(url: string, body: T) => {
    let data = null
    let error = null
    let isLoading = true

    try {
        const res = await instance.patch(url, body)
        data = res.data
    } catch (error: any) {
        error = error
    } finally {
        isLoading = false
    }

    return {
        data,
        error,
        isLoading,
    }
}

export const doDelete = async (url: string) => {
    let error = null
    let isLoading = true

    try {
        await instance.delete(url)
    } catch (error: any) {
        error = error
    } finally {
        isLoading = false
    }

    return {
        error,
        isLoading,
    }
}
