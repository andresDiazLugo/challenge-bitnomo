"use client"
import { Label } from '@components/ui/label';
import React, { useState, useEffect, useMemo, useCallback, ChangeEvent  } from 'react';
import { getCurrencies } from '@services/currencies';
import { Currencies } from '@type/currencies';


interface ComboboxProps{
  handleCurrencySelect: (currencie: Currencies,e:React.MouseEvent<HTMLLIElement, MouseEvent> | undefined, cb:()=>void) => void,
  valueOptions:string
}

export const Combobox: React.FC<ComboboxProps> = ({handleCurrencySelect,valueOptions}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencies,setCurrencies] = useState<Currencies[]>([]);
  const [selectCurrencie,setSelectCurrencie] = useState<Currencies>();

    // Definir la función de solicitud como un callback memoizado
    const fetchCurrencies = useCallback(async () => {
      try {
        const data = await getCurrencies();
        if (data !== undefined && Array.isArray(data)) {
          setCurrencies(data);
          handleSelectCurrencie(data[1],undefined);
        }
      } catch (err) {
        console.error(err);
      }
    }, []);

  useEffect(() => {
    fetchCurrencies();
    handleSelectCurrencie(currencies[1],undefined);
  }, []);
  useEffect(()=>{
    if(valueOptions === ""){
      resetInitialState();
    }
  },[valueOptions])
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleSelectCurrencie = (currencie:Currencies | null,e:React.MouseEvent<HTMLLIElement, MouseEvent> | undefined)=>{

    if(currencie !== null){
      localStorage.setItem("imgCrypto",currencie?.image);
      setSelectCurrencie(currencie);
      handleCurrencySelect(currencie,e,resetInitialState);
      setIsOpen(false);
    }
  }
  const resetInitialState = ()=>{
    setSelectCurrencie(currencies[1]);
  }

  return (
    <>
      <div className="relative flex flex-col gap-[8px]  h-[84px]">
        <div className=' flex items-center gap-[4px]'>
          <Label className='text-[14px] font-[700] text-primary text-14 leading-20 tracking-tight'>
                    Seleccionar moneda
          </Label>
          <img src={'/infoCurrency.svg'} alt='info' className='w-[14px] h-[14px]'/>
        </div>
        <button
            type="button"
            className="flex items-center justify-between w-full text-sm font-medium text-gray-700 pt-[18px] pr-[16px] pb-[18px] pl-[16px] bg-white h-[56px] rounded-[6px] shadow-sm focus:outline-none border border-[#C0CCDA]"
            onClick={handleToggleDropdown}
          >
            {
            selectCurrencie?.image ?
            <>
              <div className="flex gap-2 items-center">
                <img src={selectCurrencie?.image}  className="w-[20px] h-[20px] animate-wiggle-more animate-infinite animate-duration-[1300ms]"/>
                <span className="mr-2 font-[700] text-[14px] leading-20 tracking-tight text-primary">{selectCurrencie?.name}</span>
              </div>
              <img src={'/desplegleButton.svg'} alt='boton desplegable de opciones de crypto' className='w-[16px] h-[16px]'/>
            </>
            :
            <span className="mr-2 font-[700] text-[14px] leading-20 tracking-tight text-primary">Cargando...</span>
            }
        </button>
        {/* contenedor box */}
        <div
          id="dropdown-menu"
          className={`${ isOpen ? "" : "hidden"} absolute w-full top-0  rounded-md shadow-lg bg-white flex flex-col gap-[8px] ring-1 ring-black ring-opacity-5 p-[24px] space-y-1 animate-fade-down`}
        >
          {/* Search input */}   
          <div className='flex items-center justify-between p-1'>
            <Label className='text-[14px] font-[700] text-primary text-14 leading-20 tracking-tight'>
                Seleccionar moneda
            </Label>
            <button type='button' onClick={handleToggleDropdown}>X</button>
          </div>
          <label className='flex items-center border border-[#E5E9F2] gap-2 px-3 rounded pt-[14px] pr-[12px] pb-[14px] pl-[12px]'>
            <img src={'/search.svg'} alt='incono de busqueda' className='w-[20px] h-[20px]'/>
            <input
              id="search-input"
              className="block w-full h-[20px] text-gray-800 border-none  border-gray-300  focus:outline-none"
              type="text"
              placeholder="Buscar"
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearchInput}
            />
          </label>  
          {/* Dropdown contenido*/}
          <ul 
          className='flex flex-col gap-[6px] pt-[12px] pr-[0px] pb-[12px] pl-[0px]'>
            {currencies?.map((item, index) => (
                <li
                value={valueOptions}
                data-id={"currency"}
                onClick={(e)=>handleSelectCurrencie(item,e)}
                key={index}
                className={`${item.name.toLowerCase().includes(searchTerm) ? "": "hidden"} px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md flex items-center justify-between `}
                >
                  <div className="flex  gap-2">
                    <img src={item.image}  className="w-[32px] h-[32px] animate-wiggle-more animate-infinite animate-duration-[1300ms]" alt="cripto"/>  
                    <div >
                        <p className="font-[700] text-primary text-[14px] leading-5 tracking-tight">{item.name}</p>
                        <p className="font[400]  text-text-color-currencie text-[12px] leading-4">{item.blockchain}</p>
                        
                    </div>  
                  </div>
                  {
                   selectCurrencie?.symbol === item.symbol ?
                  <img  src={'/checkSelectCrypto.svg'} alt="selecionar" className='w-[16px] h-[16px]'/>
                  :
                  <img  src={'/optionCrypto.svg'} alt="selecionar" className='w-[16px] h-[16px]'/>
                  }
                </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
