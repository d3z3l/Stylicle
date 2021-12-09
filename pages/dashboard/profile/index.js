import React from "react";
import Layout from "../../../components/Dashboard/Layout";

export default class Login extends React.Component {
  componentDidMount = () => {};

  render() {
    return (
      <>
        <Layout>
        <div class="container pro-container m-auto">
                
                <div class="flex lg:flex-row flex-col items-center lg:py-8 lg:space-x-8">

                    <div>
                        <div class="bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full m-0.5 mr-2  w-56 h-56 relative overflow-hidden uk-transition-toggle">  
                            <img src="/images/avatars/avatar-7.jpg" class="bg-gray-200 border-4 border-white rounded-full w-full h-full dark:border-gray-900"/>

                            <div class="absolute -bottom-3 custom-overly1 flex justify-center pt-4 pb-7 space-x-3 text-2xl text-white uk-transition-slide-bottom-medium w-full">
                                <a href="#" class="hover:text-white">
                                    <i class="uil-camera"></i>
                                </a>
                                <a href="#" class="hover:text-white">
                                    <i class="uil-crop-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="lg:w/8/12 flex-1 flex flex-col lg:items-start items-center"> 

                        <h2 class="font-semibold lg:text-2xl text-lg mb-2"> Stella Jonathan</h2>
                        <p class="lg:text-left mb-2 text-center  dark:text-gray-100"> Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet 
                            doming id quod mazim placerat facer possim assum</p>

                            <div class="flex font-semibold mb-3 space-x-2  dark:text-gray-10">
                                <a href="#">Travailing</a> , <a href="#">Sports</a>  , <a href="#">Movies</a> 
                            </div>

                            
                            
 
                    </div>

                    <div class="w-20"></div>

                </div>
              
                <h1 class="lg:text-2xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mt-8"> Highlights </h1>
                
                <div class="my-6 grid lg:grid-cols-5 grid-cols-3 gap-2 hover:text-yellow-700 uk-link-reset">
                    <a href="#">
                        <div class="bg-gray-100 border-4 border-dashed flex flex-col h-full items-center justify-center relative rounded-2xl w-full"> 
                            <i class="text-4xl uil-plus-circle"></i> <span> Add new </span>
                        </div>
                    </a>
                    <a href="#story-modal" uk-toggle>
                        <img src="/images/avatars/avatar-lg-1.jpg" alt="" class="w-full lg:h-60 h-40 rounded-md object-cover"/>
                    </a>
                    <a href="#story-modal" uk-toggle>
                        <img src="/images/post/img2.jpg" alt="" class="w-full lg:h-60 h-40 rounded-md object-cover"/>
                    </a>
                    <a href="#story-modal" uk-toggle>
                        <img src="/images/post/img7.jpg" alt="" class="w-full lg:h-60 h-40 rounded-md object-cover uk-visible@s"/>
                    </a>
                </div>

                <div class="flex items-center justify-between mt-8 space-x-3">
                    <h1 class="flex-1 font-extrabold leading-none lg:text-2xl text-lg text-gray-900 tracking-tight uk-heading-line"><span>Explore</span></h1>
                    <div class="bg-white border border-2 border-gray-300 divide-gray-300 divide-x flex rounded-md shadow-sm dark:bg-gray-100">
                        <a href="#" class="bg-gray300 flex h-10 items-center justify-center  w-10" data-tippy-placement="top" title="Grid view"> <i class="uil-apps"></i></a>
                        <a href="#" class="flex h-10 items-center justify-center w-10" data-tippy-placement="top" title="List view"> <i class="uil-list-ul"></i></a>                        
                    </div>
                </div>

                <div class="my-6 grid lg:grid-cols-4 grid-cols-2 gap-1.5 hover:text-yellow-700 uk-link-reset">
                <div>
                    <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/avatars/avatar-lg-1.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/post/img1.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/post/img2.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/post/img3.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/post/img4.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/post/img5.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/avatars/avatar-1.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                            <img src="/images/avatars/avatar-6.jpg" class="w-full h-full absolute object-cover inset-0"/>

                            <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="heart" class="mr-1"></ion-icon> 150 </a>
                                <a href="#story-modal" uk-toggle class="flex items-center"> <ion-icon name="chatbubble-ellipses" class="mr-1"></ion-icon> 30 </a>
                            </div>

                        </div>
                    </div>
                    
                </div>

                <div class="flex justify-center mt-6">
                    <a href="#" class="bg-white dark:bg-gray-900 font-semibold my-3 px-6 py-2 rounded-full shadow-md dark:bg-gray-800 dark:text-white"> Load more ..</a>
                </div>


            </div>
        </Layout>
      </>
    );
  }
}
