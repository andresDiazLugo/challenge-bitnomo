declare global {
    interface Window {
      ethereum?: any
    }
}

export interface Currencies{
    symbol: "string",
    name: "string",
    min_amount: "string",
    max_amount: "string",
    image: "string",
    blockchain: "string"
}

