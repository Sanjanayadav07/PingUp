
import React, { useEffect, useState } from 'react'
import { BadgeCheck, X } from 'lucide-react'

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer, progressInterval

    if (viewStory) {
      if (viewStory.media_type !== "video") {
        setProgress(0)
        const duration = 10000
        const setTime = 100
        let elapsed = 0

        progressInterval = setInterval(() => {
          elapsed += setTime
          setProgress((elapsed / duration) * 100)
        }, setTime)

        timer = setTimeout(() => {
          setViewStory(null)
        }, duration)
      }
    }

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [viewStory, setViewStory])

  const handleClose = () => setViewStory(null)

  if (!viewStory) return null

  const url = Array.isArray(viewStory.media_url)
    ? viewStory.media_url[0]
    : viewStory.media_url

  return (
    <div
      className="fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.background_color || "#000000"
            : "#000000",
      }}
    >
      {/* Progress Bar */}
      {viewStory.media_type !== "video" && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
          <div
            className="h-full bg-white transition-all duration-100 linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* User Info */}
      <div className="absolute left-4 top-4 flex items-center space-x-3 p-2 px-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
        <img
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
          src={viewStory.user?.profile_picture}
          alt={viewStory.user?.full_name}
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name}</span>
          <BadgeCheck size={18} />
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>

      {/* Content */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {viewStory.media_type === "image" && (
          <img src={url} alt="story" className="max-w-full max-h-screen object-contain" />
        )}
        {viewStory.media_type === "video" && (
          <video
            onEnded={() => setViewStory(null)}
            src={url}
            className="max-w-full max-h-screen object-contain"
            controls
            autoPlay
          />
        )}
        {viewStory.media_type === "text" && (
          <div className="flex items-center justify-center h-full w-full text-white text-xl font-semibold text-center px-4">
            {viewStory.content || "NO TEXT"}
          </div>
        )}
      </div>
    </div>
  )
}

export default StoryViewer
