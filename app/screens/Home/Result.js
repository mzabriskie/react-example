import React, {Component} from 'react';
import cookie from "react-cookie";

import {getUser, getUserAccounts} from '../../utils/ps-api'


export default class Result extends Component {
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
                window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002")
            }
        },0) ;
    }

    setCookie() {
        if (window.location.hash != "" && window.location.hash != null) {
            var hash = window.location.hash;
            // console.log("xx" + hash);
            var res = hash.split("&");
            var access_token = /=(.+)/.exec(res[0])[1];
            // console.log(hash);
            cookie.save("access_token", access_token, {maxAge: 3000});
        }
        console.log(cookie.load('access_token'))
    }

    getUserData() {
        getUser()
            .then(({user}) => {
                this.setState({user});
                cookie.save("user_id", user.id);
                console.log(cookie.load('user_id'));
                this.getUserAccountsData();
            });
    }

    getUserAccountsData() {
        getUserAccounts(cookie.load('user_id'))
            .then(({accounts}) => {
                this.setState({accounts});
                // console.log({accounts});
            });
    }

    componentDidMount() {
        if (cookie.load('access_token') != "" && cookie.load('access_token') != null) {
            this.getUserData();
            // console.log(cookie.load('user_id'));


        }

    }


    render() {
        var output = null;
        const user = this.state.user;
        console.log(user);
        const accounts = this.state.accounts;
        if (accounts.length != 0) {
            console.log(accounts.length);

            output =
                <section className="container home">
                    {/*<a href="https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002">login</a>*/}
                    {/*<a className="{ ? 'hide' : 'show' }"*/}
                    {/*href="https://my.pocketsmith.com/logout?redirect_uri=http://localhost:3002">logout</a>*/}
                    <h2>{user.name}</h2>
                    {this.state.accounts.map((item) => {
                        return <div key={item.id}>{item.name}</div>
                    }) }
                    {/*<h2>{accounts[0].name}</h2>*/}
                </section>
            ;
        }

        return output;
    }
}

