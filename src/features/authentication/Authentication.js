import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from "../user/userSlice";

import { setIsLoggedIn, setAccessToken, loggedIn } from "./authenticationSlice";

import { getAuthorizeHref } from "../../utils/configAuth";

import { getHashParams, removeHashParams } from "../../utils/getHash";
import styled from "styled-components";

const hashParams = getHashParams();
const access_token = hashParams.access_token;
removeHashParams();

const AuthenticationSection = styled.section`
    margin:0 auto;
    margin-top:100px;
    padding:50px;
    max-width:500px;
    border:dashed var(--green) 5px;
    box-shadow:5px 5px 5px #000;
    text-align:center;
`

export function Authentication(){
    const isLoggedIn = useSelector(loggedIn)
    const dispatch = useDispatch();
    useEffect(() => {
        if(access_token){
            dispatch(setIsLoggedIn(true));
            dispatch(setAccessToken(access_token));
            dispatch(fetchUser(access_token))
        }
    }, [dispatch])
    return (
        <>
        {!isLoggedIn && (
            <AuthenticationSection>
                <p>This application uses the <a href="https://developer.spotify.com">Spotify API</a> to gather information about the queried songs & bands/artists. Please log in to Spotify to proceed.</p>
                <button
                aria-label="Connect to Spotify"
                className="cta"
                onClick={() => window.open(getAuthorizeHref(), '_self')}>
                Connect to Spotify
                </button>
            </AuthenticationSection>
        )}
        </>
    )
}