import { useEffect, useState } from "react"
import { USER_INPUT_VALIDATION } from "../constants/User"
import { useData } from "@/context/DataContext"
import PutEditInfo from "@/apis/PutEditInfo"
import uploadImageFiles from "@/apis/UploadImageFiles"

function useMyInfo() {
    const { userData, newData, setNewData } = useData()
    const [openPopup, setOpenPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [nickname, setNickname] = useState("")
    const [nicknameError, setNicknameError] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [fakeImageUrl, setFakeImageUrl] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [imageError, setImageError] = useState("")

    useEffect(() => {
        if (userData) {
            setNickname(userData.nickname)
            if (userData.profileImageUrl && userData.profileImageUrl.includes("fake-profile-")) {
                const checkUrl = userData.profileImageUrl.replace(
                    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/",
                    ""
                )
                setImageUrl(checkUrl)
            } else {
                setImageUrl(userData.profileImageUrl)
            }
        }
    }, [userData])

    useEffect(() => {
        const isFormErrorFree = !!(!nicknameError && nickname)
        setIsFormValid(isFormErrorFree)
    }, [nicknameError, nickname])

    const handleNicknameChange = (value: string) => {
        setNickname(value)
        setNicknameError(validateInput(value))
    }

    const validateInput = (value: string) => {
        const trimmedValue = value.trim()
        const { regex, errorMessage } = USER_INPUT_VALIDATION["nickname"]
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
        const sendUrl = fakeImageUrl
            ? `https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/${imageUrl}`
            : imageUrl
        try {
            await PutEditInfo({ nickname, profileImageUrl: sendUrl })
            setSuccess(true)
            handleOpenPopup("수정 되었습니다.")
            setNewData(!newData)
        } catch (error: any) {
            handleOpenPopup(error.message)
        } finally {
            setFakeImageUrl(false)
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageLoading(true)
            setImageError("")
            try {
                const response = await uploadImageFiles(file)
                setImageUrl(response.profileImageUrl)
            } catch (error) {
                setImageError("이미지 업로드에 실패했습니다.")
            } finally {
                setImageLoading(false)
            }
        }
    }

    const handleSelect = (selectedImageUrl: string | null) => {
        setImageUrl(selectedImageUrl)
        if (selectedImageUrl) {
            setFakeImageUrl(true)
        } else {
            setFakeImageUrl(false)
        }
    }

    return {
        nickname,
        handleNicknameChange,
        nicknameError,
        isFormValid,
        openPopup,
        popupMessage,
        handleClosePopup,
        isLoading,
        success,
        handleSubmit,
        imageUrl,
        handleFileChange,
        imageLoading,
        imageError,
        handleSelect,
    }
}

export default useMyInfo
