import React from 'react'

import "./AddToCart.css"

export default function AddToCart({ onAddToCart }) {
    return (
        <button
            className='add-to-cart'
            onClick={onAddToCart}
        >
            افزودن به سبد خرید
        </button>
    )
}
