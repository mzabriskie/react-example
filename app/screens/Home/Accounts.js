import React, {Component, PropTypes} from 'react';

import cookie from "react-cookie";
// import LogoImg from '../../../assets/img/logo.png';
import {getUser, getUserAccounts, setCookie, refreshToken, getNewToken} from '../../utils/ps-api'


export default class Accounts extends Component {
    constructor() {
        super();
        this.state = {user: {}, accounts: []}
        setCookie();
        let token_cookie = cookie.load('access_token');
        if (token_cookie == "" || token_cookie == null || token_cookie == undefined) {
            getNewToken();
        }
    }

    getUserData() {
        getUser()
            .then(({user}) => {
                console.log(user);
                this.setState({user});
                cookie.save("user_id", user.id);
                this.getUserAccountsData();
            });
    }

    getUserAccountsData() {
        getUserAccounts(cookie.load('user_id'))
            .then((accounts) => {
                this.setState(accounts);
                console.log(accounts);
            });
    }


    componentDidMount() {
        let token_cookie = cookie.load('access_token');
        if (token_cookie != "" && token_cookie != null) {
            this.getUserData();
        }
    }


    nextStep(id) {
        let data = {
            accountId: id
        }
        console.log(data);
        this.props.saveValues(data)
        this.props.nextStep()
    }

    accountsLoop() {
        return this.state.accounts.map(accounts => {
            var row = accounts.transaction_accounts.map(transAcc =>
                <li className={"list-group-item " + (accounts.type == "bank" ? 'bank' : '')} onClick={() => {
                    this.props.nextStep(transAcc.id)
                }} key={transAcc.id}>
                    {accounts.type}<br/>
                    {transAcc.name}<br/>
                    {transAcc.id}
                </li>);
            return <ul className="list-group" key={accounts.id}>{row}</ul>;
        });
    }

    render() {
        return <div className="container-fluid accounts">
            <div className="row">
                <div className="col-xs-12">
                    <img className="home-logo" src="/assets/img/logo.png" />
                        <div className="row">
                            <div className="accounts-cont scroller">
                                {this.accountsLoop()}
                            </div>
                        </div>
                </div>
            </div>

        </div>
    ;
    }
    }

    Accounts
    .propTypes = {
        saveValues: PropTypes.func,
        nextStep: PropTypes.func
    };