import React from 'react';
import { render } from 'react-dom';

import styles from "./main.css";

import TemplateExample from './components/TemplateExample/TemplateExample.jsx';
import Card1 from './components/Card/Card1.jsx';
import Card2 from './components/Card/Card2.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
 
    }

    componentDidMount() {
        console.log("Did mount");
    }

    render() {
        return (
            <div className={styles.container_row} >
                <div className={styles.data_row} >
                    <Card1 className={styles.flex1} title="Show me 1.1" />
                    <Card1 className={styles.flex1} title="Show me 1.2" />
                    <Card1 className={styles.flex1} title="Show me 1.3" />
                </div>
                <div className={styles.data_row} >
                    <Card2 className={styles.flex1} title="Show me 2.1" />
                    <Card1 className={styles.flex1} title="Show me 1.2" />
                </div>
                <div className={styles.data_row} >
                    <Card2 className={styles.flex1} title="Show me 2.1" />
                </div>
                <div className={styles.data_row} >
                    <Card1 className={styles.flex1} title="Show me 1.1" />
                </div>
            </div>
        )
    }
}

render(<App />, document.getElementById('app'));
