import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../utils/interfaces";

interface ProductsState {
    products: IProduct[];
}

const initialState: ProductsState = {
    products: [
        {
            id: 1,
            name: "Dell Inspiron 15",
            imgUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3520/media-gallery/notebook-inspiron-15-3520-black-gallery-10.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4535&hei=3009&qlt=100,1&resMode=sharp2&size=4535,3009&chrss=full&imwidth=5000",
            quantity: 5,
            price: 2899,
            likes: 27
        },
        {
            id: 2,
            name: "Ipad 10 64gb",
            imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_665155-MLA78584375996_082024-F.webp",
            quantity: 8,
            price: 2587,
            likes: 13
        },
        {
            id: 3,
            name: "Iphone 13",
            imgUrl: "https://m.media-amazon.com/images/I/41rfDU6FGqL._AC_SL1000_.jpg",
            quantity: 38,
            price: 3499,
            likes: 41
        },
        {
            id: 4,
            name: "Samsung Galaxy A25",
            imgUrl: "https://m.media-amazon.com/images/I/51Cc4iXUumL._AC_SL1000_.jpg",
            quantity: 49,
            price: 1487,
            likes: 56
        }
    ]
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.products.push({
                id: Math.floor(Math.random() * 100000),
                name: action.payload.name,
                imgUrl: action.payload.imgUrl,
                quantity: action.payload.quantity,
                price: action.payload.price,
                likes: action.payload.likes
            })
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const productsFilter = state.products.filter(product => product.id !== action.payload)
            if(productsFilter) {
                state.products = productsFilter
            }
        },
        editProduct: (state, action: PayloadAction<IProduct>) => {
            const product = state.products.find(product => product.id === action.payload.id)
            if(product) {
                product.id = action.payload.id
                product.name = action.payload.name
                product.imgUrl = action.payload.imgUrl
                product.quantity = action.payload.quantity
                product.price = action.payload.price
                product.likes = action.payload.likes
            }
        },
        orderByLikes: (state) => {
            state.products = state.products.sort((a, b) => b.likes - a.likes)
        }
    }
})

export const {addProduct, deleteProduct, editProduct, orderByLikes} = productsSlice.actions
export default productsSlice.reducer