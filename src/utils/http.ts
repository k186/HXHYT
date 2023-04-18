// http.ts

// @ts-ignore
import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios'

class Http {
    private instance: AxiosInstance

    constructor(baseURL: string, headers?: Record<string, string>) {
        this.instance = axios.create({
            baseURL,
            headers
        })

        // @ts-ignore
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 在请求发送前添加认证头等等
            return config
        }, (error: AxiosError) => {
            // 处理请求错误
            return Promise.reject(error)
        })

        this.instance.interceptors.response.use((response: AxiosResponse) => {
            // 处理响应数据
            if (response.data.code === '1') {
                return response.data.data
            } else {
                return Promise.reject(response.data.msg)
            }
        }, (error: AxiosError) => {
            // 处理响应错误
            return Promise.reject(error)
        })
    }

    public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.get(url, config)
    }

    public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.post(url, data, config)
    }

    public put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.put(url, data, config)
    }

    public delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.instance.delete(url, config)
    }
}

export default Http
