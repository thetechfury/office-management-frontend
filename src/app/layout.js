import {Inter} from "next/font/google";
import "./globals.css";
import Layout from "@/app/components/layout/layout";
import {ReduxProvider} from "@/app/redux-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Dashboard",
    description: "Generated by create next app",
};

export default function RootLayout({children}) {
    return (

        <html lang="en">
        <body className=''>
        <ReduxProvider>
            <header>
                <Layout/>
            </header>
            {children}
        </ReduxProvider>
        </body>
        </html>

    );
}
