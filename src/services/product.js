import axios from "axios";
import toast from "react-hot-toast";

export const getProducts = async ({ categoryID }) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?categoryID=${categoryID}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const updateProduct = async (product) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${product.objectId}`, {
            name: product.name,
            price: product.price,
            image: product.image,
            categoryId: product.categoryId,
        });
        toast.success("Ürün güncellendi");
        typeof window !== "undefined" && window.location.reload();
        return res;
    } catch (err) {
        toast.error("Ürün güncellenemedi");
        console.log(err);
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        typeof window !== "undefined" && window.location.reload();
        toast.success("Ürün silindi");
        return res;
    } catch (err) {
        toast.error("Ürün silinemedi");
        console.log(err);
    }
}

export const createProduct = async (product) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
            name: product.name,
            price: product.price,
            image: product.image,
            categoryID: product.category,
        });
        typeof window !== "undefined" && window.location.reload();
        toast.success("Ürün eklendi");
        return res;
    } catch (err) {
        toast.error("Ürün eklenemedi");
        console.log(err);
    }
}