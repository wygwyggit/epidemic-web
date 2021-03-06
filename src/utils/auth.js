import Cookie from './cookie'
import { TokenKey, signKey } from '@/config/constant'
export const getWalletAddr = () => {
    return Cookie.getCookie(TokenKey)
}

export const setWalletAddr = (value) => {
    return Cookie.setCookie(TokenKey, value);
}

export const removeWalletAddr = () => {
    return Cookie.delCookie(TokenKey);
}

export const getSignToken = () => {
    return Cookie.getCookie(signKey)
}

export const setSignToken = (value) => {
    return Cookie.setCookie(signKey, value);
}
export const removeSignToken = () => {
    return Cookie.delCookie(signKey);
}

