import Cookie from './cookie'
import { TokenKey } from '@/config/constant'
export const getWalletAddr = () => {
    return Cookie.getCookie(TokenKey)
}

export const setWalletAddr = (value) => {
    return Cookie.setCookie(TokenKey, value);
}

export const removeWalletAddr = () => {
    return Cookie.delCookie(TokenKey);
}

