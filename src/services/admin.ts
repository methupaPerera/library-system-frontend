import type {
    AdminProperties,
    CreateMemberInputs,
    CreateMemberReturns,
} from "@/typings/admin-types";

import { Utils } from "./utils";
import { toast } from "sonner";

class Admin extends Utils implements AdminProperties {
    // Links of the api endpoints.
    private createMemberUrl: string;

    constructor(apiUrl: string | undefined) {
        super();

        // Defining routes with the base api url.
        this.createMemberUrl = `${apiUrl}/member`;
    }

    // Creates a new member and returns id and password. ------------
    async submitCreateMember(formData: CreateMemberInputs) {
        const tId = toast.loading("Please wait...");

        try {
            const res = await fetch(this.createMemberUrl, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    Authorization: `Bearer ${this.getAccessTokenCookie()}`,
                    "Content-Type": "application/json",
                },
            });

            const { status, message, data }: CreateMemberReturns =
                await res.json();

            toast.dismiss(tId);

            toast(message);

            if (status === "success") {
                return { status, data };
            }
        } catch (e) {
            toast.dismiss(tId);
            toast("Failed to submit new member data.");
        }
    }
}

const admin = Object.freeze(new Admin(process.env.NEXT_PUBLIC_API_URL));

export default admin;
