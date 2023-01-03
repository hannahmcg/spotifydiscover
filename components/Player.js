import useSpotify from '../hooks/useSpotify' 
import {useSession} from 'next-auth/react'
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import { useRecoilState } from "recoil"
import useSongInfo from '../hooks/useSongInfo'
import {useEffect, useState, useCallback} from "react"
import { ReplyIcon, SwitchHorizontalIcon, VolumeUpIcon, VolumeOffIcon } from '@heroicons/react/outline'
import {  RewindIcon, PauseIcon, PlayIcon, FastForwardIcon  } from '@heroicons/react/solid'
import {debounce} from "lodash"

function Player() {

    const spotifyApi = useSpotify();
    const {data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("now playing: ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);
                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    const handlePlayPause = () =>  {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause(); 
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

    /* not working idk why gotta check current device maybe? */
    const handleRewind = () => {
        spotifyApi.skipToPrevious().then((data) => {
            setCurrentTrackId(data.body?.item?.id);
        });
    };

    const handleFastForward = () => {
        spotifyApi.skipToNext().then((data) => {
            setCurrentTrackId(data.body?.item?.id);
        });
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {});
        }, 500), []
    );

    return(
        <div className="h-24 bg-gradient-to-b from-black to-slate-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8 text-white">
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10"
                    src={songInfo?.album.images?.[0]?.url}
                    alt=""/>
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="btn"/> 
                {/*rewind not working on api call?: onClick={() => spotifyApi.skiptoPrevious() } */}
                <RewindIcon onClick={handleRewind} className="btn"/>
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause}  className="btn w-10 h-10" />
                ): (
                    <PlayIcon onClick={handlePlayPause} className="btn w-10 h-10" />
                )}
                {/*fastforward not working on api call?: onClick={() => spotifyApi.skiptoNext() } */}
                <FastForwardIcon onClick={handleFastForward} className="btn" />
                <ReplyIcon className="btn" />
            </div>

            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeOffIcon onClick={() => volume > 0 && setVolume(0)} className="btn" />
                <input 
                className="w-14 md:w-28" 
                type="range"  
                value={volume} 
                onChange={e => setVolume(Number(e.target.value))}
                min={0} max={100} />
                <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="btn" />
            </div>

        </div>
    );
}

export default Player;