import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export const Window = {
    height,
    width,
};

export const COLORS = {
    green: "#C8C751",
    blueGreen: "#60A471",
    blue: "#00849B",
    yellow: "#44CC22",
    white: "#FFFFFF",
    black: "#000000",
    gray: "#00000022",
    darkGray: "#00000044"
};

export const SIZES = {
    xxLarge: 24,
    xLarge: 20,
    large: 18,
    mLarge: 15,
    medium: 13,
    mSmall: 12,
    small: 11,
    xSmall: 8,
    xxSmall: 5,
};

export default StyleSheet.create({
    view: {
        backgroundColor: COLORS.white,
        paddingTop: SIZES.xxLarge,
        paddingBottom: SIZES.xxLarge * 3,
        paddingLeft: SIZES.large,
        paddingRight: SIZES.large,
        flex: 1,
        flexGrow: 1,
    },
    // extra large bold
    title: {
        fontSize: SIZES.xxLarge,
        fontWeight: 'bold',
    },
    // large bold
    h1: {
        fontSize: SIZES.xLarge,
        fontWeight: 'bold',
    },
    // medium large bold
    header: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
    },
    // medium large bold blue
    h2: {
        fontSize: SIZES.mLarge,
        fontWeight: 'bold',
        color: COLORS.blue,
    },
    // medium bold
    h3: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
    // medium small italic
    h4: {
        fontSize: SIZES.mSmall,
        fontStyle: 'italic',
    },
    // small
    text: {
        fontSize: SIZES.small,
    },
    speakerphoto: {
        height: Window.width * 0.7,
        width: Window.width * 0.7,
        borderRadius: Window.width * 0.35,
        marginLeft: Window.width * 0.15 - SIZES.large,
        marginRight: Window.width * 0.15 - SIZES.large,
        marginBottom: SIZES.xLarge,
        backgroundColor: COLORS.gray,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchLabel: {
        marginLeft: SIZES.medium,
    },
    input: {
        marginTop: SIZES.xxSmall,
        marginBottom: SIZES.xxSmall,
        padding: SIZES.xxSmall,
        borderColor: COLORS.black,
        borderWidth: 1,
    },
    feedbackLabel: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
    emptySession: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLORS.blue,
        borderWidth: 1,
        borderRadius: SIZES.xxSmall,
        padding: SIZES.small,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.blue,
        borderWidth: 1,
        borderRadius: SIZES.xxSmall,
        padding: SIZES.small,
    },
    buttonText: {
        color: COLORS.blue,
        fontSize: SIZES.mSmall,
        fontWeight: 'bold',
    },
    speakerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLORS.blue,
        borderWidth: 1,
        borderRadius: SIZES.xxSmall,
        padding: SIZES.small,
    },
    speakerButtonText: {
        color: COLORS.black,
        fontSize: SIZES.mSmall,
        fontWeight: 'bold',
        width: '85%'
    },
    speakerButtonArrow: {
        fontSize: SIZES.mSmall,
        fontWeight: 'bold',
        color: COLORS.darkGray,
    },
    breakoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sessionTileBar: {
        height: '100%',
        width: SIZES.xxSmall,
        marginRight: SIZES.small,
    },
    sessionTile: {
        flexDirection: 'row',
        width: Window.width - SIZES.large * 2,
    },
    blueBackground: {
        backgroundColor: COLORS.blue + '44',
    },
    blackBackground: {
        backgroundColor: COLORS.black + '44',
    },
    marginTopSmall: {
        marginTop: SIZES.small,
    },
    marginTopMedium: {
        marginTop: SIZES.medium,
    },
    marginTopXLarge: {
        marginTop: SIZES.xLarge,
    },
    marginTopXxLarge: {
        marginTop: SIZES.xxLarge,
    },
    marginBottomMedium: {
        marginBottom: SIZES.medium,
    },
    marginBottomXxSmall: {
        marginBottom: SIZES.xxSmall,
    },
    marginBottomLarge: {
        marginBottom: SIZES.large,
    },
    marginBottomXLarge: {
        marginBottom: SIZES.xLarge,
    },
    marginBottomXxLarge: {
        marginBottom: SIZES.xxLarge,
    },
    blackText: {
        color: COLORS.black,
    },
});
