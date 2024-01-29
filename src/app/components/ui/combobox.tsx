"use client"
import { Label } from '@components/ui/label';
import React, { useState, useEffect } from 'react';
import { getCurrencies } from '@services/currencies';
import { Currencies } from '@type/currencies';
import Image from 'next/image';
import OptionCrypto from '@svg/optionCrypto.svg';
import CryptoSelectActive from '@svg/checkSelectCrypto.svg';
interface ComboboxProps{
  handleCurrencySelect: (currencie: Currencies) => void,
}

export const Combobox: React.FC<ComboboxProps> = ({handleCurrencySelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencies,setCurrencies] = useState<Currencies[]>([]);
  const [selectCurrencie,setSelectCurrencie] = useState<Currencies>();
 

  useEffect(() => {
    getCurrencies()
    .then(data=>{
      if(data !== undefined && Array.isArray(data)){
        setCurrencies(data)
        handleSelectCurrencie(data[1]);
      }
    }).catch(err=>{console.log(err)})
  
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleSelectCurrencie = (currencie:Currencies | null)=>{
    if(currencie !== null){
      localStorage.setItem("imgCrypto",currencie.image);
      setSelectCurrencie(currencie);
      handleCurrencySelect(currencie);
      setIsOpen(false);
    }
  }

  return (
    <div>
      <div className="relative group ">
      <Label className='text-[14px]  font-[700] text-text-color'>
                Seleccionar moneda
      </Label>
        <button
          type="button"
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm focus:outline-none border border-gray-300"
          onClick={handleToggleDropdown}
        >
          <div className="flex gap-2 items-center">
            <img src={selectCurrencie?.image}  className="w-[32px] h-[32px] animate-wiggle-more animate-infinite animate-duration-[1300ms]"/>
            <span className="mr-2">{selectCurrencie?.name}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <div
          id="dropdown-menu"
          className={`${ isOpen ? "" : "hidden"}  absolute w-full top-0  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-5 space-y-1 animate-fade-down`}
        >
          {/* Search input */}   
          <div className='flex items-center justify-between p-1'>
            <Label className='text-[14px]  font-[700] text-text-color'>
                Seleccionar moneda
            </Label>
            <button type='button' onClick={handleToggleDropdown}>X</button>
          </div>
          <label className='flex items-center border gap-2 px-3 rounded'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.58317 18.125C4.87484 18.125 1.0415 14.2917 1.0415 9.58334C1.0415 4.87501 4.87484 1.04167 9.58317 1.04167C14.2915 1.04167 18.1248 4.87501 18.1248 9.58334C18.1248 14.2917 14.2915 18.125 9.58317 18.125ZM9.58317 2.29167C5.55817 2.29167 2.2915 5.56667 2.2915 9.58334C2.2915 13.6 5.55817 16.875 9.58317 16.875C13.6082 16.875 16.8748 13.6 16.8748 9.58334C16.8748 5.56667 13.6082 2.29167 9.58317 2.29167Z" fill="#647184"/>
            <path d="M18.3335 18.9587C18.1752 18.9587 18.0169 18.9004 17.8919 18.7754L16.2252 17.1087C15.9835 16.867 15.9835 16.467 16.2252 16.2254C16.4669 15.9837 16.8669 15.9837 17.1085 16.2254L18.7752 17.892C19.0169 18.1337 19.0169 18.5337 18.7752 18.7754C18.6502 18.9004 18.4919 18.9587 18.3335 18.9587Z" fill="#647184"/>
            </svg>
            <input
              id="search-input"
              className="block w-full py-2 text-gray-800 border-none rounded-md  border-gray-300  focus:outline-none"
              type="text"
              placeholder="Buscar"
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearchInput}
            />
          </label>  
          {/* Dropdown contenido*/}
          <ul>
            {currencies?.map((item, index) => (
                <li
                onClick={()=>handleSelectCurrencie(item)}
                key={index}
                className={`${item.name.toLowerCase().includes(searchTerm) ? "": "hidden"} px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md flex justify-between `}
                >
                  <div className="flex  gap-2">
                    <img src={item.image}  className="w-[32px] h-[32px] animate-wiggle-more animate-infinite animate-duration-[1300ms]" alt="cripto"/>  
                    <div >
                        <p className="font-[700] text-text-color">{item.name}</p>
                        <p className="text-xs text-text-color-currencie">{item.blockchain}</p>
                        
                    </div>  
                  </div>
                  {
                   selectCurrencie?.symbol === item.symbol ?
                  <Image  src={CryptoSelectActive} alt="selecionar"/>
                  :
                  <Image  src={OptionCrypto} alt="selecionar"/>
                  }
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
