import React, { useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';
import Web3 from './web3';

type Option = 'smartQR' | 'web3';

interface Params{
    address: string,
    currency_id: string,
    crypto_amount:string | number,
    tag_memo: string
}

interface Props{
    params: Params
}

export default function OptionsScannerMetamask({params}:Props) {
    const [selectedOption, setSelectedOption] = useState<Option | null>("smartQR");
    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
      };
    
  return (
  
        <>

            <div  className="flex items-center justify-center gap-[16px]"> 
                <button 
                    onClick={() => handleOptionClick('smartQR')}
                    className={`text-center   rounded-[100px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] ${selectedOption === 'smartQR' ? "bg-button-color text-white " : "bg-color-details text-text-color-selection"}`}>Smart QR</button>
                <button
                    onClick={() => handleOptionClick('web3')}
                    className={`text-center rounded-[100px] pt-[6px] pr-[12px] pb-[6px] pl-[12px] ${selectedOption === 'web3' ? 'bg-button-color text-white ' : 'bg-color-details text-text-color-selection'}`}>Web3</button>
            </div>
            <div>
            {selectedOption === "smartQR" && (
                <QRCodeSVG
                 className="animate-fade-left" 
                 size={193}
                 value={`{ADDRESS: ${params.address}, TYPE_CRYPTO: ${params.currency_id},CRYPTO_AMOUNT: ${params.crypto_amount}, TAG: ${params.tag_memo}}`}
                />
            )}
            {selectedOption === 'web3' && <Web3 />}
            </div>
        </>
  )
}
