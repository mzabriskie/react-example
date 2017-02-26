import React, {Component, PropTypes} from 'react';
import cookie from "react-cookie";
import {setCookie} from '../../utils/ps-api'


export default class Date extends Component {
    constructor() {
        super()
        this.state = {user: {}, accounts: []}
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
