export type Headings = { heading: string; width: string };

export type Pagination = {
    currentPage: number;
    allPages: number;
};

export type PaginationProps = {
    searchValue: string;
    currentPage: number;
    allPages: number;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    fetchItems: (page: number, query: string) => void;
    isLoading: boolean;
};

export type TableBaseProps<T> = {
    data: T[] | null;
    headingData: Headings[];
    isLoading: boolean;
    pagination: Pagination;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchItems: (page: number, query: string) => Promise<void>;
};

export type TableActionProps<T> = {
    rowData: T;
    refresh: () => void;
};

export type ControllerProps = {
    name: string;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchItems: (page: number, query: string) => void;
    refresh: () => void;
};
