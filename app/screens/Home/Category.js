import React, {Component} from 'react';
import cookie from "react-cookie";
import {StyleRoot} from 'radium';
import {Treebeard, decorators}  from 'react-treebeard';

import data from './data';
import styles from './styles';
import * as filters from './filter';
import {getUserCategories} from '../../utils/ps-api'

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

decorators.Header = (props) => {
    const style = props.style;
    const iconType = props.node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = {marginRight: '5px'};
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {props.node.name}
            </div>
        </div>
    );
};

decorators.Toggle = (props) => {
    const style = props.style;

    return (
        <div style={style.toggle}>

        </div>
    );
};

class NodeViewer extends Component {
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
            <div style={style.base}>
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
        this.state = {user: {}, categories: [], data: data}
        this.onToggle = this.onToggle.bind(this);
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
        let token_cookie = cookie.load('access_token');
        if (token_cookie != "" && token_cookie != null) {
            this.getUserData();
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
            return this.setState({data});
        }
        var filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({data: filtered});
        console.log(filtered);
    }


    getUserCategoriesDate() {
        getUserCategories(cookie.load('user_id'))
            .then((categories) => {
                this.setState(categories);
                console.log(categories);
            });
    }

    componentDidMount() {
        let token_cookie = cookie.load('access_token');
        if (token_cookie != "" && token_cookie != null) {
            this.getUserCategoriesDate();
        }
    }


    render() {
        const categories = {
            title: "categories",
            toggled: true,
            children: this.state.categories
        }

        // console.log(categories);
        console.log(data)
        return (
            <StyleRoot>
                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-search"></i>
                        </span>
                        <input type="text"
                               className="form-control"
                               placeholder="Search the tree..."
                               onKeyUp={this.onFilterMouseUp.bind(this)}/>
                    </div>
                </div>
                <div style={styles.component}>
                    <Treebeard
                        data={this.state.data}
                        onToggle={this.onToggle}
                        decorators={decorators}/>
                </div>
                <div style={styles.component}>
                    <NodeViewer node={this.state.cursor}/>
                </div>
            </StyleRoot>
        );

    }
}

