import type { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}

export default function Input({ className = "", ...props }: InputProps) {
    return <input className={`form__input ${className}`.trim()} {...props} />
}
