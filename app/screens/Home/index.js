import React, {Component} from 'react'
import assign from 'object-assign'
import Accounts from './Accounts'
import Date from './Date'
import Category from './Category'
import Details from './Details'
import Amount from './Amount'
import Result from './Result'



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
    }

    saveValues(field_value) {
        return function () {
            fieldValues = assign({}, fieldValues, field_value)
        }.bind(this)()
        console.log("values " + fieldValues);
    }

    nextStep() {
        console.log(this.state.step);
        this.setState({
            step: this.state.step + 1
        })
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
                             nextStep={this.nextStep.bind(this)}
                             previousStep={this.previousStep.bind(this)}
                             saveValues={this.saveValues}/>
            case 3:
                return <Category fieldValues={fieldValues}
                                 nextStep={this.nextStep.bind(this)}
                                 previousStep={this.previousStep.bind(this)}
                                 saveValues={this.saveValues}/>
            case 4:
                return <Date fieldValues={fieldValues}
                             nextStep={this.nextStep.bind(this)}
                             previousStep={this.previousStep.bind(this)}
                             saveValues={this.saveValues}/>
            case 5:
                return <Details fieldValues={fieldValues}
                                nextStep={this.nextStep.bind(this)}
                                previousStep={this.previousStep.bind(this)}
                                saveValues={this.saveValues}/>
            case 6:
                return <Amount fieldValues={fieldValues}
                               submitRegistration={this.submitRegistration.bind(this)}
                               previousStep={this.previousStep.bind(this)}
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

