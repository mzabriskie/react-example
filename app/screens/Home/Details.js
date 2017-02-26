import React, {Component, PropTypes} from 'react';
import cookie from "react-cookie";
import {getUser, getUserAccounts} from '../../utils/ps-api'


export default class Details extends Component {
    constructor() {
        super()
        this.state = {user: {}, accounts: []}
    }


    render() {
        return <div>Details<br/>
            <button onClick={this.props.previousStep}>Back
            </button>
            <button onClick={this.props.nextStep}>Next
            </button>
        </div>
    }
}

Details.propTypes = {
    previousStep: PropTypes.func,
    nextStep: PropTypes.func
};