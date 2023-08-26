import React from 'react'

import AddToCart from '../AddToCart/AddToCart'

import { useSelector, useDispatch } from 'react-redux'
import { getWishlistCookieAct } from '../../redux/userWishlist'

import { AiOutlineHeart, AiFillHeart, AiOutlineStar, AiFillStar, AiOutlineZoomIn } from "react-icons/ai"

import { addToCartHandler, addToWishListHandler } from '../../Func/Func'

import "./MenusBox.css"

export default function MenusBox({ id, desc, discount_percent, img, price, price_discount, score, title, onSHowToast, onShowBanner }) {

    const userWishlist = useSelector(state => state.userWishlist);
    const dispatch = useDispatch()


    //add cookie cart
    const addToUserCart = (id, desc, discount_percent, img, price, price_discount, score, title) => {
        const newProductDetail = {
            id,
            desc,
            discount_percent,
            img,
            price,
            price_discount,
            score,
            title,
            count: 1
        }
        addToCartHandler(newProductDetail);

        onSHowToast()

    }

    //add to cookie wishlist
    const addToUserWishlist = (id, desc, discount_percent, img, price, price_discount, score, title) => {
        const newProductDetail = {
            id,
            desc,
            discount_percent,
            img,
            price,
            price_discount,
            score,
            title
        }

        addToWishListHandler(newProductDetail)

        //
        let wishlistCookie = document.cookie.split('; ').find(row => row.startsWith('userWishlist='));
        if (wishlistCookie) {
            let wishlist = JSON.parse(wishlistCookie.split('=')[1])
            dispatch(getWishlistCookieAct(wishlist))
        }
    }

    return (
        <div className="col-12 col-lg-6">
            <article className="menus-box">
                <div className="menus-box__cover">
                    <img
                        src={`/public/img/products/${img}`}
                        alt={title}
                        className="menus-box__thumbnail"

                    />
                    <AiOutlineZoomIn
                        className='menus-box__cove-zoom'
                        onClick={() => onShowBanner(img)}
                    />
                </div>
                <div className="menus-box__content">
                    <div className="menus-box__header">
                        <h4 className="menus-box__title">
                            {title}
                        </h4>

                        {
                            userWishlist.length > 0 ?
                                (
                                    userWishlist.some(item => item.id === id) ?
                                        (
                                            <AiFillHeart
                                                className='menus-box__wishlist active'
                                                onClick={() => addToUserWishlist(id, desc, discount_percent, img, price, price_discount, score, title)}
                                            />
                                        )
                                        : (
                                            <AiOutlineHeart
                                                className='menus-box__wishlist'
                                                onClick={() => addToUserWishlist(id, desc, discount_percent, img, price, price_discount, score, title)}
                                            />
                                        )
                                )
                                : (
                                    <AiOutlineHeart
                                        className='menus-box__wishlist'
                                        onClick={() => addToUserWishlist(id, desc, discount_percent, img, price, price_discount, score, title)}
                                    />
                                )
                        }

                    </div>
                    <div className="menus-box__body">
                        <span className="menus-box__desc">
                            {desc}
                        </span>
                        <div className="menus-box__price">
                            <div className="menus-box__price__discount">
                                {
                                    discount_percent &&
                                    (
                                        <>
                                            <span className="menus-box__price__discount-percent">{discount_percent}%</span>
                                            <span className="menus-box__price__discount-number">{price?.toLocaleString()}</span>
                                        </>
                                    )
                                }
                            </div>
                            <div className="menus-box__price-main">{
                                price_discount ? price_discount?.toLocaleString() : price?.toLocaleString()
                            }  تومان</div>
                        </div>
                    </div>
                    <div className="menus-box__footer">
                        <div className="menus-box__score">

                            {
                                Array.from({ length: score }).fill(0).map((item, index) => (
                                    <AiFillStar
                                        key={index}
                                        className='menus-box__score-star--fill'
                                    />
                                ))
                            }
                            {
                                Array.from({ length: 5 - score }).fill(0).map((item, index) => (
                                    <AiOutlineStar
                                        key={index}
                                        className='menus-box__score-star--fill'
                                    />
                                ))
                            }

                        </div>
                        <div className="menus-box__button">
                            <AddToCart
                                onAddToCart={() => addToUserCart(id, desc, discount_percent, img, price, price_discount, score, title)}
                            />
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
