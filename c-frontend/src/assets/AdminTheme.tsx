import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import primary from '@material-ui/core/colors/deepPurple';
let theme = createMuiTheme({
    palette: {
        primary: {
            light:  primary[200],
            main:  primary[300],
            dark: primary[500],
        },
        type: "dark"
    }
});


export default theme;
