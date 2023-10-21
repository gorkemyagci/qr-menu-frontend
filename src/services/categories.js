import axios from "axios";
import toast from "react-hot-toast";

export const getCategories = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const updateCategory = async (category) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category.objectId}`, {
            name: category.value,
        });
        toast.success("Category updated");
        typeof window !== "undefined" && window.location.reload();
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deleteCategory = async (id) => {
    try {
        console.log(id);
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
        typeof window !== "undefined" && window.location.reload();
        toast.success("Kategori silindi");
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const createCategory = async (name) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
            name: name,
        });
        toast.success("Kategori oluşturuldu");
        return res;
    } catch (err) {
        console.log(err);
    }
}