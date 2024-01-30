"use client"
import { Label } from '@components/ui/label';
import DesplegleButton from '@svg/desplegleButton.svg';
import React, { useState, useEffect } from 'react';
import { getCurrencies } from '@services/currencies';
import { Currencies } from '@type/currencies';
import Image from 'next/image';
import OptionCrypto from '@svg/optionCrypto.svg';
import Search from '@svg/search.svg';
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
        <div>
          <button
            type="button"
            className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm focus:outline-none border border-gray-300"
            onClick={handleToggleDropdown}
          >
            {
            selectCurrencie?.image ?
            <>
              <div className="flex gap-2 items-center">
                <img src={selectCurrencie?.image}  className="w-[32px] h-[32px] animate-wiggle-more animate-infinite animate-duration-[1300ms]"/>
                <span className="mr-2">{selectCurrencie?.name}</span>
              </div>
              <Image src={DesplegleButton} alt='boton desplegable de opciones de crypto'/>
            </>
            :
            <span>Cargando...</span>
            }
          </button>
        </div>
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
            <Image src={Search} alt='incono de busqueda'/>
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
