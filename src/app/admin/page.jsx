"use client";
import Input from '@/components/Input';
import Brand from '@/components/commons/Brand'
import { createCategory, getCategories, updateCategory } from '@/services/categories'
import { createProduct, getProducts, updateProduct } from '@/services/product'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CategoryItem = ({ text, data }) => {
  const [inputValue, setInputValue] = useState({
    type: 'create',
    value: '',
    objectId: ''
  });
  async function createOrUpdateCategory({ type, value }) {
    if (type === 'create') {
      await createCategory(value);
    } else if (type === 'update') {
      await updateCategory(inputValue);
    }
  }
  return (
    <div className='flex flex-col mt-10 gap-10'>
      <h2 className='text-2xl font-medium'>{text}</h2>
      <div className='categories flex flex-col gap-3'>
        <div className='w-full flex h-10 items-center'>
          <Input type='text' placeholder='Kategori Adı' value={inputValue.value} onChange={e => setInputValue({
            type: inputValue.type,
            value: e.target.value,
            objectId: inputValue.objectId
          })} />
          <button onClick={async () => {
            if (inputValue.value === '') {
              toast.error('Kategori adı boş olamaz.');
              return;
            }
            await createOrUpdateCategory({ type: inputValue.type, value: inputValue.value, objectId: inputValue.objectId });
            setInputValue({
              type: 'create',
              value: '',
              objectId: ''
            });
          }} className='bg-black text-white px-4 h-full rounded-r-md'>
            {
              inputValue.type === 'create' ? 'Ekle' : 'Güncelle'
            }
          </button>
        </div>
        <div className='active-categories flex flex-col gap-1'>
          {data.length === 0 && <span className='text-red-500 font-medium text-center pt-5'>{text} bulunamadı.</span>}
          {data?.map((item, index) => {
            return (
              <div key={item.id} className='flex justify-between items-center border-2 px-4 py-2.5 shadow-md rounded-lg'>
                <span className='font-medium text-[#212121]'>{item.name}</span>
                <div>
                  <span onClick={() => {
                    setInputValue({
                      type: 'update',
                      value: item.name,
                      objectId: item._id
                    });
                  }} className='text-white bg-green-500 rounded-md px-5 py-2 cursor-pointer font-semibold mr-2'>Düzenle</span>
                  <span onClick={async () => {
                    await deleteCategory(item._id);
                  }} className='text-white bg-red-500 rounded-md px-5 py-2 cursor-pointer font-semibold'>Sil</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
};

const Product = ({ text, data, categories }) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    type: 'create',
    name: '',
    price: '',
    image: null,
    categoryID: '',
    objectId: ''
  })
  async function createOrUpdateProduct({ type, product }) {
    setLoading(true);
    if (type === 'create') {
      await createProduct({
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.categoryID
      });
    } else if (type === 'update') {
      await updateProduct({
        name: inputValue.value,
        price: inputValue.price,
        image: inputValue.image,
        category: inputValue.categoryID,
        objectId: inputValue.objectId
      });
    }
    setLoading(false);
  }
  function covertToBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = () => {
      setInputValue({
        ...inputValue,
        image: reader.result
      })
    };
  }
  if (loading) {
    return (
      <div className='w-full h-screen absolute inset-0 flex bg-white z-[999] justify-center items-center'>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  return (
    <div className='flex flex-col mt-10 gap-10'>
      <h2 className='text-2xl font-medium'>{text}</h2>
      <div className='categories flex flex-col gap-3'>
        <div className='w-full gap-3 flex-col flex items-start'>
          <div className="h-10 w-full flex items-center gap-2">
            <Input type='text' placeholder='Ürün Adı' value={inputValue.name} onChange={(e) => setInputValue({
              ...inputValue,
              name: e.target.value
            })} />
            <Input type='text' placeholder='Ürün Fiyatı' value={inputValue.price} onChange={e => setInputValue({
              ...inputValue,
              price: e.target.value
            })} />
            <label className='h-full border border-gray-300 rounded-md outline-none flex items-center justify-center px-4'>
              <span className='text-gray-400 flex-shrink-0 px-2'>
                {
                  inputValue.image === null ? 'Ürün Resmi' : 'Resim Seçildi'
                }
              </span>
              <span className="hidden">
                <Input type='file' placeholder='Ürün Resmi' accept="image/*" onChange={covertToBase64} />
              </span>
            </label>
          </div>
          <select
            className='border border-gray-300 h-10 rounded-md outline-none'
            value={inputValue.categoryID}
            onChange={(e) => setInputValue({ ...inputValue, categoryID: e.target.value })}
          >
            <option value=''>Kategori Seçiniz</option>
            {categories.map((item, index) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <button onClick={async () => {
            if (inputValue.name === '' || inputValue.price === '' || inputValue.categoryID === '') {
              toast.error('Ürün adı, fiyatı ve kategori boş olamaz.');
              return;
            }
            await createOrUpdateProduct({ type: inputValue.type, product: inputValue, objectId: inputValue.objectId });
            setInputValue({
              type: 'create',
              name: '',
              price: '',
              image: '',
              categoryID: '',
              objectId: ''
            });
          }} className='bg-black w-full text-white px-4 py-2 h-full rounded-md'>
            {inputValue.type === 'create' ? 'Ekle' : 'Güncelle'}
          </button>
        </div>
        <div className='active-categories flex flex-col gap-1'>
          {data.length === 0 && <span className='text-red-500 font-medium text-center pt-5'>{text} bulunamadı.</span>}
          {data?.map((item, index) => {
            return (
              <div key={item.id} className='flex justify-between items-center border-2 px-4 py-2.5 shadow-md rounded-lg'>
                <div className="flex items-center w-full gap-5">
                  <span className='font-medium text-[#212121]'><span className="font-normal">Ürün:</span> {item.name}</span>
                  |
                  <span className='font-medium text-[#212121]'><span className="font-normal">Fiyat:</span> {item.price} TL</span>
                </div>
                <div>
                  <span onClick={() => {
                    setInputValue({
                      type: 'update',
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      categoryID: item.categoryID._id,
                      objectId: item._id
                    });
                  }} className='text-white bg-green-500 rounded-md px-5 py-2 cursor-pointer font-semibold mr-2'>Düzenle</span>
                  <span onClick={async () => {
                    await deleteProduct(item._id);
                  }} className='text-white bg-red-500 rounded-md px-5 py-2 cursor-pointer font-semibold'>Sil</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
};

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDatas = async () => {
    setLoading(true);
    const categoriesData = await getCategories();
    const productsData = await getProducts({ categoryID: '' });
    setCategories(categoriesData.data.categories);
    setProducts(productsData.data.products);
    setLoading(false);
  }
  useEffect(() => {
    getDatas();
  }, [])
  if (loading) {
    return (
      <div className='w-full h-screen absolute inset-0 flex bg-white z-[999] justify-center items-center'>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  return (
    <div className='max-w-5xl mx-auto p-10'>
      <Link href={{
        pathname: '/'
      }} className='w-full h-[80px] overflow-hidden border-b pb-5'>
        <Brand width={120} />
      </Link>
      <div className='flex flex-col gap-10'>
        <CategoryItem text='Kategoriler' data={categories} />
        <Product text='Ürünler' data={products} categories={categories} />
      </div>
    </div>
  )
}

export default Admin