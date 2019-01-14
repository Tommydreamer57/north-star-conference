import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
    render() {
        const {
            props: {
                name,
                focused,
            }
        } = this;
        return (
            <Icon.Ionicons
                name={name}
                size={26}
                style={{
                    marginBottom: -3
                }}
                color={focused ?
                    Colors.tabIconSelected
                    :
                    Colors.tabIconDefault}
            />
        );
    }
}