"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import { getCurrencies } from "@services/currencies";
import { Currencies } from "@type/currencies";

export const Combobox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencies,setCurrencies] = useState<Currencies[]>([]);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCurrencies().then(data=>{setCurrencies(data)}).catch(err=>{console.log(err)})
    // document.addEventListener('click', handleOutsideClick);
    // return () => {
    //   document.removeEventListener('click', handleOutsideClick);
    // };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

//   const handleOutsideClick = (event: MouseEvent) => {
//     if (isOpen && dropdownButtonRef.current && dropdownMenuRef.current) {
//       if (
//         !event.target ||
//         !(
//           event.target instanceof Node &&
//           (dropdownButtonRef.current.contains(event.target) || dropdownMenuRef.current.contains(event.target))
//         )
//       ) {
//         setIsOpen(false);
//       }
//     }
//   };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const dropdownItems = ["Uppercase", "Lowercase", "Camel Case", "Kebab Case"];

  return (
    <div>
      <div className="relative group">
        <button
          ref={dropdownButtonRef}
          id="dropdown-button"
          className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={handleToggleDropdown}
        >
          <div className="flex gap-2 items-center">
            <img src={currencies[1]?.image}  className="w-[32px] h-[32px]"/>
            <span className="mr-2">{currencies[1]?.name}</span>
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
          ref={dropdownMenuRef}
          id="dropdown-menu"
          className={`${ isOpen ? '' : 'hidden'} absolute w-full mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
        >
          {/* Search input */}
          <FaSearch className="absolute top-7 left-2 transform -translate-y-1/2 w-4 h-4 text-gray-500"/>
          <input
            id="search-input"
            className="block pl-7 w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search items"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          {/* Dropdown content goes here */}
          <ul>
            {currencies?.map((item, index) => (
                <li
                key={index}
                className={`${item.name.toLowerCase().includes(searchTerm) ? '': 'hidden'} block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md flex gap-2`}
                >
                <img src={item.image}  className="w-[32px] h-[32px]"/>  
                <div>
                    <p className='font-[700] text-text-color'>{item.name}</p>
                    <p className='text-xs text-text-color-currencie'>{item.blockchain}</p>
                </div>  
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
