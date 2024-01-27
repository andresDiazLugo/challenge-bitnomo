import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Combobox }  from '@/app/components/ui/combobox';

export default function CreatePayment() {
  return (
    <section className=' mt-24 bg-white max-w-[673px] max-h-[530px] flex-1 m-auto p-[32px] border flex flex-col gap-6 rounded-[6px] shadow-lg' >
        <h2 className=' leading-[40.56px] text-primary font-[700] text-[30px] text-center'>Crear pago</h2>
        <div>
          <Label className='text-[14px] font-[700] text-text-color'>
            Importe a pagar
          </Label>
          <Input name='amount' type='number' placeholder='Añade importe a pagar'/>
        </div>
        <div>
          <Label className='text-[14px]  font-[700] text-text-color'>
            Seleccionar moneda
          </Label>
          {/* <ComboboxDemo/> */}
          <Combobox/>
        </div>
        <div>
          <Label className='text-[14px]  font-[700] text-text-color'>
            Concepto
          </Label>
          <Input name='amount' type='text' placeholder='Añade descripción del pago'/>
        </div>
        <button className=' bg-button-color text-white h-[56px] rounded-[6px]'>Continuar</button>
    </section>
  )
}
