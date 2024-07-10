import Popup from "@/components/Modals/Popup"
import ModalInput from "@/components/SignForm/ModalInput"
import { useData } from "@/context/DataContext"
import useMyInfo from "@/hooks/useMyInfo"
import imagePaths from "@/constants/ImagePaths"

function MyInfo() {
    const {
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
        handleSelect,
    } = useMyInfo()
    const { userData } = useData()

    const filteredImagePaths = imagePaths.filter((image) => image.path !== imageUrl)

    if (!userData) {
        return <div>로그인 해주세요</div>
    }

    return (
        <>
            <article>
                <form
                    className="width-90 margin-info"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}>
                    <header>
                        <h1 className="text-align-center">내 정보 수정</h1>
                    </header>
                    <main className="margin-info">
                        프로필 사진 변경
                        <nav className="margin-bot profile-img-box">
                            <ul>
                                {!imageUrl ? (
                                    <li className="relative inline">
                                        <div className="circle center bg-purple padding-15">
                                            <span className="profile-text">{userData.nickname}</span>
                                        </div>
                                        <label htmlFor="file" className="absolute cursor profile-button">
                                            직접 변경
                                        </label>
                                        <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
                                    </li>
                                ) : (
                                    <li className="relative inline">
                                        <img className="profile-img circle" src={imageUrl} />
                                        <label htmlFor="file" className="absolute cursor profile-button">
                                            직접 변경
                                        </label>
                                        <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
                                    </li>
                                )}
                            </ul>
                            <ul>
                                {imageUrl && (
                                    <li>
                                        <div
                                            className="middle-circle relative center bg-purple padding-9"
                                            onClick={() => handleSelect(null)}>
                                            <span className="profile-text">{userData.nickname}</span>
                                        </div>
                                    </li>
                                )}
                                {filteredImagePaths.map((image, index) => (
                                    <li key={image.id}>
                                        <img
                                            className="profile-img middle-circle"
                                            src={image.path}
                                            alt={`기본 프로필 사진${index + 1}`}
                                            onClick={() => handleSelect(image.path)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </nav>
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
                    </main>
                    <button type="submit" disabled={!isFormValid || isLoading} aria-busy={isLoading ? "true" : "false"}>
                        내 정보 수정
                    </button>
                </form>
                <Popup isOpen={openPopup} closePopup={handleClosePopup} isSuccess={success}>
                    {popupMessage}
                </Popup>
            </article>
        </>
    )
}

export default MyInfo
