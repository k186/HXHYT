import Http from "@/utils/http";

const UA = 'hua yi tong/6.6.2 (iPhone; iOS 16.4.1; Scale/3.00)';


export const storageKey = 'hxhytheaders';

export const getStorage = (key?: string) => {
    const data = window.localStorage.getItem(storageKey);
    const result = data ? JSON.parse(data) : null
    if (key) {
        return result ? result[key] : null
    }
    return result
}


export const postAppointment = new Http('https://hytapiv2.cd120.com', {
    token: getStorage('token'),
    accessToken: getStorage('token'),
    // 'User-Agent': UA
})


export const getImageCode: Http = new Http('https://hxgyapiv2.cd120.info', {
    // 'User-Agent': UA
})

export const makeAppointment: Http = new Http('https://hytapiv2.cd120.com', {
    token: getStorage('token'),
    accessToken: getStorage('token'),
    // 'User-Agent': UA
})

export const getReport: Http = new Http('https://hytapiv2.cd120.com', {
    token: getStorage('token'),
    accessToken: getStorage('token'),
})
