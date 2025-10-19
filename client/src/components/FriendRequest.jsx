import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import TrimText from '../helpers/TrimText'
import { FaCheck } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { followUnfollowUserService } from '../services'

const FriendRequest = ({ friend, onFilterFriend }) => {

    const followUser = async () => {
        try {
            const res = await followUnfollowUserService(friend?._id)
            console.log("res: ", res);

            onFilterFriend(friend?._id)
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <article className="friendRequest">
            <div className="friendRequest__info">
                <Link to={`/users/${friend?._id}`}>
                    <ProfileImage image={friend?.profilePhoto} />
                </Link>
                <div className="friendRequest__details">
                    <Link to={`/users/${friend?._id}`} >
                        <h5>{friend?.fullName}</h5>
                    </Link>
                    <small><TrimText item={friend?.email} maxLength={20} /></small>
                </div>

            </div>
            <div className="friendRequest__actions">
                <button className="friendRequest__actions-approve" onClick={followUser}>
                    <FaCheck />
                </button>
                <button className="friendRequest__actions-cancel" onClick={() => onFilterFriend(friend?._id)}>
                    <IoMdClose />
                </button>
            </div>
        </article>
    )
}

export default FriendRequest