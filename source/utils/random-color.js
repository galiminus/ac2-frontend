import {
    red800,
    red900,
    redA700,

    pink800,
    pink900,
    pinkA700,

    purple800,
    purple900,
    purpleA700,

    deepPurple800,
    deepPurple900,
    deepPurpleA700,

    indigo800,
    indigo900,
    indigoA700,

    blue800,
    blue900,
    blueA700,

    lightBlue800,
    lightBlue900,
    lightBlueA700,

    cyan800,
    cyan900,

    teal800,
    teal900,

    green800,
    green900,

    lightGreen800,
    lightGreen900,

    lime900,

    orange800,
    orange900,

    deepOrange800,
    deepOrange900,
    deepOrangeA700,

    brown800,
    brown900,

    blueGrey800,
    blueGrey900,

    grey800,
    grey900,

    red50,
    red100,
    red200,
    red300,
    redA100,

    pink50,
    pink100,
    pink200,
    pinkA100,

    purple50,
    purple100,
    purple200,
    purpleA100,

    deepPurple50,
    deepPurple100,
    deepPurple200,
    deepPurpleA100,

    indigo50,
    indigo100,
    indigo200,
    indigoA100,

    blue50,
    blue100,
    blue200,
    blue300,
    blueA100,

    lightBlue50,
    lightBlue100,
    lightBlue200,
    lightBlue300,
    lightBlueA100,
    lightBlueA200,

    cyan50,
    cyan100,
    cyan200,
    cyan300,
    cyanA100,
    cyanA200,

    teal50,
    teal100,
    teal200,
    teal300,
    tealA100,
    tealA200,

    green50,
    green100,
    green200,
    green300,
    greenA100,
    greenA200,

    lightGreen50,
    lightGreen100,
    lightGreen200,
    lightGreen300,
    lightGreenA100,
    lightGreenA200,

    lime50,
    lime100,
    lime200,
    lime300,
    limeA100,
    limeA200,

    yellow50,
    yellow100,
    yellow200,
    yellow300,
    yellowA100,
    yellowA200,

    amber50,
    amber100,
    amber200,
    amber300,
    amberA100,
    amberA200,

    orange50,
    orange100,
    orange200,
    orange300,
    orangeA100,
    orangeA200,

    deepOrange50,
    deepOrange100,
    deepOrange200,
    deepOrange300,
    deepOrangeA100,
    deepOrangeA200,

    brown50,
    brown100,
    brown200,

    blueGrey50,
    blueGrey100,
    blueGrey200,
    blueGrey300,

    grey50,
    grey100,
    grey200,
    grey300
} from "material-ui/styles/colors";

const underWhite = [
    red800,
    red900,
    redA700,

    pink800,
    pink900,
    pinkA700,

    purple800,
    purple900,
    purpleA700,

    deepPurple800,
    deepPurple900,
    deepPurpleA700,

    indigo800,
    indigo900,
    indigoA700,

    blue800,
    blue900,
    blueA700,

    lightBlue800,
    lightBlue900,
    lightBlueA700,

    cyan800,
    cyan900,

    teal800,
    teal900,

    green800,
    green900,

    lightGreen800,
    lightGreen900,

    lime900,

    orange800,
    orange900,

    deepOrange800,
    deepOrange900,
    deepOrangeA700,

    brown800,
    brown900,

    blueGrey800,
    blueGrey900,

    grey800,
    grey900
];

const underBlack = [
    red50,
    red100,
    red200,
    red300,
    redA100,

    pink50,
    pink100,
    pink200,
    pinkA100,

    purple50,
    purple100,
    purple200,
    purpleA100,

    deepPurple50,
    deepPurple100,
    deepPurple200,
    deepPurpleA100,

    indigo50,
    indigo100,
    indigo200,
    indigoA100,

    blue50,
    blue100,
    blue200,
    blue300,
    blueA100,

    lightBlue50,
    lightBlue100,
    lightBlue200,
    lightBlue300,
    lightBlueA100,
    lightBlueA200,

    cyan50,
    cyan100,
    cyan200,
    cyan300,
    cyanA100,
    cyanA200,

    teal50,
    teal100,
    teal200,
    teal300,
    tealA100,
    tealA200,

    green50,
    green100,
    green200,
    green300,
    greenA100,
    greenA200,

    lightGreen50,
    lightGreen100,
    lightGreen200,
    lightGreen300,
    lightGreenA100,
    lightGreenA200,

    lime50,
    lime100,
    lime200,
    lime300,
    limeA100,
    limeA200,

    yellow50,
    yellow100,
    yellow200,
    yellow300,
    yellowA100,
    yellowA200,

    amber50,
    amber100,
    amber200,
    amber300,
    amberA100,
    amberA200,

    orange50,
    orange100,
    orange200,
    orange300,
    orangeA100,
    orangeA200,

    deepOrange50,
    deepOrange100,
    deepOrange200,
    deepOrange300,
    deepOrangeA100,
    deepOrangeA200,

    brown50,
    brown100,
    brown200,

    blueGrey50,
    blueGrey100,
    blueGrey200,
    blueGrey300,

    grey50,
    grey100,
    grey200,
    grey300
];

const colorsByTextColor = {
    white: underWhite,
    black: underBlack,
    any: underWhite.concat(underBlack)
};

function hashString(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = hash + seed.charCodeAt(i);
    }
    return hash;
}

function randomColor(seed, textColor = "white") {
    if (seed.length === 0) {
        return "transparent";
    }

    const colors = colorsByTextColor[textColor];

    return (colors[hashString(seed) % colors.length]);
}

export default randomColor;
