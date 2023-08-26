import React, { useState } from 'react'


import FooterMenu from '../FooterMenu/FooterMenu'

import useFetchData from '../../hooks/useFetchData'
import ErrorBox from '../ErrorBox/ErrorBox'

import { FiTwitter, FiInstagram } from "react-icons/fi"
import { TbBrandTelegram } from "react-icons/tb"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Footer.css"

export default function Footer() {

    const { data: footerMenuSuccess, error: footerMenuError } = useFetchData('footer-menus');

    const [userName, setUserName] = useState('');
    const [userContact, setUserContact] = useState('');
    const [userMessage, setUserMessage] = useState('');



    const messageFormHandler = e => {
        e.preventDefault();
        if(userName.length < 2 || userContact.length < 10 || userMessage.length < 5){
            toast.warn('لطفا فرم را درست پر کنید و دوباره تلاش کنید', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }else{
            toast.success(`ممنون از پیام شما ${userName} عزیز`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-3">


                        {
                            footerMenuSuccess.length &&
                            <FooterMenu
                                items={footerMenuSuccess[1]}
                            />
                        }

                        {
                            footerMenuError && <ErrorBox />
                        }

                        <div className="footer-icons">
                            <FiTwitter className='footer-icon__item' />
                            <FiInstagram className='footer-icon__item' />
                            <TbBrandTelegram className='footer-icon__item' />
                        </div>

                    </div>
                    <div className="col-6 col-md-3">

                        {
                            footerMenuSuccess.length &&
                            <FooterMenu
                                items={footerMenuSuccess[0]}
                            />
                        }

                        {
                            footerMenuError && <ErrorBox />
                        }
                    </div>
                    <div className="col-12 col-md-6">
                        <h3 className="contact-form__title">پیام به ترخینه</h3>
                        <form className="contact-form" onSubmit={e => messageFormHandler(e)}>
                            <div className="contact-form__detail">
                                <input
                                    type="text"
                                    placeholder='نام و نام خانوادگی'
                                    id="contact-name"
                                    className="contact-form__name"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='شماره تماس'
                                    id="contact-phone"
                                    className="contact-form__phone"
                                    value={userContact}
                                    onChange={e => setUserContact(e.target.value)}
                                />
                                <input type="email" placeholder='آدرس ایمیل (اختیاری)' id="contact-email" className="contact-form__email" />
                            </div>
                            <div className="contact-form__body">
                                <textarea
                                    id="contact-message"
                                    className='contact-form__message'
                                    placeholder='پیام شما'
                                    value={userMessage}
                                    onChange={e => setUserMessage(e.target.value)}
                                ></textarea>
                                <input type="submit" value="ارسال پیام" className="contact-form__submit" id="contact-submit" />
                            </div>
                        </form>
                    </div>

                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />

                </div>
            </div>
        </footer>
    )
}
