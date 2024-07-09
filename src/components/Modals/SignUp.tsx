import Popup from "./Popup"
import ModalInput from "../SignForm/ModalInput"
import useSignUp from "@/hooks/useSignUp"

function SignUp({ closeModal }: { closeModal: () => void }) {
    const {
        email,
        handleEmailChange,
        emailError,
        nickname,
        handleNicknameChange,
        nicknameError,
        password,
        handlePasswordChange,
        passwordError,
        passwordConfirm,
        handlePasswordConfirmChange,
        passwordConfirmError,
        handleSubmit,
        isFormValid,
        openPopup,
        popupMessage,
        handleClosePopup,
        isLoading,
        success,
    } = useSignUp()

    return (
        <>
            <form
                className="width-90"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                <header>
                    <h1 className="text-align-center">회원가입</h1>
                </header>
                <main>
                    <ModalInput
                        type="text"
                        label="이메일"
                        value={email}
                        onChange={handleEmailChange}
                        errorMessage={emailError}
                    />
                    <ModalInput
                        type="text"
                        label="닉네임"
                        value={nickname}
                        onChange={handleNicknameChange}
                        errorMessage={nicknameError}
                    />
                    <ModalInput
                        type="password"
                        label="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                        errorMessage={passwordError}
                    />
                    <ModalInput
                        type="password"
                        label="비밀번호 확인"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                        errorMessage={passwordConfirmError}
                    />
                </main>
                <button
                    className="margin-button"
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    aria-busy={isLoading ? "true" : "false"}>
                    회원가입
                </button>
            </form>
            <Popup isOpen={openPopup} closePopup={handleClosePopup} closeModal={closeModal} isSuccess={success}>
                {popupMessage}
            </Popup>
        </>
    )
}

export default SignUp
