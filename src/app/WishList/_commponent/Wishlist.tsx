'use client'

import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import ProductItemBtn from "@/app/products/_components/ProductitemBtn"
import Loading from "@/app/loading"
import { useState } from "react"
import { removewish } from "../_actions/removewish.action"
import { toast } from "sonner"

export default function Wishlist() {
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<string | null>()

  const {
    data: wishData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist')
      if (!response.ok) throw new Error('Failed to fetch wishlist')
      return response.json()
    },
  })

  const { mutate } = useMutation({
    mutationFn: removewish,
    onSuccess: () => {
      toast.success('Product successfully deleted from wishlist')
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      setDeletingId(null)
    },
    onError: (error: any) => {
      toast.error(error.message)
      setDeletingId(null)
    },
  })

  if (isLoading) return <Loading />
  if (isError) return <p>Error: {error.message}</p>

  if (wishData?.count === 0) {
    return (
      <h2 className="text-center text-main text-2xl font-bold mt-20">
        No items in WishList
      </h2>
    )
  }

  return (
    <>
      <h1 className="text-main font-bold text-lg mb-4">My Wishlist</h1>

      {/* ✅ موبايل - عرض كروت */}
  {/* ✅ موبايل - عرض كروت */}
<div className="grid grid-cols-1 gap-6 sm:hidden">
  {wishData?.data?.map((item: any) => (
    <div 
      key={item._id} 
      className="p-5 border rounded-xl shadow-lg flex gap-5 items-center bg-white"
    >
      <Image
        src={item.imageCover}
        alt={item.name || "Product"}
        width={120}
        height={120}
        className="rounded w-28 h-28 object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-base text-gray-700 font-medium">{item.price} EGP</p>

        <div className=" gap-4 mt-3">
          <button
            onClick={() => {
              setDeletingId(item._id)
              mutate(item._id)
            }}
            className="text-red-600 text-lg mb-1"
          >
            {deletingId === item._id ? (
              <i className="fa-solid fa-spin fa-spinner"></i>
            ) : (
              <i className="fa-solid fa-trash"></i>
            )}
          </button>

          <ProductItemBtn id={item._id} />
        </div>
      </div>
    </div>
  ))}
</div>


      {/* ✅ تابلت وديسكتوب - جدول */}
      <div className="hidden sm:block w-[80%] relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full min-w-[500px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Details</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishData?.data?.map((item: any) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <Image
                    src={item.imageCover}
                    alt={item.name || "Product"}
                    width={128}
                    height={128}
                    className="w-16 md:w-32 max-w-full max-h-full"
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                  <p>{item.price} EGP</p>
                  <button
                    onClick={() => {
                      setDeletingId(item._id)
                      mutate(item._id)
                    }}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    {deletingId === item._id ? (
                      <i className="fa-solid fa-spin fa-spinner"></i>
                    ) : (
                      <i className="fa-solid fa-trash"></i>
                    )}
                  </button>
                </td>

                <td className="px-6 py-4">
                  <ProductItemBtn id={item._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
