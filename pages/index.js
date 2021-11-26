import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Chat app</title>
                <meta name="description" content="Chat app demo (nextjs)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar />

            <h1>Lets build chat app</h1>
        </div>
    );
}
