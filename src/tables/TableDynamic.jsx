import React from "react";
import {Admin, ListGuesser, Resource} from "react-admin";
import {dataProvider} from "../data-providers/dynamic";
import {ListPromos, ListUsers} from "./List";

export const TableDynamic = () => {
    return(
        <Admin dataProvider={dataProvider}>
            <Resource
                name={"users"}
                list={ListUsers}
            />

            <Resource
                name={"promos"}
                /*list={ListGuesser}*/
                list={ListPromos}
            />
        </Admin>
    )
}