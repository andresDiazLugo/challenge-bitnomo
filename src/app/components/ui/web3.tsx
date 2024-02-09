import React, { useState, useEffect } from 'react';
import Metamask from '@svg/metamask.svg';
import Image from 'next/image';

export default function Web3() {
  const [buttonText, setButtonText] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false)

  const connectWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setLoading(true);
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result:any) => {
          setLoading(false);
          alert(`Conectado, esta es tu dirección: ${result[0]}`);
          setAccount(result[0]);
        })
        .catch((err: any) => {
          console.log(err.message);
          alert("Ocurrió un error inesperado al conectar a Metamask");
          setLoading(false)
          setButtonText(err.message);
        });
    } else {
      alert('Necesitas tener Metamask instalado');
    }
  };

  const disconnectWallet = () => {
    window.ethereum
    .request({ method: 'eth_accounts', params: ['disconnect'] })
    .then(() => {
      alert("Desconectado");
      setAccount(null);
      setButtonText(null);
    }).catch((err: any) => {
      console.log(err.message);
      alert("Ocurrió un error al desconectar");
    });
  };

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     // Desconectar la billetera al cerrar la pestaña o la ventana
  //     disconnectWallet();
  //   };

  //   // Suscribirse al evento beforeunload
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Retornar una función de limpieza para desuscribirse al desmontar el componente
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div className="w-[193px] h-[193px] rounded-[12px] border-[1px] border-color-border-metmask flex justify-center items-center animate-fade-right cursor-pointer">
      {account ? (
        <button className='font-semibold bg-red-300 p-2 rounded-md' onClick={disconnectWallet}>Desconectar</button>
      ) : (
        <button className='w-full h-full flex items-center justify-center' onClick={connectWallet}>
          {
            loading ?
            <span>Cargando...</span>
            :
            <Image src={Metamask} alt="Metamask conexión" />
          }
        </button>
      )}
    </div>
  );
}
