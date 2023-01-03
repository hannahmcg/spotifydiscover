import {useSession, signOut} from "next-auth/react";
import {useEffect, useState} from "react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Link from 'next/link';

function Playlist() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setplaylistId] = useRecoilState(playlistIdState);

    console.log("playlist id is >>", playlistId)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);


    return (
        <div className="h-screen overflow-y-scroll scrollbar-hide bg-black text-white">
            
            <Link href="/" className="p-5">Back to home</Link>
            <div className="p-5">
                {playlists.map((playlist) => 
                    <p key={playlist.id} onClick={() => setplaylistId(playlist.id)} 
                    className="py-2 cursor-pointer text-slate-500 hover:text-slate-50">{playlist.name}</p>
                )}
            </div>
        </div>
       
    );

}

export default Playlist