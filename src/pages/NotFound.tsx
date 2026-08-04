import { Link } from "react-router-dom";

import BrandButton from "../components/ui/BrandButton";
import BrandCard from "../components/ui/BrandCard";


export default function NotFound(){


    return (

        <main

        className="
        min-h-[70vh]
        flex
        items-center
        justify-center
        px-6
        "

        >


            <BrandCard

            className="
            max-w-2xl
            w-full
            text-center
            card-hover
            "

            >


                <div

                className="
                inline-flex
                items-center
                gap-3
                px-5
                py-2
                rounded-full
                pp-hud
                text-red-400
                text-sm
                font-black
                tracking-[0.35em]
                "

                >

                    ⚠️ ROUTE LOST

                </div>





                <div

                className="
                mt-8
                text-8xl
                font-black
                pp-gradient-text
                "

                >

                    404

                </div>





                <h1

                className="
                mt-6
                text-4xl
                md:text-5xl
                font-black
                "

                >

                    PAGE NOT FOUND

                </h1>





                <p

                className="
                mt-5
                text-lg
                text-slate-400
                leading-relaxed
                "

                >

                    The requested PulseAI Studio location
                    could not be found.

                    <br />

                    The route may have been removed,
                    renamed, or is not connected yet.

                </p>





                <div

                className="
                mt-8
                grid
                md:grid-cols-3
                gap-4
                "

                >



                    <div className="pp-card-surface p-4">

                        <p className="text-red-400 font-black">
                            ERROR
                        </p>

                        <p className="text-xs text-slate-400">
                            ROUTE UNKNOWN
                        </p>

                    </div>





                    <div className="pp-card-surface p-4">

                        <p className="text-cyan-400 font-black">
                            SYSTEM
                        </p>

                        <p className="text-xs text-slate-400">
                            ONLINE
                        </p>

                    </div>





                    <div className="pp-card-surface p-4">

                        <p className="text-green-400 font-black">
                            STATUS
                        </p>

                        <p className="text-xs text-slate-400">
                            RECOVERABLE
                        </p>

                    </div>



                </div>





                <div

                className="
                mt-8
                flex
                justify-center
                "

                >

                    <Link to="/">

                        <BrandButton>

                            RETURN TO COMMAND CENTER

                        </BrandButton>

                    </Link>

                </div>



            </BrandCard>


        </main>

    );

}