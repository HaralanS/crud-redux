import { useDispatch } from "react-redux";
import {  AppDispatch } from "../../store/storeReducer";
import { addProduct } from "../../slices/productsSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from './AddProductModal.module.scss'

interface ModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormData {
    name: string;
    imgUrl: string;
    quantity: number;
    price: number;
    likes: number;
}

export default function AddProductModal({setModal}: ModalProps) {
    const {register, handleSubmit, formState: {errors}} = useForm<IFormData>()
    const dispatch: AppDispatch = useDispatch()
    // const products = useSelector((state: RootState) => state.products.products)

    const onSubmit: SubmitHandler<IFormData> = (data) => {
        dispatch(addProduct(            {
            id: 0,
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
            <input type="text" {...register('name', {required: "Nome é obrigatório"})} placeholder="Nome" />
            {errors.name && <p>{errors.name?.message}</p>}
            <input type="text" {...register('imgUrl', {required: "Url é obrigatório"})} placeholder="Url da imagem" />
            {errors.imgUrl && <p>{errors.imgUrl?.message}</p>}
            <input type="text" {...register('quantity', {required: "Quantidade é obrigatório"})} placeholder="Quantidade" />
            {errors.quantity && <p>{errors.quantity?.message}</p>}
            <input type="text" {...register('price', {required: "Preço é obrigatório"})} placeholder="Preco" />
            {errors.price && <p>{errors.price?.message}</p>}
            <input type="text" {...register('likes', {required: "Likes é obrigatório"})} placeholder="Likes" />
            {errors.likes && <p>{errors.likes?.message}</p>}
            <button type="submit">Cadastrar</button>
        </form>
        </>
    )
}