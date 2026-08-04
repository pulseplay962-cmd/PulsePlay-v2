import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getPublishedNews,
    type NewsArticle
} from "../services/news";


export default function News() {

    const [articles, setArticles] =
        useState<NewsArticle[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadNews() {

            try {

                const data =
                    await getPublishedNews();

                setArticles(data);

            }
            catch (err) {

                console.error(err);

                setError(
                    "Unable to load news."
                );

            }
            finally {

                setLoading(false);

            }

        }

        loadNews();

    }, []);



    return (

        <main className="space-y-12">

            <section className="text-center">

                <div
                    className="
                    inline-flex
                    items-center
                    gap-3
                    px-5
                    py-2
                    rounded-full
                    pp-hud
                    text-cyan-300
                    text-sm
                    font-black
                    tracking-[0.35em]
                    "
                >
                    📰 NEWS DATABASE ONLINE
                </div>


                <h1
                    className="
                    mt-8
                    text-5xl
                    md:text-7xl
                    font-black
                    pp-gradient-text
                    "
                >
                    PULSEPLAY NEWS
                </h1>


                <p
                    className="
                    mt-5
                    max-w-3xl
                    mx-auto
                    text-lg
                    text-slate-400
                    "
                >
                    The latest AI-powered gaming news,
                    updates, reviews, and community stories.
                </p>

            </section>



            {
                loading &&

                <div className="pp-card-surface p-8">

                    Loading latest news...

                </div>

            }



            {
                error &&

                <div className="text-red-400">

                    {error}

                </div>

            }



            {
                !loading &&
                articles.length === 0 &&

                <div className="pp-card-surface p-8">

                    <h2 className="text-2xl font-black">
                        No published articles yet.
                    </h2>

                    <p className="mt-3 text-slate-400">
                        Check back soon for new gaming news.
                    </p>

                </div>

            }



            {
                articles.length > 0 &&

                <section
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                    "
                >

                    {
                        articles.map(article => (

                            <article
                                key={article.id}
                                className="
                                pp-card-surface
                                overflow-hidden
                                group
                                "
                            >

                                {
                                    article.image &&

                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="
                                        h-56
                                        w-full
                                        object-cover
                                        transition
                                        duration-500
                                        group-hover:scale-105
                                        "
                                    />

                                }


                                <div className="p-6">

                                    <span
                                        className="
                                        inline-flex
                                        rounded-full
                                        bg-purple-500/20
                                        border
                                        border-purple-400/30
                                        px-3
                                        py-1
                                        text-xs
                                        font-black
                                        tracking-widest
                                        text-purple-300
                                        "
                                    >
                                        {article.category}
                                    </span>


                                    <h2
                                        className="
                                        mt-5
                                        text-2xl
                                        font-black
                                        "
                                    >
                                        {article.title}
                                    </h2>


                                    <p
                                        className="
                                        mt-3
                                        text-slate-400
                                        leading-relaxed
                                        "
                                    >
                                        {article.excerpt}
                                    </p>


                                    <p
                                        className="
                                        mt-4
                                        text-sm
                                        text-slate-500
                                        "
                                    >
                                        By {article.author}
                                    </p>


                                    <Link
                                        to={`/news/${article.slug}`}
                                        className="
                                        inline-block
                                        mt-6
                                        pp-button
                                        "
                                    >
                                        Read Article →
                                    </Link>

                                </div>

                            </article>

                        ))
                    }

                </section>

            }

        </main>

    );

}