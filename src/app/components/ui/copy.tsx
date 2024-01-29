import React, { useState, useRef, useEffect } from 'react'
import { text } from 'stream/consumers';
import CopyText from '@svg/copy.svg';
import Image from 'next/image';
interface Params{
    key: string,
    copyState: any
    setCopy:(element:any)=> void,
    selector: string
}

interface Props{
    params: Params
}

export default function Copy({ params }: Props) {
    const timeoutRef = useRef<any>(null);

    const handleCopyClick = () => {
      const node = document.querySelector(params.selector);
  
      if (node !== null) {
        const range = document.createRange();
        range.selectNode(node);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
  
        document.execCommand('copy');
  
        window.getSelection()?.removeAllRanges();
  
        params.setCopy({
          ...params.copyState,
          [params.key]: true,
        });
  
        // Limpiar cualquier timeout existente antes de programar uno nuevo
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
  
        // Después de medio segundo, restablecer el estado
        timeoutRef.current = setTimeout(() => {
          params.setCopy({
            ...params.copyState,
            [params.key]: false,
          });
        }, 500);
      }
    };
  
    // Limpiar el timeout cuando el componente se desmonte
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
  
    return (
      <>
        {params.copyState[params.key] ? (
          <p className="bg-black text-white rounded-md text-xs p-1 animate-jump">Copy</p>
        ) : (
          <Image onClick={handleCopyClick} className="cursor-pointer" src={CopyText} alt="Copy text" />
        )}
      </>
    );
}
