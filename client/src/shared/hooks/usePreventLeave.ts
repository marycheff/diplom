import { useEffect } from "react"

interface UsePreventLeaveOptions {
    shouldPrevent?: boolean
    message?: string
    onBeforeUnload?: () => void
}

export const usePreventLeave = ({
    shouldPrevent = true,
    message = "Вы уверены, что хотите покинуть страницу? Все несохраненные данные будут потеряны.",
    onBeforeUnload,
}: UsePreventLeaveOptions = {}) => {
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (shouldPrevent) {
                e.preventDefault()
                e.returnValue = message

                if (onBeforeUnload) {
                    onBeforeUnload()
                }

                return message
            }
        }

        const handlePopState = (e: PopStateEvent) => {
            if (shouldPrevent) {
                if (!window.confirm(message)) {
                    e.preventDefault()
                    window.history.pushState(null, "", window.location.href)
                }
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        window.addEventListener("popstate", handlePopState)
        window.history.pushState(null, "", window.location.href)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
            window.removeEventListener("popstate", handlePopState)
        }
    }, [shouldPrevent, message, onBeforeUnload])
}
