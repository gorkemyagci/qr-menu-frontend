import CategoryItem from '@/components/Admin/Category'
import ProductItem from '@/components/Admin/Product'
import { deleteCategory, getCategories, updateCategory } from '@/services/categories'
import { getProducts } from '@/services/product'
import React from 'react'

const Admin = async () => {
  const getDatas = async () => {
    const categoriesData = await getCategories();
    const productsData = await getProducts({ categoryID: '' });
    return {
      categoriesData,
      productsData
    }
  }
  const { categoriesData, productsData } = await getDatas();
  return (
    <div className='max-w-5xl mx-auto p-10'>
      <div className='w-full border-b pb-5'>
        <h1 className='text-3xl font-medium'>Admin</h1>
      </div>
      <div className='flex flex-col gap-10'>
        <CategoryItem text='Kategoriler' data={categoriesData.data.categories} />
        <ProductItem text='Ürünler' data={productsData.data.products} categories={categoriesData.data.categories} />
      </div>
    </div>
  )
}

export default Admin