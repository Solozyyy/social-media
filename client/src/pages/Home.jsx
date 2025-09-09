import React from 'react'
import CreatePost from '../components/CreatePost'
import { useSelector } from 'react-redux'
import { createPostService } from '../services'


const Home = () => {
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const toket = useSelector(state => state?.user?.currentUser?.token)

    const createPost = async (data) => {
        setError("")
        try {
            const response = await createPostService(data)
            console.log("Post created successfully:", response)
            setPosts([newPost, ...posts])
        } catch (error) {
            setError(error?.response?.data?.message || error.message)
        }
    }



    return (
        <section className="mainArea">
            <CreatePost onCreatePost={createPost} error={error} />
        </section>
    )
}

export default Home