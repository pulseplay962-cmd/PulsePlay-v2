import type { AIContentItem } from "../../services/aiContent";


type AIContentCalendarProps = {

  content: AIContentItem[];

  onSelect?: (
    item: AIContentItem
  ) => void;

};




const days = [

  "Monday",

  "Tuesday",

  "Wednesday",

  "Thursday",

  "Friday",

  "Saturday",

  "Sunday"

];





export default function AIContentCalendar({

  content,

  onSelect

}: AIContentCalendarProps){



  function getDay(date?:string){

    if(!date){

      return "";

    }


    return new Date(date)

      .toLocaleDateString(
        "en-US",
        {
          weekday:"long"
        }
      );

  }






  return (

    <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-7
    gap-4
    ">


      {
        days.map(day=>(


          <div

            key={day}

            className="
            pp-panel
            p-4
            min-h-[220px]
            "

          >



            <h3 className="
            text-cyan-400
            font-black
            tracking-widest
            text-sm
            mb-4
            "

            >

              {day.toUpperCase()}

            </h3>






            {

              content

              .filter(

                item =>

                getDay(
                  item.scheduled_date
                ) === day

              )

              .map(item=>(


                <button

                  key={item.id}

                  onClick={()=>{

                    onSelect?.(
                      item
                    );

                  }}

                  className="
                  w-full
                  text-left
                  rounded-xl
                  bg-black/30
                  p-3
                  mb-3
                  hover:bg-purple-500/20
                  transition
                  "

                >


                  <p className="
                  font-bold
                  text-sm
                  line-clamp-2
                  "

                  >

                    {item.title}

                  </p>



                  <span className="
                  mt-2
                  block
                  text-xs
                  text-slate-400
                  "

                  >

                    {item.status}

                  </span>


                </button>


              ))

            }





          </div>


        ))

      }



    </div>

  );

}