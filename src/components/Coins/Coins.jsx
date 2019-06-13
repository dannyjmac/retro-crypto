import React, { Component } from 'react';
import coinList from './coinList.jsx';
import classNames from 'classnames';

import './Coins.scss';

class Coins extends Component {

    isCoinActive = (coin) => {
        const findCoin = this.props.activeCoins.filter(item => item.tag === coin.tag)
        if (findCoin.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { addOpenWindow, changeTopWindow } = this.props
        return (
            <div className="Coins">
                { coinList.map((coin, index) => (
                    <div
                        key={index}
                        className="Coins__item"
                        onClick={() => { addOpenWindow(coin); changeTopWindow(coin)}}
                    >   
                        <div className="Coins__icon">
                            <img
                                src={
                                    this.isCoinActive(coin) ? require(`../../icons/${coin.tag.toLowerCase()}-h.png`) 
                                    : require(`../../icons/${coin.tag.toLowerCase()}.png`)
                                }
                                alt={coin.tag}
                            />
                        </div>
                        <span className={classNames(this.isCoinActive(coin) ? "Coins__label-active" : "Coins__label")}>{coin.name}</span>
                    </div>
                ))}
            </div>
        )
    }
}

export default Coins

