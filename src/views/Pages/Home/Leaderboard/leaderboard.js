import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './tablerow';
import "../../../../css/style.css";

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {leader_val: []};
    }
    componentDidMount(){
      axios.get('/leaderboard')
      .then(response => {
        this.setState({leader_val : response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    tabRow(){
        return this.state.leader_val.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
      return (
        <div class="ht-tm-cat">
            <h1 class="display-4 ht-tm-component-title text-center">Leaderboard</h1>
            <div class="ht-tm-codeblock mt-4">
                <table class="table table-hover table-success ht-tm-element">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Dummy</td>
                            <td>0</td>
                        </tr>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        </div>
      );
    }
  }