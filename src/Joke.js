import React, { Component } from 'react';
import './Joke.css'

class Joke extends Component {

    constructor(props) {
        super(props);
        this.state = { rateNum: 0 , emoji: ''}
        this.upVote = this.upVote.bind(this)
        this.downVote = this.downVote.bind(this)
        this.newEmoji = this.newEmoji.bind(this)
    }

    upVote() {
        let addNum = this.state.rateNum + 1;
        this.setState({ rateNum: addNum })
        this.newEmoji()
    }

    downVote() {
        if(this.state.rateNum <= 0 ){
            this.setState({ rateNum: 0 })
        } else {
            let minusNum = this.state.rateNum - 1;
            this.setState({ rateNum: minusNum })
        }
        this.newEmoji()
    }
    newEmoji(){
    if(this.state.rateNum < 3){
        this.setState({emoji: '🤮'})
    }else if(this.state.rateNum > 4 && this.state.rateNum <= 7){
        this.setState({emoji: '😐'})
    } else if(this.state.rateNum >=8 && this.state.rateNum <= 12){
        this.setState({emoji: '😄'})
    }else if(this.state.rateNum >=12 ){
        this.setState({emoji: '🤣'})
    }
}

    render() {
        return (
            <div className='Joke'>
                <button onClick={this.upVote}>⬆</button>
                <button onClick={this.downVote}>⬇</button>
                <p className='Joke-rate'>{this.state.rateNum}<span>{this.state.emoji}</span></p>
                <p>{this.props.joke}</p>
            </div>
        )
    }
}

export default Joke;