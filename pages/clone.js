import {getSession, signOut, useSession} from 'next-auth/react'
import Playlist from '../components/Playlist'
import Songs from '../components/Songs'
import Player from '../components/Player'

export default function SpotifyClone() {
  {/* const {data: session, status } = useSession(); */}

  return (
    <div>
      <main className="flex">
        {/* title */}
        {/* connect spotify acc */}
        {/* playlist components displayed (top 3) */}
        <Playlist /> 
        <Songs />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    }
  }
}
