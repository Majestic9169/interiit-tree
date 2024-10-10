import type { treeNode } from "../types/types"

interface Props {
  node: treeNode;
}

export const TreeNode = (props: Props) => {
  return (
    <li>
      {props.node.name}
      {props.node.children!.length && (
        <ul>
          {props.node.children!.map(child => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
      {props.node.items!.length && (
        <ul>
          {props.node.items!.map((item) => (
            <li key={item.item_id}>
              <strong>{item.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
