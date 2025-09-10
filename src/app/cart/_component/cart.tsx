'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Loading from '../../loading'
import Image from 'next/image'
import { deleteProductToCart } from '@/app/cart/_actions/deleteproduct.action'
import { CartResponse, CartProduct } from '../typescript/cart.interface'
import { toast } from 'sonner'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { clearCart } from '../_actions/clearCart.acrion'
import { UpdateCount } from '../_actions/updateproduct.action'
import Link from 'next/link'

export default function Cart() {
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // query لعرض الكارت
  const {
    data: cartData,
    isLoading,
    error,
    isError,
  } = useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')
      return response.json()
    },
  })

  // mutation لحذف منتج
  const { mutate } = useMutation({
    mutationFn: deleteProductToCart,
    onSuccess: () => {
      toast.success('Product successfully deleted from cart')
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setDeletingId(null)
    },
    onError: () => {
      toast.error('Login first')
      setDeletingId(null)
    },
  })

  // mutation لتفريغ الكارت
  const { mutate: clearCartMutate, isPending: isClearing } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success('Cart successfully cleared')
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => {
      toast.error('Login first')
    },
  })

  // mutation لتحديث العدد
  const { mutate: UpdateCartMutate, isPending: isUpdating } = useMutation({
    mutationFn: UpdateCount,
    onSuccess: () => {
      toast.success('Cart successfully updated')
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => {
      toast.error('Login first')
    },
  })

  if (isLoading) return <Loading />

  if (isError) {
    return <h2>{(error as any)?.message || 'Something went wrong'}</h2>
  }

  if (cartData?.numOfCartItems === 0) {
    return (
      <h2 className="text-center text-main text-2xl font-bold mt-20">
        No items in cart
      </h2>
    )
  }

  // تحديث الكمية
  function handleUpdate(item: CartProduct, type: 'inc' | 'dec') {
    if (type === 'inc') {
      if (item.count < item.product.quantity) {
        UpdateCartMutate({
          productId: item.product._id,
          count: item.count + 1,
        })
      } else {
        toast.error('No more items in stock')
      }
    } else if (type === 'dec') {
      if (item.count > 1) {
        UpdateCartMutate({
          productId: item.product._id,
          count: item.count - 1,
        })
      }
    }
  }
console.log(cartData?.data.products)
  return (
    <>
      <h2 className="mb-4 text-lg font-bold">
        Total Cart Price:{' '}
        <span className="text-main">{cartData?.data.totalCartPrice} EGP</span>
      </h2>

      <h3 className="mb-4 text-lg font-bold">
        Nums of Cart Items:{' '}
        <span className="text-main">{cartData?.numOfCartItems}</span>
      </h3>

      {/* موبايل - عرض كروت */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {cartData?.data.products.map((item: CartProduct) => (
          <div key={item._id} className="p-4 border rounded-lg shadow">
            <div className="flex gap-4 items-center">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={80}
                height={80}
                className="rounded w-20 h-20 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-sm text-gray-600">
           { item.count * (item.price as any || 0) } EGP


                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isUpdating || item.count <= 1}
                    onClick={() => handleUpdate(item, 'dec')}
                  >
                    -
                  </Button>
                  <span>{item.count}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() => handleUpdate(item, 'inc')}
                  >
                    +
                  </Button>
                </div>
              </div>
              <button
                onClick={() => {
                  setDeletingId(item.product._id)
                  mutate(item.product._id)
                }}
                disabled={deletingId === item.product._id}
                className="text-red-500"
              >
                {deletingId === item.product._id ? (
                  <i className="fa-solid fa-spin fa-spinner"></i>
                ) : (
                  <i className="fa-solid fa-trash"></i>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* تابلت + ديسكتوب - جدول */}
      <div className="hidden sm:block w-full sm:w-[80%] relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-[600px] w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.data.products.map((item: CartProduct) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={128}
                    height={128}
                    className="w-16 md:w-32 max-w-full max-h-full mx-auto"
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.product.title}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isUpdating || item.count <= 1}
                      onClick={() => handleUpdate(item, 'dec')}
                    >
                      -
                    </Button>

                    <input
                      type="number"
                      value={item.count}
                      readOnly
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        text-center px-2.5 py-1"
                    />

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() => handleUpdate(item, 'inc')}
                    >
                      +
                    </Button>
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              { item.count * (item.price || 0) } EGP


                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setDeletingId(item.product._id)
                      mutate(item.product._id)
                    }}
                    disabled={deletingId === item.product._id}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    {deletingId === item.product._id ? (
                                       <i className="fa-solid fa-spin fa-spinner"></i>

                    ) : (
                      <i className="fa-solid fa-trash"></i>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* أزرار تحت الجدول أو الكروت */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 my-5">
        <Button
          disabled={isClearing}
          onClick={() => clearCartMutate()}
        >
          {isClearing ?               <i className="fa-solid fa-spin fa-spinner"></i> : 'Clear Cart'}
        </Button>
        
        <Button>
          <Link href={`/checkout/${cartData?.cartId}`}>
            Check Out
          </Link>
        </Button>
      </div>
    </>
  )
}
