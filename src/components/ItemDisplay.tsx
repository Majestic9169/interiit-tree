import ItemsData from "../data/items.json";
import { Item } from "../types/types";

type Props = {
  selectedItem: string | null;
}

export const ItemDisplay = (props: Props) => {
  const currentItem: Item | undefined = ItemsData.find((item) => {
    if (item.item_id === props.selectedItem) return item;
  })

  return (
    <div>
      {currentItem?.item_id}
    </div>
  )
}
