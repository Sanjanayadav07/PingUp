import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import ChatBox from './pages/ChatBox'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import { useUser, useAuth } from '@clerk/clerk-react'
import Layout from './pages/Layout'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from './features/user/userSlice.js'
import { fetchConnections } from './features/connections/connectionsSlice.js'
import { useRef } from 'react'
import { addMessages } from './features/messages/messagesSlice.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    const fetchData = async (token) => {
      if (user) {
        const token = await getToken()
        dispatch(fetchUser(token))
        dispatch(fetchConnections(token))
      }
    }
    fetchData()
  }, [user, getToken, dispatch])

  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])
  /*
     useEffect(()=> {
      if (user) {
        const eventSource = new EventSource(import.meta.env.VITE_BASEURL + '/api/messages/' + user.id);
        eventSource.onmessage =(event) => {
          const message = JSON.parse(event.data)
          if (pathnameRef.current === ('/messages/' + message.from_user_id._id)) {
            dispatch(addMessages(message));
          } else {
              toast.custom(
              (t) => <Notification t={t} message={message} />,
              { position: "bottom-right" }
            );
          }
        }
      }
      
     },[user,dispatch ])
  */

  const sseRef = useRef(null);

  useEffect(() => {
    if (!user?.id || sseRef.current) return; // don't create multiple connections

    const eventSource = new EventSource(`${import.meta.env.VITE_BASEURL}/api/messages/${user.id}`);
    sseRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // handle messages...
        if (pathnameRef.current === ('/messages/' + message.from_user_id._id)) {
           dispatch(addMessages(message));
        }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
      sseRef.current = null;
    };

    return () => {
      eventSource.close();
      sseRef.current = null;
    };
  }, [user?.id]);



  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={!user ? <Login /> : <Layout />}>
          {/* Clerk Auth Pages */}
          <Route index element={<Feed />} />
          <Route path='messages' element={<Messages />} />
          <Route path='messages/:userId' element={<ChatBox />} />
          <Route path='connections' element={<Connections />} />
          <Route path='discover' element={<Discover />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:profileId' element={<Profile />} />
          <Route path='create-post' element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
