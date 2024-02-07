import { useSelector } from "react-redux"
import "./Landing.css"
import { useNavigate } from "react-router-dom"
import LoginFormModal from "../LoginFormModal"
import { useModal } from "../../context/Modal"

export default function Landing() {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const {setModalContent} = useModal()
    return (
        <div className="landing-page">

            <h1 className="landing-heading">Welcome to ByteBites!</h1>
            <h3 className="landing-subheading">{"Delivering food you'll savor, one byte at a time"}</h3>

            {user ?
            (<>
                <button className={"landing-button"} onClick={() => navigate('/restaurants')}>Browse Our Restaurants!</button>
                <button className={"landing-button"} onClick={() => navigate('/restaurants/new')}>Create your own Restaurant!</button>
            </>)
            :
            (<>
                <button className={"landing-button"} onClick={() => navigate('/signup')}>Sign Up</button>
                <button className={"landing-button"} onClick={() => setModalContent(<LoginFormModal/>)}>Log In</button>
            </>)}

            <div className="landing-credits">Made by Ellie Starr</div>
        </div>
    )
}
