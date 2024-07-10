import { useState } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import { Link } from "react-router-dom"
import SignUp from "./Modals/SignUp"
import BaseModal from "./Modals/BaseModal"
import SignIn from "./Modals/SignIn"
import { useAuth } from "@/context/AuthContext"
import { useData } from "@/context/DataContext"
import { useDarkMode } from "@/context/DarkModeContext"

function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const [openModal, setOpenModal] = useState(false)
    const [signUp, setSignUp] = useState(true)
    const { auth, setAuth } = useAuth()
    const { userData, imageUrl } = useData()

    const handleOpenSignUpModal = () => {
        setSignUp(true)
        setOpenModal(true)
    }

    const handleOpenSignInModal = () => {
        setSignUp(false)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setSignUp(!signUp)
        setOpenModal(false)
    }

    const handleLogout = () => {
        setAuth("")
        localStorage.clear()
    }
    return (
        <>
            <nav id="header">
                <ul>
                    <li>
                        <Link to="/">
                            <h2 className="logo">U-TMI</h2>
                        </Link>
                        <div className="small">너의 TMI를 알려줘</div>
                    </li>
                </ul>

                <ul>
                    {auth ? (
                        <>
                            <Link className="text-default-color" to="/">
                                <li>랜덤-Tmi</li>
                            </Link>
                            <li />
                            <Link className="text-default-color" to="/friend-utmi">
                                <li>친구-Tmi</li>
                            </Link>
                            <li />
                            <Link className="text-default-color" to="/my-utmi">
                                <li>나의-Tmi</li>
                            </Link>
                            <li />
                            <details className="dropdown">
                                <summary className="center">
                                    {userData?.nickname && (
                                        <span>
                                            {userData.nickname.length > 4
                                                ? `${userData.nickname.slice(0, 4)}...`
                                                : userData.nickname}
                                        </span>
                                    )}
                                    {!imageUrl ? (
                                        <div className="small-circle center bg-purple">
                                            <span className="profile-text">{userData?.nickname[0]}</span>
                                        </div>
                                    ) : (
                                        <div className="inline">
                                            <img className="profile-img small-circle" src={imageUrl} />
                                        </div>
                                    )}
                                </summary>
                                <ul>
                                    <Link className="text-default-color" to="/my-info">
                                        <li>내 정보 수정</li>
                                    </Link>
                                    <Link className="text-default-color" to="/change-password">
                                        <li>비밀번호 변경</li>
                                    </Link>
                                    <Link className="text-default-color" to="/">
                                        <li onClick={handleLogout}>로그아웃</li>
                                    </Link>
                                </ul>
                            </details>
                            <li />
                        </>
                    ) : (
                        <>
                            <li className="cursor" onClick={handleOpenSignInModal}>
                                로그인
                            </li>
                            <li />
                            <li className="cursor" onClick={handleOpenSignUpModal}>
                                회원가입
                            </li>
                            <li />
                        </>
                    )}
                    <li>
                        <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={20} />
                    </li>
                </ul>
            </nav>
            <BaseModal isOpen={openModal} closeModal={handleCloseModal}>
                {signUp ? <SignUp closeModal={handleCloseModal} /> : <SignIn closeModal={handleCloseModal} />}
            </BaseModal>
        </>
    )
}

export default Header
