'use server'
import { permanentRedirect } from 'next/navigation'
 "./createPayment/page";
export default async function Home() {
  permanentRedirect(`/createPayment`) 
}
