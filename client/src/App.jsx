import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import MessagesList from './components/MessagesList'
import Messages from './pages/Messages'
import Bookmarks from './pages/Bookmarks'
import Profile from './pages/Profile'
import SinglePost from './pages/SinglePost'
import Login from './pages/Login'
import Register from './pages/Register'
import LogOut from './pages/LogOut'

const router = createBrowserRouter([
  {
    path: "/", element: <RootLayout />, errorElement: <ErrorPage />, children: [
      { index: true, element: <Home /> },
      { path: "messages", element: <MessagesList /> },
      { path: "messages/:receiverId", element: <Messages /> },
      { path: "bookmarks", element: <Bookmarks /> },
      { path: "users/:id", element: <Profile /> },
      { path: "posts/:id", element: <SinglePost /> }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/logout", element: <LogOut /> }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App