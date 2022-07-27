import React from "react";
import {Admin, ListGuesser, Resource, Pagination } from "react-admin";
import {dataProvider} from "../data-providers/static"
import {ListUsers} from "./List";

//const usersProvider = fetch('http://localhost:3001/users');
//const promosProvider = fetch('http://localhost:3001/promos');
//const PostPagination = () => <Pagination rowsPerPageOptions={[8, 50, 100]} />;

export const TableStatic = () => {
    return(
        <Admin dataProvider={dataProvider}>
            <Resource
                name={"users"}
                list={ListUsers}
            />

            <Resource
                name={"promos"}
                list={ListGuesser}
                pagination={false}
            />
        </Admin>
    )
}