import { useState } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import { Link } from "react-router-dom"
import SignUp from "./Modals/SignUp"
import BaseModal from "./Modals/BaseModal"
import SignIn from "./Modals/SignIn"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/context/UserContext"

function Header() {
    const localDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const [isDarkMode, setIsDarkMode] = useState(localDarkMode)
    const [openModal, setOpenModal] = useState(false)
    const [signUp, setSignUp] = useState(true)
    const { auth, setAuth } = useAuth()
    const { userData } = useUser()

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

    const handleThemeMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.dataset.theme = isDarkMode ? "light" : "dark"
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
                {auth ? (
                    <ul>
                        <Link className="text-default-color" to="/">
                            <li>남의-Tmi</li>
                        </Link>
                        <li />
                        <Link className="text-default-color" to="/myUtmi">
                            <li>나의-Tmi</li>
                        </Link>
                        <li />
                        <details className="dropdown">
                            <summary>{userData?.nickname} 님</summary>
                            <ul>
                                <Link className="text-default-color" to="/MyInfo">
                                    <li>내 정보 수정</li>
                                </Link>
                                <Link className="text-default-color" to="/">
                                    <li onClick={handleLogout}>로그아웃</li>
                                </Link>
                            </ul>
                        </details>
                        <li />
                        <li>
                            <DarkModeSwitch checked={isDarkMode} onChange={handleThemeMode} size={20} />
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li className="cursor" onClick={handleOpenSignInModal}>
                            로그인
                        </li>
                        <li />
                        <li className="cursor" onClick={handleOpenSignUpModal}>
                            회원가입
                        </li>
                        <li />
                        <li>
                            <DarkModeSwitch checked={isDarkMode} onChange={handleThemeMode} size={20} />
                        </li>
                    </ul>
                )}
            </nav>
            <BaseModal isOpen={openModal} closeModal={handleCloseModal}>
                {signUp ? <SignUp closeModal={handleCloseModal} /> : <SignIn closeModal={handleCloseModal} />}
            </BaseModal>
        </>
    )
}

export default Header
