import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';

import MenusBox from '../../Components/MenusBox/MenusBox'
import ContentTabTitle from '../../Components/ContentTabTitle/ContentTabTitle';
// import EmptyMenuBox from '../../Components/emptyMenuBox/emptyMenuBox';
import FilterTabTitle from '../../Components/FilterTabTitle/FilterTabTitle';
import ErrorBox from '../../Components/ErrorBox/ErrorBox';

import { AiOutlineClose } from "react-icons/ai"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import "./Menus.css"

export default function Menus() {

    const { data: tabTitle, error: tabTitleError } = useFetchData('menus-tab-title');
    const { data: filterTabTitle, error: filterTabTitleError } = useFetchData('menus-filter-tab-title');

    const allProducts = useSelector(state => state.products);
    const [content, setContent] = useState('main-course');
    const [activeIndex, setActiveIndex] = useState(0)
    const [filterStatus, setFilterCount] = useState('default');
    const [filterArray, setFilterArray] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [productBanner, setProductBanner] = useState('');
    const [isBannerModalActive, setIsBannerModalActive] = useState(false);

    //change main tab
    const changeContentHandler = (value, index) => {
        setContent(value)
        setActiveIndex(index)
    }


    //filter product base on status
    const filterStatusHandler = (productArray) => {

        switch (filterStatus) {

            case 'default': {
                return [...productArray]
            }

            case 'cheap': {
                return [...productArray].sort((a, b) => (a.price_discount ? a.price_discount : a.price) - (b.price_discount ? b.price_discount : b.price))
            }
            case 'expensive': {
                return [...productArray].sort((a, b) => (b.price_discount ? b.price_discount : b.price) - (a.price_discount ? a.price_discount : a.price))
            }
            case 'like-count': {
                return [...productArray].sort((a, b) => b.like - a.like)
            }
            case 'sale-count': {
                return [...productArray].sort((a, b) => b.sale_count - a.sale_count)
            }

            default: {
                return [...productArray]
            }
        }
    }

    //filter product base in types
    useEffect(() => {
        if (allProducts.length > 0) {
            if (filterArray.length > 0) {
                const newArray = allProducts.filter(product => [...filterArray].includes(product.type));
                const finalArray = filterStatusHandler(newArray)
                setFilterProducts(finalArray)
            } else {
                const finalArray = filterStatusHandler(allProducts)
                setFilterProducts(finalArray)
            }
        }





    }, [allProducts, filterStatus, filterArray])

    //save value to state for filter base on like,count,...
    const changeFilterHandler = e => setFilterCount(e.target.value)

    //create array of type select
    const selectTypeHandler = (value) => {
        if (filterArray.some(item => item === value)) {
            const newArray = [...filterArray].filter(item => item !== value)
            setFilterArray(newArray)
        } else {
            setFilterArray(prev => [...prev, value])
        }
    }


    //parallax effect
    const parallax = () => {
        const scrollPosition = window.pageYOffset;
        const background = document.getElementById('menus-img');
        background.style.backgroundPositionY = `${scrollPosition / 2}px`;
    };
    useEffect(() => {
        window.addEventListener('scroll', parallax);
        return () => {
            window.removeEventListener('scroll', parallax);
        };
    }, []);

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

    //show product image modal
    const showBannerHandler = img => {
        setProductBanner(img);
        setIsBannerModalActive(true)
    }

    return (
        <main className="main">

            <section className="menus-cover">
                <div className="menus-banner" id='menus-img'>
                </div>
            </section>

            <section className="menus-filter">
                <div className="container">
                    <ul className="menus-filter-container" >
                        {
                            tabTitle.map((item, index) => (
                                <ContentTabTitle
                                    key={item.id}
                                    {...item}
                                    onSelect={changeContentHandler}
                                    activeIndex={activeIndex}
                                    index={index}
                                />
                            ))
                        }
                        {
                            tabTitleError && <ErrorBox />
                        }
                    </ul>
                </div>
            </section>

            <div className="menu-types">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10">
                            <ul className="menus-type__list">
                                {
                                    filterTabTitle.map(item => (
                                        <FilterTabTitle
                                            key={item.id}
                                            {...item}
                                            onSelect={selectTypeHandler}
                                        />
                                    ))
                                }

                                {
                                    filterTabTitleError && <ErrorBox />
                                }

                            </ul>
                        </div>
                        <div className="col-sm-2">
                            <div className="menu-types__wrapper">
                                <select className="menu-types__price" onChange={changeFilterHandler}>
                                    <option value="default" className="menu-types__price-item">بدون فیلتر</option>
                                    <option value="cheap" className="menu-types__price-item">ارزان‌ترین</option>
                                    <option value="expensive" className="menu-types__price-item">گران‌ترین</option>
                                    <option value="like-count" className="menu-types__price-item">محبوب‌ترین</option>
                                    <option value="sale-count" className="menu-types__price-item">پرفروش‌ترین</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="menus-persian"  >
                <div className="container">
                    <h2 className="menus__title">
                        غذاهای ایرانی
                    </h2>
                    <div className="row">

                        {
                            filterProducts.length &&
                                filterProducts.filter(product => product.persian && product.category === content).length ?
                                (filterProducts.filter(product => product.persian && product.category === content).slice(-14).map(product => (
                                    <MenusBox
                                        key={product.id}
                                        {...product}
                                        onSHowToast={showToastHandler}
                                        onShowBanner={showBannerHandler}
                                    />
                                )))
                                : (
                                    <></>
                                    // <EmptyMenuBox />
                                )
                        }

                    </div>
                </div>
            </section>

            <section className="menus-non-persian"  >
                <div className="container">
                    <h2 className="menus__title">
                        غذاهای غیر ایرانی
                    </h2>
                    <div className="row">

                        {
                            filterProducts.length &&
                                filterProducts.filter(product => !product.persian && product.category === content).length ?
                                (filterProducts.filter(product => !product.persian && product.category === content).slice(-12).map(product => (
                                    <MenusBox
                                        key={product.id}
                                        {...product}
                                        onSHowToast={showToastHandler}
                                        onShowBanner={showBannerHandler}
                                    />
                                )))
                                : (
                                    <></>
                                    // <EmptyMenuBox />
                                )
                        }

                    </div>
                </div>
            </section>

            <section className="menu-desert"  >
                <div className="container">
                    <h2 className="menus__title">
                        دسر
                    </h2>
                    <div className="row">
                        {
                            allProducts.length &&
                                allProducts.filter(product => product.category === 'desert').length ?
                                (allProducts.filter(product => product.category === 'desert').slice(-12).map(product => (
                                    <MenusBox
                                        key={product.id}
                                        {...product}
                                        onSHowToast={showToastHandler}
                                        onShowBanner={showBannerHandler}
                                    />
                                )))
                                : (
                                    <></>
                                    // <EmptyMenuBox />
                                )
                        }
                    </div>
                </div>
            </section>

            <section className="menu-beverages" >
                <div className="container">
                    <h2 className="menus__title">
                        نوشیدنی
                    </h2>
                    <div className="row">
                        {
                            allProducts.length &&
                                allProducts.filter(product => product.category === 'beverages').length ?
                                (allProducts.filter(product => product.category === 'beverages').slice(-12).map(product => (
                                    <MenusBox
                                        key={product.id}
                                        {...product}
                                        onSHowToast={showToastHandler}
                                        onShowBanner={showBannerHandler}
                                    />
                                )))
                                : (
                                    <></>
                                    // <EmptyMenuBox />
                                )
                        }
                    </div>
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

            <div className={`product-modal ${isBannerModalActive && 'active'}`}>
                <div className="product-modal__wrapper">
                    <AiOutlineClose
                        className='product-modal__close'
                        onClick={() => setIsBannerModalActive(false)}
                    />
                    <img
                        src={`/public/img/products/${productBanner}`}
                        alt="product img view"
                        className="product-modal__img" />
                </div>
            </div>

        </main>
    )
}
