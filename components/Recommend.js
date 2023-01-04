import {useSession} from "next-auth/react"
import {useEffect, useState} from "react";
import useSpotify from '../hooks/useSpotify';
import { artistIdsState, playlist1State, playlist2State, playlist3State, playlist4State } from "../atoms/artistAtom"
import { useRecoilValue, useRecoilState } from "recoil";


function Recommend() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlist1, setPlaylist1] = useRecoilState(playlist1State);
    const [playlist2, setPlaylist2] = useRecoilState(playlist2State);
    const [playlist3, setPlaylist3] = useRecoilState(playlist3State);
    const [playlist4, setPlaylist4] = useRecoilState(playlist4State);


    const artistIds = useRecoilValue(artistIdsState);

    console.log(artistIds)
    console.log('hi')

    useEffect(() => {
        if (artistIds) {
            console.log('ok')
            spotifyApi.getRecommendations({
                seed_artists: artistIds,
                max_popularity: 50,
            }).then((data) => {
                setPlaylist1(data.body.tracks);
            }).catch((err) => console.log("error while fetching recommendation", err));
            spotifyApi.getRecommendations({
                seed_artists: artistIds,
                target_danceability: 0.8,
                target_energy: 0.7,
            }).then((data2) => {
                setPlaylist2(data2.body.tracks);
            }).catch((err) => console.log("error while fetching recommendation", err));
            spotifyApi.getRecommendations({
                seed_artists: artistIds,
                max_liveness: 0.4,
                target_energy: 0.3,
            }).then((data3) => {
                setPlaylist3(data3.body.tracks);
            }).catch((err) => console.log("error while fetching recommendation", err)); 
            spotifyApi.getRecommendations({
                seed_artists: artistIds,
                max_energy: 0.5,
                max_loudness: 0.4,
            }).then((data4) => {
                setPlaylist4(data4.body.tracks);
            }).catch((err) => console.log("error while fetching recommendation", err));
        }
    }, [session, spotifyApi, artistIds]);

    
    console.log(playlist1, playlist2)


    return (
        <div className="grid grid-cols-2">
            <div className="">
                <div className="flex flex-col space-y-1">
                    <h2 className="text-xl text-center">Underrated</h2>
                    {playlist1.map((track) => (
                        <div key={track.id} className="flex items-center">
                            <img className="w-10 h-10" src={track.album?.images?.[0]?.url} alt=""/>
                            <p className="p-2">{track.artists?.[0]?.name}: </p>
                            <p>{track.name}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col space-y-1  my-8">
                    <h2 className="text-xl text-center">Moody</h2>
                    {playlist3.map((track) => (
                        <div key={track.id} className="flex items-center">
                            <img className="w-10 h-10" src={track.album?.images?.[0]?.url} alt=""/>
                            <p className="p-2">{track.artists?.[0]?.name}: </p>
                            <p>{track.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                <div className="flex flex-col space-y-1">
                    <h2 className="text-xl text-center">Dance Dance!</h2>
                    {playlist2.map((track) => (
                            <div key={track.id} className="flex items-center">
                                <img className="w-10 h-10" src={track.album?.images?.[0]?.url} alt=""/>
                                <p className="p-2">{track.artists?.[0]?.name}: </p>
                                <p>{track.name}</p>
                            </div>
                        ))}
                </div>
                <div className="flex flex-col space-y-1 my-8">
                    <h2 className="text-xl text-center">Chill Vibes</h2>
                    {playlist4.map((track) => (
                        <div key={track.id} className="flex items-center">
                            <img className="w-10 h-10" src={track.album?.images?.[0]?.url} alt=""/>
                            <p className="p-2">{track.artists?.[0]?.name}: </p>
                            <p>{track.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div> 
    )
}

export default Recommend