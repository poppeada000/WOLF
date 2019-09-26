import React from 'react';

import styles from "./TemplateExample.css"

export default class TemplateExample extends React.Component {
    constructor(props) {
        super(props);
 
    }

    componentDidMount() {
        console.log("Did mount");
    }

    render() {
        return (
            <div className={styles.container}>
            </div>
        )
    }
}