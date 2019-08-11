import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Coins from './components/Coins';
import Window from './components/Window';

import './App.scss';

class App extends Component {
  
  state = {
    activeCoins: [],
    topWindow: "",
  }

  toggleClose = (id) => {
    const activeCoins = this.state.activeCoins.filter(item => item.tag !== id)
    this.setState({ activeCoins: activeCoins })
  }

  changeTopWindow = (coin) => {
    this.setState({ topWindow: coin.tag})
  }

  addOpenWindow = (coin) => {
    if (!this.state.activeCoins.includes(coin)) {
      const coinWithWindowPosition = this.addWindowPosition(coin)
      const activeCoins = [...this.state.activeCoins]
      activeCoins.push(coinWithWindowPosition)
      this.setState({ activeCoins: activeCoins})
    }
  }

  addWindowPosition = (coin) => {
    let x, y;
    if (this.state.activeCoins.length === 0) {
      x = 50;
      y = -500;
    } else {
      const lastWindow = [...this.state.activeCoins].pop();
      x = lastWindow.position.x + 20
      y = lastWindow.position.y - 20
    }
    coin.position = {x: x, y: y};
    return coin
  }

  renderWindows = () => {
    return (
      this.state.activeCoins.map((coin, index)=> (
        <Window 
          coin={coin} 
          close={this.toggleClose}
          changeTopWindow={this.changeTopWindow}
          topWindow={this.state.topWindow}
          key={index}
        />
      ))
    )
  }

  render() {
    const { activeCoins } = this.state
    return (
    <div className="App">
      <Navbar />
      <Coins
        changeTopWindow={this.changeTopWindow}
        addOpenWindow={this.addOpenWindow}
        activeCoins={activeCoins}
      />
      {this.renderWindows()}
    </div>
    )
  }
}

export default App;
