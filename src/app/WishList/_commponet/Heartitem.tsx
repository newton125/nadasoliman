'use client'

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addwish } from "../_actions/addwish.action";
import { removewish } from "../_actions/removewish.action";
import { toast } from 'sonner';

export default function Heartitem({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [heart, setHeart] = useState(false);

  // ✅ fetch wishlist
  const { data: wishlist } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist');
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      return response.json();
    },
  });

  // ✅ detect if item is in wishlist
  useEffect(() => {
    const items = Array.isArray(wishlist) ? wishlist : wishlist?.data;
    if (items) {
      const found = items.some((item: any) => item._id === id);
      setHeart(found);
    }
  }, [wishlist, id]);

  // ✅ add mutation
  const addMutation = useMutation({
    mutationFn: addwish,
    onSuccess: () => {
      toast.success("Product successfully added to wish List", {
  position: "top-center"
});
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: () => {
      toast.error('Login first', {
  position: "top-center"
});
    }
  });

  // ✅ remove mutation
  const removeMutation = useMutation({
    mutationFn: removewish,
    onSuccess: () => {
      toast.success("Product successfully removed from wish List");
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  // ✅ handle click toggle
  const handleClick = () => {
    if (heart) {
      removeMutation.mutate(id); // remove
    } else {
      addMutation.mutate(id); // add
    }
  };

  return (
    <>
      <i
        className={`fa-solid cursor-pointer text-2xl ${
          heart ? 'fa-heart text-[red]' : 'fa-heart'
        }`}
        onClick={handleClick}
      ></i>
    </>
  );
}
