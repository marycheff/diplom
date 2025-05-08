import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { useEffect, useState } from "react"
import { FiEdit, FiFileText, FiHome, FiList, FiLogOut, FiMenu, FiUser, FiUsers } from "react-icons/fi"
import { MdOutlineScience } from "react-icons/md"
import { Menu, MenuItem, Sidebar as ProSidebar, sidebarClasses } from "react-pro-sidebar"
import { Link, useLocation, useNavigate } from "react-router-dom"
interface SidebarProps {
    onAnimationStart?: () => void
    onAnimationEnd?: () => void
}

export const Sidebar = ({ onAnimationStart, onAnimationEnd }: SidebarProps) => {
    const { logout, isAdmin } = useAuthStore()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(() => {
        const savedCollapsed = localStorage.getItem("sidebarCollapsed")
        return savedCollapsed ? JSON.parse(savedCollapsed) : window.innerWidth < 768
    })
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const location = useLocation()
    const currentPath = location.pathname

    // Отслеживание размера экрана для адаптивного сворачивания сайдбара
    useEffect(() => {
        const handleResize = () => {
            // Если ширина экрана меньше 768px, сворачиваем сайдбар
            if (window.innerWidth < 768) {
                setCollapsed(true)
                localStorage.setItem("sidebarCollapsed", "true")
            }
        }

        // Добавляем слушатель события resize
        window.addEventListener("resize", handleResize)

        // Удаляем слушатель при размонтировании компонента
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, []) // Убрана зависимость от collapsed

    // Функция для анимированного сворачивания сайдбара
    const toggleCollapse = () => {
        setIsAnimating(true)
        onAnimationStart?.()
        setCollapsed((prev: boolean) => {
            const newCollapsed = !prev
            localStorage.setItem("sidebarCollapsed", JSON.stringify(newCollapsed))
            return newCollapsed
        })
        setTimeout(() => {
            setIsAnimating(false)
            onAnimationEnd?.()
        }, 300) // Время анимации из transition
    }

    // Функция обработки клика по пункту меню
    const handleMenuItemClick = () => {
        // Если устройство мобильное и сайдбар развёрнут, сворачиваем его
        if (window.innerWidth < 768 && !collapsed) {
            setIsAnimating(true)
            onAnimationStart?.()
            setCollapsed(true)
            localStorage.setItem("sidebarCollapsed", "true")
            setTimeout(() => {
                setIsAnimating(false)
                onAnimationEnd?.()
            }, 300)
        }
    }

    // Цветовая схема
    const colors = {
        primary: "#3f51b5", // Основной синий
        secondary: "#ff4081", // Акцентный розовый
        management: "#5c6bc0", // Управление - фиолетовый
        testing: "#26a69a", // Тестирование - бирюзовый
        profile: "#9c27b0", // Профиль - фиолетовый
        background: "#ffffff",
        hover: "#f0f4ff",
        active: "#f1f1f1",
        text: "#333333",
        border: "#e0e0e0",
        exit: "#f44336", // Красный для кнопки выхода
    }

    const menuItemStyles = {
        button: ({ active }: { active: boolean }) => ({
            backgroundColor: active ? colors.active : "transparent",
            color: active ? colors.primary : colors.text,
            "&:hover": {
                backgroundColor: active ? colors.active : colors.hover,
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
                    padding: "7px 0px 7px 15px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: color,
                    borderLeft: `4px solid ${color}`,
                    background: `linear-gradient(90deg, ${color}22 0%, transparent 100%)`,
                    // margin: "3px 0",
                }}>
                {title}
            </div>
        )

    // Создаем оберточный компонент для MenuItem с обработкой клика
    const MenuItemWithCollapse = (props: any) => (
        <MenuItem
            {...props}
            onClick={(e: any) => {
                handleMenuItemClick()
                // Если у MenuItem есть свой обработчик клика, вызываем его
                if (props.onClick) {
                    props.onClick(e)
                }
            }}
        />
    )

    const adminMenuItems = (
        <>
            <MenuItemWithCollapse
                icon={<FiHome style={{ color: colors.primary }} />}
                component={<Link to={ROUTES.ADMIN} />}
                active={currentPath === ROUTES.ADMIN}
                style={{
                    marginBottom: "8px",
                    borderBottom: `1px solid ${colors.border}`,
                    paddingBottom: "8px",
                }}>
                {!collapsed && "Главная"}
            </MenuItemWithCollapse>
            <CategoryHeader title="Управление" color={colors.management} />
            <MenuItemWithCollapse
                icon={<FiUsers style={{ color: colors.management }} />}
                component={<Link to={ROUTES.ADMIN_USERS} />}
                active={currentPath.startsWith(ROUTES.ADMIN_USERS)}>
                {!collapsed && "Пользователи"}
            </MenuItemWithCollapse>

            <MenuItemWithCollapse
                icon={<MdOutlineScience style={{ color: colors.management }} />}
                component={<Link to={ROUTES.ADMIN_TESTS} />}
                active={currentPath.startsWith(ROUTES.ADMIN_TESTS)}>
                {!collapsed && "Тесты"}
            </MenuItemWithCollapse>
            <MenuItemWithCollapse
                icon={<FiList style={{ color: colors.management }} />}
                component={<Link to={ROUTES.ADMIN_ALL_ATTEMPTS} />}
                active={currentPath.startsWith(ROUTES.ADMIN_ALL_ATTEMPTS)}>
                {!collapsed && "Попытки"}
            </MenuItemWithCollapse>

            <CategoryHeader title="Тестирование" color={colors.testing} />
            <MenuItemWithCollapse
                icon={<FiEdit style={{ color: colors.testing }} />}
                component={<Link to={ROUTES.ADMIN_CREATE_TEST} />}
                active={currentPath.startsWith(ROUTES.ADMIN_CREATE_TEST)}>
                {!collapsed && "Создать тест"}
            </MenuItemWithCollapse>
            <MenuItemWithCollapse
                icon={<FiFileText style={{ color: colors.testing }} />}
                component={<Link to={ROUTES.ADMIN_MY_TESTS} />}
                active={currentPath.startsWith(ROUTES.ADMIN_MY_TESTS)}>
                {!collapsed && "Мои тесты"}
            </MenuItemWithCollapse>
            <CategoryHeader title="Профиль" color={colors.profile} />
            <MenuItemWithCollapse
                icon={<FiUser style={{ color: colors.profile }} />}
                component={<Link to={ROUTES.ADMIN_PROFILE} />}
                active={currentPath.startsWith(ROUTES.ADMIN_PROFILE)}>
                {!collapsed && "Профиль"}
            </MenuItemWithCollapse>
        </>
    )

    const userMenuItems = (
        <>
            <MenuItemWithCollapse
                icon={<FiHome style={{ color: colors.primary }} />}
                component={<Link to={ROUTES.HOME} />}
                active={currentPath === ROUTES.HOME}
                style={{
                    marginBottom: "8px",
                    borderBottom: `1px solid ${colors.border}`,
                    paddingBottom: "8px",
                }}>
                {!collapsed && "Главная"}
            </MenuItemWithCollapse>
            <CategoryHeader title="Профиль" color={colors.profile} />
            <MenuItemWithCollapse
                icon={<FiUser style={{ color: colors.profile }} />}
                component={<Link to={ROUTES.PROFILE} />}
                active={currentPath.startsWith(ROUTES.PROFILE)}>
                {!collapsed && "Профиль"}
            </MenuItemWithCollapse>

            <CategoryHeader title="Тестирование" color={colors.testing} />
            <MenuItemWithCollapse
                icon={<FiEdit style={{ color: colors.testing }} />}
                component={<Link to={ROUTES.CREATE_TEST} />}
                active={currentPath.startsWith(ROUTES.CREATE_TEST)}>
                {!collapsed && "Создать тест"}
            </MenuItemWithCollapse>
            <MenuItemWithCollapse
                icon={<FiFileText style={{ color: colors.testing }} />}
                component={<Link to={ROUTES.MY_TESTS} />}
                active={currentPath.startsWith(ROUTES.MY_TESTS)}>
                {!collapsed && "Мои тесты"}
            </MenuItemWithCollapse>
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
                            onClick={toggleCollapse}
                            style={{
                                fontWeight: 600,
                                borderBottom: `1px solid ${colors.border}`,
                                padding: "14px 16px",
                            }}
                            icon={<FiMenu />}>
                            {!collapsed && (isAdmin ? "Админ-панель" : "НейроТест")}
                        </MenuItem>

                        {isAdmin ? adminMenuItems : userMenuItems}
                    </Menu>
                </div>

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
