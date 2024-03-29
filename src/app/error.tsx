"use client";

import Image from "next/image";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="mx-auto h-[calc(100vh-3.5rem)] flex flex-col gap-2 items-center justify-center font-bold">
            <h2 className="text-foreground text-3xl">Error. Something went wrong !</h2>

            <button className="underline" onClick={() => reset()}>
                Try again.
            </button>

            <Image
                src="/error.png"
                width={300}
                height={300}
                alt="error image"
                priority
            />
        </div>
    );
}
