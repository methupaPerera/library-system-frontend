"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const [inputType, setType] = useState<"password" | "text">("password");
        return (
            <>
                <div className="relative">
                    <input
                        type={type === "password" ? inputType : type}
                        className={cn(
                            "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    
                    {/* Added the visibility button for the password fields. */}
                    <div className="text-muted-foreground absolute right-3 top-3 cursor-pointer">
                        {type === "password" ? (
                            inputType === "password" ? (
                                <EyeIcon onClick={() => setType("text")} />
                            ) : (
                                <EyeOffIcon
                                    onClick={() => setType("password")}
                                />
                            )
                        ) : null}
                    </div>
                </div>
            </>
        );
    }
);
Input.displayName = "Input";

export { Input };
