import React from 'react'

import useFetchData from '../../hooks/useFetchData';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import MenuBox from '../../Components/MenuBox/MenuBox';
import IconBox from '../../Components/IconBox/IconBox';
import BranchBox from '../../Components/BranchBox/BranchBox';
import ErrorBox from '../../Components/ErrorBox/ErrorBox';

import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md"

import "./Index.css"

import { Pagination, Navigation } from "swiper";



export default function Index() {

  const { data: branches, error: branchesError } = useFetchData('branches-box')


  return (
    <main className="main">

      <section className="slider">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
            // el: '.swiper-pagination',
            type: 'bullets',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slider__image">
              <img src="/public/img/index/slider.jpg" alt="slider" className="slider__image-item" />
              <div className="slider__image-content">
                <h2 className="slider__image-title">
                  تجربه غذای سالم و گیاهی به سبک ترخینه
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

      <section className="menus">
        <div className="container">
          <h2 className="menu__title">
            منوی رستوران
          </h2>
          <div className="row">
            <MenuBox item='main-course' />
            <MenuBox item='appetizer' />
            <MenuBox item='dessert' />
            <MenuBox item='beverages' />
          </div>
        </div>
      </section>

      <section className="restaurant">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="restaurant__title">رستوران‌های زنجیره‌ای ترخینه</h2>
              <p className="restaurant__desc">
                مهمان‌نوازی یکی از مهم‌ترین مشخصه‌های ایرانیان است و باعث افتخار ماست که بیش از 20 سال است خدمت‌گزار مردم شریف ایران هستیم. ما در رستوران‌های زنجیره‌ای ترخینه همواره تلاش کردیم که در محیطی اصیل بر پایه معماری و طراحی مدرن در کنار طبیعتی دلنواز، غذایی سالم و درخور شان شما عزیزان ارائه دهیم.
              </p>
              <div className="restaurant__link">
                <Link to='https://react.dev' className='restaurant__button'>
                  <span className="restaurant__button-text">اطلاعات بیشتر</span>
                  <MdArrowBackIosNew className='restaurant__button-icon' />
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <IconBox item='personnel' />
                <IconBox item='quality' />
                <IconBox item='environment' />
                <IconBox item='menu' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tarkhine-branches">
        <div className="container">
          <h2 className="branches__title">
            ترخینه گردی
          </h2>
          <div className="row">

            {
              branches &&
              branches.map(branch => (
                <BranchBox key={branch.id}  {...branch} />
              ))
            }

            {
              branchesError && <ErrorBox />
            }

          </div>
        </div>
      </section>

    </main>
  )
}
