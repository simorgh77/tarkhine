import React, { useState } from 'react'

import { BsTrash3 } from "react-icons/bs"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { zoomMouseMove, zoomMouseLeave, saveCookie } from '../../Func/Func'

import { useSelector, useDispatch } from 'react-redux'
import { getCartCookieAct } from '../../redux/userCart'

import "./CartProduct.css"

export default function CartProduct({ title, desc, discount_percent, img, price, price_discount, score, count, id, setUpdatePrice }) {

    const [newCount, setNewCount] = useState(count);
    const cartProduct = useSelector(state => state.userCart);
    const dispatch = useDispatch();
    const [isModalActive, setIsModalActive] = useState(false)

    //update count in user cart
    const updateCountHandler = e => {
        setNewCount(e.target.value < 0 ? 0 : e.target.value)
        let productIndex = cartProduct.findIndex(product => product.id === id);
        let updateProductCount = cartProduct[productIndex]
        updateProductCount.count = e.target.value
        cartProduct[productIndex] = updateProductCount;
        saveCookie('userCart', cartProduct, 7);
        setUpdatePrice(prev => !prev);
        dispatch(getCartCookieAct(cartProduct))
    }


    const removeProductHandler = id => {
        setIsModalActive(false)
        const updateCart = [...cartProduct].filter(product => product.id !== id);
        saveCookie('userCart', updateCart, 7);
        dispatch(getCartCookieAct(updateCart))
    }


    return (
        <>
            <article className="cart-product">
                <div className="cart-product__cover">
                    <img
                        src={`/public/img/products/${img}`}
                        alt={title}
                        className="cart-product__image"
                        onMouseMove={zoomMouseMove}
                        onMouseLeave={zoomMouseLeave}
                    />
                </div>
                <div className="cart-product__content">
                    <div className="cart-product__header">
                        <p className="cart-product__title">
                            {title}
                        </p>
                        <BsTrash3
                            className='cart-product__remove'
                            onClick={() => setIsModalActive(true)}
                        />
                    </div>
                    <div className="cart-product__body">
                        <span className="cart-product_desc">
                            {desc}
                        </span>
                        <div className="cart-product__discount">
                            {
                                price_discount ?
                                    (
                                        <>
                                            <span className="cart-product__discount-number">{price}</span>
                                            <span className="cart-product__discount-percent">%{discount_percent}</span>
                                        </>
                                    )
                                    : ('')
                            }
                        </div>
                    </div>
                    <div className="cart-product__footer">
                        <div className="cart-product__score">
                            {
                                Array.from({ length: score }).fill(0).map((item, index) => (
                                    <AiFillStar key={index} className='cart-product__score-icon--fill' />
                                ))
                            }
                            {
                                Array.from({ length: 5 - score }).fill(0).map((item, index) => (
                                    <AiOutlineStar key={index} className='cart-product__score-icon' />
                                ))
                            }
                        </div>
                        <div className="cart-product__count">
                            <input value={newCount} onChange={updateCountHandler} type="number" className="cart-product__count-number" />
                        </div>
                        <span className="cart-product__price">
                            {price_discount ? price_discount.toLocaleString() : price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </article>

            <div className={`modal ${isModalActive && 'active'}`}>
                <div className="delete_modal">
                    <div className="delete_modal__header">
                        <p className="delete-modal__header-title">
                            آیا از حذف محصول از سبد خود مطمئن هستید؟
                        </p>
                    </div>
                    <div className="delete_modal__body">
                        <button
                            className="delete-modal__accept"
                            onClick={() => removeProductHandler(id)}
                        >بله</button>
                        <button
                            className="delete-modal__reject"
                            onClick={() => setIsModalActive(false)}
                        >خیر</button>
                    </div>
                </div>
            </div>

        </>
    )
}
