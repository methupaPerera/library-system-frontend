export type Children = Readonly<{ children: React.ReactNode }>;

// Types for the sidebar. -------------------------------------------

export type SidebarLinkProps = {
    route: string;
    Icon: React.ReactElement;
};

// Types for the dashboard components. ------------------------------

export type StaticsCardProps = {
    caption: string;
    value: string | number;
    Icon: React.ElementType;
};

export type BookDataProps = {
    name: string;
    author: string;
    availability: boolean;
};
