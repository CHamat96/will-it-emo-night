import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setArtistID, setSelectionMade, setSubmission, setTrackID, selectSubmission } from "../features/trackSearch/trackSearchSlice"
import useFetch from "../hooks/useFetch"

const genre_array = ['pop-punk', "pop-punk", 'emo', 'alternative-rock', 'metalcore', 'hardcore', 'punk', 'nu-metal', 'screamo', 'metal', 'post-punk', 'folk', 'funk', 'garage', 'pop', 'rock', 'alt-rock', 'punk-rock', "midwest emo", "midwest-emo", "modern-rock"]


export default function RandomButton({ message }){
  const [random, setRandom] = useState(null)
  const [genre, setGenre] = useState('pop-punk')
  const dispatch = useDispatch()
  const { data: randomData, loading: randomLoading, error: randomError } = useFetch('search', `genre:${genre}`)
  const currentSong = useSelector(selectSubmission)

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
    // Ensure there will always be a different song selected when clicking the random button
    if(filteredSongs[index].id !== currentSong.id) {
      handleSubmission(e, filteredSongs[index])
    } else {
      handleSubmission(e, filteredSongs[index + 1])
    }
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