export interface Orders{
    identifier: string,
    reference: string,
    payment_uri: string,
    web_url: string,
    address: string,
    tag_memo: string,
    input_currency: string,
    expected_input_amount: 0,
    rate: 0,
    notes: "string",
    fiat: "EUR",
    language: "ES"
}


export interface OrderPost{
    expected_output_amount: number,
    input_currency:string
    merchant_urlko: string,
    merchant_urlok: string,
    notes: string
}

type transaction = {
    confirmed: boolean,
    currency: string,
    amount: number,
    tx_hash: string,
    block: number,
    created_at: Date
    }
export enum Status{
    "AC",
    "EX",
    "OC",
    "CO"
}

export interface Orderinfo{
    identifier: string,
    reference: string,
    created_at: string,
    edited_at: string,
    status: string ,
    fiat_amount: number,
    crypto_amount: number,
    unconfirmed_amount: number,
    confirmed_amount: number,
    currency_id: string,
    merchant_device_id: number,
    merchant_device: string,
    address: string,
    tag_memo: string,
    url_ko: string,
    url_ok: string,
    url_standby: string,
    expired_time: string,
    good_fee: boolean,
    notes: string,
    rbf: boolean,
    safe: boolean,
    fiat: "EUR",
    language: "ES",
    percentage: number,
    received_amount: number,
    balance_based: string,
    internal_data: string,
    transactions: Array<transaction>
}