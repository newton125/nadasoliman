import Checkout from "../_Components/CheckOut"

export default async function Page({params}:{params: Promise<{id:string}>}) {
  const  {id} =  await params;
  console.log(id)
  return <Checkout cartId={id} />
}
