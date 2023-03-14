import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';
import EmojiImage from './icon/SeekPng.com_crying-laughing-emoji-png_59445.png'
import { v4 as uuidv4 } from 'uuid';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = { jokes: JSON.parse(window.localStorage.getItem('jokes'))  || '[]' }
    this.handleVote = this.handleVote.bind(this);
    this.getData = this.getData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getData() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      jokes.push({ id: uuidv4(), text: res.data.joke, votes: 0 });

    }
      // when i ask for jokes i add to the current jokelist the new ones 
    this.setState(
      st => ({
      jokes : [...st.jokes, ...jokes]
    }),
            //Save jokes to localStorage 
    () => 
    window.localStorage.setItem("jokes", JSON.stringify(jokes))
    );
  }

  handleClick(){
    this.getData()
  }

  async componentDidMount() {
    if(this.state.jokes.length === 0) this.getData();
  }

  handleVote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }),
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    )
  }

  render() {
    return (
      <div className='JokeList'>
        <div className='Jokelist-side'>
          <h1 className='JokeList-h1'>JOKES</h1>
          <img src={EmojiImage} />
          <button className='JokeList-button' onClick={this.handleClick}>New Jokes</button>
        </div>
        <div className='Jokelist-Joke'>
          {this.state.jokes.map(j => (
            <Joke key={j.id} joke={j.text} vote={j.votes}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList;

