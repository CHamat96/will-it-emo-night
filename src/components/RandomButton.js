import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setArtistID, setSelectionMade, setSubmission, setTrackID } from "../features/trackSearch/trackSearchSlice"
import useFetch from "../hooks/useFetch"

const genre_array = ['pop punk', 'emo', 'alternative', 'metalcore', 'hardcore', 'punk', 'nu metal', 'screamo', 'metal', 'post', 'riot grrrl', 'Folk', 'Funk', 'Garage Rock', 'New Wave', 'pop', 'rock', 'midwest emo']


export default function RandomButton({ message }){
  const [random, setRandom] = useState(null)
  const [genre, setGenre] = useState(null)
  const [rdmOffset, setrdmOffset] = useState(0)
  const dispatch = useDispatch()

  const { data: randomData, loading: randomLoading, error: randomError } = useFetch('search', `genre:${genre || 'pop-punk'}`, rdmOffset)

  useEffect(() => {
    if(!randomLoading && !randomError && randomData) {
      let tracks = randomData.tracks.items
      setRandom(tracks)
      setGenre(genre_array[Math.floor(Math.random() * genre_array.length)])
      setrdmOffset(Math.floor(Math.random() * 50))
    }
  }, [randomData, randomLoading, randomError])


  const handleRandom = (e) => {
    e.preventDefault();
    console.log(genre, rdmOffset)
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

  }
  return (

    <button
    type="button"
    className="cta"
    onClick={handleRandom}>{message}</button>
  )
}