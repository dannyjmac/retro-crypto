import React, { Component }from 'react';

import Draggable from 'react-draggable';
import classNames from 'classnames';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { ScaleLoader } from 'halogenium';
import moment from 'moment';
import 'chart.js';

import { 
    PRICE_PATH,
    CHANGE_PATH,
    DAILY_PATH,
    DAILY_LIMIT,
    DAILY_AGGREGATE,
    DAILY_DATE,
    TODAY,
    EXCHANGE,
    DOUBLE_USD,
    SINGLE_USD
} from '../../helpers/cryptocompare.js';

import './Window.scss';

import x from './images/x.png';

class Window extends Component {

    state = {
        price: null,
        change: null,
        daily: [],
        loading: true,
    }


    componentDidMount() {
        this.getCoin(this.props.coin);
        this.getChange(this.props.coin);
        this.getDaily(this.props.coin);
    }
    getCoin = (coin) => {
        fetch(`${PRICE_PATH}${coin.tag}${DOUBLE_USD}`)
            .then(res => res.json())
            .then(data => this.setState({ price: data.USD}, () => this.checkRecieved()))
            .catch(err => console.log("Failed to recieve price."))
    }

    getChange = (coin) => {
        fetch(`${CHANGE_PATH}${coin.tag}${SINGLE_USD + EXCHANGE}`)
            .then(res => res.json())
            .then(data => this.setState({ change: data.DISPLAY.CHANGEPCT24HOUR}, () => this.checkRecieved()))
            .catch(err => console.log("Failed to recieve 24 hour change."))
    }
    getDaily = (coin) => {
        fetch(`${DAILY_PATH + coin.tag + SINGLE_USD + DAILY_LIMIT + DAILY_AGGREGATE + DAILY_DATE + TODAY}`)
            .then(res => res.json())
            .then(data => this.formatData(data.Data))
            .catch(err => console.log("Failed to recieve 10 day price history."))
    }

    formatData = (data) => {
        const formatted = [...data];
        formatted.forEach(item => {
            item.time = moment.unix(item.time).format('DD/MM')

            delete item.open
            delete item.low
            delete item.high
            delete item.volumefrom
            delete item.volumeto

            if (item.close >= 10) {
                item.close = item.close.toFixed(0)
            } else if (item.close < 10 && item.close > 1) {
                item.close = item.close.toFixed(1)
            } else if (item.close < 1) {
                item.close = item.close.toFixed(2)
            }

        })
        this.setState({ daily: formatted }, () => this.checkRecieved())
    }

    checkRecieved = () => {
        if (this.state.price && this.state.change && this.state.daily.length > 0) {
            this.setState({ loading: false })
        }
    }

    render() {  
        const { coin, close, changeTopWindow, topWindow } = this.props;

        return (

            <Draggable
                onStart={() => changeTopWindow(coin)}
                defaultPosition={{x: 50, y: -500}}

            >

                <div className={classNames('Window', { 'Window__top-window': coin.tag === topWindow })}>
                    <div className="Window__inner">
                        <div className="Window__topbar">
                            <div className="Window__topbar-coin">
                                <div className="Window__topbar-coin-name">{coin.name}</div>
                                <div className="Window__topbar-coin-tag">({coin.tag})</div>
                            </div>
                            <div className="Window__topbar-close" onClick={() => close(coin.tag)}>
                                <img src={x} alt="" />
                            </div>  
                        </div>

                        {this.state.loading ?
                            <div className="Window__loading">
                                <ScaleLoader color="#5856f2" margin="2px"/>
                            </div>
                        : 
                         <div className="Window__main">
                            <div className="Window__main-info">
                                <div className="Window__main-info-price">
                                    <h5>Price</h5>
                                    <h4>${this.state.price}</h4>
                                </div>
                                <div className="Window__main-info-stats">
                                    <div 
                                    className={classNames(
                                        'Window__main-info-stats-change',
                                        {'Window__main-info-stats-change-positive': Math.sign(this.state.change) === 1},
                                        {'Window__main-info-stats-change-negative': Math.sign(this.state.change) === -1}
                                    )}>
                                        <h5>Change(24H)</h5>
                                        <p>{this.state.change}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="Window__main-chart">
                                <h5>10 Day History</h5>
                                <LineChart
                                    width={225}
                                    height={140}
                                    data={this.state.daily}
                                >
                                    <XAxis tick={ false } dataKey="time" />
                                    <YAxis tick={{ fontSize: 10 }} width={38} type="number" domain={['dataMin', 'dataMax']} />
                                    <Line animationDuration={2000} type="monotone" dataKey="close" stroke="#5856f2" activeDot={{ r: 8 }} />
                                </LineChart>    
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </Draggable>
        )
    }
}

export default Window;