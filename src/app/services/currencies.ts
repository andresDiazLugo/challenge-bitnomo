import type {  Currencies  }  from '@type/currencies';
import { APIUrls, HEADERS } from './urls';
export async function getCurrencies():Promise<Currencies | void>{
    const requestOptions = {
        method: 'GET', 
        headers:{
            'X-Device-Id': HEADERS.header
        }
    }
    try {
        const response = await fetch(APIUrls.get.currencies,requestOptions)
        const currencies = await response.json();
        return currencies
    } catch (error) {
        console.log(error)
    }
}

