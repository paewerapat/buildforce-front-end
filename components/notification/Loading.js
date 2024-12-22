import Lottie from 'lottie-react';
import React from 'react'
import loadingAnimation from '../../data/loadingLottiefile.json'

function Loading() {
    return (
      <div id='background-loading-screen'>
        <span id="background-loading-color">
          <Lottie 
            animationData={loadingAnimation}
            loop={true}
            id='loading-animation-screen'
          />
        </span>
      </div>
    )
}

export default Loading