import React from 'react'

export default function FilterTabTitle({ title, value, onSelect }) {

    const clickHandler = e => {
        e.target.classList.toggle('active')
        onSelect(value)
    }


    return (
        <li onClick={clickHandler} className="menus-type__list-item">{title}</li>
    )
}
