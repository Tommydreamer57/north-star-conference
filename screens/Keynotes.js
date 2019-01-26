import React, { Component } from 'react';

import {
    ScrollView,
    View,
    Text,
} from 'react-native';

import {
    getItem,
} from '../service/storage-service';

export default class Keynotes extends Component {

    state = {
        keynotes: [],
    };

    componentDidMount = async () => {
        const keynotes = await getItem("keynotes");
        this.setState({ keynotes });
    }

    render = () => {
        const {
            state: {
                keynotes,
            },
        } = this;
        return (
            <ScrollView>
                <Text>
                    KEYNOTES
                </Text>
                <View>
                    {keynotes.map(({
                        id,
                        title,
                        speakername,
                    }) => (
                            <View
                                key={id}
                            >
                                <Text>
                                    {title}
                                </Text>
                                <Text>
                                    {speakername}
                                </Text>
                            </View>
                        ))}
                </View>
            </ScrollView>
        );
    }
}
