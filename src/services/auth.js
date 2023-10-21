import useAuthStore from "@/store/auth";
import axios from "axios";
import toast from "react-hot-toast";

export const login = async (user) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            username: user.username,
            password: user.password,
        });
        useAuthStore.getState().setAccessToken(res.data.accessToken);
        toast.success("Giriş Yapıldı");
        return res;
    } catch (err) {
        console.log(err);
        if(err.response.data.message){
            toast.error(err.response.data.message);
        }
    }
}