import {useModal} from '../../context/Modal'
import ItemModal from './ItemModal'

import './ItemCard.css'

export default function ItemCard({item, isOwner}){
    const {setModalContent} = useModal()

    const onClick = () => {
        setModalContent(<ItemModal item={item} isOwner={isOwner}/>)
    }

    let string_price = item.price_cents.toString()

    string_price = `${string_price.slice(0, string_price.length-2)}.${string_price.slice(string_price.length-2)}`

    return (
        <div onClick={onClick} className="item-card">
            <div className="item-card-left">
                <div className="item-card-name">{item.name}</div>
                <div className="item-card-description">{item.description}</div>
            </div>
            <div className="item-card-image-container">
                <div className='item-card-price'>${string_price}</div>
                { item.image_url && <img className="item-card-image" src={item.image_url}></img>}
            </div>

        </div>
    )
}
