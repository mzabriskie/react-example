import axios from 'axios';
import cookie from "react-cookie";

const BASE_URL = 'https://api.pocketsmith.com/v2';

export {getUser, getUserAccounts, getUserCategories, refreshToken, getNewToken, setCookie};

function setCookie() {
    console.log(cookie.load('access_token'))
    if (window.location.hash != "" && window.location.hash != null) {
        var hash = window.location.hash;
        // console.log("xx" + hash);
        var res = hash.split("&");
        var access_token = /=(.+)/.exec(res[0])[1];
        // console.log(hash);
        var exprDuration = new Date(new Date().getTime() + 3600 * 1000);
        console.log(exprDuration);
        cookie.save("access_token", access_token, {expires: exprDuration});
    }
    // console.log(cookie.load('access_token'))
}


function getUser() {
    refreshToken("user");

    return axios.get(`${BASE_URL}/me`, {
        headers: {
            Authorization: "Bearer " + cookie.load('access_token')
        }
    }).then((users) => ({user: users.data}))
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    getNewToken()
                }
            }
        });
}

function getUserAccounts(userId) {
    refreshToken("accounts");

    return axios.get(`${BASE_URL}/users/${userId}/accounts`, {
        headers: {
            Authorization: "Bearer " + cookie.load('access_token')
        }
    }).then((userAccounts) => ({accounts: userAccounts.data}))
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    getNewToken()
                }
            }
        });
}

function getUserCategories(userId) {
    refreshToken("categories");

    return axios.get(`${BASE_URL}/users/${userId}/categories`, {
        headers: {
            Authorization: "Bearer " + cookie.load('access_token')
        }
    }).then((userCategory) => ({categories: userCategory.data}))
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    getNewToken()
                }
            }
        });
}

function refreshToken(xx) {

    var token_cookie = cookie.load('access_token');
    if (token_cookie == "" || token_cookie === null || token_cookie === undefined) {
        console.log(xx + token_cookie);
        // console.log("refresh " + token_cookie)
        window.open("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002", "login", "width=200,height=200,scrollbars=no");
    }
}

function getNewToken() {
    window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read+categories.read+transactions.write&redirect_uri=http://localhost:3002")
}