// export default {
//     login: user =>{
//         return fetch('user/login', {
//             method: 'post',
//             body: JSON.stringify(user),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then (res =>  if(res.status !== 401){
//                 return res.json().then(data=>data)
//             } else{
//                 return {isAuthenticated: false, user: {userName: ''}}
//             }
//     },

//     register: user =>{
//         return fetch('/band', {
//             method: 'post',
//             body: JSON.stringify(user),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//     },

//     logout: () => {
//         return fetch('/user/logout')
//         .then(res => res.json())
//         .then(data=> data)
//     },

//     isAuthenticated: () => {
//         return fetch('/user/authenicated')
//         .then(res=>{
//             if(res.status !== 401){
//                 return res.json().then(data=>data)
//             } else{
//                 return {isAuthenticated: false, user: {userName: ''}}
//             }
//         })
//     }
// }