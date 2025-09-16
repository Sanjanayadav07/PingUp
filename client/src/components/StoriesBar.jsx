import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModal from './StoryModal'
import StoryViewer from './StoryViewer'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const StoriesBar = () => {
  const { getToken } = useAuth()

  const [stories, setStories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [viewStory, setViewStory] = useState(null)

  const fetchStories = async () => {
    try {
      const token = await getToken()
      const { data } = await api.get('/api/story/get', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        // 🔥 Normalize every story
        const normalizedStories = data.stories.map(story => {
          const url = Array.isArray(story.media_url)
            ? story.media_url[0]
            : story.media_url

          let media_type = "text"
          if (url) {
            if (url.match(/\.(mp4|mov|avi|webm)$/i)) {
              media_type = "video"
            } else if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              media_type = "image"
            }
          }

          return { ...story, media_type }
        })

        setStories(normalizedStories)
      } else {
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* Add Story Card */}
        <div
          onClick={() => setShowModal(true)}
          className="rounded-lg shadow-sm min-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create a story
            </p>
          </div>
        </div>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <div
            key={index}
            onClick={() => setViewStory(story)}
            className={`relative rounded-lg shadow min-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden
              ${story.media_type === 'text'
                ? 'bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800'
                : 'bg-gray-200'
              }`}
          >
            {/* Avatar */}
            <img
              src={story.user?.profile_picture}
              alt="user"
              className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
            />

            {/* Text Story */}
            {story.media_type === 'text' && (
              <p className="absolute top-14 left-3 text-white font-medium text-sm truncate max-w-24">
                {story.content}
              </p>
            )}

            {/* Media Story */}
            {story.media_type !== 'text' && story.media_url?.[0] && (
              <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
                {story.media_type === "image" ? (
                  <img
                    src={story.media_url[0]}
                    alt="story media"
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-90"
                  />
                ) : (
                  <video
                    src={story.media_url[0]}
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-90"
                    autoPlay
                    muted
                    loop
                  />
                )}
              </div>
            )}

            {/* Time */}
            <p className="absolute bottom-1 right-2 z-20 text-xs text-white drop-shadow">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>

      {/* Add Story Modal */}
      {showModal && (
        <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
      )}

      {/* View Story Modal */}
      {viewStory && (
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </div>
  )
}

export default StoriesBar



