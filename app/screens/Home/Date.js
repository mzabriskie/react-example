import React, {Component, PropTypes} from 'react';
import cookie from "react-cookie";

import {setCookie} from '../../utils/ps-api'


export default class Date extends Component {
    constructor() {
        super()
        this.state = {user: {}, accounts: []}

        // console.log(cookie.load('access_token'));
        // if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
        //     console.log("constractor " + cookie.load('access_token'));
        //     window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002")
        // }
        setCookie();

        setTimeout(function () {
            if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
                console.log("constractor " + cookie.load('access_token'));
                window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read+categories.read+transactions.write&redirect_uri=http://localhost:3002")
            }
        }, 0);
    }


    render() {
        return <div>date<br/>
            <button onClick={this.props.previousStep}>Back
            </button>
            <button onClick={this.props.nextStep}>Next
            </button>
        </div>
    }
}

Date.propTypes = {
    previousStep: PropTypes.func,
    nextStep: PropTypes.func
};
