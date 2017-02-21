import React, {Component} from 'react'
import cookie from 'react-cookie'
import assign from 'object-assign'
import Accounts from './Accounts'
import Date from './Date'
import Category from './Category'
import Details from './Details'
import Amount from './Amount'
import Result from './Result'
import {setCookie} from '../../utils/ps-api'


let fieldValues = {
    accountId: null,
    date: null,
    category: null,
    merchant: null,
    note: null,
    label: [],
    amount: null
}

export default class App extends Component {
    constructor() {
        super()
        this.state = {step: 1}

        // console.log(cookie.load('access_token'));
        // if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
        //     console.log("constractor " + cookie.load('access_token'));
        //     window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002")
        // }
        // setCookie();
        //
        // setTimeout(function () {
        //     if (cookie.load('access_token') == "" || cookie.load('access_token') == null) {
        //         console.log("constractor " + cookie.load('access_token'));
        //         window.location.replace("https://my.pocketsmith.com/oauth/authorize?client_id=6&response_type=token&scope=user.read+user.write+accounts.read&redirect_uri=http://localhost:3002")
        //     }
        // }, 0);
    }

    saveValues(field_value) {
        return function () {
            fieldValues = assign({}, fieldValues, field_value)
        }.bind(this)()
        console.log("values " + fieldValues);
    }

    nextStep() {
        console.log(this.state.step);
        // this.setState({
        //     step: this.state.step + 1
        // })
        console.log(fieldValues);
    }

    previousStep() {
        this.setState({
            step: this.state.step - 1
        })
    }

    submitRegistration() {
        // Handle via ajax submitting the user data, upon
        // success return this.nextStop(). If it fails,
        // show the user the error but don't advance
        alert(fieldValues);
        this.nextStep()
    }

    showStep() {
        switch (this.state.step) {
            case 1:
                return <Accounts fieldValues={fieldValues}
                                 nextStep={this.nextStep.bind(this)}
                                 saveValues={this.saveValues}/>
            case 2:
                return <Date fieldValues={fieldValues}
                             nextStep={this.nextStep}
                             previousStep={this.previousStep}
                             saveValues={this.saveValues}/>
            case 3:
                return <Category fieldValues={fieldValues}
                                 nextStep={this.nextStep}
                                 previousStep={this.previousStep}
                                 saveValues={this.saveValues}/>
            case 4:
                return <Date fieldValues={fieldValues}
                             nextStep={this.nextStep}
                             previousStep={this.previousStep}
                             saveValues={this.saveValues}/>
            case 5:
                return <Details fieldValues={fieldValues}
                                nextStep={this.nextStep}
                                previousStep={this.previousStep}
                                saveValues={this.saveValues}/>
            case 6:
                return <Amount fieldValues={fieldValues}
                               submitRegistration={this.submitRegistration}
                               previousStep={this.previousStep}
                               saveValues={this.saveValues}/>
            case 7:
                return <Result fieldValues={fieldValues}/>
        }
    }

    render() {
        return (
            <main>
                {this.showStep()}
            </main>
        )
    }
}

