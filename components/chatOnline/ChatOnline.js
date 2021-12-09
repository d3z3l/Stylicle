import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config";
import FollowersHelper from "../../Helpers/FollowersHelper";


export default function ChatOnline({ onlineUsers, currentId, setCurrentChat ,unchateduser,onPress}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    

    const getFriends = async () => {
      // const res = await axios.get(config.URL + "users/friends/" + currentId);
      FollowersHelper.Get_by_id().then((resp)=>{
        console.log(resp.data.data.followers);
        setFriends(resp.data.data.followers);
      })
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    console.log(unchateduser.length);
    console.log("unchateduser");
        console.log(friends);
          var users=["613b4e8ee088970644d3afb9"]

    var data2=  onlineUsers.filter((f) => users.some((u) => u === f.follower._id))
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    console.log("onlineUsers");
    console.log(data2);
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const hendalClick = async (id,i) => {
    this.onPress(id,i)
  };

  return (
    <>
     {unchateduser.map((o,index) => (
    <li onClick={()=> onPress(o?.follower._id,index,{name:o?.follower.name,image:o.follower.image})}  >
        <a href="#" id={`unchat${index}`} class="block flex items-center py-3 px-4 space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="w-12 h-12 rounded-full relative flex-shrink-0">
                <img 
                src={
                    o?.follower.image
                      ? config.image_url + o.follower.image
                      : config.image_url + "person/noAvatar.png"
                  }
                 alt="" class="absolute h-full rounded-full w-full"/>
                {/* <span class="absolute bg-green-500 border-2 border-white bottom-0 h-3 m-0.5 right-0 rounded-full shadow-md w-3"></span> */}
            </div>
            <div class="flex-1 min-w-0 relative text-gray-500">
                <h4 class="text-black font-semibold dark:text-white">{o?.follower.name}</h4>
                <span class="absolute right-0 top-1 text-xs"></span>
                <p class="truncate">{o?.follower.email}</p>
            </div>
        </a>
    </li>
    ))}
    </>
    
  );
}
