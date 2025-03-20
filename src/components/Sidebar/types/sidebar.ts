export interface NavItem {
  id: number;
  title: string;
  target?: string;
  visible?: boolean;
  children?: NavItem[];
}

 
export interface DraggableProps {
  items:NavItem[]
    item: NavItem;
    index: number;
    moveItem: (parentId: number | null, fromIndex: number, toIndex: number) => void;

    editMode: boolean;
    updateItem: (item: NavItem) => void;
    parentId?: number | null | undefined,    key:number
  }

export interface HeaderSectionProps {
  navItems: NavItem[];
  setNavItems: (items: NavItem[]) => void;
  originalItems: NavItem[];
  setOriginalItems: (items: NavItem[]) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}
