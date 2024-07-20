import {Footer} from "./modules/Footer/Footer";
import {Header} from "./modules/Header/Header";
import {Goods} from "./modules/Goods/Goods";
import {Hero} from "./modules/Hero/Hero";
import {Filter} from "./modules/Filter/Filter";
import {Subscribe} from "./modules/Subscribe/Subscribe";
import {Order} from "./modules/Order/Order";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {registerCart} from "./redux/cartSlice.js";


export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeCart = async () => {
            await dispatch(registerCart());
            // await dispatch(registerCart());
        };

        initializeCart();
    }, [dispatch]);

    return (
        <>
            <Header />

            <main>
               <Hero />

                <Filter />

                <Goods />

                <Subscribe />
            </main>

            <Footer />

            <Order />
        </>
);
};


