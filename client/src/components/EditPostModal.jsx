import React, { useEffect } from 'react'
import { getPostByIdService } from '../services'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uiSliceActions } from '../store/ui-slice'


const EditPostModal = ({ onUpdatePost }) => {

    const editPostId = useSelector(state => state?.ui?.editPostId)
    const dispatch = useDispatch()
    const [body, setBody] = useState("")

    const getPost = async () => {
        try {
            const res = await getPostByIdService(editPostId)
            setBody(res?.data?.body)
        } catch (error) {
            console.log(error);
        }
        console.log(body);
    }

    const updatePost = async () => {
        const postData = new FormData()
        postData.set("body", body)
        await onUpdatePost(editPostId, postData)
        dispatch(uiSliceActions?.closeEditPostModal())
    }

    const closeEditPostModal = (e) => {
        if (e.target.classList.contains("editPost")) {
            dispatch(uiSliceActions?.closeEditPostModal())
        }
    }

    useEffect(() => {
        getPost()
    }, [])


    return (
        <form className="editPost" onSubmit={updatePost} onClick={closeEditPostModal}>
            <div className="editPost__container">
                <textarea value={body} onChange={(e) => setBody(e.target.value)}
                    placeholder="What' s on your mind?" autoFocus />
                <button type='submit' className='btn primary'>Update Post</button>
            </div>
        </form>
    )

}

export default EditPostModal