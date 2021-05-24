import React from 'react'

import UsersList from '../components/UsersList'
const Users = () => {
    const USERS = [
        {
            id: 'ul',
            name: "Aidan Fredericks",
            image: "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg",
            places: 3
        }
    ]
    return (
        <UsersList items={USERS} />
    )
}

export default Users
