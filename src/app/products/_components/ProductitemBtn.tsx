'use client'
import { addProductToCart as add } from '@/app/cart/_actions/addproduct.action';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'
import { useQueryClient } from "@tanstack/react-query";
export default function ProductItemBtn({id}:{id:string}) {
    const queryClient =  useQueryClient()
    const { mutate,isPending ,data } = useMutation({mutationFn:add,
        onSuccess:(data) =>{
            toast.success("Product successfully added to cart")
         queryClient.invalidateQueries({ queryKey: ['/cart'] })

        },
        onError:(data)=>{
toast.error('Login first')
        }
    })
    // console.log(data)
    return(
        <Button className='bg-main w-full'onClick={() => mutate(id)} > {isPending?<i className='fa-solid fa-spin fa-spinner'></i>:"Add to Cart"}</Button>

    )
}