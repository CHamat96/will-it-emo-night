import React from "react";
import styled from "styled-components";
import { loggedIn } from "../features/authentication/authenticationSlice";
import { isSelectionMade, revertAll } from "../features/trackSearch/trackSearchSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { TrackSearch } from "../features/trackSearch/TrackSearch";

const HeaderStyles = styled.header`
    text-align:center;
    padding:15px;
    h1 {
        margin:0;
    }
    .subtitle {
        font-size:2.5rem;
        font-style:italic;
        margin:0;
        padding:0;
        font-family:var(--subFont);
    }
`

export default function Header(){
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(loggedIn)
    const selectionMade = useSelector(isSelectionMade)
    return (
        <HeaderStyles>
            <div className="wrapper">
                <NavLink to="/" onClick={() => dispatch(revertAll())}>
                    <h1>Will it Emo Night?</h1>
                </NavLink>
                <p className="subtitle">The ultimate Emo-gatekeeping tool!</p>
                {isLoggedIn && selectionMade && 
                <TrackSearch />
                }
            </div>
        </HeaderStyles>
    )
}