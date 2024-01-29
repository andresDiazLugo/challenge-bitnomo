import { APIUrls, HEADERS } from './urls';
import { OrderPost, Orders, Orderinfo } from '@type/orders';

export async function postOrder(data:OrderPost):Promise<Orders | void>{
    const requestOptions = {
        method: 'POST', 
        headers:{
            'Content-Type': 'application/json',
            'X-Device-Id':HEADERS.header
        },
        body: JSON.stringify(data)
    }
    
    try {
        const response = await fetch(APIUrls.post.order,requestOptions)
        const order = await response.json();
        return order; 
    } catch (error) {
        console.log(error);
    }
}

export async function getOrderInfo(param:string):Promise<Orderinfo | void>  {
    const requestOptions = {
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json',
            'X-Device-Id':HEADERS.header
        },
    }

    try {
        const response = await fetch(APIUrls.get.order(param),requestOptions)
        const order = await response.json();
        return order; 
    } catch (error) {
        throw Error
    }

}