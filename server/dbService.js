const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()
const mybatisMapper = require('mybatis-mapper')
mybatisMapper.createMapper(['./xml/query.xml'])

const dbInfo = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'flow',
    port: 3306
}

let params = {}
    ,query = {}

const connection = mysql.createConnection(dbInfo)
let excQuery
// const dbInfo = {
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// }

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log('🏔 mysql is connected successfully!🏔  threaId : ' + connection.threadId)
})


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }

    static getAllData() {
      
        return new Promise((resolve, reject) => {
            params.sGetList = {}
            query.sGetList = mybatisMapper.getStatement('flow', 'getBannedExtList', params, {language: 'sql', indent: '  '})
            connection.query(query.sGetList, (err, data) => {
                if (err) reject(err.message)
                // console.log(data)
                resolve(data)
            })
        })
    }

    static getAllCheckData() {
      
        return new Promise((resolve, reject) => {
            params.sGetList = {}
            query.sGetList = mybatisMapper.getStatement('flow', 'selectFixedChecked', params, {language: 'sql', indent: '  '})
            connection.query(query.sGetList, (err, data) => {
                if (err) reject(err.message)
                // console.log(data)
                resolve(data)
            })
        })
    }


    static insertBanExt(client) {
        return new Promise((resolve, reject) => {
            params.sInsertBanExt = {
                FW_EXT_NAME: client.name
            }
            query.sInsertBanExt = mybatisMapper.getStatement('flow', 'insertBanExt', params, {language: 'sql', indent: '  '})
            // console.log('real query : ',query.sInsertBanExt)
            connection.query(query.sInsertBanExt, (err, data, fields) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    static insertFixedBanExt(client) {
        return new Promise((resolve, reject) => {
            let existDataCheck =[]
            params.sInsertFixedBanExt = {
                FIXED_EXT_NAME: client.name,
                FIXED_EXT_VALUE: client.value
            }

            query.sSelectFixedBanExt = mybatisMapper.getStatement('flow', 'selectFixedBanExt', params, {language: 'sql', indent: '  '})
            // console.log('real query : ',query.sSelectBanExt)
            connection.query(query.sSelectFixedBanExt, (err, data, fields) => {
                if (err) reject(err)
                data?.length > 0 ? existDataCheck.push(data) : {}
                 
                if (existDataCheck.length > 0){
                    // console.log('do update')
                    query.sUpdateFixedBanExt = mybatisMapper.getStatement('flow', 'UpdateFixedBanExt', params, {language: 'sql', indent: '  '})
                    // console.log('real query : ',query.sUpdateBanExt)
                    connection.query(query.sUpdateFixedBanExt, (err, data, fields) => {
                        if (err) reject(err)
                        resolve(data)
                    })
                } else {
                    query.sInsertFixedBanExt = mybatisMapper.getStatement('flow', 'insertFixedBanExt', params, {language: 'sql', indent: '  '})
                    // console.log('real query : ',query.sInsertBanExt)
                    connection.query(query.sInsertFixedBanExt, (err, data, fields) => {
                        if (err) reject(err)
                        resolve(data)
                    })
                }
            })
            
        })
    }

    static deleteRowById(id) {
        return new Promise((resolve, reject) => {
            params.sDeleteExt = {
                SYS_ID: id
            }
            query.sDeleteExt = mybatisMapper.getStatement('flow', 'deleteBannedExt', params, {language: 'sql', indent: '  '})
            connection.query(query.sDeleteExt, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    static updateNameById(client) {
        return new Promise((resolve, reject) => {
            params.sUpdateExt = {
                SYS_ID: client.id,
                FW_EXT_NAME: client.name
            }
            query.sUpdateExt = mybatisMapper.getStatement('flow', 'updateBannedExt', params, {language: 'sql', indent: '  '})
            connection.query(query.sUpdateExt, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    static searchByName(name) {
        
        return new Promise((resolve, reject) => {
            params.sSearchExt = {
                FW_EXT_NAME: name
            }
            query.sSearchExt = mybatisMapper.getStatement('flow', 'searchExtByName', params, {language: 'sql', indent: '  '})

            connection.query(query.sSearchExt, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}

module.exports = DbService