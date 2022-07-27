import React from "react";
import {List, Datagrid, TextField, Pagination} from 'react-admin';

const PostPagination = props => <Pagination rowsPerPageOptions={[8, 25, 50, 100]} {...props} />;

export const ListUsers = () => (
    <List>
        <Datagrid>
            <TextField source={"id"}/>
            <TextField source={"username"}/>
            <TextField source={"password"}/>
        </Datagrid>
    </List>
)

export const ListPromos = () => (
    <List>
        <Datagrid>
            <TextField source={"id"}/>
            <TextField source={"promo"}/>
            <TextField source={"use_count"}/>
            <TextField source={"date.start"}/>
            <TextField source={"date.end"}/>
            <TextField source={"creator"}/>
        </Datagrid>
    </List>
)