import axios from 'axios';
import cookie from "react-cookie";

const BASE_URL = 'https://api.pocketsmith.com';

export {getUser, getUserAccounts, refreshToken};

// function getUser() {
//     const url = `${BASE_URL}/v2/me`;
//     return axios.get(url, {
//         headers: {
//             Authorization: "Bearer " + cookie.load('access_token')
//         }
//     }).then(([user]) => ({user: user.data}));
// }


// function getUser() {
//     return axios.all([
//         axios.get(`${BASE_URL}/v2/me`, {
//             headers: {
//                 Authorization: "Bearer " + cookie.load('access_token')
//             }
//         })
//     ])
//         .then(([user]) => ({user: user.data}));
// }

// function getUser() {
//     return axios.get(`${BASE_URL}/v2/me`, {
//         headers: {
//             Authorization: "Bearer " + cookie.load('access_token')
//         }
//     }).then((users) => {
//         {user: users.data}
//
//     })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
function getUser() {
    refreshToken("user");

    return axios.get(`${BASE_URL}/v2/me`, {
        headers: {
            Authorization: "Bearer " + cookie.load('access_token')
        }
    }).then((users) => ({user: users.data}))
        .catch(function (error) {
            console.log(error);
        });
}

function getUserAccounts(userId) {
    refreshToken("accounts");

    return axios.get(`${BASE_URL}/v2/users/${userId}/transaction_accounts`, {
        headers: {
            Authorization: "Bearer " + cookie.load('access_token')
        }
    }).then((userAccounts) => ({accounts: userAccounts.data}))
        .catch(function (error) {
            console.log(error);
        });
}

function refreshToken(xx) {

    var token_cookie = cookie.load('access_token');
    if (token_cookie == "" || token_cookie == null) {
        console.log(xx + token_cookie);
        // console.log("refresh " + token_cookie)
        window.open("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002", "login", "width=200,height=200,scrollbars=no");
    }
}