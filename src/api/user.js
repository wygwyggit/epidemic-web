import myAjax from "@/utils/ajax";

export const getUserInfo = () => {
    return myAjax({
        url: 'user/user_info',
        isPassFalse: true
    })
}