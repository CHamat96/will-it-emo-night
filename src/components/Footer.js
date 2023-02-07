import React from "react";
import { FaSpotify } from 'react-icons/fa'


export default function Footer(){
  return (
    <footer>
      <p>&copy; { new Date().toLocaleString('en-US', { month: 'short' }) } { new Date().getFullYear()}. Made by Corey Hamat. Data from <FaSpotify /> <a href="https://developer.spotify.com/">Spotify API</a> </p>
    </footer>
  )
}