"use client"
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Combobox }  from '@/app/components/ui/combobox';
import { ChangeEvent, useEffect, useState } from 'react';
import { Currencies } from '../types/currencies';
import { postOrder } from '@services/orders';
import { OrderPost } from '../types/orders';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { pageRedirect } from '@services/urls';
import { useFormik, FormikErrors  } from 'formik';
interface FormValues {
  amount: string;
  currency: Currencies | null;
  description: string;
}
export default function CreatePayment() {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [currency,setCurrency] = useState<Currencies>();
  const formik = useFormik<FormValues>({
    // estados del formulario
    initialValues: {
      amount: '',
      currency:null,
      description: ''
    },
    // Función que se ejecuta al enviar el formulario
    onSubmit: (values, actions) => {
      setLoading(!loading);
      const bodyPostOrder: OrderPost = {
        expected_output_amount: parseFloat(values.amount),
        input_currency:currency?.blockchain as string,
        merchant_urlko: pageRedirect.pageError,
        merchant_urlok: pageRedirect.pageConfirm,
        notes: values.description,
      }
      actions.resetForm({
        values: {
          amount: '',
          description: '',
          currency: null
        }
      }) 
      postOrder(bodyPostOrder)
      .then(data => {
        if(data !== undefined){
          setLoading(!loading);
          // setActiveButton(!activeButton);
          
          router.replace(`/order/${data.identifier}`);
        }
        
      })
      .catch(err => {
        setLoading(!loading);
      })
    },
    // Validación de campos
    //se puede validar mas campos pero solamente voy a usar el de amount
    validate: (values) => {
      const errors: FormikErrors<FormValues> = {};
      // Validar el campo 'amount'
      if (!/^\d*([\.,]\d{0,2})?$/.test(values.amount)) {
        errors.amount = 'Ingrese solo números';
      }
      if (!values.amount) {
        errors.amount = '*El campo importe es requerido';
      }
      if(!comprobateValuesAmount(values.amount,currency?.min_amount,currency?.max_amount,) && values.amount !== ''){
        errors.amount = `importe minimo: ${currency?.min_amount}, importe maximo: ${currency?.max_amount} de ${currency?.name}`;
      }
      if(!values.description){
        errors.description = '*El campo descripcion es requerido'
      }
      return errors;
    },

  });

  //seleccion las tipo de criptomonedas y uso la funcion handleFormValues para que se ejecute la funcion cada vez que hacemos cambios en los campos del formulario
  //uso este metodo por que tengo un componente combobox personalizado ya que necesito recolectar los datos que recaudo en mi componente 
  const handleCurrencySelect = (selectedCurrency:Currencies,e:React.MouseEvent<HTMLLIElement, MouseEvent> | undefined) => {
    setCurrency(selectedCurrency); 
    if(e !== undefined){
      handleFormValues(e,selectedCurrency);
    }
  };
 
  //detecta el campo y guarda sus valores en el estado de formik segun le corresponda a las claves del estado
  const handleFormValues = (event: ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement, MouseEvent>,optional:undefined | Currencies) => {
    if (event !== undefined) {
      if ('name' in event.target) {
        const { name, value } = event.target as HTMLInputElement;
        if (name === 'amount' && /^\d*([\.,]\d{0,2})?$/.test(value)) {
          formik.handleChange(event);
          formik.setFieldValue('amount', value);
        } else if (name === 'description') {
          formik.handleChange(event);
          formik.setFieldValue('description', value);
        }
      } else if (event.currentTarget.dataset.id) {
        formik.handleChange(event.currentTarget.dataset.id);
        formik.setFieldValue('currency', optional);
      }
    }
  };

  //comparamos los valores de amount con los valores minimo y maximo de la cripto elegida, este metodo lo usamos en el validate de formik
  const comprobateValuesAmount = (amount:string,min:string | undefined,max:string | undefined) =>{
    const value_max = max;
    const value_min = min;

    if (value_max !== undefined && value_min !== undefined && amount.length ) {
      return  (parseFloat(amount) >= parseFloat(value_min) && parseFloat(amount)  <= parseFloat(value_max));    
    }
    return false;
  }


  return (
    <section className="flex items-center justify-center h-screen">
      <form
      onSubmit={formik.handleSubmit}
      className='w-full lg:max-w-[673px] h-[530px] flex flex-col justify-center items-center rounded-[16px] border-[1px] p-[32px] m-[32px] shadow-lg'  
       >
        <div  
        className=' w-full  lg:w-[609px]   flex flex-col gap-[32px]'>

          <h2 className='font-bold text-3xl text-primary leading-[38px] text-center'>Crear pago</h2>
          <div className=' w-full lg:w-[609px] h-[80px] flex flex-col gap-[4px] relative'>
            <Label className='text-[14px] font-[700] text-primary text-14 leading-20 tracking-tight'>
              Importe a pagar 
            </Label>
            {formik.errors.amount && (
            <p className='text-red-600 animate-fade-down absolute top-0 left-0 bg-white '>{formik.errors.amount}</p>
            )}
            <Input
            name='amount'
            type='text' 
            placeholder='Añade importe a pagar' 
            value={formik.values.amount} 
            onChange={(e)=>handleFormValues(e,undefined)}
            />
          </div>
          {/* <div className='w-[609px] h-[80px]'> */}
            <Combobox  handleCurrencySelect={handleCurrencySelect} valueOptions={formik.values.currency?.blockchain ?? ''} />
          {/* </div> */}
          <div className='w-full lg:max-w-[609px] h-[80px] flex flex-col gap-[4px]'>
            <Label className='text-[14px] font-[700] text-primary text-14 leading-20 tracking-tight'>
              Concepto
            </Label>
            <Input
            value={formik.values.description} 
            name='description' 
            type='text' 
            placeholder='Añade descripción del pago' 
            onChange={(e)=>handleFormValues(e,undefined)}
            />
          </div>
          <Button params={{loading:loading,activateButton:!formik.isValid || !formik.dirty, eventExecute:()=>{}}} />
        </div>
      </form>
    </section>
  )
}
