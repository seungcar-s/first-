import React, { useEffect, useState, ReactNode } from "react"
import ReactDOM from "react-dom"

interface PortalProps {
    children: ReactNode
}

const Portal: React.FC<PortalProps> = ({ children }) => {
    const [el, setEl] = useState<HTMLElement | null>(null)

    useEffect(() => {
        setEl(document.getElementById("portal"))
    }, [])

    if (!el) return null

    return ReactDOM.createPortal(children, el)
}

export default Portal
