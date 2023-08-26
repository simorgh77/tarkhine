import React from 'react'

import "./ContentTabTitle.css"

export default function ContentTabTitle({ title, value, onSelect, index, activeIndex }) {



    const clickHandler = (value) => {
        onSelect(value, index);
    }


    return (
        <li value={value}
            className={`faq__list-item ${index === activeIndex && 'active'}`}
            onClick={() => clickHandler(value)}
        >{title}</li>
    )
}
