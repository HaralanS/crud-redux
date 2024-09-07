import { Provider } from 'react-redux'
import {store} from '../store/storeReducer'
import HomeSection from "../components/HomeSection/HomeSection";


export default function Home(){

    return(
        <>
            <Provider store={store}>
                <HomeSection/>
            </Provider>
        </>
    )
}