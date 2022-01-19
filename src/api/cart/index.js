export const getcart = () => {
    return JSON.parse(localStorage.getItem('goods')) || []
}
export const setLocCart = (data) => {
    localStorage.setItem('goods', JSON.stringify(data));
}
export const clearLocCart = () => {
    localStorage.removeItem('goods');
}
