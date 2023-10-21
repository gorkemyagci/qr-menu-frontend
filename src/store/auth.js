import Cookies from 'js-cookie'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
    accessToken: Cookies.get('accessToken') ?? null,
    setAccessToken: (accessToken) => {
        Cookies.set('accessToken', accessToken)
        set({ accessToken })
    },
    removeUser: () => {
        Cookies.remove('accessToken')
        set({ accessToken: null })
    }
}));
export default useAuthStore