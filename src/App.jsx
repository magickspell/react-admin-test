import React, {useEffect, useState} from "react";
import {Admin, Resource, ListGuesser} from 'react-admin';
import {Navbar} from "./components/Navbar";
import {TableDynamic} from "./tables/TableDynamic";
import {TableStatic} from "./tables/TableStatic";
import {Table} from "./components/Table";

export const App = () => {

    let [page, setPage] = useState('static')
    useEffect(() => {
        console.log(`current page: ${page}`)
    }, [page])

    return (
        <>

            {(() => {
                switch (page) {
                    case 'static':
                        return <TableStatic/>
                    case 'dynamic':
                        return <TableDynamic/>
                    case 'my-page':
                        return <Table/>
                    default:
                        return null
                }
            })()}

            <Navbar page={page} setPage={setPage}/>

        </>
    )
}