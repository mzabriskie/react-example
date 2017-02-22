import React, {Component} from 'react';
import cookie from "react-cookie";
import {StyleRoot} from 'radium';
import {Treebeard, decorators} from 'react-treebeard';

import data from './data';
import styles from './styles';
import * as filters from './filter';
import {getUserCategories, setCookie} from '../../utils/ps-api'

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

// Example: Customising The Header Decorator To Include Icons
decorators.Header = (props) => {
    const style = props.style;
    // const iconType = props.node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-location-arrow`;
    const iconStyle = {marginRight: '5px'};
    return (
        <div className="base" style={style.base}>
            <div className="title" style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {props.node.title}
            </div>
        </div>
    );
};

class NodeViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = styles.viewer;
        let json = JSON.stringify(this.props.node, null, 4);
        if (!json) {
            json = HELP_MSG;
        }
        return (
            <div className="test" style={style.base}>
                {json}
            </div>
        );
    }
}

NodeViewer.propTypes = {
    node: React.PropTypes.object
};

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {user: {}, categories: []}
        this.onToggle = this.onToggle.bind(this);

        setCookie();
        setTimeout(function () {
            if (cookie.load('access_token') == "" || cookie.load('access_token') === null || cookie.load('access_token') === undefined) {
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

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }

    onFilterMouseUp(e) {
        const filter = e.target.value.trim();
        if (!filter) {
            return this.setState(categories);
        }
        var filtered = filters.filterTree(this.state.categories, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({categories: filtered});
    }

    getUserCategoriesDate() {
        getUserCategories(cookie.load('user_id'))
            .then((categories) => {
                this.setState(categories);
                console.log(categories);
            });
    }

    componentDidMount() {
        if (cookie.load('access_token') != "" && cookie.load('access_token') != null) {
            this.getUserCategoriesDate();
            // console.log(cookie.load('user_id'));
        }

    }


    render() {
        const categories = this.state.categories;

        return (

            <div>
                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-search"></i>
                        </span>
                        <input type="text"
                               className="form-control"
                               placeholder="Search the tree..."
                               onKeyUp={this.onFilterMouseUp.bind(this)}
                        />
                    </div>
                </div>
                <div style={styles.component}>
                    <Treebeard
                        data={categories}
                        onToggle={this.onToggle}
                        decorators={decorators}
                    />
                </div>
                <div style={styles.component}>
                    <NodeViewer node={this.state.cursor}/>
                </div>
            </div>
        );

    }
}

