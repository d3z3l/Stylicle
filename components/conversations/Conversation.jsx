import axios from "axios";
import { useEffect, useState } from "react";
import AuthHelper from "../../Helpers/AuthHelper";
import config from "../../config";

// import "./conversation.css";
export default function Conversation({ conversation, currentUser,onPress }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        AuthHelper.Get_by_id(friendId).then((resp)=>{
          setUser(resp.data.data.user);
        })
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  const hendalClick = async (id,i) => {
    let user_prof={
      image:user?.image,
      name:user?.name
    }
    onPress(conversation,user_prof)
  };

  return (
    <>
    <li  onClick={()=> hendalClick(conversation,user?.image)} >
        <a href="#" class="block flex items-center py-3 px-4 space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="w-12 h-12 rounded-full relative flex-shrink-0">
                <img 
                 src={
                  user?.image
                    ? config.image_url + user.image
                    : config.image_url + "person/noAvatar.png"
                } alt="" class="absolute h-full rounded-full w-full"/>
                {/* <span class="absolute bg-green-500 border-2 border-white bottom-0 h-3 m-0.5 right-0 rounded-full shadow-md w-3"></span> */}
            </div>
            <div class="flex-1 min-w-0 relative text-gray-500">
                <h4 class="text-black font-semibold dark:text-white">{user?.name}</h4>
                <span class="absolute right-0 top-1 text-xs">Sun</span>
                <p class="truncate">{user?.email}</p>
            </div>
        </a>
    </li>

   
    </>
  );
}
