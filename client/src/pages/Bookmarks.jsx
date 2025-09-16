import React, { useEffect } from 'react'
import { useState } from 'react'
import { getBookmarksService } from '../services'
import Feed from '../components/Feed'
import FeedSkeleton from "../components/FeedSkeleton"
import HeaderInfo from '../components/HeaderInfo'

const Bookmarks = () => {

  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //get bookmarks of logged user
  const getBookmarks = async () => {
    setIsLoading(true)
    try {
      const res = await getBookmarksService()
      console.log("res:", res?.data)
      setBookmarks(res?.data?.bookmarks)
    } catch (error) {
      console.log(error);

    }
    setIsLoading(false)
  }

  useEffect(() => {
    getBookmarks()
  }, [])

  console.log("bookmarks: ", bookmarks);

  return (
    <section>
      <HeaderInfo text="My Bookmarks" />
      {isLoading ? <FeedSkeleton /> :
        bookmarks?.length < 1 ? <p className="center">No posts bookmarked</p> :
          bookmarks?.map(bookmark => <Feed key={bookmark?._id} post={bookmark} />)}
    </section>
  )
}

export default Bookmarks