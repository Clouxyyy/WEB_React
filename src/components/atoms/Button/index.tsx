import type { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "primary" | "danger" | "outline-danger"
}

export default function Button({
    variant = "default",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    const variantClass =
        variant === "default" ? "btn" : `btn btn-${variant}`
    return (
        <button
            type={type}
            className={`${variantClass} ${className}`.trim()}
            {...props}
        />
    )
}
