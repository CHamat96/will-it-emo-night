import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setArtistID, setSelectionMade, setSubmission, setTrackID } from "../features/trackSearch/trackSearchSlice"
import useFetch from "../hooks/useFetch"

const genre_array = ['pop punk', 'emo', 'alternative', 'metalcore', 'hardcore', 'punk', 'nu metal', 'screamo', 'metal', 'post', 'riot grrrl', 'Folk', 'Funk', 'Garage Rock', 'New Wave', 'pop', 'rock', 'midwest emo', 'k-pop']


export default function RandomButton({ message }){
  const [random, setRandom] = useState(null)
  const [genre, setGenre] = useState(null)
  const dispatch = useDispatch()

  const { data: randomData, loading: randomLoading, error: randomError } = useFetch('search', `genre:${genre || 'pop-punk'}`)

  useEffect(() => {
    if(!randomLoading && randomData) {
      let tracks = randomData.tracks.items
      setRandom(tracks)
      setGenre(genre_array[Math.floor(Math.random() * genre_array.length)])
    }
  }, [randomData, randomLoading, randomError])


  const handleRandom = (e) => {
    e.preventDefault();
    const filteredSongs = random.filter((song) => {
      return song.album.album_type !== "compilation"
    })
    const index = Math.floor(Math.random() * filteredSongs.length)
    handleSubmission(e, filteredSongs[index])
  }

  const handleSubmission = (e, song) => {
    e.preventDefault();
    dispatch(setArtistID(song.artists[0].id))
    dispatch(setTrackID(song.id))
    dispatch(setSubmission(song))
    dispatch(setSelectionMade(true))
    if(window.location.pathname === '/results'){
      // When user is on the "results page" on a mobile screen, scroll to the top of the "results" section after clicking the button
      const results = document.querySelector('.queryContainer')
      results.scrollIntoView();
    }
  }
  return (

    <button
    type="button"
    className="cta"
    onClick={handleRandom}>{message}</button>
  )
}