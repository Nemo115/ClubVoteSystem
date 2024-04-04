import React from 'react'
import '../constants'
import { themeBackground } from '../constants';

export default function Join() {
    const styles = {
        container: {
            backgroundColor: themeBackground
        }
    };

    function handleSubmit(event) {
        console.log("Submitted info: " + this.state.value);
    };
  return (
    <div style={styles.container}>
        <h2>Voting</h2>
        <form onSubmit={this.handleSubmit}>
            <label>
                Input Election Code
                <input type="text" value={this.state.value}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
}

