import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { useState } from "react"
import { FiEdit, FiFileText, FiList, FiLogOut, FiMenu, FiUser, FiUsers } from "react-icons/fi"
import { Menu, MenuItem, Sidebar as ProSidebar, sidebarClasses } from "react-pro-sidebar"
import { Link, useNavigate } from "react-router-dom"

export const Sidebar = () => {
    const { logout, isAdmin } = useAuthStore()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    // Цветовая схема
    const colors = {
        primary: "#3f51b5", // Основной синий
        secondary: "#ff4081", // Акцентный розовый
        management: "#5c6bc0", // Управление - фиолетовый
        testing: "#26a69a", // Тестирование - бирюзовый
        background: "#ffffff",
        hover: "#f0f4ff",
        active: "#e8eaf6",
        text: "#333333",
        border: "#e0e0e0",
        exit: "#f44336", // Красный для кнопки выхода
    }

    const menuItemStyles = {
        button: ({ active }: { active: boolean }) => ({
            backgroundColor: active ? colors.active : "transparent",
            color: active ? colors.primary : colors.text,
            "&:hover": {
                backgroundColor: colors.hover,
                color: colors.primary,
            },
            padding: "10px 16px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transition: "all 0.3s ease",
        }),
    }

    // Компонент заголовка категории
    const CategoryHeader = ({ title, color }: { title: string; color: string }) =>
        !collapsed && (
            <div
                style={{
                    padding: "12px 16px 4px 16px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: color,
                    borderLeft: `4px solid ${color}`,
                    background: `linear-gradient(90deg, ${color}22 0%, transparent 100%)`,
                    marginTop: "12px",
                }}>
                {title}
            </div>
        )

    const adminMenuItems = (
        <>
            <CategoryHeader title="Управление" color={colors.management} />
            <MenuItem
                icon={<FiUsers style={{ color: colors.management }} />}
                component={<Link to={ROUTES.ADMIN_USERS} />}>
                {!collapsed && "Пользователи"}
            </MenuItem>
            <MenuItem
                icon={<FiFileText style={{ color: colors.management }} />}
                component={<Link to={ROUTES.ADMIN_TESTS} />}>
                {!collapsed && "Тесты"}
            </MenuItem>
            <MenuItem
                icon={<FiList style={{ color: colors.management }} />}
                component={<Link to={ROUTES.ADMIN_ALL_ATTEMPTS} />}>
                {!collapsed && "Попытки"}
            </MenuItem>

            <CategoryHeader title="Тестирование" color={colors.testing} />
            <MenuItem
                icon={<FiUser style={{ color: colors.testing }} />}
                component={<Link to={ROUTES.ADMIN_PROFILE} />}>
                {!collapsed && "Профиль"}
            </MenuItem>
            <MenuItem
                icon={<FiEdit style={{ color: colors.testing }} />}
                component={<Link to={ROUTES.ADMIN_CREATE_TEST} />}>
                {!collapsed && "Создать тест"}
            </MenuItem>
            <MenuItem
                icon={<FiFileText style={{ color: colors.testing }} />}
                component={<Link to={ROUTES.ADMIN_MY_TESTS} />}>
                {!collapsed && "Мои тесты"}
            </MenuItem>
        </>
    )

    const userMenuItems = (
        <>
            <CategoryHeader title="Тестирование" color={colors.testing} />
            <MenuItem icon={<FiUser style={{ color: colors.testing }} />} component={<Link to={ROUTES.PROFILE} />}>
                {!collapsed && "Профиль"}
            </MenuItem>
            <MenuItem icon={<FiEdit style={{ color: colors.testing }} />} component={<Link to={ROUTES.CREATE_TEST} />}>
                {!collapsed && "Создать тест"}
            </MenuItem>
            <MenuItem icon={<FiFileText style={{ color: colors.testing }} />} component={<Link to={ROUTES.MY_TESTS} />}>
                {!collapsed && "Мои тесты"}
            </MenuItem>
        </>
    )

    return (
        <>
            <ProSidebar
                collapsed={collapsed}
                rootStyles={{
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease-in-out",
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: colors.background,
                        borderRight: `1px solid ${colors.border}`,
                        boxShadow: "2px 0 12px rgba(0, 0, 0, 0.08)",
                        transition: "all 0.3s ease-in-out", // Плавная анимация
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    },
                }}
                width="240px"
                collapsedWidth="70px" // Фиксированная ширина при свернутом состоянии
                
            >
                {/* Основное содержимое сайдбара */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem
                            onClick={() => setCollapsed(prev => !prev)}
                            style={{
                                fontWeight: 600,
                                marginBottom: "6px",
                                borderBottom: `1px solid ${colors.border}`,
                                padding: "14px 16px",
                            }}
                            icon={<FiMenu />}>
                            {!collapsed && (isAdmin ? "Админ-панель" : "Панель управления")}
                        </MenuItem>

                        {isAdmin ? adminMenuItems : userMenuItems}
                    </Menu>
                </div>

                {/* Кнопка выхода, жестко прикрепленная к низу */}
                <div
                    style={{
                        borderTop: `1px solid ${colors.border}`,
                        marginTop: "auto",
                        width: "100%",
                    }}>
                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem
                            onClick={() => {
                                setIsLogoutModalOpen(true)
                            }}
                            icon={<FiLogOut style={{ color: colors.exit }} />}
                            style={{
                                padding: "16px",
                                fontWeight: 600,
                            }}>
                            {!collapsed && "Выйти"}
                        </MenuItem>
                    </Menu>
                </div>
            </ProSidebar>
            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={() => {
                    logout()
                }}
                title="Выход из системы"
                confirmText="Да, выйти">
                <p>Вы уверены, что хотите выйти из системы?</p>
            </ConfirmationModal>
        </>
    )
}
