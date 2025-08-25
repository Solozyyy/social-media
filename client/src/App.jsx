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
import { Provider } from 'react-redux'
import store from './store/store'

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
//streak

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App