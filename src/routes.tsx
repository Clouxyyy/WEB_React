import { Routes, Route, Navigate, Outlet } from "react-router"
import PageLayout from "./components/templates/PageLayout"
import ProductsPage from "./components/pages/ProductsPage"
import ProductDetailPage from "./components/pages/ProductDetailPage"
import NotFoundPage from "./components/pages/NotFoundPage"

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PageLayout><Outlet /></PageLayout>}>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
