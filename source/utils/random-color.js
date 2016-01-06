import Colors from "material-ui/lib/styles/colors";

const underWhite = [
    Colors.red800,
    Colors.red900,
    Colors.redA700,

    Colors.pink800,
    Colors.pink900,
    Colors.pinkA700,

    Colors.purple800,
    Colors.purple900,
    Colors.purpleA700,

    Colors.deepPurple800,
    Colors.deepPurple900,
    Colors.deepPurpleA700,

    Colors.indigo800,
    Colors.indigo900,
    Colors.indigoA700,

    Colors.blue800,
    Colors.blue900,
    Colors.blueA700,

    Colors.lightBlue800,
    Colors.lightBlue900,
    Colors.lightBlueA700,

    Colors.cyan800,
    Colors.cyan900,

    Colors.teal800,
    Colors.teal900,

    Colors.green800,
    Colors.green900,

    Colors.lightGreen800,
    Colors.lightGreen900,

    Colors.lime900,

    Colors.orange800,
    Colors.orange900,

    Colors.deepOrange800,
    Colors.deepOrange900,
    Colors.deepOrangeA700,

    Colors.brown800,
    Colors.brown900,

    Colors.blueGrey800,
    Colors.blueGrey900,

    Colors.grey800,
    Colors.grey900
];

const underBlack = [
    Colors.red50,
    Colors.red100,
    Colors.red200,
    Colors.red300,
    Colors.redA100,

    Colors.pink50,
    Colors.pink100,
    Colors.pink200,
    Colors.pinkA100,

    Colors.purple50,
    Colors.purple100,
    Colors.purple200,
    Colors.purpleA100,

    Colors.deepPurple50,
    Colors.deepPurple100,
    Colors.deepPurple200,
    Colors.deepPurpleA100,

    Colors.indigo50,
    Colors.indigo100,
    Colors.indigo200,
    Colors.indigoA100,

    Colors.blue50,
    Colors.blue100,
    Colors.blue200,
    Colors.blue300,
    Colors.blueA100,

    Colors.lightBlue50,
    Colors.lightBlue100,
    Colors.lightBlue200,
    Colors.lightBlue300,
    Colors.lightBlueA100,
    Colors.lightBlueA200,

    Colors.cyan50,
    Colors.cyan100,
    Colors.cyan200,
    Colors.cyan300,
    Colors.cyanA100,
    Colors.cyanA200,

    Colors.teal50,
    Colors.teal100,
    Colors.teal200,
    Colors.teal300,
    Colors.tealA100,
    Colors.tealA200,

    Colors.green50,
    Colors.green100,
    Colors.green200,
    Colors.green300,
    Colors.greenA100,
    Colors.greenA200,

    Colors.lightGreen50,
    Colors.lightGreen100,
    Colors.lightGreen200,
    Colors.lightGreen300,
    Colors.lightGreenA100,
    Colors.lightGreenA200,

    Colors.lime50,
    Colors.lime100,
    Colors.lime200,
    Colors.lime300,
    Colors.limeA100,
    Colors.limeA200,

    Colors.yellow50,
    Colors.yellow100,
    Colors.yellow200,
    Colors.yellow300,
    Colors.yellowA100,
    Colors.yellowA200,

    Colors.amber50,
    Colors.amber100,
    Colors.amber200,
    Colors.amber300,
    Colors.amberA100,
    Colors.amberA200,

    Colors.orange50,
    Colors.orange100,
    Colors.orange200,
    Colors.orange300,
    Colors.orangeA100,
    Colors.orangeA200,

    Colors.deepOrange50,
    Colors.deepOrange100,
    Colors.deepOrange200,
    Colors.deepOrange300,
    Colors.deepOrangeA100,
    Colors.deepOrangeA200,

    Colors.brown50,
    Colors.brown100,
    Colors.brown200,

    Colors.blueGrey50,
    Colors.blueGrey100,
    Colors.blueGrey200,
    Colors.blueGrey300,

    Colors.grey50,
    Colors.grey100,
    Colors.grey200,
    Colors.grey300
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
