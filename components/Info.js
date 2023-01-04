import {useSession} from "next-auth/react"
import {useEffect, useState} from "react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from "recoil";
import { artistIdsState } from "../atoms/artistAtom"

function Info() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);


    const [artistIds, setArtistIds] = useRecoilState(artistIdsState);


    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getMyTopArtists({limit: 5}).then((data) => {
                setTopArtists(data.body.items);
            });
            spotifyApi.getMyTopTracks({limit: 10}).then((data) => {
                setTopTracks(data.body.items);
            });
            
           // spotifyApi.searchArtists({limit:10}).then((data) => {
            //    setKpopArtists(data.body.artists.items);
           // }); 
        };

        const artIds = [];

        topArtists.forEach((artist) => (
            artIds.push(artist.id)
        ));

        setArtistIds(artIds);

    }, [session, spotifyApi]);

    console.log(artistIds)


  /*  const artIds = [];

    topArtists.forEach((artist) => (
        artIds.push(artist.id)
    ));

    useEffect(() => {
        setArtistIds(artIds);
    }, []);

    useEffect(() => {
        console.log(artistIds);
      }, [artistIds]);  */


   /* const artIds = [];

    topArtists.forEach((artist) => (
        artIds.push(artist.id)
    ));

   const setTheArtistIds = () => {
        setArtistIds(artIds);
    };  */


   /*  console.log(artistIds) */




 /* console.log(topArtists) */

    return (
        <div>
        <div>
            <div className="">
                <p className="p-5 text-xl">Your Top Artists:</p>
                <div className="flex flex-grow items-center space-x-20 p-4">
                    {topArtists.map((artist) => (
                        <div key={artist.id} className="flex flex-col items-center">
                            <img className="w-15 h-15 md:w-25 md:h-25 rounded-full" src={artist.images?.[0]?.url} alt=""/>
                            <p className="p-2">{artist.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                <p className="p-5 text-xl">Your Top Tracks:</p>
                <div className="flex flex-grow items-center space-x-10 p-4">
                    {topTracks.map((track) => (
                        <div key={track.id} className="flex flex-col flex-wrap items-center">
                            <p className="p-2">{track.name}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        <div>
            {/*<button onClick={setTheArtistIds}>Generate Playlists!</button>*/}
        </div>
        </div>
    );

}

export default Info