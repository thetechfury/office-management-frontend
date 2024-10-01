'use client'
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const MainDiv = ({children}) => {
    const {user} = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/'); // Redirect to signin if not logged in
        }
    }, [user, router]);
    return (
        <>
            {user &&
                <div className="pl-0 sm:pl-[16rem] pt-[4.75rem] sm:pt-[4.75rem] mt-4 ">
                    {children}
                </div>}
        </>
    )
}
export default MainDiv;