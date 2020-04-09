import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableProps,
    TableRow,
    withStyles
} from "@material-ui/core";

export type Column<TData> = {
    field: string,
    label: string,
    render?: (row:TData) => string | React.ElementType
}
export type VSTableProps<TData> = {
    columns: Column<TData>[]
    data:TData[]
}&TableProps;

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
    },
    },
}))(TableRow);

export function VSTable<TData=any>({ columns, data, classes}:VSTableProps<TData>) {
    const renderCell = (row:TData, field:string) => {
        const keyed = row as any as {[key:string]:string};
        return keyed[field];
        
    };
    // Render the UI for your table
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((c, i)=>(<StyledTableCell key={i}>{c.label}</StyledTableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <StyledTableRow key={index}>
                            {columns.map((c, i)=>(<StyledTableCell key={i}>{c.render&&c.render(row)||renderCell(row, c.field)}</StyledTableCell>))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
