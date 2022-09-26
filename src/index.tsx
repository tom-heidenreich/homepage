import { MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { FireTheme } from './theme';

import TitleBar from './components/TitleBar/TitleBar'; 

import App from './pages/App/App';
import About from './pages/About/About';
import { ThemeSwitchProvider } from './modules/useThemeSwitch';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<Index />)

const router = createBrowserRouter([
    { path: '/', element: <PageWithTitle element={<App />} /> },
    { path: '/about', element: <PageWithTitle element={<About />} /> },
])

function PageWithTitle({ element }: { element: JSX.Element }) {
    return (
        <>
            <TitleBar />
            {element}
        </>
    )
}

function Index() {

    const [theme, setTheme] = useState(FireTheme);

    return (
        <React.StrictMode>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={theme}
            >
                <ThemeSwitchProvider
                    theme={theme}
                    onChange={setTheme}
                    themes={{
                        'fire': FireTheme
                    }}
                >
                    <RouterProvider router={router} />
                </ThemeSwitchProvider>
            </MantineProvider>
        </React.StrictMode>
    )
};

reportWebVitals();