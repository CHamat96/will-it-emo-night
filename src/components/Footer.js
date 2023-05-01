import React from "react";
import { FaSpotify } from 'react-icons/fa'
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectToggleMenu } from "../features/playlist/playlistSlice";

const FooterStyles = styled.footer`
p {
  text-align:center;
}
svg {
  display:inline-block;
}
`

export default function Footer(){
  const open = useSelector(selectToggleMenu)

  return (
    <FooterStyles className={!open ? 'mainContent' : 'mainContent blurred'}>
      <div className="wrapper">
        <p>&copy; { new Date().toLocaleString('en-US', { month: 'short' }) } { new Date().getFullYear()}. Built by Corey Hamat. Made with data from the <a className="spotifyLink" href="https://developer.spotify.com/" target="_blank" rel="noopener noreferrer"><FaSpotify /> Spotify API</a></p>
      </div>
    </FooterStyles>
  )
}