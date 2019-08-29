import React from 'react';
import axios from 'axios';
import MapImage from './MAP-Final.png';
import './MissionMap.css';
import { Button } from 'reactstrap';


// const level = {
//     "level_status": "open/closed",
//     "user_level_status": "completed"
// };

export default class MissionMap extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            level: []
        };

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() { 
        const token = localStorage.getItem('token');
        console.log(token);
        for (let i = 1; i < 10; i++) { 
            axios({
                method: 'post',
                url: 'http://13.235.77.118:3000/api/level',
                headers: {
                    Authorization: "Bearer " + token
                },
                data: {
                    levelId: i
                }
            })
                .then(response => {
                    // console.log(response.data);
                    this.setState({
                        level: this.state.level.concat(response.data)
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        
    }

    handleClick() {
        alert("Level Clicked");
    }

    render() {
        let text_color = '';
        return (
            <div className='mission-map'>
                <img src={MapImage} alt='Mission Map' className='img' />
                {this.state.level.map((object, i) => {
                    {object.userLevelStatus === "completed" ? text_color = "green" : text_color = "red"}
                    return <Button className={"level" + (i + 1) + "-button"} 
                        disabled={object.levelStatus === "open" ? false : true}
                        style={{color:text_color}}
                        onClick={this.handleClick} >{i + 1}
                    </Button>
                })}
            </div>
        )
    }
}
