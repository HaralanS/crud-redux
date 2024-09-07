import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/storeReducer";
import { deleteProduct, orderByLikes } from "../../slices/productsSlice";
import styles from './HomeSection.module.scss'
import AddProductModal from "../AddProductModal/AddProductModal";
import EditProductModal from "../EditProductModal/EditProductModal.tsx";
import { IProduct } from "../../utils/interfaces.ts";

export default function HomeSection() {
    const dispatch: AppDispatch = useDispatch()
    const products = useSelector((state: RootState) => state.products.products)
    const [modalOn, setModalOn] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [product, setProduct] = useState<IProduct>(products[0])

    const deleteProductById = (id: number) => {
        dispatch(deleteProduct(id))
    }

    const setProductToEdit = (produtToEdit: IProduct) => {
        setEditModal(true)
        setProduct(produtToEdit)
    }
    const rankByLikes = () => {
        dispatch(orderByLikes())
    }

    return(
        <>
            <main>
                <section className={styles.homeSection}>
                    <h1>Cadastro de produtos</h1>
                    <button className={styles.addButton} onClick={() => setModalOn(true)}>Adicionar Produto</button>
                    <button className={styles.addButton} onClick={rankByLikes}>Rankear por likes</button>
                    <div className={styles.cardContainer}>
                        {products.map((product) => (
                            <div className={styles.productCard} key={product.id}>
                                <img src={product.imgUrl} alt={`Imagem do produto: ${product.name}`} />
                                <h3>{product.name}</h3>
                                <span>{product.quantity}</span>
                                <span>{Number(product.price).toFixed(2)}</span>
                                <span>{product.likes}</span>
                                <div>
                                    
                                <button onClick={() => setProductToEdit(product)} style={{backgroundColor: 'rgb(45, 194, 144)'}}>Editar</button>
                                <button onClick={() => deleteProductById(product.id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {modalOn ? 
                <AddProductModal setModal={setModalOn}/>:
                null}
                {editModal ?
                <EditProductModal product={product} setModal={setEditModal}/>
                :
                null}
            </main>

        </>
    )
}