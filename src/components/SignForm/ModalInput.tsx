import React, { useState } from "react"

interface Props {
    type: "text" | "password"
    label: string
    value: string
    onChange: (value: string) => void
    errorMessage: string
}

function ModalInput({ type, label, value, onChange, errorMessage }: Props) {
    const [isFocused, setIsFocused] = useState(false)

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFocused(true)
        onChange(e.target.value)
    }

    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input
                type={type}
                id={label}
                name={type}
                value={value}
                onChange={handleValueChange}
                onFocus={handleFocus}
                {...(isFocused && {
                    "aria-invalid": errorMessage ? "true" : "false",
                    "aria-describedby": errorMessage ? "invalid-helper" : undefined,
                })}
            />
            {errorMessage && isFocused && <small id="invalid-helper">{errorMessage}</small>}
        </>
    )
}

export default ModalInput
