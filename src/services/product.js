import axios from "axios";

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
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const createProduct = async (product) => {
    try {
        console.log(product);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
            name: product.name,
            price: product.price,
            image: product.image,
            categoryID: product.category,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}