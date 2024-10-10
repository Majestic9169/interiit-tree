import type { Godowns, HashMap, Tree } from "../types/types"

export const transformDatatoTree = (data: Godowns) => {
  const hashMap: HashMap = {};
  const tree: Tree = [];

  data.forEach((godown) => {
    hashMap[godown.id] = { ...godown, children: [] };
  })

  data.forEach((godown) => {
    if (godown.parent_godown) {
      hashMap[godown.parent_godown].children?.push(hashMap[godown.id]);
    } else {
      tree.push(hashMap[godown.id]);
    }
  })

  return tree;
}
