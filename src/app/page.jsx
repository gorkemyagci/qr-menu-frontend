"use client";
import Brand from "@/components/commons/Brand";
import { getCategories } from "@/services/categories";
import { getProducts } from "@/services/product";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [authUser, setAuthUser] = useState({});
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
    setAuthUser(jwtDecode(Cookies.get('accessToken')));
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
  const router = useRouter();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-white to-[#1946c12c] min-h-screen p-8">
      <header className="flex border-b items-center flex-col gap-10 pb-5 justify-between mb-8">
        <h1 className="text-4xl scale-105 w-40 flex h-16 justify-center items-center overflow-hidden font-normal">
          <Brand width={150} />
        </h1>
        <ul className="categories flex items-center gap-3">
          {categories?.map((item, index) => (
            <Link href={{
              pathname: router.pathname,
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
        <ul className="grid grid-cols-4 gap-10">
          {products.map((item, itemIndex) => (
            <motion.li
              initial={{ x: -30 }}
              animate={{ x: 0 }}
              transition={{ delay: itemIndex * 0.05 }}
              key={itemIndex}
              className="flex justify-between flex-col w-[200px] rounded-t-lg items-center border-2 shadow-md rounded-lg"
            >
              <Image src={item.image} width={200} height={150} className="rounded-b-3xl rounded-t-lg" alt={item.name} />
              <div className="w-full flex items-center py-2.5 px-4 justify-between">
                <span className="font-medium text-[#212121]">{item.name}</span>
                <span className="text-green-700 font-semibold">{item.price} TL</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      {authUser?.role === 'admin' && <div className="fixed bottom-10 right-10">
        <Link href="/admin" className="text-white bg-black rounded-full px-5 py-3 cursor-pointer font-semibold">
          Admin Panel
        </Link>
      </div>}
    </motion.div>
  );
}
