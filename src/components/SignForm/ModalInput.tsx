import React, { useEffect, useState } from "react"

interface Props {
    type: "text" | "password"
    label: string
    value: string
    onChange: (value: string) => void
    errorMessage: string
}

function ModalInput({ type, label, value, onChange, errorMessage }: Props) {
    const [isFocused, setIsFocused] = useState(false)
    const [visible, setVisible] = useState(false)

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFocused(true)
        onChange(e.target.value)
    }

    const handleToggleVisible = () => {
        setVisible(!visible)
    }

    return (
        <>
            <label htmlFor={label}>{label} </label>
            <div className="relative">
                <input
                    type={type === "password" && !visible ? "password" : "text"}
                    id={label}
                    name={type}
                    value={value}
                    onChange={handleValueChange}
                    onFocus={handleFocus}
                    placeholder={label}
                    {...(isFocused && {
                        "aria-invalid": errorMessage ? "true" : "false",
                        "aria-describedby": errorMessage ? "invalid-helper" : undefined,
                    })}
                />
                {errorMessage && isFocused && <small id="invalid-helper">{errorMessage}</small>}
                {type === "password" && (
                    <div className="cursor absolute eye-icon">
                        <img
                            src={visible ? "/public/eye-on.svg" : "/public/eye-off.svg"}
                            alt="비밀번호 표시 아이콘"
                            onClick={handleToggleVisible}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default ModalInput
