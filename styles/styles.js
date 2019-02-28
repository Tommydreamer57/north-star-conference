import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export const Window = {
    height,
    width,
};

export const Colors = {
    green: "#C8C751",
    blueGreen: "#60A471",
    blue: "#00849B",
    yellow: "#44CC22",
    white: "#FFFFFF",
    black: "#000000",
};

export default StyleSheet.create({
    view: {
        backgroundColor: Colors.white,
        paddingTop: 24,
        paddingBottom: 48,
        paddingLeft: 18,
        paddingRight: 18,
        flex: 1,
        flexGrow: 1,
    },
    h1: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    h2: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    h3: {
        fontSize: 12,
        color: Colors.blue,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    h4: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    paragraph: {

    },
    speakerphoto: {
        height: height / 3,
        width: width / 2,
    },
    input: {
        margin: 5,
        padding: 5,
        borderColor: Colors.black,
        borderWidth: 1,
    },
});
