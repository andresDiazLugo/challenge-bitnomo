"use client"
import React, { useEffect, useState } from 'react'
import { getOrderInfo } from '@services/orders'
import { Orderinfo, Status } from '@/app/types/orders';
import { useRouter } from 'next/navigation';
import { setterDate } from '@lib/utils/formatDate';
import CheckDetailPayment from '@svg/checkDetailPayment.svg';
import TimeClock from '@svg/time.svg';
import Warning from '@svg/warning.svg';
import { differenceInSeconds, parseISO, format} from 'date-fns';
import Image from 'next/image';
import CopyText from '@components/ui/copy';
import OptionsScannerMetamask from '@/app/components/ui/optionsScannerMetamask';

interface Params {
  id: string
}
interface Props {
  params: Params
}
export default function Payment({ params }: Props) {
  const [orderInfo,setOrderInfo] = useState<Array<Orderinfo>>();
  const [cryptoImg,setCryptoImg] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [render,setRender] = useState(false);
  const [copy,setCopy] = useState(
    {
      address: false,
      amount: false,
      tag: false
    }
  );
  const router = useRouter();
  console.log("me ejecutoo",orderInfo)

  useEffect( ()=>{
      setCryptoImg(localStorage.getItem('imgCrypto') ?? '');
      //conectar el servidor 
      const ws = new WebSocket(`wss://payments.pre-bnvo.com/ws/${params.id}`);
      //se escucha un evento, cuando el servidor responde, revisa la informacion si completo la operacion de pago
      (async ()=>{
        ws.onmessage = (event)=>{
          const data:Orderinfo = JSON.parse(event.data);
          if(data.status === "CO" || data.status === "AC" ){
            router.replace('/confirmpayment');
          }else{
            router.replace('/errorpayment');
          }
        }
        // realiza una peticion para traer la informacion de la orden de pago que se creo 
        try {
          const response = await getOrderInfo(params.id);
          
          if( response !== undefined && Array.isArray(response) && (response[0].status === "EX"|| response[0].status === "OC") ){
            router.replace('/errorpayment');
          }else if( response !== undefined && Array.isArray(response) && (response[0].status === "CO" || response[0].status === "AC") ){
            router.replace('/confirmpayment');
          }else if(response !== undefined && Array.isArray(response) && render === false){
            setOrderInfo(response);
            setRender(true)
          }
        } catch (error) {
          router.replace('/');
        }
      })()
    //realiza un conteo de manera descendiente dependiendo del tiempo de expiracion que devuelve una de las propiedades de la informacion del api
    const updateRemainingTime = () => {
      if(orderInfo?.[0]?.expired_time !== undefined){
        const currentTime = new Date();
        const expiredTime = parseISO(orderInfo?.[0]?.expired_time as string);
        // Calcular la diferencia en segundos
        const difference = differenceInSeconds(expiredTime, currentTime);
        // Formatear la diferencia en formato "mm:ss"
        const remainingTime = format(new Date(0, 0, 0, 0, 0, difference), 'mm:ss');
        setTimeRemaining(remainingTime);
        if (remainingTime === '00:00') {
          // Detener el intervalo
          clearInterval(intervalId);
          // Redirigir a otra pantalla
          router.replace('/errorpayment');
        }
      }
    };
    const intervalId = setInterval(updateRemainingTime, 1000);


    return () => {
      clearInterval(intervalId);
      ws.close();
    };
    
  },[render])

  return (
<section className="h-auto lg:h-screen bg-white flex items-center justify-center">
  {
  orderInfo?.map((order, i)=>
    <div key={i} className="lg:h-auto grid grid-cols-1 max-w-[1198px] gap-[32px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
    <div className="flex flex-col max-w-[583px] xl:w-[583px] gap-[24px]">
      <h3 className="mb-3 text-primary text-[20px] font-[700] leading-[25px]">Resumen del pedido</h3>
      <div className="bg-color-details h-[370px] p-[32px]  rounded-[16px] ">
        <ul className='flex flex-col gap-[31px]'>
        <li className=' h-[53px]  flex items-start justify-between w-full  border-b-[1px] border-b-color-separate'><p className=' text-primary text-[18px] font-[700] leading-[22px]'>Importe:</p><p className=' text-primary text-[18px] font-[700]'>{order.fiat_amount} {order.fiat}</p> </li>
        <li className=' h-[53px] flex items-start justify-between w-full  border-b-[1px]  border-b-color-separate'>
          <p className=' text-primary text-[16px] font-[700]'>Moneda seleccionada:</p>
          <div className='flex gap-[8px] items-center justify-center'>
            <img className='w-[20px] h-[20px]' src={cryptoImg} alt='incono crypto'/>
            <p className=' text-primary text-[16px] font-[700]'>{order.currency_id}</p>
          </div>
        </li>
        <li className='h-[75px] flex items-start  justify-between w-full border-b-[1px]  border-b-color-separate'>
          <div className='flex flex-col gap-3'>
            <p className=' text-primary text-[16px] font-[700] leading-[22px]'>Comercio:</p>
            <p className=' text-primary text-[16px] font-[700] leading-[22px]'>Fecha:</p>
          </div>
          <div className='flex flex-col items-end gap-3'>          
            <div className='flex items-center justify-center'>
             <Image src={CheckDetailPayment} alt={'check'}/>
              <p className=' text-primary text-[16px] font-[700] leading-[22px]'>Comercio de pruebas de Semega</p>
            </div>
              <p className=' text-primary text-[16px] font-[700] leading-[22px]'>{setterDate(order.created_at,"DATE") }</p>
          </div>
        </li>
        <li className=' h-[75px] flex items-start justify-between w-full'>
          <p className=' text-primary text-[16px] font-[700] leading-[22px]'>Concepto:</p>
          <div>
          <p className=' text-primary text-[16px] font-[700] whitespace-pre-wrap text-right leading-[22px] line-clamp-3'>{order.notes}</p>
          </div>
        </li>
        </ul>
      </div>
      
    </div>
    <div className="flex max-w-[583px] flex-col md:max-w-[583px] lg:w-[583px] xl:w-[583px] gap-[24px]">
      <h3 className="mb-3 text-primary text-[20px] font-[700] leading-[25px]">Realiza el pago</h3>
      <ul className="w-full p-[32px] bg-white flex flex-col gap-7 border rounded-[16px] shadow-lg">
      <li  className="w-full flex items-center justify-center">
        <div className='flex justify-center items-center gap-[4px]' >
          <Image className='w-[24px] h-[24px]' src={TimeClock} alt='time' />
          <p className=' text-primary text-[12px] font-[600]'>{timeRemaining}</p>
        </div>
      </li>
      <li  className="w-full flex flex-col items-center justify-center gap-9">
        <OptionsScannerMetamask params={{address:order.address, currency_id:order.currency_id, crypto_amount:order.crypto_amount, tag_memo:order.tag_memo}}/>
      </li>
      <li className="w-full flex items-center justify-center">
        <div className='flex justify-center items-center gap-[4px]'>
          <p className=' text-primary text-[14px] font-[600] leading-[22px] g'>
          Enviar     <span className=' text-primary text-[20px] font-[700] '><span className='pl-1' id='amount'>{order.crypto_amount}</span> {order.currency_id}</span>
          </p> 
          <CopyText params={{key:"amount", copyState:copy, setCopy:setCopy, selector:"#amount"}}/>        
        </div> 
      </li>
      <li className="w-full flex items-center justify-center">
        <div className='flex justify-center items-center gap-[4px]'>
          <p id='address'  className=' text-primary text-[14px] font-[400] leading-[22px] line-clamp-3'>{order.address}</p>
          <CopyText params={{key:"address", copyState:copy, setCopy:setCopy, selector:"#address"}}/>       
        </div>        
      </li>
      <li className="w-full flex items-center justify-center">
        <div className='flex justify-center items-center gap-[4px]'>
          <Image src={Warning} alt='warning' />
          <p  className=' text-primary text-[12px] font-[600] leading-[22px]' >Etiqueta de destino: <span id='tag'>{order.tag_memo.length > 0 ? order.tag_memo : 'No posee una etiqueta'}</span></p>
          <CopyText params={{key:"tag", copyState:copy, setCopy:setCopy, selector:"#tag"}}/> 
        </div>
      </li>
      </ul>
    </div>
  </div>
  ) 
  }

</section>
  )
}

