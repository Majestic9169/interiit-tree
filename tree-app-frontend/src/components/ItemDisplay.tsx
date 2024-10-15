import { Items, Item } from "../types/types";
import "./ItemDisplay.css";

type Props = {
  selectedItem: string | null;
  itemsData: Items;
}

export const ItemDisplay = (props: Props) => {
  const currentItem: Item | undefined = props.itemsData!.find((item) => {
    if (item.item_id === props.selectedItem) return item;
  })

  return (
    <div className="product-card">
      {currentItem && (
        <>
          <div className="godown-id">
            {currentItem.godown_id}
          </div>
          <div className="product-details">
            <div className="left">
              <h2 className="item-name">{currentItem.name}</h2>
              <p className="item-price">${currentItem.price.toFixed(2)}</p>
              <img className="item-image" src={currentItem.image_url} alt={currentItem.name} />
            </div>
            <div className="right">
              <p>{currentItem.godown_id}</p>
              <p className="item-stock">{currentItem.quantity > 0 ? `${currentItem.quantity} in stock` : `out of stock`}</p>
              <h4> attributes </h4>
              {currentItem.attributes && Object.entries(currentItem.attributes).map(([key, value]) => (
                <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
