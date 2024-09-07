import { useDispatch } from "react-redux";
import {  AppDispatch } from "../../store/storeReducer";
import { editProduct } from "../../slices/productsSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './EditProductModal.module.scss'
import { IProduct } from "../../utils/interfaces";

interface ModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    product: IProduct;
}

export default function EditProductModal({setModal, product}: ModalProps) {
    const {register, handleSubmit} = useForm<IProduct>()
    const dispatch: AppDispatch = useDispatch()
    // const products = useSelector((state: RootState) => state.products.products)

    const onSubmit: SubmitHandler<IProduct> = (data) => {
        dispatch(editProduct(            
            {
            id: product.id,
            name: data.name,
            imgUrl: data.imgUrl,
            quantity: data.quantity,
            price: data.price,
            likes: data.likes
        }))
        setModal(false)
    }

    return(
        <>
        <div className={styles.backgroundDiv} onClick={() => setModal(false)}>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle}>
            <input type="text" required {...register('name')} defaultValue={product.name} placeholder="Nome" />
            <input type="text" required {...register('imgUrl')} defaultValue={product.imgUrl} placeholder="Url da imagem" />
            <input type="text" required {...register('quantity')} defaultValue={product.quantity} placeholder="Quantidade" />
            <input type="text" required {...register('price')} defaultValue={product.price} placeholder="Preco" />
            <input type="text" required {...register('likes')} defaultValue={product.likes} placeholder="Likes" />
            <button type="submit">Salvar</button>
        </form>
        </>
    )
}