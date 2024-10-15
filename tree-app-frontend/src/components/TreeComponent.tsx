import { useEffect, useState } from "react";
import { transformDatatoTree } from "../data/transform"
import { Godowns, Items, Tree } from "../types/types"
import { TreeNode } from "./TreeNodeComponent";

interface Props {
  data: Godowns
  items: Items
  searchGodown: string
  searchItem: string
  value: string | null // selected element
  onChange: (id: string) => void // method to select element
}

export const TreeComponent = (props: Props) => {
  const treeData: Tree = transformDatatoTree(props.data, props.items);
  const [filteredData, setFilteredData] = useState<Tree>(treeData);

  const filterGodownData = (data: Tree, query: string): Tree => {
    return data
      .map((node) => {
        const isMatch = node.name.toLowerCase().includes(query.toLowerCase());
        const children = node.children ? filterGodownData(node.children, query) : [];

        const isVisible = isMatch || children.length > 0;

        return {
          ...node,
          children: isMatch ? node.children : children,
          isVisible: isVisible
        };
      })
      .filter((node) => node.isVisible);
  }

  const filterItemData = (data: Tree, query: string): Tree => {
    return data
      .map((node) => {
        const matchedItems = node.items ? node.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())) : [];

        const children = node.children ? filterItemData(node.children, query) : [];

        const isVisible = matchedItems.length > 0 || children.length > 0;

        return {
          ...node,
          children: isVisible ? children : [],
          matchedItems: matchedItems,
          isVisible: isVisible,
        }
      })
      .filter((node) => node.isVisible);
  }

  useEffect(() => {
    const filteredbyGodown = filterGodownData(treeData, props.searchGodown);
    const finalFilteredData = filterItemData(filteredbyGodown, props.searchItem);
    setFilteredData(finalFilteredData);
  }, [props.searchGodown, props.searchItem, treeData]);

  return (
    <ul style={
      { paddingLeft: 0, backgroundColor: "#faadcd", borderRadius: "30px", height: "100vh" }
    }>
      {filteredData.map((node) => (
        <TreeNode key={node.id} node={node} selectedItem={props.value} onSelectItem={props.onChange} />
      ))}
    </ul>
  )
}
