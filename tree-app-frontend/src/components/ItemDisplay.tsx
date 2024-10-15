import { Items, Item, Godowns } from "../types/types";
import "./ItemDisplay.css";

type Props = {
  selectedItem: string | null;
  itemsData: Items;
  godownsData: Godowns;
}

export const ItemDisplay = (props: Props) => {
  const currentItem: Item | undefined = props.itemsData!.find((item) => {
    if (item.item_id === props.selectedItem) return item;
  })

  const getRootParent = (godown_id: string): string => {
    let currentId: string = godown_id;

    while (true) {
      const godown = props.godownsData.find(g => g.id === currentId);

      if (godown && godown.parent_godown) {
        currentId = godown.parent_godown;
      } else {
        return godown ? godown.name : "unable to find parent";
      }
    }
  }

  const getParent = (godown_id: string): string => {
    return props.godownsData.find(g => g.id === godown_id)!.name;
  }

  return (
    <div className="product-card">
      {currentItem && (
        <>
          <span className="godown-header">
            <div className="colored-bar">
            </div>
            <div className="godown-name">
              {getRootParent(currentItem.godown_id)}
            </div>
          </span>
          <div className="product-details">
            <div className="left">
              <div className="item-name">
                <h2 className="item-name-header">{currentItem.name.split(" ")[0]}</h2>
                <h4 className="item-name-remaining">{currentItem.name.split(" ").slice(1).join(" ")}</h4>
              </div>
              <p className="item-price">${currentItem.price.toFixed(2)}</p>
              <img className="item-image" src={currentItem.image_url} alt={currentItem.name} />
            </div>
            <div className="right">
              <p>{getParent(currentItem.godown_id)}</p>
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
