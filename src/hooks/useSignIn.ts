import { useEffect, useState } from "react"
import { USER_INPUT_VALIDATION } from "../constants/User"
import postSignIn from "@/apis/PostSignIn"
import { useAuth } from "@/context/AuthContext"

interface ValidateInputProps {
    inputType: "email" | "nickname" | "password"
    value: string
}

function useSignIn(closeModal: () => void) {
    const [openPopup, setOpenPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { setAuth } = useAuth()

    useEffect(() => {
        const isFormErrorFree = !!(!emailError && !passwordError && email && password)

        setIsFormValid(isFormErrorFree)
    }, [emailError, passwordError, email, password])

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setEmailError(validateInput({ inputType: "email", value }))
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordError(validateInput({ inputType: "password", value }))
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

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await postSignIn({ email, password })
            setAuth(response)
            setSuccess(true)
            handleOpenPopup("로그인 되었습니다.")
        } catch (error: any) {
            handleOpenPopup(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenPopup = (message: string) => {
        setPopupMessage(message)
        setOpenPopup(true)
    }

    const handleClosePopup = () => {
        setOpenPopup(false)
    }

    return {
        email,
        handleEmailChange,
        emailError,
        password,
        handlePasswordChange,
        passwordError,
        handleSubmit,
        isFormValid,
        openPopup,
        popupMessage,
        handleClosePopup,
        isLoading,
        success,
    }
}

export default useSignIn
