import React from 'react'

export default function Footer() {
  return (
    <footer className='h-[26px] flex items-center  w-[399px] m-auto gap-[16px]'>
        <div className='h-[26px] w-[164px] flex gap-1 items-center justify-center'>
            <img className='w-[49px] h-[8px]' src='/poweredby.svg' alt='logo'/>
            <img src='/logoBitnovo.svg' alt='incono'/>
        </div>
        <span className='w-[1px] h-[26px] bg-[#C0CCDA]'></span>
        <p className=' w-[203px] h-[18px] text-[#C0CCDA] font-[700] text-[12px] leading-[18px] text-center'>© 2022 Bitnovo. All rights reserved.</p>
    </footer>
  )
}
