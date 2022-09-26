import { MantineThemeOverride } from "@mantine/core"
import { createContext, useContext } from "react"

const ThemeSwitchContext = createContext<{
    theme: MantineThemeOverride
    setTheme: (theme: string) => void,
    themes: {
        [key: string]: MantineThemeOverride
    },
    toggleColorMode: () => void,
}>({
    theme: {},
    setTheme: () => {},
    themes: {},
    toggleColorMode: () => {}
})

export function useThemeSwitch() {
    const ctx = useContext(ThemeSwitchContext)
    return {
        ...ctx,
        colorMode: ctx.theme.colorScheme,
    }   
}

type ThemeSwitchProviderProps = {
    children: React.ReactNode
    theme: MantineThemeOverride
    onChange: (theme: MantineThemeOverride) => void,
    themes: {
        [key: string]: MantineThemeOverride
    }
}
export function ThemeSwitchProvider({ children, theme, onChange, themes }: ThemeSwitchProviderProps) {

    function handleThemeChange(theme: string) {
        const selectedTheme = themes[theme]
        if(!selectedTheme) throw new Error(`Theme ${theme} not found`)
        onChange(selectedTheme)
    }

    function toggleColorMode() {
        onChange({
            ...theme,
            colorScheme: theme.colorScheme === 'dark' ? 'light' : 'dark'
        })
    }

    return (
        <ThemeSwitchContext.Provider value={{
            theme,
            setTheme: handleThemeChange,
            themes,
            toggleColorMode
        }}>
            {children}
        </ThemeSwitchContext.Provider>
    )
}