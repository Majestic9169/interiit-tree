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
    </li>
  )
}
