import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import BranchFoodBox from '../../Components/BranchFoodBox/BranchFoodBox';
import UserCommentBox from '../../Components/UserCommentBox/UserCommentBox';
import ErrorBox from '../../Components/ErrorBox/ErrorBox';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Navigation, Pagination } from "swiper";

import { BiFoodMenu, BiPhoneCall } from "react-icons/bi"
import { MdOutlineLocationOn, MdOutlineWatchLater } from "react-icons/md"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import useFetchData from '../../hooks/useFetchData';
import "./Branch.css"

export default function Branch() {

    const allProduct = useSelector(state => state.products);
    const { data: comments, error: commentsError } = useFetchData('comments');
    const [persianFoods, setPersianFoods] = useState([]);
    const [popularityFoods, setPopularityFoods] = useState([]);
    const [nonPersianFoods, setNonPersianFoods] = useState([]);
    const [mainBranchName, setMainBranchName] = useState('');
    const { branchName } = useParams();
    const navigate = useNavigate();


    //get title page from url
    useEffect(() => {
        if (branchName === 'ekbatan') {
            setMainBranchName('اکباتان')
        } else if (branchName === 'vanak') {
            setMainBranchName('ونک')
        } else if (branchName === 'chalos') {
            setMainBranchName('چالوس')
        } else if (branchName === 'aghdasie') {
            setMainBranchName('اقدسیه')
        } else {
            navigate('/branches')
        }

        //filter product for section
        if (allProduct.length) {
            //persian food base on like count
            const persianHandler = [...allProduct].filter(product => product.persian && product.category !== 'beverages').sort((a, b) => b.like - a.like).slice(0, 12);
            setPersianFoods(persianHandler);

            // popular food base on sale count  
            const popularHandler = [...allProduct].sort((a, b) => b.sale_count - a.sale_count).slice(0, 12);
            setPopularityFoods(popularHandler);

            //foreign food randomly in every refresh
            const nonPersianHandler = [...allProduct].filter(product => !product.persian && product.category !== 'beverages')
            const randomNonePersian = []

            while (randomNonePersian.length < 12) {
                const randomIndex = Math.floor(Math.random() * nonPersianHandler.length);
                randomNonePersian.push(nonPersianHandler[randomIndex]);
                nonPersianHandler.splice(randomIndex, 1);
            }
            setNonPersianFoods(nonPersianHandler)
        }



    }, [allProduct])

    //show toast on add to cart
    const showToastHandler = () => {
        toast.success('محصول با موفقیت به سبد شما اضافه شد', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }


    return (
        <main className="main">

            <section className="order">
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        // el: '.swiper-pagination',
                        type: 'bullets',
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="slider__image">
                            <img src="/public/img/branch/Slider.jpg" alt="slider" className="slider__image-item" />
                            <div className="slider__image-content">
                                <h2 className="slider__image-title">
                                    سرسبزی {mainBranchName} دلیل حس خوب شماست!
                                </h2>
                                <Link className='slider__image-link' to='/menus'>
                                    سفارش آنلاین غذا
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider__image">
                            <img src="/public/img/index/slider2.jpg" alt="slider" className="slider__image-item" />
                            <div className="slider__image-content">
                                <h2 className="slider__image-title">
                                    سفارش آنلاین غذا در 3 مرحله                </h2>
                                <Link className='slider__image-link' to='/menus'>
                                    سفارش آنلاین غذا
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider__image">
                            <img src="/public/img/index/slider3.jpg" alt="slider" className="slider__image-item" />
                            <div className="slider__image-content">
                                <h2 className="slider__image-title">
                                    انواع غذاهای ایرانی و خارجی
                                </h2>
                                <Link className='slider__image-link' to='/menus'>
                                    سفارش آنلاین غذا
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider__image">
                            <img src="/public/img/index/slider4.jpg" alt="slider" className="slider__image-item" />
                            <div className="slider__image-content">
                                <h2 className="slider__image-title">
                                    کد تخفیف ترخینه برای سفارش اول
                                </h2>
                                <Link className='slider__image-link' to='/menus'>
                                    سفارش آنلاین غذا
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider__image">
                            <img src="/public/img/index/slider5.jpg" alt="slider" className="slider__image-item" />
                            <div className="slider__image-content">
                                <h2 className="slider__image-title">
                                    ارسال زیر 30 دقیقه
                                </h2>
                                <Link className='slider__image-link' to='/menus'>
                                    سفارش آنلاین غذا
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </section>

            <section className="persian">
                <div className="container">
                    <h2 className="persian__title">
                        غذای‌های محبوب ایرانی
                    </h2>
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        navigation={{

                            prevEl: '.slider-prev-button ', nextEl: '.slider-next-button'
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 22,
                            },
                            1024: {
                                slidesPerView: 4.5,
                                spaceBetween: 24,
                            },
                        }}
                        modules={[Navigation]}

                        className="mySwiper"
                    >
                        <div className="slider-prev-button swiper-button-prev"></div>
                        <div className="slider-next-button swiper-button-next"></div>


                        {
                            persianFoods.length ?
                                (
                                    persianFoods.map(product => (
                                        <SwiperSlide key={product.id}>
                                            <BranchFoodBox {...product} onSHowToast={showToastHandler} />
                                        </SwiperSlide>
                                    ))
                                )
                                : ('')
                        }

                    </Swiper>
                </div>
            </section>

            <section className="popularity">
                <div className="container">
                    <h2 className="popularity__title">
                        پیشنهاد ویژه
                    </h2>
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        navigation={{

                            prevEl: '.slider-prev-button ', nextEl: '.slider-next-button'
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 22,
                            },
                            1024: {
                                slidesPerView: 4.5,
                                spaceBetween: 24,
                            },
                        }}
                        modules={[Navigation]}

                        className="mySwiper"
                    >
                        <div className="slider-prev-button swiper-button-prev"></div>
                        <div className="slider-next-button swiper-button-next"></div>


                        {
                            popularityFoods.length ?
                                (
                                    popularityFoods.map(product => (
                                        <SwiperSlide key={product.id}>
                                            <BranchFoodBox {...product} onSHowToast={showToastHandler} />
                                        </SwiperSlide>
                                    ))
                                )
                                : ('')
                        }
                    </Swiper>
                </div>
            </section>

            <section className="foreign">
                <div className="container">
                    <h2 className="foreign__title">
                        غذاهای غیر ایرانی (رندوم)
                    </h2>
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        navigation={{

                            prevEl: '.slider-prev-button ', nextEl: '.slider-next-button'
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3.5,
                                spaceBetween: 22,
                            },
                            1024: {
                                slidesPerView: 4.5,
                                spaceBetween: 24,
                            },
                        }}
                        modules={[Navigation]}

                        className="mySwiper"
                    >
                        <div className="slider-prev-button swiper-button-prev"></div>
                        <div className="slider-next-button swiper-button-next"></div>

                        {
                            nonPersianFoods.length ?
                                (
                                    nonPersianFoods.map(product => (
                                        <SwiperSlide key={product.id}>
                                            <BranchFoodBox {...product} onSHowToast={showToastHandler} />
                                        </SwiperSlide>
                                    ))
                                )
                                : ('')
                        }
                    </Swiper>
                </div>
            </section>

            <div className="full-menu">
                <div className="full-menu__button">
                    <BiFoodMenu className='full-menu__icon' />
                    <Link to='/branches' className="full-menu__link">مشاهده منوی کامل</Link>
                </div>
            </div>

            <section className="branches">
                <h2 className="branches__title">
                    شعبه‌ها
                </h2>
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        // el: '.swiper-pagination',
                        type: 'bullets',
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="branches-slider">
                            <img src="/public/img/branch/branch-ekbatan.jpg" alt="branches" className="branches-slider__img" />
                            <div className="branches-slider__content">
                                <div className="branch-slider__wrapper">
                                    <div className="branch-slider__contact">
                                        <BiPhoneCall className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۴
                                        </p>
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۶
                                        </p>
                                    </div>
                                    <div className="branch-slider__location">
                                        <MdOutlineLocationOn className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم
                                        </p>
                                    </div>
                                    <div className="branch-slider__hours">
                                        <MdOutlineWatchLater className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            همه‌روزه از ساعت ۱۲  الی ۲۳
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="branches-slider">
                            <img src="/public/img/branch/branch2.jpg" alt="branches" className="branches-slider__img" />
                            <div className="branches-slider__content">
                                <div className="branch-slider__wrapper">
                                    <div className="branch-slider__contact">
                                        <BiPhoneCall className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۴
                                        </p>
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۶
                                        </p>
                                    </div>
                                    <div className="branch-slider__location">
                                        <MdOutlineLocationOn className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم
                                        </p>
                                    </div>
                                    <div className="branch-slider__hours">
                                        <MdOutlineWatchLater className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            همه‌روزه از ساعت ۱۲  الی ۲۳
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="branches-slider">
                            <img src="/public/img/branch/branch3.jfif" alt="branches" className="branches-slider__img" />
                            <div className="branches-slider__content">
                                <div className="branch-slider__wrapper">
                                    <div className="branch-slider__contact">
                                        <BiPhoneCall className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۴
                                        </p>
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۶
                                        </p>
                                    </div>
                                    <div className="branch-slider__location">
                                        <MdOutlineLocationOn className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            میدان ونک، فاز ۳، مجتمع تجاری کوروش، طبقه سوم
                                        </p>
                                    </div>
                                    <div className="branch-slider__hours">
                                        <MdOutlineWatchLater className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            همه‌روزه از ساعت ۱۲  الی ۲۳
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="branches-slider">
                            <img src="/public/img/branch/branch4.jpg" alt="branches" className="branches-slider__img" />
                            <div className="branches-slider__content">
                                <div className="branch-slider__wrapper">
                                    <div className="branch-slider__contact">
                                        <BiPhoneCall className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۴
                                        </p>
                                        <p className="branch-slider__desc">
                                            ۰۲۱-۳۳۵۳۵۳۵۶
                                        </p>
                                    </div>
                                    <div className="branch-slider__location">
                                        <MdOutlineLocationOn className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            شهرک اکباتان، فاز ۳، مجتمع تجاری کوروش، طبقه سوم
                                        </p>
                                    </div>
                                    <div className="branch-slider__hours">
                                        <MdOutlineWatchLater className='branch-slider__icon' />
                                        <p className="branch-slider__desc">
                                            همه‌روزه از ساعت ۱۲  الی ۲۳
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>


            <section className="comments">
                <div className="container">
                    <h2 className="comments__title">
                        نظرات کاربران
                    </h2>
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                            // el: '.swiper-pagination',
                            type: 'bullets',
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 1.5,
                                spaceBetween: 22,
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 24,
                            },
                        }}
                        modules={[Pagination]}

                        className="mySwiper"
                    >

                        {
                            comments.length ?
                                comments.map(comment => (
                                    <SwiperSlide key={comment.id}>
                                        <UserCommentBox {...comment} />
                                    </SwiperSlide>
                                ))
                                : ('')
                        }





                    </Swiper>

                    {
                        commentsError && <ErrorBox />
                    }
                </div>
            </section>

            <ToastContainer
                position="bottom-left"
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

        </main >
    )
}
