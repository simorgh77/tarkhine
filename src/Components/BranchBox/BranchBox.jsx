import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { MdKeyboardArrowLeft } from "react-icons/md"
import { BsCardImage } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"

import "./BranchBox.css"

export default function BranchBox({ title, desc, cover, href, gallery }) {

    const [activeGalleryModal, setActiveGalleryModal] = useState(false);
    const [galleryModalBG, setGalleryModalBG] = useState(cover)

    //change image gallery modal
    const changeImageHandler = e => setGalleryModalBG(e.target.src)


    return (
        <article className="col-12 col-md-6 col-lg-3">
            <div className="branch-box">
                <img src={"/public/"+cover} alt="branches" className="branch-box__cover" />
                <BsCardImage
                    className='branch-box__cover-icon'
                    onClick={() => setActiveGalleryModal(true)}
                />
                <div className="branch-box__content">
                    <h3 className="branch-box__title">
                        <Link to={href}>
                            {title}
                        </Link>
                    </h3>
                    <span className="branch-box__desc">
                        {desc}
                    </span>
                    <Link to={href} className='branch-box__button'>
                        <span className="branch-box__button-text">صفحه شعبه</span>
                        <MdKeyboardArrowLeft className='branch-box__button-icon' />
                    </Link>
                </div>
            </div>
            <div className={`branch-gallery ${activeGalleryModal && 'active'}`}>
                <div className="branch-gallery__wrapper"
                    style={{
                        backgroundImage: `url(${galleryModalBG})`
                    }}
                >
                    <AiOutlineClose
                        className='branch-gallery__close'
                        onClick={() => setActiveGalleryModal(false)}
                    />
                    <div className="branch-gallery__images">

                        {
                            gallery &&
                            gallery.map(img => (
                                <img
                                    key={img.id}
                                    src={"/public/"+img.src}
                                    alt="branch"
                                    className="branch-gallery__images-item"
                                    onClick={changeImageHandler} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </article >
    )
}
