import { Text, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react';

export default function FormattedText({ string }: { string: string }) {

    const theme = useMantineTheme();

    const [formatted, setFormatted] = useState<(string | JSX.Element)[]>([]);

    useEffect(() => {
        const buffer: (string | JSX.Element)[] = []
        const stringBuffer: string[] = []
        let inHighlight = false;
        // iterate over string
        for(const c of string) {
            // add <br/> if char is newline
            if(c === '\n') {
                buffer.push(stringBuffer.join(''));
                buffer.push(<br key={Math.random()} />);
                stringBuffer.length = 0;
            }
            // highlight text between * and *
            else if(c === '*') {
                if(inHighlight) {
                    buffer.push(<Text key={Math.random()} component='span' color={theme.primaryColor}>{stringBuffer.join('')}</Text>);
                    stringBuffer.length = 0;
                }else {
                    buffer.push(stringBuffer.join(''));
                    stringBuffer.length = 0;
                }
                inHighlight = !inHighlight;
            }
            else {
                stringBuffer.push(c);
            }
        }
        // add last string
        buffer.push(stringBuffer.join(''));
        setFormatted(buffer);
    }, [string, theme.colors, theme.primaryColor])

    return (
        <>
            {formatted}
        </>
    );
}