// setting up authentication routes for user

export default  {
    // log the user in and if fails return authentication false, and no user name
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
    // log out routes for user to return no user, auth false, and clear cookies all functionality in server
    logout: () => {
        return fetch('/api/dbRoutes/user/logout')
        .then(res => res.json())
        .then(data=> data)
    },
    // takes the JWT token in cookies and check if it is valid or not second step authentication
    isAuthenticated: () => {
        return fetch('/api/dbRoutes/user/authenticated')
        .then(res=>{
            if(res.status !== 401){
                return res.json().then(data=>data)
            } else{
                return {isAuthenticated: false, user: {userName: ''}}
            }
        })
    }
}