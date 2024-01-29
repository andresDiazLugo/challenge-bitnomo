"use client"
import React from 'react';
import ConfirmPayment from '@svg/confirmPayment.svg'
import ErrorPayment from '@svg/errorPayment.svg';
import { Button } from '@/app/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
interface Params{
    render: boolean
}
interface Props{
    params: Params
}
export default function CardAlert({params}:Props) {
    const router = useRouter();
    const redirectioPageCreatePayment = ()=>{
        router.replace('/')
    }
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="max-w-[420px] h-[420px] p-[32px] shadow-lg rounded-[16px] flex flex-col justify-center items-center">
            <div className="flex flex-col gap-6 h-[300px]">
                <div className="flex items-center justify-center">
                    {
                        params.render ?
                        <Image src={ConfirmPayment} alt="icon exito"/>
                        :
                        <Image src={ErrorPayment} alt="icon error"/>
                    }
                </div>
                <div>
                    {
                        params.render ?
                        <p className="text-text-color text-[20px] font-[700] text-center">¡Pago completado!</p>
                        :
                        <p className="text-text-color text-[20px] font-[700] text-center">¡Pago cancelado!</p>
                    }
                </div>
                <div className="text-[16px] font-[400] text-center">
                    Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius dolor elit facilisi enim. Nulla ut ut eu nunc.
                </div>
            </div>
            <div className="w-full">
                <Button params={{activateButton:false,loading:false,eventExecute:redirectioPageCreatePayment}}/>
            </div>
        </div>
    </div>
  )
}
