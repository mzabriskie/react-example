import React, {Component} from 'react';
import cookie from "react-cookie";

import {getUser, getUserAccounts} from '../../utils/ps-api'


export default class Date extends Component {
    constructor() {
        super()
        this.state = {user: {}, accounts: []}

        // console.log(cookie.load('access_token'));
        // if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
        //     console.log("constractor " + cookie.load('access_token'));
        //     window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002")
        // }
        this.setCookie();

        setTimeout(function () {
            if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
                console.log("constractor " + cookie.load('access_token'));
                window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read+categories.read+transactions.write&redirect_uri=http://localhost:3002")
            }
        },0) ;
    }


    render() {
        return <div>date</div>
    }
}

