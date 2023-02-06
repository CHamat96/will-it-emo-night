import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { setIsLoggedIn, setAccessToken, loggedIn } from "./authenticationSlice";

import { getAuthorizeHref } from "../../utils/configAuth";

import { getHashParams, removeHashParams } from "../../utils/getHash";

const hashParams = getHashParams();
const access_token = hashParams.access_token;
removeHashParams();

export function Authentication(){
    const isLoggedIn = useSelector(loggedIn)
    const dispatch = useDispatch();
    useEffect(() => {
        if(access_token){
            dispatch(setIsLoggedIn(true));
            dispatch(setAccessToken(access_token));
        }
    }, [dispatch])
    return (
        <>
        {!isLoggedIn && (
            <button
            aria-label="Connect to Spotify"
            className="spotifyButton"
            onClick={() => window.open(getAuthorizeHref(), '_self')}>
            Connect to Spotify
            </button>
        )}
        </>
    )
}