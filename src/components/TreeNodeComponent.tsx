import type { treeNode } from "../types/types"
import "./TreeNode.css"

interface Props {
  node: treeNode;
}

export const TreeNode = (props: Props) => {
  return (
    <li className="tree-node">
      {props.node.name}
      {props.node.children && props.node.children.length > 0 && (
        <ul>
          {props.node.children!.map(child => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
      {props.node.items && props.node.items.length > 0 && (
        <ul>
          {props.node.items!.map((item) => (
            <li key={item.item_id} className="item">
              <u>{item.name}</u>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
