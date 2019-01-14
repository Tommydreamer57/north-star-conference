import React from 'react';

import {
    Linking,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {
    Icon,
} from 'expo';

const links = [
    [
        {

            name: "KEYNOTES",
            to: "Keynotes",
            icon: "ios-contact"
        },
        {

            name: "BREAKOUTS",
            to: "Breakouts",
            icon: "ios-microphone"
        },
        {

            name: "SCHEDULE",
            to: "Schedule",
            icon: "ios-calendar"
        },
    ],
    [
        {

            name: "MAP",
            to: "Map",
            icon: "ios-map"
        },
        {

            name: "MENTORS",
            to: "Mentors",
            icon: "ios-contacts"
        },
        {

            name: "AUDIO",
            url: "https://vimeo.com/ondemand/northstar2018/256616872",
            icon: "ios-play-circle"
        },
    ],
    [
        {

            name: "NOTIFICATIONS",
            to: "Notifications",
            icon: "ios-notifications"
        },
        {
            
            name: "CONTACT",
            url: "sms:770-530-1892",
            icon: "ios-text"
        },
        {
            
            name: "DONATE",
            url: "https://northstarlds.org/give/donate/",
            icon: "ios-cash"
        },
    ],
];

export default ({
    navigation,
    navigation: {
        navigate,
    },
    ...props
}) => (
        <ImageBackground
            source={require('../assets/home-background.png')}
            style={styles.background}
        >
            {console.log(navigation)}
            <View
                style={styles.topPadding}
            />
            <View
                style={styles.links}
            >
                {links.map((row, i) => (
                    <View
                        key={i}
                        style={styles.row}
                    >
                        {row.map(({
                            to,
                            icon,
                            name,
                            url,
                        }, j) => (
                                <TouchableOpacity
                                    key={j}
                                    style={styles.touchable}
                                    onPress={to ?
                                        () => navigate(to)
                                        :
                                        () => Linking.canOpenURL(url) ?
                                            Linking.openURL(url)
                                            :
                                            null}
                                >
                                    <Icon.Ionicons
                                        name={icon}
                                        size={50}
                                        color='white'
                                    // style={styles.icon}
                                    />
                                    <Text
                                        style={styles.text}
                                    >
                                        {name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                ))}
            </View>
            <View
                style={styles.bottomPadding}
            />
        </ImageBackground>
    );

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    topPadding: {
        height: '33%',
    },
    links: {
        height: '50%',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    touchable: {
        // color: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: 'white',
        height: 50,
        width: 50,
    },
    text: {
        color: 'white',
        fontSize: 9,
    },
    // bottomPadding: {
    //     height: '17%',
    // },
});
