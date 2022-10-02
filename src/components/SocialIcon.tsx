import { ActionIcon, Tooltip, useMantineTheme } from "@mantine/core";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { useEffect, useState } from "react";

type SocialIconProps = { name: string, icon: JSX.Element, url: string }
export default function SocialIcon({ name, icon, url }: SocialIconProps) {

    const theme = useMantineTheme();
    const primaryColor = theme.colors[theme.primaryColor]

    const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const analytics = getAnalytics()
        setAnalytics(analytics)
    }, [analytics]);

    function handleClick() {
        // report to analytics
        if(analytics) {
            logEvent(analytics, 'social_impression', {
                name: name,
            })
        }else console.warn('Analytics not initialized')
        window.location.href = url;
    }

    if(!analytics) return null

    return (
        <Tooltip 
            label={name} 
            withArrow
            openDelay={500}
            transition='slide-up'
        >
            <ActionIcon
                onClick={handleClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    color: (hover
                        ? primaryColor[3]
                        : undefined
                    )
                }}
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    )
}