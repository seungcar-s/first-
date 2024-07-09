import { useEffect, useState } from "react"
import { USER_INPUT_VALIDATION } from "../constants/User"
import { useUser } from "@/context/UserContext"
// import PostSignUp from "../apis/PostSignUp"

interface ValidateInputProps {
    inputType: "nickname" | "password"
    value: string
}

function useMyInfo() {
    const { userData } = useUser()
    const [openPopup, setOpenPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nicknameError, setNicknameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordConfirmError, setPasswordConfirmError] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (userData) {
            setNickname(userData.nickname)
        }
    }, [userData])

    useEffect(() => {
        const isFormErrorFree = !!(
            !nicknameError &&
            !passwordError &&
            !passwordConfirmError &&
            nickname &&
            password &&
            passwordConfirm
        )

        setIsFormValid(isFormErrorFree)
    }, [nicknameError, passwordError, passwordConfirmError, nickname, password, passwordConfirm])

    const handleNicknameChange = (value: string) => {
        setNickname(value)
        setNicknameError(validateInput({ inputType: "nickname", value }))
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordError(validateInput({ inputType: "password", value }))
    }

    const handlePasswordConfirmChange = (value: string) => {
        setPasswordConfirm(value)
        if (value !== password) {
            setPasswordConfirmError("비밀번호가 일치하지 않습니다.")
        } else {
            setPasswordConfirmError("")
        }
    }

    const validateInput = ({ inputType, value }: ValidateInputProps) => {
        const trimmedValue = value.trim()
        const { regex, errorMessage } = USER_INPUT_VALIDATION[inputType]
        if (!trimmedValue) {
            return errorMessage.empty
        }

        if (!regex.test(trimmedValue)) {
            return errorMessage.invalid
        }
        return ""
    }

    // const handleSubmit = async () => {
    //     setIsLoading(true)
    //     try {
    //         await PostSignUp({ email, nickname, password })
    //         setSuccess(true)
    //         handleOpenPopup("가입이 완료되었습니다.")
    //     } catch (error: any) {
    //         handleOpenPopup(error.message)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const handleOpenPopup = (message: string) => {
        setPopupMessage(message)
        setOpenPopup(true)
    }

    const handleClosePopup = () => {
        setOpenPopup(false)
    }

    return {
        nickname,
        handleNicknameChange,
        nicknameError,
        password,
        handlePasswordChange,
        passwordError,
        passwordConfirm,
        handlePasswordConfirmChange,
        passwordConfirmError,
        isFormValid,
        openPopup,
        popupMessage,
        handleClosePopup,
        isLoading,
        success,
    }
}

export default useMyInfo
