import { MantineThemeOverride } from "@mantine/core";

export const FireTheme: MantineThemeOverride = {
    colorScheme: 'dark',
    colors: {
        fire_opal: ['#ffe8e4', '#f8c1bc', '#ed9891', '#e57067', '#dd483c', '#c32e22', '#98231a', '#6e1812', '#430d08', '#1d0100'],
        red_salsa: ['#ffe1e6', '#ffb1b9', '#ff7f8b', '#ff4c5e', '#ff1a30', '#e60016', '#b40010', '#81000a', '#500004', '#210000']
    },
    primaryColor: 'fire_opal',
    primaryShade: 4,
    defaultGradient: {
        from: '#e57067',    // fire_opal[3]
        to: '#ff4c5e',      // red_salsa[3]
        deg: 45
    }
}