export default () => document.cookie.split(";").reduce((acc, item) => {
    const [key, val] = item.split("=");
    acc[key] = val;
    return acc;
}, {});