const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://payments.pre-bnvo.com";

export const APIUrls = {
    get:{
        currencies: `${baseUrl}/api/v1/currencies` 
    }
}