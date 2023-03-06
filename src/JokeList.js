import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';
import EmojiImage from './icon/SeekPng.com_crying-laughing-emoji-png_59445.png'

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { joke: new Set() }
    this.getData = this.getData.bind(this)
  }

  async getData() {
    let randomPage = Math.floor(Math.random() * 75)  // TODO: Fix hardcoded with total num from req. 
    let BaseUrl = `https://icanhazdadjoke.com/search?page=${randomPage}&limit=10`;

    const config = {
      headers: {
        Accept: 'application/json'
      }
    };
      //To make things more complicated i did the assumption that the api doesn't return unique jokes 
      // I used Set to solve that 
    let jokeSet = new Set();
    let res = await axios.get(BaseUrl, config)
    let jokeObject = res.data.results
    for (let joke of jokeObject) {
      jokeSet.add(joke.joke)
    }
    this.setState({ joke: jokeSet })  
  }


  componentDidMount() {
    this.getData()
  }
  render() {
    let finalArray = [];
    for (let item of this.state.joke) {
      finalArray.push(<Joke joke={item} />)
    }

    return (
      <div className='JokeList'>
        <div className='Jokelist-col'>
        <h1 className='JokeList-h1'>JokeList</h1>
       <img src={EmojiImage}/>
        <button className='JokeList-button' onClick={this.getData}>New Jokes</button>
        </div>
        <div className='Jokelist-Joke'>
        {finalArray}
        </div>
      </div>
    )
  }
}

export default JokeList;

