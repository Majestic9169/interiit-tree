export interface GodownData {
  id: string
  name: string
  parent_godown: null | string
}

export type Godowns = GodownData[]

export interface treeNode extends GodownData {
  children?: treeNode[]
}

export type Tree = treeNode[]

export type HashMap = {
  [key in string]: treeNode
}
