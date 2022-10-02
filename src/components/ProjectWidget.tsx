import { Container, Title, Text, useMantineTheme } from "@mantine/core";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { useEffect, useState } from "react";

type ProjectProps = { name: string, short_desc: string, url: string }
export default function Project({ name, short_desc, url }: ProjectProps) {

    const theme = useMantineTheme();

    const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const analytics = getAnalytics()
        setAnalytics(analytics)
    }, [analytics]);

    function handleClick() {
        // report to analytics
        if(analytics) {
            logEvent(analytics, 'post_impression', {
                name: name,
            })
        }else console.warn('Analytics not initialized')
        window.location.href = url
    }

    if(!analytics) return null

    return (
        <Container
            style={{
                width: '17rem',
                userSelect: 'none',
                cursor: 'pointer',
                borderRadius: '1rem',
                backgroundColor: (
                    theme.colorScheme === 'dark'
                        ? (hover
                            ? theme.colors.dark[5]
                            : theme.colors.dark[6]
                        )
                        : (hover
                            ? theme.colors.gray[2]
                            : theme.colors.gray[1]
                        )
                ),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
            px='xl'
            py='md'
        >
            <Title
                size='1.2rem'
            >
                {name}
            </Title>
            <Text>
                {short_desc}
            </Text>
        </Container>
    )
}