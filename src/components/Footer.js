import React from "react";
import { FaSpotify } from 'react-icons/fa'
import styled from "styled-components";

const FooterStyles = styled.footer`
p {
  text-align:center;
}
svg {
  display:inline-block;
}
`

export default function Footer(){
  return (
    <FooterStyles>
      <div className="wrapper">
        <p>&copy; { new Date().toLocaleString('en-US', { month: 'short' }) } { new Date().getFullYear()}. Built by Corey Hamat. Made with data from the <FaSpotify /> <a href="https://developer.spotify.com/" target="_blank" rel="noopener noreferrer">Spotify API</a></p>
      </div>
    </FooterStyles>
  )
}