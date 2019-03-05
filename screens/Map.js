import React from 'react';

import {
    Text,
    ScrollView,
    View,
    Image,
} from 'react-native';

import styles, { Window } from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

Map.navigationOptions = createNavigationOptions("Map");

export default function Map() {
    return (
        <ScrollView
            maximumZoomScale={4}
            minimumZoomScale={1}
        >
            <View style={styles.view}>
                <Image
                    source={require('../assets/Map.png')}
                    style={{
                        width: Window.width * 0.9,
                        height: Window.width * 0.9,
                    }}
                />
            </View>
        </ScrollView>
    );
}
