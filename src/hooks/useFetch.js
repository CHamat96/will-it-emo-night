import { useState, useEffect } from 'react'
import { accessToken } from '../features/authentication/authenticationSlice'
import { useSelector } from 'react-redux'

export default function useFetch(endpoint, query, offsetNum){

    // Declare default "data/loading/error" states
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    // select access token
    const token = useSelector(accessToken)

    useEffect(() => {
        // reset data/err/load states 
        setData('')
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
                offset: offsetNum || 0,
                market: "CA",
            })
            break;
            default:
            break;
        }
        // Don't fetch request unless the query is at least 1 letter long
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
                setLoading(false);
                setData(apiData);
            }
        }
        fetchData()
        .catch((err) => {
            setError(`${err}`)
        })
    },[endpoint, offsetNum, token, query])

    return { data, loading, error }
}
