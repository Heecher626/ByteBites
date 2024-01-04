import {useModal} from '../../context/Modal'
import ItemModal from './ItemModal'

export default function ItemCard({item}){
    const {setModalContent, setOnModalClose} = useModal()

    const onClick = () => {
        setModalContent(<ItemModal item={item}/>)
    }

    let string_price = item.price_cents.toString()

    string_price = `${string_price.slice(0, string_price.length-2)}.${string_price.slice(string_price.length-2)}`

    return (
        <div onClick={onClick} className="item-card">
            <div className="item-card-left">
                <div className="item-card-name">{item.name}</div>
                <div className="item-card-description">{item.description}</div>
            </div>
            <div>
                <div className='item-card-price'>${string_price}</div>
                { item.image_url && <img className="item-card-image" src={item.image_url}></img>}
            </div>

        </div>
    )
}
