"use client";
import Input from "@/components/Input";
import { createCategory, deleteCategory, updateCategory } from "@/services/categories";
import { useState } from "react";
import toast from "react-hot-toast";

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

export default CategoryItem;