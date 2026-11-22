import type { ReactNode } from "react"
import { NavLink } from "react-router"
import "./PageLayout.css"

type PageLayoutProps = {
    children: ReactNode
}

function PageLayout({ children }: PageLayoutProps) {
    return (
        <>
            <nav className="navbar">
                <span className="navbar__brand">Manajemen Produk</span>
                <div className="navbar__links">
                    <NavLink to="/products" className="navbar__link">
                        Produk
                    </NavLink>
                </div>
            </nav>
            <main>{children}</main>
        </>
    )
}

export default PageLayout
