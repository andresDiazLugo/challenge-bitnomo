import React, { useState } from 'react';
import Metamask from '@svg/metamask.svg';
import Image from 'next/image';

export default function Web3() {
  const [buttonText, setButtonText] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      // METAMASK está instalado
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result:any) => {
          alert(result[0]`Conectado, esta es tu address: ${result[0]}`);
          setAccount(result[0]);
        })
        .catch((err:any) => {
          console.log(err);
          alert("Ocurrio un error inesperado al conectar a metamask");
          setButtonText(err.message);
        });
    } else {
      alert('Necesitas tener Metamask instalado');
    }
  };

  const disconnectWallet = () => {
    // Limpiar la cuenta al desconectar
    setAccount(null);
    setButtonText(null);
  };

  return (
    <div className="w-[193px] h-[193px] rounded-[12px] border-[1px] border-color-border-metmask flex justify-center items-center animate-fade-right cursor-pointer">
      {account ? (
        <button className=' font-semibold  bg-red-300 p-2 rounded-md' onClick={disconnectWallet}>Desconectar</button>
      ) : (
        <div onClick={connectWallet}>
          <Image src={Metamask} alt="metamask conexion" />
        </div>
      )}
    </div>
  );
}