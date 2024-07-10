import SideBar from "@/components/SideBar"
import { useLocation } from "react-router-dom"

const FriendUtmiById = () => {
    const location = useLocation()
    const data = location.state.data

    return (
        <>
            <SideBar />
            <article className="margin-left">
                <h1>{data?.title}</h1>
                <div className="overflow center">
                    <button>{data?.title}</button>
                </div>
            </article>
        </>
    )
}

export default FriendUtmiById
