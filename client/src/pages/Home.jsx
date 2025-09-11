import React, { useEffect } from 'react'
import CreatePost from '../components/CreatePost'
import { useSelector } from 'react-redux'
import { createPostService, getAllPostsService } from '../services'
import Feeds from '../components/Feeds'


const Home = () => {
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const createPost = async (data) => {
        setError("")
        try {
            const response = await createPostService(data)
            console.log("Post created successfully:", response)
            const newPost = response?.data
            setPosts([newPost, ...posts])
        } catch (error) {
            setError(error?.response?.data?.message || error.message)
        }
    }

    const getPosts = async () => {
        setLoading(true)
        try {
            const res = await getAllPostsService()
            setPosts(res?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPosts()
    }, [setPosts])

    console.log("posts", posts);

    return (
        <section className="mainArea">
            <CreatePost onCreatePost={createPost} error={error} />
            <Feeds />
        </section>
    )
}

export default Home