// import "./message.css";
import { format } from "timeago.js";
import config from "../../config";

export default function Message({ message, own ,user_prof,recever_prof}) {
  return (
    own?
    (
    <>
    <div class="flex mt-3 pl-3 lg:items-center">
          <div class="w-14 h-14 rounded-full relative flex-shrink-0">
              <img 
              src={
               
                user_prof?.image
                  ? config.image_url + user_prof.image
                  : config.image_url + "person/noAvatar.png"
              }
              alt="" class="absolute h-full rounded-full w-full"/>
          </div>
          <div class="text-gray-700 py-2 px-3 rounded bg-gray-100 h-full relative lg:ml-5 ml-2 lg:mr-20 dark:bg-gray-700 dark:text-white">
              <p class="leading-6">{message.text} </p>
              <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-700"></div>
          </div>
      </div>
      <div class="text-start pl-3" >
        <sub  >{format(message.createdAt)}</sub>
    </div>
    </>
      )
    :(<>
      <div class="flex pr-3 lg:items-center mt-3 flex-row-reverse">
          <div class="w-14 h-14 rounded-full relative flex-shrink-0">
              <img 
              src={
               
                recever_prof?.image
                  ? config.image_url + recever_prof.image
                  : config.image_url + "person/noAvatar.png"
              }
              alt="" class="absolute h-full rounded-full w-full"/>
          </div>
          <div class="text-white py-2 px-3 rounded bg-blue-600 relative h-full lg:mr-5 mr-2 lg:ml-20">
              <p class="leading-6">{message.text} </p> 
              <div class="absolute w-3 h-3 top-3 -right-1 bg-blue-600 transform rotate-45"></div>
          </div>
          
          </div>
          <div class="text-right pr-3" >
            <sub  >{format(message.createdAt)}</sub>
          </div>
          </>
    )
   
  );
}
