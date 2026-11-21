import { useEffect, type ReactNode } from "react"
import "./Modal.css"

type ModalProps = {
    onClose: () => void
    children: ReactNode
}

function Modal({ onClose, children }: ModalProps) {
    // Tutup dengan tombol Escape
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal__close" aria-label="Tutup" onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
