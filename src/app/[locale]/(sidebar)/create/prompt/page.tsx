import {OpenAIChat} from "@/components/llm/OpenAiChat";

import React from "react";

export default function Page() {
    return (
        <>
            <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-200">
                With Open AI
            </h3>
            <OpenAIChat/>
        </>
    )
}