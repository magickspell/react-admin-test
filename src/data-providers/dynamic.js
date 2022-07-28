const axios = require('axios');
//const usersProvider = fetch('http://localhost:3001/users');
//http://localhost:3001/promos;
//http://localhost:3001/promos-pagination?start=0&end=11


export const dataProvider = {
    getList: async (resource, params) => {
        const {page, perPage} = params.pagination;
        if (resource === 'users') {
            let result = await axios.get(`http://localhost:3001/users`)
            return {
                data: result.data
                ,
                total: 10
            }
        }
        if (resource === 'promos') {
            let result = await axios.get(`http://localhost:3001/promos-pagination?start=${page}&end=${perPage}`)
            let users = await axios.get(`http://localhost:3001/users`)
            let usersArr = users.data
            let arr = result.data.map((i) => {
                i.id = i._id
                i.date.start = new Date(i.date.start).toLocaleString()
                i.date.end = new Date(i.date.end).toLocaleString()
                for (let user in usersArr) {
                    // тут была ошибка, что я итерировался по номеру элемента
                    // из-за этого всегда подставлял одинаковые имена
                    if (i.creator === usersArr[user].id) {
                        i.creator = usersArr[user].username
                    }
                }
                return i
            })
            return {
                data: arr
                ,
                total: 100
            }
        }
    }
}


