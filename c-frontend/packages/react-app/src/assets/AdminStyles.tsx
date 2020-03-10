import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const drawerWidth = 250;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBarDesktop: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            zIndex: theme.zIndex.drawer + 1,
        },
        flexGrow: {
            flexGrow:1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(2),
            overflow:"auto"
        },
        toolbar: theme.mixins.toolbar,
        menuToolbar:{padding: "10px 35px"},
        nested: {
            paddingLeft: theme.spacing(4),
        },
        activeLink: {
            color: theme.palette.primary.light
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);
