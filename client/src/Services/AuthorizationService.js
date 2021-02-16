const AuthServices = {
    login: user =>{
        return fetch('/api/dbRoutes/user/login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then (res => {  
            if(res.status !== 401){
                return res.json().then(data=>data)
            } else{
                return {isAuthenticated: false, user: {userName: ''}}
            }
    })},
    register: user =>{
        return fetch('/api/dbRoutes/band', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    logout: () => {
        return fetch('/api/dbRoutes/user/logout')
        .then(res => res.json())
        .then(data=> data)
    },

    isAuthenticated: () => {
        return fetch('/api/dbRoutes/user/authenticated')
        .then(res=>{
            if(res.status !== 401){
                console.log(res)
                return res.json().then(data=>data)
            } else{
                return {isAuthenticated: false, user: {userName: ''}}
            }
        })
    }
}
export default AuthServices;