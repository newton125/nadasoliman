import getCatgory from '../categories/_actions/getcagory'
import CategoriesSliderClient from './catgoryslider'

export default async function CategoriesSliderWrapper() {
  const { data } = await getCatgory()
  const categories = data.slice(0, 10)

  return <CategoriesSliderClient categories={categories} />
}