import { TableBaseProps } from "./table-props";

export type Fine = {
    member_id: string;
    full_name: string;
    fines: number;
};

export type FineTableProps = Omit<TableBaseProps<Fine>, "setFormOpen">;
