export type Checkout = {
    [index: string]: string | number | {};
    serial: string;
    book_id: string;
    member_id: string;
    borrowed_date: string;
    return_date: string;
    status: "borrowed" | "returned";
};
