import React from 'react';
import { Player } from 'video-react';

const url = 'https://res.cloudinary.com/damskgabj/video/upload/v1648853975/binarch11/videos/'


function VideoPlayer (props) {
    console.log("Props:")
    console.log(props)
  return (
    <Player
      playsInline
      poster={props.image}
      src={url + props.video}
      autoPlay
    />
  );
};

export default VideoPlayer;