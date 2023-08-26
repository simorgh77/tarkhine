import React from 'react'

import AddToCart from '../AddToCart/AddToCart'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getWishlistCookieAct } from '../../redux/userWishlist'
import { AiOutlineHeart, AiFillStar, AiFillHeart } from "react-icons/ai"

import { zoomMouseMove, zoomMouseLeave, addToCartHandler, addToWishListHandler } from '../../Func/Func'

import "./BranchFoodBox.css"

export default function BranchFoodBox({ id, desc, title, img, price, price_discount, discount_percent, like, score, onSHowToast }) {

    const userWishlist = useSelector(state => state.userWishlist)
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
        addToCartHandler(newProductDetail)
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
        <article className="food-box">
            <div className="food-box__container">
                <img
                    src={`/public/img/products/${img}`}
                    alt={title}
                    className="food-box__cover"
                    onMouseMove={zoomMouseMove}
                    onMouseLeave={zoomMouseLeave}
                />
            </div>
            <div className="food-box__content">
                <h3 className="food-box__title">
                    <Link>
                        {title}
                    </Link>
                </h3>
                <div className="food-box__details">
                    <div className="food-box__popularity">
                        <div className="food-box__wishlist">
                            {
                                userWishlist.length > 0 ?
                                    (
                                        userWishlist.some(item => item.id === id) ?
                                            (
                                                <AiFillHeart
                                                    className='food-box__wishlist-icon active'
                                                    onClick={() => addToUserWishlist(id, desc, discount_percent, img, price, price_discount, score, title)}
                                                />
                                            )
                                            : (
                                                <AiOutlineHeart
                                                    className='food-box__wishlist-icon'
                                                    onClick={() => addToUserWishlist(id, desc, discount_percent, img, price, price_discount, score, title)}
                                                />
                                            )
                                    )
                                    : (
                                        <AiOutlineHeart
                                            className='food-box__wishlist-icon'
                                            onClick={() => addToUserWishlist(id, desc, discount_percent, img, price, price_discount, score, title)}
                                        />
                                    )
                            }
                        </div>
                        <div className="food-box__score">
                            <AiFillStar className='food-box__score-icon' />
                            <span className="food-box__score-number">{score}</span>
                            <span className="food-box__score-count">({like} امتیاز)</span>
                        </div>
                    </div>
                    <div className="food-box__price">
                        <div className="food-box__price-discount">
                            <span className="food-box__discount-number">{price_discount ? price : ''}</span>
                            <span className="food-box__discount-percent">{
                                discount_percent ? `%${discount_percent}` : ''
                            }</span>
                        </div>
                        <div className="food-box__price-main">
                            <span className="food-box__price-main-number">{price_discount ? price_discount : price}</span>
                            <span className="food-box__price-main-unit">تومان</span>
                        </div>
                    </div>
                </div>
                <div className="food-box__button">
                    <AddToCart
                        onAddToCart={() => addToUserCart(id, desc, discount_percent, img, price, price_discount, score, title)}
                    />
                </div>
            </div>
        </article>
    )
}
