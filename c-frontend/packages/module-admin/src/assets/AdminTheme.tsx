import {createMuiTheme} from "@material-ui/core/styles";
import primary from '@material-ui/core/colors/deepPurple';
import {PaletteType} from "@material-ui/core";

let theme = (pallete:PaletteType)=>createMuiTheme({
    palette: {
        primary: {
            light:  primary[200],
            main:  primary[300],
            dark: primary[500],
        },
        type:pallete
    },
});


export default theme;
