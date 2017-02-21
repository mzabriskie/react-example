import React, {Component} from 'react';
import cookie from "react-cookie";
import assign from 'object-assign'

import {getUser, getUserAccounts,setCookie} from '../../utils/ps-api'
import Accounts from './Accounts'
import Date from './Date'
import Category from './Category'
import Details from './Details'
import Amount from './Amount'
import Success from './Success'
import Faild from './Faild'

var fieldValues = {
    accountId: null,
    date: null,
    category: null,
    merchant: null,
    note: null,
    label: [],
    amount:null
}

export default class Transactions extends Component {
    constructor() {
        super()
        this.state = {step: 1}

        // console.log(cookie.load('access_token'));
        // if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
        //     console.log("constractor " + cookie.load('access_token'));
        //     window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002")
        // }
        setCookie();

        setTimeout(function () {
            if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
                console.log("constractor " + cookie.load('access_token'));
                window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002")
            }
        }, 0);
    }
    saveValues (field_value) {
        return function () {
            fieldValues = assign({}, fieldValues, field_value)
        }.bind(this)()
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

