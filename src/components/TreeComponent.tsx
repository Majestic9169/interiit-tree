import { useEffect, useState } from "react";
import { transformDatatoTree } from "../data/transform"
import { Godowns, Items, Tree } from "../types/types"
import { TreeNode } from "./TreeNodeComponent";

interface Props {
  data: Godowns
  items: Items
  search: string
  value: string | null // selected element
  onChange: (id: string) => void // method to select element
}

export const TreeComponent = (props: Props) => {
  const treeData: Tree = transformDatatoTree(props.data, props.items);
  const [filteredGodowns, setFilteredGodowns] = useState<Tree>(treeData);

  const filterTreeData = (data: Tree, query: string): Tree => {
    return data
      .map((node) => {
        const isMatch = node.name.toLowerCase().includes(query.toLowerCase());
        const children = node.children ? filterTreeData(node.children, query) : [];
        return {
          ...node,
          children: children,
          isVisible: isMatch || (node.children!.length > 0)
        };
      })
      .filter((node) => node.isVisible);
  }

  useEffect(() => {
    setFilteredGodowns(filterTreeData(filteredGodowns, props.search));
  }, [props.search, treeData]);
  // setFilteredGodowns(filterTreeData(treeData, props.search));

  return (
    <ul>
      {filteredGodowns.map((node) => (
        <TreeNode key={node.id} node={node} selectedItem={props.value} onSelectItem={props.onChange} />
      ))}
    </ul>
  )
}
