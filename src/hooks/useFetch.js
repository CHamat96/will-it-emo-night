import { useState, useEffect } from 'react'
import { accessToken } from '../features/authentication/authenticationSlice'
import { useSelector } from 'react-redux'

export default function useFetch(endpoint, query, offsetNum){

    // Declare default "data/loading/error" states
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    // select access token
    const token = useSelector(accessToken)

    useEffect(() => {
        // reset data/err/load states 
        setData(null)
        setLoading(true)
        setError(null);

        // Make Spotify API Call in async function
        const fetchData = async() => {
            const url = new URL(`https://api.spotify.com/v1/${endpoint}`)
            // depending on the endpoint, declare new URLSearchParams
        switch (endpoint) {
            case "search": 
            url.search = new URLSearchParams({
                q: query,
                type:'track',
                // if an "offsetNum" param is declared, use that value. If not, use "0"
                offset: offsetNum || 0
            })
            break;
            default:
            break;
        }
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!response.ok){
                setLoading(false)
                throw new Error(`${response.status}: ${response.statusText}`)
            }
            const apiData = await response.json()
            if(apiData){
                setData(apiData);
                setLoading(false);
            }
        }
        fetchData()
        .catch((err) => {
            setError(`${err}`)
        })
    },[endpoint, query, offsetNum, token])
    
    return { data, loading, error }
}