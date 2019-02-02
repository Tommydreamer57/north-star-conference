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

            name: [
                "BUILD YOUR",
                "SCHEDULE",
            ],
            to: "Schedule",
            // icon: "ios-calendar",
            icon: "ios-add-circle",
        },
        {

            name: [
                "SESSIONS",
            ],
            to: "AllSessions",
            icon: "ios-microphone",
        },
        {
            name: [
                "PROVIDE",
                "FEEDBACK",
            ],
            to: "Feedback",
            icon: "ios-paper",
        },
    ],
    [
        {
            name: [
                "AUCTION"
            ],
            to: "Auction",
            icon: "ios-pricetags",
        },
        {

            name: [
                "MEETING",
                "ROOM MAP",
            ],
            to: "Map",
            icon: "ios-map",
        },
        {

            name: [
                "RECEIVE",
                "NOTIFICATIONS",
            ],
            to: "Notifications",
            icon: "ios-notifications",
        },
    ],
    [
        {

            name: [
                "CONFERENCE",
                "AUDIO",
            ],
            url: "https://vimeo.com/ondemand/northstar2018/256616872",
            icon: "ios-play-circle",
        },
        {

            name: [
                "CONTACT",
                "COMMITTEE",
            ],
            url: "sms:770-530-1892",
            icon: "ios-text",
        },
        {

            name: [
                "DONATE TO",
                "NORTH STAR",
            ],
            url: "https://northstarlds.org/give/donate/",
            icon: "ios-cash",
        },
    ],
];

export default ({
    navigation: {
        navigate,
    },
}) => (
        <ImageBackground
            source={require('../assets/home-background.png')}
            style={styles.background}
        >
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
                            name: [
                                lineOne,
                                lineTwo
                            ],
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
                                            console.log(`Cannot open url: ${url}`)}
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
                                        {lineOne}
                                    </Text>
                                    <Text
                                        style={styles.text}
                                    >
                                        {lineTwo}
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
    text: {
        color: 'white',
        fontSize: 9,
        textAlign: 'center',
    },
    // bottomPadding: {
    //     height: '17%',
    // },
});
