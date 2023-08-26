import Index from "./Pages/Index/Index";
import Branches from "./Pages/Branches/Branches";
import Branch from "./Pages/Branch/Branch";
import Menus from "./Pages/Menus/Menus";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Faq from "./Pages/Faq/Faq";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound/NotFound";
import Search from "./Pages/Search/Search";

const route = [
    { path: "/*", element: <NotFound /> },
    { path: "/", element: <Index /> },
    { path: "/branches", element: <Branches /> },
    { path: "/branches/:branchName", element: <Branch /> },
    { path: "/menus", element: <Menus /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/faq", element: <Faq /> },
    { path: "/cart", element: <Cart /> },
    { path: "/search", element: <Search /> },
]


export default route;