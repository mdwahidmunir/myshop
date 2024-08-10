const cookieParser = () => document.cookie.split(";").reduce((acc, item) => {
    const [key, val] = item.split("=");
    acc[key] = val;
    return acc;
}, {});

export const isLoggedIn = () => {
    return !!cookieParser().jwt
}

export default cookieParser