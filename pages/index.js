/*import { Main } from 'next/document'*/
import Head from 'next/head'
import Image from 'next/image'
import MyApp from './_app.js'
import {getSession, signOut, useSession} from 'next-auth/react'
import Link from 'next/link';
import Info from '../components/Info'
import Recommend from '../components/Recommend'

export default function Home() {

  {/* const {data: session, status } = useSession(); */}
  const { data: session, status} = useSession();
  

  return (
    
    <div className="items-center bg-black text-white min-h-screen p-10">
      <Head>
        <title>Discover-Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-between">
        <div className="p-2 text-center">
            <h1 className="text-4xl">SPOTIFY DISCOVERY APP</h1>
        </div>

        <div className="flex items-center flex-wrap">
            <div className="flex items-center space-x-3 p-5">
                <img className="rounded-full h-10 w-10" src={session?.user.image} alt=""/>
                <h2 className="">{session?.user.name}</h2>
            </div>
            <div className="p-3">
                <button
                className="bg-slate-700 rounded-2xl p-3 text-sm"
                onClick={() => signOut()}>
                Sign Out
                </button>
            </div>
        </div>
      </div>
      <h3 className="text-xl pt-10 pb-4 text-center">Inspired by Spotify Discover. Look at cool stuff based on your current listening habits! :D</h3>

      <div className="">
          <div className="p-20 text-center">
            <Link href="/clone" className="bg-slate-800 p-5 rounded-2xl w-20">LINK TO SPOTIFY CLONE</Link>
          </div>
      </div>


      <main className="">
        
        <div>
          <Info />
          <h1 className="text-xl py-8">Some recommended playlists based on your top artists and tracks...</h1>
          <Recommend />
        </div>
        
        <div>

        </div>

      </main>


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
