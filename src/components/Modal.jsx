import { useEffect } from 'react'
import './Modal.css'

function Modal({ onClose, children }) {
  // Tutup dengan tombol Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
