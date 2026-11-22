import { Routes, Route, Navigate, Outlet } from "react-router"
import PageLayout from "./components/templates/PageLayout"
import ProductsPage from "./components/pages/ProductsPage"

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PageLayout><Outlet /></PageLayout>}>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductsPage />} />
            </Route>
        </Routes>
    )
}
