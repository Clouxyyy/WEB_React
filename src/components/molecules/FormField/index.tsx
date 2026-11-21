import type { ReactNode } from "react"

type FormFieldProps = {
    htmlFor: string
    label: string
    hint?: string
    hintError?: boolean
    children: ReactNode
}

export default function FormField({
    htmlFor,
    label,
    hint,
    hintError = false,
    children,
}: FormFieldProps) {
    return (
        <>
            <label className="form__label" htmlFor={htmlFor}>
                {label}
            </label>
            {children}
            {hint && (
                <p
                    className={`form__hint ${hintError ? "form__hint--error" : ""}`}
                >
                    {hint}
                </p>
            )}
        </>
    )
}
