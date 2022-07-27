import React, {useEffect, useState} from "react";
import {Admin, Resource, ListGuesser} from 'react-admin';
import {Navbar} from "./components/Navbar";
import {TableDynamic} from "./tables/TableDynamic";
import {TableStatic} from "./tables/TableStatic";

export const App = () => {

    let [page, setPage] = useState('static')
    useEffect(() => {
        console.log(`current page: ${page}`)
    }, [page])

    return (
        <>


            {
                page !== 'static'
                ? <TableDynamic/>
                : <TableStatic/>
            }

            <Navbar page={page} setPage={setPage}/>

        </>
    )
}