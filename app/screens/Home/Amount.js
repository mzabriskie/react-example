import React, {Component, PropTypes} from 'react';
import cookie from "react-cookie";
import {getUser, getUserAccounts} from '../../utils/ps-api'


export default class Amount extends Component {
    constructor() {
        super()
        this.state = {user: {}, accounts: []}
    }


    render() {
        return <div>Amount<br/>
            <button onClick={this.props.previousStep}>Back
            </button>
            <button onClick={this.props.nextStep}>Next
            </button>
        </div>;
    }
}

Amount.propTypes = {
    previousStep: PropTypes.func,
    nextStep: PropTypes.func
};
