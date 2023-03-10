import React from "react";
import styled from "styled-components";
import { loggedIn } from "../features/authentication/authenticationSlice";
import { isSelectionMade } from "../features/trackSearch/trackSearchSlice";
import {  useSelector } from "react-redux";
import { TrackSearch } from "../features/trackSearch/TrackSearch";
import { selectToggleMenu } from "../features/playlist/playlistSlice";

const HeaderStyles = styled.header`
    text-align:center;
    padding: 0px 25px;
    padding-top:100px;
    h1 {
        font-size:clamp(5rem, 2.3vw, 4.5rem);
        padding:0;
        margin:0;
    }
    .subtitle {
        font-size:2.5rem;
        font-style:italic;
        margin:0;
        padding:0;
        font-family:var(--subFont);
    }
    @media screen and (max-width:400px){
        padding: 0px 10px;
        padding-top:100px;
    }
`

export default function Header(){
    const isLoggedIn = useSelector(loggedIn)
    const selectionMade = useSelector(isSelectionMade)
    const open = useSelector(selectToggleMenu)
    return (
        <HeaderStyles
        className={!open ? "mainContent" : 'mainContent blurred'}>
            <div className="wrapper">
                    <h1>Will it Emo Night?</h1>
                    <p className="subtitle">The Ultimate Emo Music Gatekeeping Tool!</p>
                {isLoggedIn && selectionMade && 
                <TrackSearch />
                }
            </div>
        </HeaderStyles>
    )
}