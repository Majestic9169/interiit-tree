import { useState } from "react";
import type { treeNode } from "../types/types"
import "./TreeNode.css"

interface Props {
  node: treeNode;
  selectedItem: string | null;
  onSelectItem: (id: string) => void;
}

export const TreeNode = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);

  const toggleNode = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <li className="tree-node">
      <div onClick={toggleNode}>
        {(props.node.children || props.node.items) && (isExpanded ? '[-] ' : '[+] ')}{props.node.name}
      </div>
      {isExpanded && props.node.children && props.node.children.length > 0 && (
        <ul>
          {props.node.children!.map(child => (
            <TreeNode key={child.id} node={child} selectedItem={props.selectedItem} onSelectItem={props.onSelectItem} />
          ))}
        </ul>
      )}
      {isExpanded && props.node.items && props.node.items.length > 0 && (
        <ul>
          {props.node.items!.map((item) => (
            <li
              key={item.item_id}
              className="item"
              onClick={() => props.onSelectItem(item.item_id)}
              style={{
                backgroundColor: props.selectedItem?.includes(item.item_id) ? "#d3d3d3" : "",
              }}
            >
              <u>{item.name}</u>
            </li>
          ))}
        </ul>
      )
      }
    </li >
  )
}
