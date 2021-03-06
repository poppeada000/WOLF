import React, { Component } from 'react';
import styles from './Card.css';


export default class Card1 extends Component {
    constructor(props) {
        super(props);
    }

    makeTitle(here) {
        if (here === true) {
            return (
                <div className={styles.fitTitle}>
                    <h1 className={styles.title}>{this.props.title}</h1>
                    <hr className={styles.squashed} />
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className={styles.container1}>
                <div className={styles.card}>
                    <div className={this.props.title != undefined ? styles.mainContainerBot : styles.mainContainerAll}>
                        {this.makeTitle(this.props.title != undefined)}
                        <div className={styles.inner}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
