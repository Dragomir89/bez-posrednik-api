if(process.env.NODE_ENV == 'production'){
    console.log('PROD')
    module.exports = require('./prod')
}else if(process.env.NODE_ENV == "staging"){
    console.log('STG')
    module.exports = require('./stg')
}else{
    console.log('LOCAL')
    module.exports = require('./local')
}