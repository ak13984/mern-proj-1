import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'

const UserPlaces = (props) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const { userId } = useParams();
    const [loadedPlaces, setLoadedPlaces] = useState()

    useEffect(() => {
        const getPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places)
            } catch (e) {

            }
        }
        getPlaces();
    }, [sendRequest, userId])

    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces(places => places.filter(place => place.id !== deletedPlaceId))
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center">
             <LoadingSpinner/>
            </div>}
            {!isLoading && loadedPlaces && 
            <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}></PlaceList>}
        </React.Fragment>
    )

}

export default UserPlaces