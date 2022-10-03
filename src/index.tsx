import { MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { FireTheme } from './theme';
import { ThemeSwitchProvider } from './modules/useThemeSwitch';

import TitleBar from './components/TitleBar';

import Error404 from './pages/errors/Error404';
import App from './pages/App/App';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { fetchAndActivate, getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
    apiKey: "AIzaSyAC46yYqr87EpxKHK2qqSFWiE3yZAsHEEo",
    authDomain: "homepage-8838c.firebaseapp.com",
    projectId: "homepage-8838c",
    storageBucket: "homepage-8838c.appspot.com",
    messagingSenderId: "99461164692",
    appId: "1:99461164692:web:f1971105ff3f8558d70e81",
    measurementId: "G-2PQ8WB7741"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

getAnalytics(app);
const remoteConfig = getRemoteConfig(app);

// TODO: debug
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

fetchAndActivate(remoteConfig)
.then(() => {
    // render after activation
    root.render(<Index />)
})
.catch((err) => {
    console.error(err);
});

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