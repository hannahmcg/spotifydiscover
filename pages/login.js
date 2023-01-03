import {getProviders, signIn} from "next-auth/react";

function Login({providers}) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <h1 className="text-4xl text-white py-10">Spotify Account Login</h1>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className="bg-[#18D860] text-white rounded-3xl p-4"
                    onClick={() => signIn(provider.id, {callbackUrl: '/'})}
                    >Login with {provider.name}</button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        }
    }
}