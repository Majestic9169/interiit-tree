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
          <div className="item-name">
            <h2 className="item-name-header">{currentItem.name.split(" ")[0]}</h2>
            <h4 className="item-name-remaining">{currentItem.name.split(" ").slice(1).join(" ")}</h4>
            <p className="item-price">${currentItem.price.toFixed(2)}</p>
          </div>
          <div className="product-details">
            <div className="left">
              <img className="item-image" src={currentItem.image_url} alt={currentItem.name} />
            </div>
            <div className="right">
              <h2 className="godown-parent">{getParent(currentItem.godown_id)}</h2>
              <p
                className="item-stock"
                style={{ color: currentItem.quantity > 0 ? "#4caf50" : "#d50032" }}
              >
                {currentItem.quantity > 0 ? (
                  <>
                    <strong>{currentItem.quantity}</strong> left in stock
                  </>
                ) : (
                  "Out of stock"
                )}
              </p>
              <h4>Attributes</h4>
              {currentItem.attributes && (
                <ul className="attributes-list">
                  {Object.entries(currentItem.attributes).map(([key, value]) => (
                    <li key={key} className="attribute-item">
                      <span className="attribute-name">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                      </span>
                      <span className="attribute-value">{value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
