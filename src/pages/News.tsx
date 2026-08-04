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





    if (loading) {

        return (

            <section className="pp-panel">

                <h1 className="pp-title">
                    📰 PulsePlay News
                </h1>

                <p>
                    Loading latest news...
                </p>

            </section>

        );

    }





    return (

        <section className="pp-panel">

            <h1 className="pp-title">
                📰 PulsePlay News
            </h1>

            <p className="mb-6">
                The latest AI-powered gaming news from PulsePlay.
            </p>



            {
                error &&

                <p className="text-red-400">
                    {error}
                </p>

            }



            {
                articles.length === 0

                    ?

                    <div className="pp-card">

                        <h2>
                            No published articles yet.
                        </h2>

                        <p>
                            Check back soon for new gaming news.
                        </p>

                    </div>

                    :

                    articles.map(article => (

                        <article
                            key={article.id}
                            className="pp-card"
                        >

                            <h2>
                                {article.title}
                            </h2>

                            <p>
                                {article.excerpt}
                            </p>

                            <p>

                                <strong>
                                    {article.category}
                                </strong>

                                {" • "}

                                {article.author}

                            </p>

                            <Link
                                to={`/news/${article.slug}`}
                                className="pp-button"
                            >
                                Read Article →
                            </Link>

                        </article>

                    ))

            }

        </section>

    );

}