export interface GodownData {
  id: string
  name: string
  parent_godown: null | string
};

export type Godowns = GodownData[];

export interface Item {
  item_id: string
  name: string
  quantity: number
  category: string
  price: number
  status: string
  godown_id: string
  brand: string
  attributes: {
    [key: string]: any;
  }
  image_url: string
};

export type Items = Item[]

export interface treeNode extends GodownData {
  children?: treeNode[]
  items?: Item[]
  isVisible: boolean
  matchedItems: Items
}

export type Tree = treeNode[]

export type HashMap = {
  [key in string]: treeNode
}
