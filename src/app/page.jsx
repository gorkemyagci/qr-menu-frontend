"use client";
import Brand from "@/components/commons/Brand";
import { getCategories } from "@/services/categories";
import { getProducts } from "@/services/product";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const url = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  async function getDatas() {
    const productsData = await getProducts({ categoryID: url.get('category') || '' });
    const categoriesData = await getCategories();
    setCategories(categoriesData.data.categories);
    setProducts(productsData.data.products);
  }
  useEffect(() => {
    getDatas();
  }, [])
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  const [activeCategory, setActiveCategory] = useState(url.get('category') || 'all');
  const handleCategoryChange = (categoryID) => {
    setActiveCategory(categoryID);
    fetchData(categoryID);
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-white to-[#1946c12c] min-h-screen p-8">
      <header className="flex border-b items-center flex-col gap-10 pb-5 justify-between mb-8">
        <h1 className="text-4xl scale-105 w-40 flex h-16 justify-center items-center overflow-hidden font-normal">
          <Brand width={1150} />
        </h1>
        <ul className="categories flex items-center gap-3">
          {categories?.map((item, index) => (
            <Link href={{
              pathname: '/',
              query: { category: item._id }
            }} onClick={() => {
              handleCategoryChange(item._id);
            }} key={index} className={`${activeCategory === item._id ? 'bg-black text-white' : 'text-black border'} rounded-full px-5 py-2 cursor-pointer font-semibold`}>
              {item.name}
            </Link>
          ))}
        </ul>
      </header>
      <div className="flex flex-col gap-10 max-w-5xl mx-auto mt-10">
        {products.length === 0 && <span className="text-red-500 font-medium text-center pt-5">Ürün bulunamadı.</span>}
        <ul className="w-full flex flex-col gap-4">
          {products.map((item, itemIndex) => (
            <motion.li
              initial={{ x: -30 }}
              animate={{ x: 0 }}
              transition={{ delay: itemIndex * 0.05 }}
              key={itemIndex}
              className="flex justify-between items-center border-2 px-4 py-2.5 shadow-md rounded-lg"
            >
              <span className="font-medium text-[#212121]">{item.name}</span>
              <span className="text-green-700 font-semibold">{item.price} TL</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
