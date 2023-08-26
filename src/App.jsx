import React, { useEffect, useState } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import route from './routes'
import Loading from './Components/Loading/Loading'

import { useSelector, useDispatch } from 'react-redux'
import { toggleSearchModalAction } from './redux/searchMenu'
import { getAllProductAct, getProductErrorAct } from './redux/product'
import { getCartCookieAct } from './redux/userCart'
import { getWishlistCookieAct } from './redux/userWishlist'
import { searchValueAct } from './redux/search'

import useFetchData from './hooks/useFetchData'

import { AiOutlineClose } from "react-icons/ai"
import { RiSearchLine } from "react-icons/ri"

import './App.css'

function App() {

  const router = useRoutes(route);
  const { pathname } = useLocation();
  const { data: productsSuccess, error: productError, loading: productLoading } = useFetchData('products');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate()

  const dispatch = useDispatch();
  //open search modal
  const isSearchModalActive = useSelector(state => state.isSearchActive);

  //close search modal
  const closeSearchModal = () => dispatch(toggleSearchModalAction());

  //get all product and save in store
  const getAllProducts = () => dispatch(getAllProductAct(productsSuccess));
  const getProductErrorHandler = () => dispatch(getProductErrorAct(productError));


  //save product in store with component did mount
  useEffect(() => {
    if (productsSuccess.length) {
      getAllProducts()
    }
    if (productError) {
      getProductErrorHandler()
    }

  }, [productsSuccess])

  //scroll to top&&& save cookies && save to store
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })

    //get cookie from user browser
    let cartCookie = document.cookie.split('; ').find(row => row.startsWith('userCart='));
    let wishlistCookie = document.cookie.split('; ').find(row => row.startsWith('userWishlist='));

    //save cookie cart to redux store
    if (cartCookie) {
      let cart = JSON.parse(cartCookie.split('=')[1])
      dispatch(getCartCookieAct(cart))
    }

    if (wishlistCookie) {
      let wishlist = JSON.parse(wishlistCookie.split('=')[1])
      dispatch(getWishlistCookieAct(wishlist))
    }

  }, [pathname])

  //search handler
  const searchHandler = e => {
    e.preventDefault();
    dispatch(searchValueAct(searchValue));
    closeSearchModal();
    navigate('/search');
    setSearchValue('')
  }

  return (
    <>
      <Header />
      {router}
      <Footer />
      {

        <div className={`search__modal ${isSearchModalActive && 'active'}`}>
          <div className="search-modal__wrapper">
            <div className="search-modal__head">
              <div className="search-modal__head-blank"></div>
              <p className="search-modal__head-title">
                جستجو
              </p>
              <AiOutlineClose
                className='search-modal__head-close'
                onClick={closeSearchModal}
              />
            </div>
            <div className="search-modal__body">
              <span className="search-modal__desc">
                لطفا متن خود را تایپ و سپس دکمه Enter را بزنید.
              </span>
              <form className="search-modal__form" onSubmit={searchHandler}>
                <input type="text" className="search-modal__form-input" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
                <RiSearchLine className='search-modal__form-icon' />
              </form>
            </div>
          </div>
        </div>
      }

      {
        productLoading && <Loading />
      }
    </>
  )
}

export default App
