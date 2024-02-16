import { TableBaseProps } from "./table-props";

export type Checkout = {
    [index: string]: string | number;
    serial: string;
    book_id: string;
    member_id: string;
    borrowed_date: string;
    return_date: string;
    status: "borrowed" | "returned";
};

export type CheckoutFormProps = {
    isFormOpen: boolean;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CheckoutFormInputs = {
    member_id: string;
    book_id: string;
};

export type CheckoutTableProps = TableBaseProps<Checkout>;
