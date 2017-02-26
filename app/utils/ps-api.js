import axios from 'axios';
import cookie from "react-cookie";

const BASE_URL = 'https://api.pocketsmith.com/v2';
let token_cookie = cookie.load('access_token');

export {getUser, getUserAccounts, getUserCategories, getNewToken, refreshToken, setCookie};

function setCookie() {
    if (window.location.hash != "" && window.location.hash != null) {
        var hash = window.location.hash;
        // console.log("xx" + hash);
        var res = hash.split("&");
        var access_token = /=(.+)/.exec(res[0])[1];
        // console.log(hash);
        var exprDuration = new Date(new Date().getTime() + 10 * 1000);
        console.log(exprDuration);
        cookie.save("access_token", access_token, {expires: exprDuration});

        if (window.opener && window.opener !== window) {
            window.close();
        }
    }
}

function getNewToken() {
    window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read+categories.read+transactions.write&redirect_uri=http://localhost:3002")
}

function getUser() {
    return axios.get(`${BASE_URL}/me`, {
        headers: {
            Authorization: "Bearer " + cookie.load('access_token')
        }
    }).then((users) => ({user: users.data}))
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    refreshToken()
                    setTimeout(function () {
                        getUser()
                    }, 3000);
                    // setTimeout(this.getUser(),5000)
                    // getUser()
                }
            }
        });
}

function getUserAccounts(userId) {
    return axios.get(`${BASE_URL}/users/${userId}/accounts`, {
        headers: {
            Authorization: "Bearer " + cookie.load('access_token')
        }
    }).then((userAccounts) => ({accounts: userAccounts.data}))
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    refreshToken()
                    setTimeout(function () {
                        getUserAccounts(userId);
                    }, 3000);
                }
            }
        });
}

function getUserCategories(userId) {
    return axios.get(`${BASE_URL}/users/${userId}/categories`, {
        headers: {
            Authorization: "Bearer " + token_cookie
        }
    }).then((userCategory) => ({categories: userCategory.data}))
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    refreshToken()
                    setTimeout(function () {
                        getUserAccounts(userId);
                    }, 3000);
                }
            }
        });
}

function refreshToken() {
    window.open("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002", "login", "width=200,height=200,scrollbars=no");
}