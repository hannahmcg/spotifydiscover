import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import SongList from "./SongList";

function Songs() {

    const {data:session} = useSession();
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body); 
        }).catch((err) => console.log("something went wrong while fetching playlist", err));

    }, [spotifyApi, playlistId]);

    console.log(playlist)


    return (
        <div className="bg-black flex-grow h-screen overflow-y-scroll scrollbar-hide text-white"> 
            <div className="flex items-end space-x-7 p-8 bg-gradient-to-b from-slate-800 to-black">
                <img className="h-44 w-44 shadow-2xl" 
                src={playlist?.images?.[0]?.url}
                alt=""/>
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </div>
            <div>
                <SongList />
            </div>
        </div>
    );

}

export default Songs