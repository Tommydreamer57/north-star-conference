import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
    render() {
        const {
            props: {
                style,
                ...props
            }
        } = this;
        return (
            <Text
                {...props}
                style={[
                    style,
                    {
                        fontFamily: 'space-mono'
                    }
                ]}
            />
        );
    }
}
