import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsersService } from '../services'
import { useEffect } from 'react'
import FriendRequest from './FriendRequest'

const FriendRequests = () => {
    const [friends, setFriends] = useState([])

    const userId = useSelector(state => state?.user?.currentUser?.id)

    const getFriends = async () => {
        try {
            const res = await getUsersService();
            // console.log("res", res?.data);

            const people = await res?.data?.filter(person => {
                if (!person?.followers?.includes(userId) && person?._id !== userId) {
                    return person
                }
            })
            setFriends(people)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getFriends()
    }, [])

    console.log("friends: ", friends);

    const closeFriendBadge = (friendId) => {
        setFriends(friends?.filter(friend => {
            if (friend?._id != friendId) {
                return friend
            }
        }))
    }

    return (
        <menu className="friendRequests">
            <h3>Suggested Friends</h3>
            {
                friends?.map(friend => <FriendRequest key={friend?._id} friend={friend}
                    onFilterFriend={closeFriendBadge} />)
            }
        </menu>
    )
}

export default FriendRequests