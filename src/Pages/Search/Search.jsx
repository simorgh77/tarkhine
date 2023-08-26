import React, { useEffect, useState } from 'react'
import BranchFoodBox from '../../Components/BranchFoodBox/BranchFoodBox'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "./Search.css"

export default function Search() {

    const searchValue = useSelector(state => state.search);
    const allProducts = useSelector(state => state.products);
    const [searchProducts, setSearchProducts] = useState([]);



    useEffect(() => {
        const search = allProducts.filter(product => product.title.includes(searchValue));
        setSearchProducts(search)
    }, [])


    //show toast
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
        <div className="container">

            {
                !searchProducts.length ?
                    (
                        <section className="search-empty">
                            <h1 className="search-empty__title">
                                موردی با این مشخصات پیدا نکردیم!
                            </h1>
                            <Link className='search-empty__link' to='/menus'>
                                <img src="/public/img/search/not-found.png" alt="search not found" className="search-empty__banner" />
                            </Link>
                        </section>
                    )
                    : (

                        <section className='search'>
                            <h1 className="search__title">
                                نتایج جستجو برای:
                                <span className="search__title-result">{searchValue}</span>
                            </h1>
                            <div className="row">
                                {
                                    searchProducts.map(product => (
                                        <div className="col-sm-12 col-md-3 col-lg-4" key={product.id}>
                                            <BranchFoodBox
                                                {...product}
                                                onSHowToast={showToastHandler}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                    )
            }


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

        </div>
    )
}
