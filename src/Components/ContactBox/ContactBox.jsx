import React from 'react'

import { Link } from 'react-router-dom'

import "./ContactBox.css"

export default function ContactBox({ img, title, desc, address, phone1, phone2, href }) {
    return (
        <div className="contact-box">
            <Link to={`/branches/${href}`} className="contact-box__cover">
                <img src={"/public/"+img} alt={title} className="contact-box__img-thumbnail" />
            </Link>
            <div className="contact-box__content">
                <h2 className='contact-box__title'>
                    <Link to={`/branches/${href}`} className="contact-box__title-link">
                        {title}
                    </Link>
                </h2>
                <address className='contact-box__detail contact-box__address'>
                    {address}
                </address>
                <Link to={`tel:${phone1}`} className="contact-box__detail contact-box__phone">
                    شماره تماس ۱: {phone1}
                </Link>
                <Link to={`tel:${phone2}`} className="contact-box__detail contact-box__phone">
                    شماره تماس ۲: {phone2}
                </Link>
                <span className="contact-box__detail contact-box__hours">
                    ساعت کای: {desc}
                </span>
            </div>
        </div>
    )
}
