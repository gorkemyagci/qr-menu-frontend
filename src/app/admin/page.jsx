import CategoryItem from '@/components/Admin/Category'
import ProductItem from '@/components/Admin/Product'
import Brand from '@/components/commons/Brand'
import { getCategories } from '@/services/categories'
import { getProducts } from '@/services/product'
import Link from 'next/link'
import React from 'react'

const Admin = async () => {
  const getDatas = async () => {
    const categoriesData = await getCategories();
    const productsData = await getProducts({ categoryID: '' });
    console.log(categoriesData);
    return {
      categoriesData,
      productsData
    }
  }
  const { categoriesData, productsData } = await getDatas();
  console.log(categoriesData, productsData);
  return (
    <div className='max-w-5xl mx-auto p-10'>
      <Link href={{
        pathname: '/'
      }} className='w-full h-[80px] overflow-hidden border-b pb-5'>
        <Brand width={120} />
      </Link>
      <div className='flex flex-col gap-10'>
        <CategoryItem text='Kategoriler' data={categoriesData.data.categories} />
        <ProductItem text='Ürünler' data={productsData.data.products} categories={categoriesData.data.categories} />
      </div>
    </div>
  )
}

export default Admin