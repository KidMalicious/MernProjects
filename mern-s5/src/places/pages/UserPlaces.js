import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://www.findingtheuniverse.com/wp-content/uploads/2020/07/Empire-State-Building-view-from-uptown_by_Laurence-Norah-2.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7476533,
            lng: -73.9859997
        } ,
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://www.findingtheuniverse.com/wp-content/uploads/2020/07/Empire-State-Building-view-from-uptown_by_Laurence-Norah-2.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7476533,
            lng: -73.9859997
        },
        creator: 'u2'
    }
]
const UserPlaces = () => {
    const userId = useParams()
    console.log(userId)
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces
