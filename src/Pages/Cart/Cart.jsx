import React, { useEffect, useState } from 'react'

import CartProduct from '../../Components/CartProduct/CartProduct'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { BsTrash3, BsBasket } from "react-icons/bs"

import "./Cart.css"

export default function Cart() {

    const cartProduct = useSelector(state => state.userCart);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [updatePrice, setUpdatePrice] = useState(false);

    useEffect(() => {
        //calc total price
        const total = cartProduct.reduce((total, product) => {
            return total + ((product.price_discount ? product.price_discount : product.price) * product.count)
        }, 0)
        setTotalPrice(total)
        //calc total discount
        const sumDiscount = cartProduct.reduce((total, product) => {
            return total + ((product.price_discount ? (product.price - product.price_discount) : 0) * product.count)
        }, 0)
        setTotalDiscount(sumDiscount)

    }, [cartProduct, updatePrice])


    return (
        <main className="main">
            <section className="cart">
                <div className="container">

                    {
                        cartProduct.length ?
                            (
                                <div className="basket">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="basket-product">
                                                {
                                                    cartProduct.map(item => (
                                                        <CartProduct
                                                            key={item.id}
                                                            {...item}
                                                            setUpdatePrice={setUpdatePrice}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="checkout">
                                                <div className="checkout__products">
                                                    <p className="checkout__products-title">
                                                        سبد خرید (4)
                                                    </p>
                                                    <BsTrash3 className='checkout__products-remove' />
                                                </div>
                                                <div className="checkout__discount">
                                                    <span className="checkout__discount-title">
                                                        تخفیف محصولات
                                                    </span>
                                                    <span className="checkout__discount-number">
                                                        {totalDiscount.toLocaleString()} تومان
                                                    </span>
                                                </div>
                                                <div className="checkout__desc">

                                                    <span className="checkout__desc-title">هزینه ارسال</span>
                                                    <span className="checkout__desc-price">
                                                        10,000 تومان
                                                    </span>

                                                </div>
                                                <div className="checkout__price">
                                                    <span className="checkout__price-title">
                                                        مبلغ قابل پرداخت
                                                    </span>
                                                    <span className="checkout__price-number">
                                                        {(totalPrice - totalDiscount + 10000).toLocaleString()} تومان
                                                    </span>
                                                </div>
                                                <div className="checkout__submit">
                                                    <button className="checkout__submit-button">
                                                        <BsBasket className='checkout__submit-button-icon' />
                                                        <span className="checkout__submit-button-text">
                                                            خرید
                                                        </span>

                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            : (
                                <div className="empty__cart">
                                    <h1 className="empty__cart-title">
                                        شما در حال حاضر هیچ سفارشی ثبت نکرده‌اید!
                                    </h1>
                                    <Link to='/menus' className='empty__cart-button'>
                                        منوی رستوران
                                    </Link>
                                </div>
                            )
                    }



                </div>
            </section >
        </main >
    )
}