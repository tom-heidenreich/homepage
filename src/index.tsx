import { MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { FireTheme } from './theme';
import { ThemeSwitchProvider } from './modules/useThemeSwitch';

import TitleBar from './components/TitleBar'; 

import App from './pages/App/App';
import About from './pages/About/About';
import Error404 from './pages/errors/Error404';
import Projects from './pages/Projects/Projects';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<Index />)

const router = createBrowserRouter([
    { path: '*', element: <PageWithTitle element={<Error404 />} /> },
    { path: '/', element: <PageWithTitle element={<App />} /> },
    { path: '/about', element: <PageWithTitle element={<About />} /> },
    { path: '/projects', element: <PageWithTitle element={<Projects />} /> },
])

function PageWithTitle({ element }: { element: JSX.Element }) {
    return (
        <TitleBar>
            {element}
        </TitleBar>
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