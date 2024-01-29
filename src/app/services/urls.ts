const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'https://payments.pre-bnvo.com';
const deviceID = process.env.NEXT_PUBLIC_DEVICE_ID ?? '';
const pageConfirm = process.env.NEXT_PUBLIC_REDIRECTOK ?? 'http://localhost:3000/confirmpayment';
const pageError = process.env.NEXT_PUBLIC_REDIRECTERROR ?? 'http://localhost:3000/errorpayment';
export const APIUrls = {
    get:{
        currencies: `${baseUrl}/api/v1/currencies/`,
        order:(param:string)=> `${baseUrl}/api/v1/orders/info/${param}/`
    },
    post:{
        order: `${baseUrl}/api/v1/orders/`
    }
}
export const HEADERS = {
    header : deviceID
}

export const pageRedirect = {
    pageConfirm: pageConfirm,
    pageError: pageError
}