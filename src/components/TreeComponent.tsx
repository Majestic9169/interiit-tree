import { transformDatatoTree } from "../data/transform"
import { Godowns, Tree } from "../types/types"
import { TreeNode } from "./TreeNodeComponent";

interface Props {
  data: Godowns
}

export const TreeComponent = (props: Props) => {
  const treeData: Tree = transformDatatoTree(props.data);

  return (
    <ul>
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  )
}
