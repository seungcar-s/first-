import uploadImageFiles from "@/apis/UploadImageFiles"
import ModalInput from "@/components/SignForm/ModalInput"
import { useUser } from "@/context/UserContext"
import useMyInfo from "@/hooks/useMyInfo"
import { useState } from "react"

function MyInfo() {
    const {
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
    } = useMyInfo()
    const { userData } = useUser()
    const [imageUrl, setImageUrl] = useState("")

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // setIsLoading(true)
            // setError(null)
            try {
                const response = await uploadImageFiles(file)
                setImageUrl(response.profileImageUrl)
            } catch (error) {
                //     console.error("업로드 실패:", error)
                //     setError("이미지 업로드에 실패했습니다.")
                // } finally {
                //     setIsLoading(false)
            }
        }
    }
    if (!userData) {
        return <div>로그인 해주세요</div>
    }

    return (
        <>
            <article>
                <form
                    className="width-90"
                    onSubmit={(e) => {
                        e.preventDefault()
                        //  handleSubmit()
                    }}>
                    <header>
                        <h1 className="text-align-center">내 정보 수정</h1>
                    </header>
                    <main>
                        <label htmlFor="이메일수정">이메일</label>
                        <input
                            type="text"
                            id="이메일수정"
                            name="text"
                            placeholder={userData.email}
                            aria-label="Disabled input"
                            disabled
                        />
                        <ModalInput
                            type="text"
                            label="닉네임 수정"
                            value={nickname}
                            onChange={handleNicknameChange}
                            errorMessage={nicknameError}
                        />
                        <ModalInput
                            type="password"
                            label="비밀번호 수정"
                            value={password}
                            onChange={handlePasswordChange}
                            errorMessage={passwordError}
                        />
                        <ModalInput
                            type="password"
                            label="비밀번호 확인 "
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            errorMessage={passwordConfirmError}
                        />
                        <label htmlFor="파일선택" />
                        <input id="파일선택" type="file" accept="image/*" onChange={handleFileChange} />
                        {imageUrl && <img className="profile-img" src={imageUrl} />}
                    </main>
                    <button type="submit" disabled={!isFormValid || isLoading} aria-busy={isLoading ? "true" : "false"}>
                        내 정보 수정
                    </button>
                </form>
                {/* <Popup isOpen={openPopup} closePopup={handleClosePopup} closeModal={closeModal} isSuccess={success}>
             {popupMessage}
         </Popup> */}
            </article>
        </>
    )
}

export default MyInfo
