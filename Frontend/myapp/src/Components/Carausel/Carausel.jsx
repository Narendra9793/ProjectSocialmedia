import "./Carausel.css";

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function Carausel({posts}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  function handleCarousel() {
    console.log("Handling carousel");
    var elements = document.getElementsByClassName("post_veiwer");
    for (var i = 0; i < elements.length; i++) {
      var ele = elements[i];
      if (ele.style.display === "block" || ele.style.display === "") {
        ele.style.display = "none";
      } else {
        ele.style.display = "block";
      }
    }
  }

  return (
    <>
      <div className="carousalDiv">
        <div className="bigSwiper">
        <button id="carousalButton"  onClick={handleCarousel}>close X</button>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >

       {posts.map((post) => (          
                        <div key={post.postId} className="post-wrapper">
                          {(post.postImageUrl.endsWith(".mp4") )
                           ? 
                        (
                        //<Post_video url={post.postImageUrl} description={post.postDescription} id={post.postId} Token={localStorage.getItem('token')} deleteItem={DeleteItem}/>
                            <SwiperSlide>
                                <video className="PostVideo" id="PostVideo" controls  >
                                    <source src={post.postImageUrl} type="video/mp4"/>
                                </video>
                            </SwiperSlide>
                        )
                           :
                         (
                         //<Post url={post.postImageUrl} description={post.postDescription} id={post.postId} Token={localStorage.getItem('token')} deleteItem={DeleteItem} />
                           <SwiperSlide>
                           <img src={post.postImageUrl} alt="Nature 1" />
                         </SwiperSlide>
                           )
                          }
                          
                        </div>                            
        ))}

        
      </Swiper>

        </div>
        <div className="smallSwiper">
        <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={8}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
              {posts.map((post) => (          
                        <div key={post.postId} className="post-wrapper">
                          {(post.postImageUrl.endsWith(".mp4") )
                           ? 
                            (
                            //<Post_video url={post.postImageUrl} description={post.postDescription} id={post.postId} Token={localStorage.getItem('token')} deleteItem={DeleteItem}/>
                                <SwiperSlide>
                                    <video className="PostVideo" id="PostVideo" muted >
                                        <source src={post.postImageUrl} type="video/mp4"/>
                                    </video>
                                </SwiperSlide>
                            )
                           :
                            (
                            //<Post url={post.postImageUrl} description={post.postDescription} id={post.postId} Token={localStorage.getItem('token')} deleteItem={DeleteItem} />
                            <SwiperSlide>
                             <img src={post.postImageUrl} alt="Nature 1" />
                            </SwiperSlide>
                            )
                          }
                          
                        </div>                            
        ))}
      </Swiper>
        </div>
      </div>
    </>
  );
}
