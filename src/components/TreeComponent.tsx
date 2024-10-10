import { transformDatatoTree } from "../data/transform"
import { Godowns, Items, Tree } from "../types/types"
import { TreeNode } from "./TreeNodeComponent";

interface Props {
  data: Godowns
  items: Items
  value: string | null // selected element
  onChange: (id: string) => void // method to select element
}

export const TreeComponent = (props: Props) => {
  const treeData: Tree = transformDatatoTree(props.data, props.items);

  return (
    <ul>
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  )
}
