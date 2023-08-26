//zoom image func
const zoomMouseMove = (event) => {
    const offsetX = event.nativeEvent.offsetX / event.target.offsetWidth;
    const offsetY = event.nativeEvent.offsetY / event.target.offsetHeight;
    const transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
    event.target.style.transformOrigin = transformOrigin;
    event.target.style.transform = "scale(2)";
}

//un zoom image
const zoomMouseLeave = () => {
    event.target.style.transformOrigin = "center center";
    event.target.style.transform = "scale(1)";
}

//save cookie function

const saveCookie = (cookieName, cookieValue, expireDay) => {
    let date = new Date();
    date.setTime(date.getTime() + (expireDay * 24 * 60 * 60 * 1000));
    document.cookie = `${cookieName}=` + JSON.stringify(cookieValue) + '; expires=' + date.toUTCString() + '; path=/';
}


//add to cart
const addToCartHandler = (newProduct) => {

    let cart = [];
    let cookie = document.cookie.split('; ').find(row => row.startsWith('userCart='));
    cookie ? cart = JSON.parse(cookie.split('=')[1]) : cart = [];
    let isProductExists = cart.some(product => product.id === newProduct.id);
    console.log(isProductExists)
    if (isProductExists) {
        let productIndex = cart.findIndex(product => product.id === newProduct.id);

        let updateProductCount = cart[productIndex]

        updateProductCount.count = Number(updateProductCount.count) + 1

        cart[productIndex] = updateProductCount;

    } else {
        cart.push(newProduct);
    }


    saveCookie('userCart', cart, 7)

}

//add to wishlist
const addToWishListHandler = (newProduct) => {

    let wishlist = [];
    let cookie = document.cookie.split('; ').find(row => row.startsWith('userWishlist='));
    cookie ? wishlist = JSON.parse(cookie.split('=')[1]) : wishlist = [];
    let isProductExists = wishlist.some(product => product.id === newProduct.id);
    if (isProductExists) {

        wishlist = wishlist.filter(product => product.id !== newProduct.id);

    } else {
        wishlist.push(newProduct);
    }


    saveCookie('userWishlist', wishlist, 7)

}

export { zoomMouseMove, zoomMouseLeave, saveCookie, addToCartHandler, addToWishListHandler }