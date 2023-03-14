import React, { Component } from 'react';
import './Joke.css'

class Joke extends Component {
    constructor(props){
        super(props);
        this.getEmoji = this.getEmoji.bind(this)
    }
    //CREATE A METHOD THAT CHANGE EMOJIS DEPENDS ON THE VOTES
    getEmoji() {
        if (this.props.vote === 0) {
            return  "em em-confused"
        } else if (this.props.vote < 0) {
            return "em em-angry"
        } else if (this.props.vote <= 5) {
            return "em em-neutral_face"
        } else if (this.props.vote >= 5 && this.props.vote <= 10) {
            return "em em-laughing"
        } else if (this.props.vote >= 10) {
            return "em em-rolling_on_the_floor_laughing"
        }
    }

    render() {
        return (
            <div className='Joke'>
                <div className='Joke-buttons'>
                    <button onClick={this.props.upvote}>⬆</button>
                    <span className='Joke-rate'>{this.props.vote}</span>
                    <button onClick={this.props.downvote}>⬇</button>
                </div>
                <div className='Joke-text'>
                    {this.props.joke}
                </div>
                <div className='Joke-emoji'>
                    {/* <i className="fa-solid fa-face-meh"></i> */}
                    <i className={this.getEmoji()} ></i>
                </div>
            </div>
        )
    }
}

export default Joke;