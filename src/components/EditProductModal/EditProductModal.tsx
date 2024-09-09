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
    const {register, handleSubmit, formState: {errors}} = useForm<IProduct>()
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
        <input type="text" {...register('name', {required: "Nome é obrigatório"})} defaultValue={product.name} />
            {errors.name && <p>{errors.name?.message}</p>}
            <input type="text" {...register('imgUrl', {required: "Url é obrigatório"})} defaultValue={product.imgUrl} />
            {errors.imgUrl && <p>{errors.imgUrl?.message}</p>}
            <input type="text" {...register('quantity', {required: "Quantidade é obrigatório"})} defaultValue={product.quantity} />
            {errors.quantity && <p>{errors.quantity?.message}</p>}
            <input type="text" {...register('price', {required: "Preço é obrigatório"})} defaultValue={product.price} />
            {errors.price && <p>{errors.price?.message}</p>}
            <input type="text" {...register('likes', {required: "Likes é obrigatório"})} defaultValue={product.likes} />
            {errors.likes && <p>{errors.likes?.message}</p>}
            <button type="submit">Salvar</button>
        </form>
        </>
    )
}