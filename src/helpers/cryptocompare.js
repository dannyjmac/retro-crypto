import moment from 'moment';

export const PRICE_PATH = "https://min-api.cryptocompare.com/data/price?fsym=";
export const CHANGE_PATH = 'https://min-api.cryptocompare.com/data/generateAvg?fsym=';
export const DAILY_PATH = 'https://min-api.cryptocompare.com/data/histoday?fsym=';
export const DAILY_LIMIT = '&limit=10';
export const DAILY_AGGREGATE = '&aggregate=1';
export const DAILY_DATE = '&toTs=';
export const TODAY = moment().unix()
export const EXCHANGE = '&e=Bitfinex';
export const DOUBLE_USD = "&tsyms=USD";
export const SINGLE_USD = "&tsym=USD";