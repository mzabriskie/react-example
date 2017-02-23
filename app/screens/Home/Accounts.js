import React, {Component, PropTypes} from 'react';
import cookie from "react-cookie";
import {getUser, getUserAccounts, setCookie} from '../../utils/ps-api'


export default class Accounts extends Component {
    constructor() {
        super();
        this.state = {user: {}, accounts: []}
        // this.nextStep = this.nextStep.bind(this);

        setCookie();
        setTimeout(function () {
            if (cookie.load('access_token') == "" || cookie.load('access_token') === null|| cookie.load('access_token') === undefined) {
                console.log("constractor " + cookie.load('access_token'));
                window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read+categories.read+transactions.write&redirect_uri=http://localhost:3002")
            }
        }, 0);
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
            .then((accounts) => {
                this.setState(accounts);
                console.log(accounts);
            });
    }


    componentDidMount() {
        if (cookie.load('access_token') != "" && cookie.load('access_token') != null) {
            this.getUserData();
            // console.log(cookie.load('user_id'));


        }
    }

    componentWillMount() {

    }

    nextStep(id) {
        // e.preventDefault()

        // Get values via this.refs
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
                <a onClick={() => { this.props.nextStep(transAcc.id) }} key={transAcc.id}>
                    {accounts.type}<br/>
                    {transAcc.name}<br/>
                    {transAcc.id}<br/><br/>
                </a>);
            return <div key={accounts.id}><br/>{row}</div>;
        });
    }


    render() {
        var output = null;
        const user = this.state.user;
        console.log(user);
        const accounts = this.state.accounts;
        if (accounts.length != 0) {
            // console.log(accounts.length);

            output =
                <section className="container home">
                    {/*<a href="https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002">login</a>*/}
                    {/*<a className="{ ? 'hide' : 'show' }"*/}
                    {/*href="https://my.pocketsmith.com/logout?redirect_uri=http://localhost:3002">logout</a>*/}
                    <h2>{user.name}</h2>
                    {/*{this.state.accounts.map(*/}
                    {/*(item) => {*/}
                    {/*return <div key={item.id}>*/}
                    {/*{item.type}*/}
                    {/*{ transaccount = item.transaction_accounts.map((acc)=>  <div key={acc.id}>{acc.name} </div>)}*/}
                    {/*{return transaccount}*/}
                    {/*</div>*/}
                    {/*}) }*/}
                    {/*<h2>{accounts[0].name}</h2>*/}
                    {this.accountsLoop()}
                    {/*<a href="/category">cat</a>*/}
                    {/*<button className="btn btn-info" onClick={this.nextStep}>Next</button>*/}
                </section>
            ;
        }

        return output;
    }
}

Accounts.propTypes = {
    saveValues: PropTypes.func,
    nextStep: PropTypes.func
};