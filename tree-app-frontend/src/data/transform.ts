import type { Godowns, HashMap, Items, Tree } from "../types/types"

export const transformDatatoTree = (godownData: Godowns, itemData: Items) => {
  const hashMap: HashMap = {};
  const tree: Tree = [];

  godownData.forEach((godown) => {
    hashMap[godown.id] = { ...godown, children: [], items: [], isVisible: true };
  })

  itemData.forEach((item) => {
    if (hashMap[item.godown_id]) {
      hashMap[item.godown_id].items?.push(item);
    }
  })

  godownData.forEach((godown) => {
    if (godown.parent_godown) {
      hashMap[godown.parent_godown].children?.push(hashMap[godown.id]);
    } else {
      tree.push(hashMap[godown.id]);
    }
  })

  return tree;
}
