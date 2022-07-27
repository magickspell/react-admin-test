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
            let arr = result.data.map((i, n) => {
                i.id = i._id
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


