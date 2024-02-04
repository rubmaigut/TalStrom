import Link from "next/link"
import { useEffect } from "react"
import {AiOutlineLoading3Quarters} from 'react-icons/ai'


type VideoItemProps = {
videoItem: Video
sub: string
}

export default function VideoItem ({videoItem, sub} : VideoItemProps) {
    useEffect(() => {
        const video = document.getElementById(`video-${videoItem.id}`) as  HTMLVideoElement

        setTimeout(() => {
            video?.addEventListener('mouseenter', () => video.play())
            video?.addEventListener('mouseleave', () => video.pause())
        }, 50)
    })
    return (
        <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
            {!videoItem.uri ? (
                <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover  rounded-md bg-black">
                    <AiOutlineLoading3Quarters className="animate-spin ml-1" size="80" color="ffffff" />
                </div>
            ) : (
                <Link href={`../player/play/${videoItem.id}`}>
                    <video id={`video-${videoItem.id}`} muted loop 
                    className="aspect=[3/4] object-cover rounded-md" src={videoItem.uri}/>
                </Link>
            )}
        </div>
    )
}