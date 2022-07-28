import React, {useEffect, useLayoutEffect, useRef, useState} from "react";

const axios = require('axios');

export const Table = () => {
    //массив для вывода элементов пагинации
    const PagNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    //массив для асинхронного вызова апи юзеров
    let UsersParsArr = []
    PagNumbers.forEach(i => {
        UsersParsArr.push(`http://localhost:3001/user?start=${i - 1}`)
    })
    //инишал значения массивов с данными и текущай странички пагинации
    let [users, setUsers] = useState([])
    let [promos, setPromos] = useState([])
    let [currentPage, setCurrentPage] = useState(1)
    // функции ля подгрузки массивов
    const fetchUsers = async () => {
        let result = await axios.get(`http://localhost:3001/users`).then(
            // деламе задержку $ответа.
            // после получения ответа в ответ кладем новый промис
            // новый промис возвращает таймаут из которого возвращается наш $ответ.
            value => new Promise(resolve => {
                setTimeout(() => {
                    resolve(value)
                }, 5000)
            })
        )
        console.log(result.data)
        setUsers(result.data)
    }
    const fetchUsersAsync = async () => {
        //присваиваем пользователям ноль
        setUsers([0])
        // в массив результатов кладем результат промиса
        // каждый промис имеет задержку (setTimeout)
        // на каждой итрации мапится массив результатов, после чего присваиваем пользователям этот массив
        let results = []
        for (let url of UsersParsArr) {
            let result = await axios.get(url).then(value => new Promise(resolve => {
                setTimeout(() => {
                    resolve(value)
                }, 1000)
            }))
            results.push(result.data)
            results = results.map(i => {
                if (i[0]) {
                    return i[0]
                }
                return i
            })
            setUsers(results)
        }
        /*UsersParsArr.map(async (i) => {
            let result = await axios.get(i).then(
                value => new Promise(resolve => {
                    setTimeout(() => {
                        resolve(value)
                    }, 2000)
                })
            ).then(data => new Promise(resolve => {
                results.push(data)
                setUsers(results)
                console.log(results)
            }))
        })*/
    }
    const fetchPromos = async (limit = 10, step = 0) => {
        let result = await axios.get(`http://localhost:3001/promos-pagination?start=${(step) * limit}&end=${limit}`)
        let arr = result.data.map((promo) => {
            if (users.length === 0 || users[0] === 0) {
                promo.creator = "loading..."
            }
            else {
                let usersIds = []
                users.map(i => usersIds.push(i.id))
                if (usersIds.indexOf(promo.creator) !== -1) {
                    promo.creator = users[promo.creator].username
                } else {
                    promo.creator = "loading..."
                }
            }
            return promo
        })
        setPromos(arr)
    }
    // подгружаем данные, если длинна массивов 0
    useEffect(() => {
        if (users.length === 0) {
            fetchUsers()
        }
    }, [users])
    useEffect(() => {
        if (promos.length === 0) {
            fetchPromos()
        } else {
            //можно сделать через отдельную функцию, которая мапит уже имеющийся массив промиков
            fetchPromos(10, currentPage - 1)
        }
    }, [currentPage, users])
    // рендер
    return (
        <div className={"table"}>
            <div className={"table__left"}>
                <h2>Users</h2>
                <hr style={{width: "100%", border: "1px solid black"}}/>
                <div className={"top__btns"}>
                    <button className={"top__btns-item"}
                            onClick={() => {
                                setUsers([0]);
                                fetchUsers();
                            }}
                    >All
                    </button>
                    <button className={"top__btns-item"}
                            onClick={() => {
                                fetchUsersAsync();
                            }}
                    >Async
                    </button>
                </div>
                {/* этот блок можно выводить из массива, ниже пример как*/}
                <div className={"table__item-title"}>
                    <div className={"table__item-title-text"} key={"1"}>
                        <strong>id</strong>
                    </div>
                    <div className={"table__item-title-text"} key={"2"}>
                        <strong>username</strong>
                    </div>
                    <div className={"table__item-title-text"} key={"3"}>
                        <strong>password</strong>
                    </div>
                </div>
                {/*
                пример как выводить из массива
                сначала проверили что длинна массива не 0 (если ноль то вывели лоадинг)
                вывели в цикле одну и туже компоненту с разными значенияи из массива
                */}
                {
                    (users.length === 0 || users[0] === 0)
                        ? <p>loading...</p>
                        : users.map((i, n) => {
                            return (
                                <div className={"table__item"} key={n}>
                                    <div className={"table__item-c1"} key={"table__item-c1" + n}>
                                        {i.id}
                                    </div>
                                    <div className={"table__item-c2"} key={"table__item-c2" + n}>
                                        {i.username}
                                    </div>
                                    <div className={"table__item-c3"} key={"table__item-c3" + n}>
                                        {i.password}
                                    </div>
                                </div>
                            )
                        })
                }
            </div>

            <div className={"table__right"}>
                <h2>Promos</h2>
                <hr style={{width: "100%", border: "1px solid black"}}/>

                <div className={"pagination"}>
                    {
                        (promos.length === 0)
                            ? <p>loading...</p>
                            :
                            PagNumbers.map(i => {
                                return (
                                    <div
                                        className={(currentPage === i) ? "pagination__item select" : "pagination__item"}
                                        key={i}
                                        onClick={(e) => {
                                            setCurrentPage(i)
                                        }}
                                    >
                                        {i}
                                    </div>
                                )
                            })

                    }
                </div>

                <div className={"table__item-title"}>
                    <div className={"table__item-title1"} key={"1"}>
                        <strong>promo</strong>
                    </div>
                    <div className={"table__item-title1"} key={"2"}>
                        <strong>use_count</strong>
                    </div>
                    <div className={"table__item-title1"} key={"3"}>
                        <strong style={{color: 'white'}}>creator/username</strong>
                    </div>
                </div>
                {
                    (promos.length === 0)
                        ? <p>loading...</p>
                        : promos.map((i, n) => {
                            return (
                                <div className={"table__item"} key={"table__item" + n}>
                                    <div className={"table__item-c1"} key={"table__item-c1" + n}>
                                        {i.promo}
                                    </div>
                                    <div className={"table__item-c2"} key={"table__item-c2" + n}>
                                        {i.use_count}
                                    </div>
                                    <div className={"table__item-c3"} key={"table__item-c3" + n}>
                                        {i.creator}
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}