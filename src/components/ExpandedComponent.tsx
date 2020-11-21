import React from 'react'
import { Player } from 'video-react'
import "video-react/dist/video-react.css"

const ExpandedComponent = data => {

	if (data.videoUrl) {
		const videoUrlTiktok = data.videoUrl;
		console.log(videoUrlTiktok)
	}
	else {
		console.log('Video undefined yet')
	}

	return(
			<Player
			    playsInline
			    poster="./logo.svg"
			    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
			/>
		)

	};

export default ExpandedComponent;