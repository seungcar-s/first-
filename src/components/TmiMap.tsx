function TmiMap() {
    return (
        <>
            <div className="overflow center">
                <button>새로운 Tmi 맵 생성</button>
            </div>
            {/* <nav className="overflow" ref={scrollContainerRef}>
                    <ul>
                        {titleLists.map((data, index) => (
                            <Link
                                className="text-default-color"
                                to={`/tmiMap/${data.id}`}
                                key={data.id}
                                state={{ data: data }}>
                                <li
                                    className={`cursor width-90 ${selected === index ? "side-title" : "side-hover"}`}
                                    onClick={() => handleSelect(index)}>
                                    {data.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
                {canScroll && (
                    <li id="button">
                        <button className="scroll-button" onClick={handleGetPrevData}>
                            ↑
                        </button>
                        <button className="scroll-button" onClick={handleGetNextData}>
                            ↓
                        </button>
                    </li>
                )} */}
            {/* <BaseModal isOpen={openModal} closeModal={handleCloseModal}>
                {title ? <NewMap closeModal={handleCloseModal} /> : <div></div>}
            </BaseModal>
            <Popup isOpen={openPopup} closePopup={handleClosePopup}>
                {popupMessage}
            </Popup> */}
        </>
    )
}

export default TmiMap
