

export default function ItemCard({item}){
    return (
        <div className="item-card">
            <div className="item-card-left">
                <div className="item-card-name">{item.name}</div>
                <div className="item-card-description">{item.description}</div>
            </div>
            <img className="item-card-image" src={item.image_url}></img>

        </div>
    )
}
