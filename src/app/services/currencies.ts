import type {  Currencies  }  from "@type/currencies";
import { APIUrls } from './urls';
export async function getCurrencies(){
    const requestOptions = {
        method: 'GET', 
        headers:{
            'X-Device-Id':'d6aac8e9-ed6c-4135-a5c7-f3b4bba5c31b'
        }
    }
    try {
        const response = await fetch(APIUrls.get.currencies,requestOptions)
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}