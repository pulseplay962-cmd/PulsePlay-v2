import { useEffect, useState } from "react";

import {
    getAIContent,
    generateWeeklyContent,
    generateAIImage,
    updateAIContent,
    deleteAIContent,
    type AIContentItem,
} from "../../services/aiContent";


export default function AIContentStudio() {

    const [content, setContent] =
        useState<AIContentItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [generating, setGenerating] =
        useState(false);

    const [generatingImage, setGeneratingImage] =
        useState<string | null>(null);

    const [publishing, setPublishing] =
        useState<string | null>(null);

    const [error, setError] =
        useState("");


    // =====================================
    // Load AI Content
    // =====================================

    async function loadContent() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAIContent();

            setContent(data);

        } catch (error: any) {

            console.error(
                "Loading AI content failed:",
                error
            );

            setError(
                error.message ||
                "Failed loading AI content"
            );

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadContent();

    }, []);


    // =====================================
    // Generate Weekly Content
    // =====================================

    async function handleGenerate() {

        try {

            setGenerating(true);
            setError("");

            await generateWeeklyContent();

            await loadContent();

        } catch (error: any) {

            console.error(
                "AI generation failed:",
                error
            );

            setError(
                error.message ||
                "AI generation failed"
            );

        } finally {

            setGenerating(false);

        }

    }


    // =====================================
    // Generate Image
    // =====================================

    async function handleGenerateImage(
        id: string
    ) {

        try {

            console.log(
                "IMAGE BUTTON CLICKED:",
                id
            );

            setGeneratingImage(id);
            setError("");

            const updatedItem =
                await generateAIImage(id);

            console.log(
                "GENERATED IMAGE ITEM:",
                updatedItem
            );


            // Update only the item that
            // generated the image.

            setContent(
                currentContent =>
                    currentContent.map(item =>
                        item.id === id
                            ? updatedItem
                            : item
                    )
            );

        } catch (error: any) {

            console.error(
                "Image generation failed:",
                error
            );

            setError(
                error.message ||
                "Failed generating AI image"
            );

        } finally {

            setGeneratingImage(null);

        }

    }


    // =====================================
    // Approve Post
    // =====================================

    async function approvePost(
        id: string
    ) {

        try {

            await updateAIContent(

                id,

                {
                    status: "approved"
                }

            );

            await loadContent();

        } catch (error: any) {

            console.error(
                "Approve failed:",
                error
            );

            setError(
                error.message ||
                "Failed approving content"
            );

        }

    }


    // =====================================
    // Publish Post
    // =====================================

    async function publishPost(
        id: string
    ) {

        try {

            setPublishing(id);

            setError("");

            const response =
                await fetch(
                    `http://localhost:5000/api/ai/publish/${id}`,
                    {
                        method: "POST"
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    "Publishing failed"
                );

            }


            await loadContent();

        } catch (error: any) {

            console.error(
                "Publish failed:",
                error
            );

            setError(
                error.message ||
                "Publishing failed"
            );

        } finally {

            setPublishing(null);

        }

    }


    // =====================================
    // Delete Post
    // =====================================

    async function removePost(
        id: string
    ) {

        try {

            setError("");

            await deleteAIContent(id);

            await loadContent();

        } catch (error: any) {

            console.error(
                "Delete failed:",
                error
            );

            setError(
                error.message ||
                "Failed deleting content"
            );

        }

    }


    // =====================================
    // Status Style
    // =====================================

    function statusStyle(
        status: string
    ) {

        switch (status) {

            case "published":

                return "bg-green-500/20 text-green-300";


            case "approved":

                return "bg-blue-500/20 text-blue-300";


            default:

                return "bg-yellow-500/20 text-yellow-300";

        }

    }


    // =====================================
    // Render
    // =====================================

    return (

        <div className="space-y-6">


            {/* =================================
                Header
            ================================= */}

            <div className="pp-panel p-6">

                <h1 className="pp-title text-3xl">

                    🤖 PulsePlay AI Content Studio

                </h1>


                <p className="mt-3 text-slate-400">

                    Generate, review, approve, and
                    publish your weekly gaming content.

                </p>


                <div className="flex gap-3 mt-5">

                    <button

                        onClick={handleGenerate}

                        disabled={generating}

                        className="
                            pp-button
                            disabled:opacity-50
                        "

                    >

                        {

                            generating

                                ? "Generating..."

                                : "🚀 Generate Weekly Content"

                        }

                    </button>


                    <button

                        onClick={loadContent}

                        className="
                            rounded-xl
                            border
                            border-white/10
                            px-4
                            py-2
                        "

                    >

                        🔄 Refresh

                    </button>

                </div>

            </div>


            {/* =================================
                Error
            ================================= */}

            {error && (

                <div className="
                    pp-panel
                    border
                    border-red-500/40
                    text-red-300
                    p-5
                ">

                    {error}

                </div>

            )}


            {/* =================================
                Content
            ================================= */}

            {

                loading ? (

                    <div className="pp-panel p-6">

                        Loading AI Content...

                    </div>

                ) : content.length === 0 ? (

                    <div className="
                        pp-panel
                        p-6
                        text-slate-400
                    ">

                        No AI content yet.

                    </div>

                ) : (

                    <div className="grid gap-6">

                        {

                            content.map(item => (

                                <div

                                    key={item.id}

                                    className="
                                        pp-panel
                                        p-6
                                    "

                                >


                                    {/* =============================
                                        Header
                                    ============================= */}

                                    <div className="
                                        flex
                                        justify-between
                                        gap-4
                                    ">


                                        <div>

                                            <h2 className="
                                                text-xl
                                                font-bold
                                            ">

                                                {item.title}

                                            </h2>


                                            <p className="
                                                text-sm
                                                text-slate-400
                                            ">

                                                {item.category}

                                                {" • "}

                                                {item.content_type}

                                                {" • "}

                                                📅

                                                {" "}

                                                {item.scheduled_date}

                                            </p>

                                        </div>


                                        <span

                                            className={`
                                                rounded-lg
                                                px-3
                                                py-1
                                                text-sm
                                                ${statusStyle(
                                                    item.status
                                                )}
                                            `}

                                        >

                                            {item.status}

                                        </span>

                                    </div>


                                    {/* =============================
                                        Body
                                    ============================= */}

                                    <p className="
                                        mt-5
                                        text-slate-300
                                    ">

                                        {item.body}

                                    </p>


                                    {/* =============================
                                        Social Content
                                    ============================= */}

                                    <details className="mt-5">

                                        <summary className="
                                            cursor-pointer
                                            text-cyan-400
                                        ">

                                            View Social Content

                                        </summary>


                                        <p className="mt-3">

                                            {item.social_caption}

                                        </p>


                                        <p className="
                                            mt-4
                                            text-sm
                                            text-slate-500
                                        ">

                                            Image Prompt:

                                            <br />

                                            {item.image_prompt}

                                        </p>

                                    </details>


                                    {/* =============================
                                        Generated Image
                                    ============================= */}

                                    {

                                        item.image_url && (

                                            <div className="mt-6">

                                                <p className="
                                                    mb-3
                                                    text-sm
                                                    text-slate-400
                                                ">

                                                    Generated Image

                                                </p>


                                                <img

                                                    src={item.image_url}

                                                    alt={
                                                        item.title ||
                                                        "AI generated image"
                                                    }

                                                    className="
                                                        w-full
                                                        max-w-3xl
                                                        rounded-xl
                                                        border
                                                        border-white/10
                                                    "

                                                />

                                            </div>

                                        )

                                    }


                                    {/* =============================
                                        Actions
                                    ============================= */}

                                    <div className="
                                        flex
                                        flex-wrap
                                        gap-3
                                        mt-6
                                    ">


                                        {/* Generate Image */}

                                        <button

                                            className="
                                                rounded-xl
                                                bg-purple-500/20
                                                px-4
                                                py-2
                                                text-purple-300
                                                hover:bg-purple-500/30
                                                disabled:opacity-50
                                            "

                                            disabled={
                                                generatingImage ===
                                                item.id
                                            }

                                            onClick={() =>
                                                handleGenerateImage(
                                                    item.id
                                                )
                                            }

                                        >

                                            {

                                                generatingImage ===
                                                item.id

                                                    ? "Generating Image..."

                                                    : "🖼 Generate Image"

                                            }

                                        </button>


                                        {/* Approve */}

                                        <button

                                            className="pp-button"

                                            onClick={() =>
                                                approvePost(
                                                    item.id
                                                )
                                            }

                                        >

                                            ✅ Approve

                                        </button>


                                        {/* Publish */}

                                        <button

                                            className="
                                                rounded-xl
                                                bg-green-500/20
                                                px-4
                                                py-2
                                                text-green-300
                                                disabled:opacity-50
                                            "

                                            disabled={
                                                publishing ===
                                                item.id
                                            }

                                            onClick={() =>
                                                publishPost(
                                                    item.id
                                                )
                                            }

                                        >

                                            {

                                                publishing ===
                                                item.id

                                                    ? "Publishing..."

                                                    : "🚀 Publish"

                                            }

                                        </button>


                                        {/* Delete */}

                                        <button

                                            className="
                                                rounded-xl
                                                bg-red-500/20
                                                px-4
                                                py-2
                                                text-red-300
                                            "

                                            onClick={() =>
                                                removePost(
                                                    item.id
                                                )
                                            }

                                        >

                                            🗑 Delete

                                        </button>


                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}
