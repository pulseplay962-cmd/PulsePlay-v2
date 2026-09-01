import { useState } from "react";

import BrandCard from "../components/ui/BrandCard";
import BrandButton from "../components/ui/BrandButton";

import {
    submitFeedback
} from "../services/feedback";



export default function Feedback(){


    const [name,setName] =
        useState("");

    const [email,setEmail] =
        useState("");

    const [rating,setRating] =
        useState(5);

    const [category,setCategory] =
        useState("Website");

    const [message,setMessage] =
        useState("");

    const [submitted,setSubmitted] =
        useState(false);

    const [loading,setLoading] =
        useState(false);

    const [error,setError] =
        useState("");




    async function handleSubmit(
        e:React.FormEvent
    ){

        e.preventDefault();

        setLoading(true);
        setError("");

        try{


            await submitFeedback({

                name,
                email,
                rating,
                category,
                message

            });


            setSubmitted(true);


            setName("");
            setEmail("");
            setRating(5);
            setCategory("Website");
            setMessage("");


        }
        catch(err:any){

            console.error(
                "Feedback error:",
                err
            );


            setError(
                err.message ||
                "Unable to submit feedback."
            );

        }
        finally{

            setLoading(false);

        }

    }




    return (

        <main className="
            px-6
            py-20
            max-w-4xl
            mx-auto
        ">


            <section className="
                text-center
                mb-12
            ">


                <div className="
                    inline-flex
                    px-5
                    py-2
                    rounded-full
                    pp-hud
                    text-cyan-300
                    text-sm
                    font-black
                    tracking-widest
                ">

                    ⚡ PLAYER FEEDBACK TERMINAL

                </div>



                <h1 className="
                    mt-8
                    text-5xl
                    font-black
                    pp-gradient-text
                ">

                    HELP US LEVEL UP

                </h1>



                <p className="
                    mt-4
                    text-slate-400
                ">

                    Tell us what you think about PulsePlay.
                    Your feedback helps improve the experience.

                </p>


            </section>





            <BrandCard>


                {
                    submitted ?

                    (

                        <div className="
                            text-center
                            py-10
                        ">

                            <h2 className="
                                text-3xl
                                font-black
                                text-green-400
                            ">

                                ✅ FEEDBACK RECEIVED

                            </h2>


                            <p className="
                                mt-4
                                text-slate-400
                            ">

                                Thanks for helping improve PulsePlay.

                            </p>


                        </div>

                    )

                    :

                    (

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        <input

                            className="
                                w-full
                                rounded-lg
                                bg-black/40
                                p-3
                            "

                            placeholder="Name (optional)"

                            value={name}

                            onChange={(e)=>
                                setName(e.target.value)
                            }

                        />



                        <input

                            className="
                                w-full
                                rounded-lg
                                bg-black/40
                                p-3
                            "

                            placeholder="Email (optional)"

                            value={email}

                            onChange={(e)=>
                                setEmail(e.target.value)
                            }

                        />




                        <select

                            className="
                                w-full
                                rounded-lg
                                bg-black/40
                                p-3
                            "

                            value={category}

                            onChange={(e)=>
                                setCategory(e.target.value)
                            }

                        >

                            <option>
                                Website
                            </option>

                            <option>
                                Store
                            </option>

                            <option>
                                News
                            </option>

                            <option>
                                Streams
                            </option>

                            <option>
                                Community
                            </option>

                            <option>
                                Other
                            </option>


                        </select>





                        <div>

                            <p className="
                                mb-2
                                text-slate-400
                            ">

                                Rating

                            </p>


                            <select

                                className="
                                    rounded-lg
                                    bg-black/40
                                    p-3
                                "

                                value={rating}

                                onChange={(e)=>
                                    setRating(
                                        Number(e.target.value)
                                    )
                                }

                            >

                                <option value="5">
                                    ⭐⭐⭐⭐⭐
                                </option>

                                <option value="4">
                                    ⭐⭐⭐⭐
                                </option>

                                <option value="3">
                                    ⭐⭐⭐
                                </option>

                                <option value="2">
                                    ⭐⭐
                                </option>

                                <option value="1">
                                    ⭐
                                </option>


                            </select>


                        </div>





                        <textarea

                            className="
                                w-full
                                h-40
                                rounded-lg
                                bg-black/40
                                p-3
                            "

                            placeholder="Tell us what you think..."

                            value={message}

                            onChange={(e)=>
                                setMessage(e.target.value)
                            }

                            required

                        />





                        {
                            error &&

                            <p className="
                                text-red-400
                            ">

                                {error}

                            </p>

                        }





                        <BrandButton
                            type="submit"
                            disabled={loading}
>

                            {
                                loading
                                ?
                                "TRANSMITTING..."
                                :
                                "SEND FEEDBACK"
                            }

                        </BrandButton>



                    </form>

                    )

                }


            </BrandCard>


        </main>

    );

}