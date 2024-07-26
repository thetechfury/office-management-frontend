import {useSelector} from "react-redux";

const MainDiv = ({children}) => {
    const {user} = useSelector((state) => state.auth);

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