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
    <div className="item-display">
      <img src={currentItem?.image_url} alt={currentItem?.name} />
      <h2>{currentItem?.name}</h2>
    </div>
  )
}
