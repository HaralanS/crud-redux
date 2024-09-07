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
    const {register, handleSubmit} = useForm<IFormData>()
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
            <input type="text" required {...register('name')} placeholder="Nome" />
            <input type="text" required {...register('imgUrl')} placeholder="Url da imagem" />
            <input type="text" required {...register('quantity')} placeholder="Quantidade" />
            <input type="text" required {...register('price')} placeholder="Preco" />
            <input type="text" required {...register('likes')} placeholder="Likes" />
            <button type="submit">Cadastrar</button>
        </form>
        </>
    )
}