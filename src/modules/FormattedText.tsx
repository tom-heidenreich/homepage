import { Text, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react';

export default function FormattedText({ string }: { string: string }) {

    const theme = useMantineTheme();

    const [formatted, setFormatted] = useState<(string | JSX.Element)[]>([]);

    useEffect(() => {
        const buffer: (string | JSX.Element)[] = []

        const stringBuffer: string[] = []
        const optionsBuffer: string[] = []

        let ignoreNext = false

        let inOptions = 0
        let inHighlight = false
        let inLink = false

        let options: any = {} 

        // iterate over string
        for(const c of string) {

            if(c === '\\' && !ignoreNext) {
                ignoreNext = true
                continue
            } else if(ignoreNext) {
                stringBuffer.push(c)
                ignoreNext = false
                continue
            }

            // add options between ?{}
            if(c === '?') {
                inOptions = 1
                continue
            }
            else if(c === '{' && inOptions === 1) {
                inOptions = 2
                continue
            }
            else if(inOptions === 2) {
                if(c === '}') {
                    options = JSON.parse(`{${optionsBuffer.join('')}}`)
                    optionsBuffer.length = 0
                    inOptions = 0
                }else {
                    optionsBuffer.push(c)
                }
                continue
            }

            // add <br/> if char is newline
            if(c === '\n') {
                buffer.push(stringBuffer.join(''));
                buffer.push(<br key={Math.random()} />);
                stringBuffer.length = 0;
            }
            // highlight text between * and *
            else if(c === '*') {
                if(inHighlight) {
                    buffer.push(<Text
                        key={Math.random()}
                        component='span'
                        color={theme.primaryColor}
                        {...options}
                    >{stringBuffer.join('')}</Text>);
                    stringBuffer.length = 0;
                }else {
                    buffer.push(stringBuffer.join(''));
                    stringBuffer.length = 0;
                }
                inHighlight = !inHighlight;
            }
            // add link between []
            else if(c === '[' && !inLink) {
                inLink = true
                buffer.push(stringBuffer.join(''));
                stringBuffer.length = 0;
            }
            else if(c === ']' && inLink) {
                inLink = false
                buffer.push(<Text
                    key={Math.random()}
                    component='a'
                    {...options}
                >{stringBuffer.join('')}</Text>);
                stringBuffer.length = 0;
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