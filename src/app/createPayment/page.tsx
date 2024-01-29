"use client"
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Combobox }  from '@/app/components/ui/combobox';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Currencies } from '../types/currencies';
import { postOrder } from '@services/orders';
import { OrderPost } from '../types/orders';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { pageRedirect } from '@services/urls'
export default function CreatePayment() {
  const router = useRouter();
  const [activeButton,setActiveButton] = useState(true);
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState<{
    amount: string,
    currency: Currencies | null,
    description: string
  }>({
    amount: '0',
    currency: null ,
    description: ''
  })

  //seleccion las tipo de criptomonedas 
  const handleCurrencySelect = (selectedCurrency:Currencies) => {
    setFormData((prevData) => ({
      ...prevData,
      currency: selectedCurrency,
    }));
  };
  //selecciono el saldo de la moneda controlando que no se ingrese texto solo enteros y decimales
  const handleChangeAmount = (event:ChangeEvent<HTMLInputElement>) =>{
    const {value} = event.target;
    const comprobate = comprobateAmount(value)
    setActiveButton(comprobate);
    if (/^\d*([\.,]\d{0,2})?$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        amount:value,
      }));
    }
  }
  //guardar y capturar los valores de la descripcion
  const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = event.target;
    setFormData((prevData)=> (
      {
        ...prevData,
        [name]: value 
      }
    ));
  }
  // enviar los datos recolectados y hacer peticion a la api y restablecer los inputs
  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    setLoading(!loading);
    setActiveButton(!activeButton);
    event.preventDefault()
    const bodyPostOrder: OrderPost = {
      expected_output_amount: parseFloat(formData.amount),
      input_currency:formData.currency?.blockchain as string,
      merchant_urlko: pageRedirect.pageError,
      merchant_urlok: pageRedirect.pageConfirm,
      notes: formData.description,
    }
    setFormData(
      {
        ...formData,
        amount:'',
        description:''
      }
    )

    postOrder(bodyPostOrder)
    .then(data => {
      if(data !== undefined){
        setLoading(!loading);
        setActiveButton(!activeButton);
        router.replace(`/order/${data.identifier}`);
      }
      
    })
    .catch(err => {
      setLoading(!loading);
      setActiveButton(!activeButton);
    })
  }
  const comprobateAmount = (amount:string) => {
    const value_max = formData.currency?.max_amount;
    const value_min =  formData.currency?.min_amount;
    // Verifica si value_max y value_min son definidos antes de realizar la comprobación
    if (value_max !== undefined && value_min !== undefined) {
      return  !(parseFloat(amount) >= parseFloat(value_min) && parseFloat(amount)  <= parseFloat(value_max));    
    }
    return false
  }
  return (
    <section className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className='g-white max-w-[673px] max-h-[530px] flex-1 m-auto p-[32px] border flex flex-col gap-6 rounded-[6px] shadow-lg' >
          <h2 className=' leading-[40.56px] text-primary font-[700] text-[30px] text-center'>Crear pago</h2>
          <div>
            <Label className='text-[14px] font-[700] text-text-color'>
              Importe a pagar 
            </Label>
            {
            activeButton
             &&
            <p className=' text-red-600'>importe minimo:{formData.currency?.min_amount} y importe maximo:{formData.currency?.max_amount} de {formData.currency?.name}</p>
            }
            <Input name='amount' type='text' placeholder='Añade importe a pagar' value={formData.amount[0] === '0' ? '' : formData.amount} onChange={(e)=>handleChangeAmount(e)}/>
          </div>
          <div>
            <Combobox  handleCurrencySelect={handleCurrencySelect} />
          </div>
          <div>
            <Label className='text-[14px]  font-[700] text-text-color'>
              Concepto
            </Label>
            <Input value={formData.description} name='description' type='text' placeholder='Añade descripción del pago' onChange={(e)=>handleChange(e)}/>
          </div>
          <Button params={{loading:loading,activateButton:activeButton, eventExecute:()=>{}}} />
      </form>
    </section>
  )
}
