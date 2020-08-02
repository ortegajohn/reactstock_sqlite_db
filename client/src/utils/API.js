import axios from "axios";
// const axios = require("axios");
// import request from "request";

// const ticker = "GDX"
//http://api.marketstack.com/v1/eod?access_key=f0444545e22ffc74d6d8824819608550&symbols=AAPL
// https://finnhub.io/api/v1/stock/metric?symbol=AMZN&metric=price&token=bsir747rh5rc8orbnreg
//https://finnhub.io/api/v1/quote?symbol=AAPL&token=bsir747rh5rc8orbnreg
const BASEURL = "http://api.marketstack.com/v1/eod?";
// const APIKEY = "&api_token=lIKhQVypBswwedWGj8P5cK6lkYekVwecEbUAO6lLGAYIZVoWcTRUZfSSC9Qa";
const APIKEY = "access_key=f0444545e22ffc74d6d8824819608550&symbols="

export default {
  search: function(ticker) {
    console.log("Search Ticker", ticker)
    // return axios.get(BASEURL + ticker + APIKEY );
    return axios.get(BASEURL + APIKEY + ticker);
    

  },

  savestock: function(stockData) {
    return axios.post("/api/stocks", stockData);
  },

  getstocks: function(req, res) {
    return axios.get("/api/getstocks", res);
  },

  updateStocks: function(stockData) {
    console.log("stockData from API - updateStocks: ", stockData)
    return axios.put("/api/updateStocks", stockData)
  },

  deleteStocks: function(delTicker) {
    console.log("delTicker from Delete API: ", delTicker)
    return axios.post("/api/deleteStocks", delTicker).then( function(req, res) {
        console.log("reqZ: ", req)
        console.log("resZ: ", res)
    })
  },

  sendSignUpForm: function(SignUpFormData){
    console.log("API.sendSignUpForm SignUpFormData",SignUpFormData)
    return axios.post("/signup", SignUpFormData);
    // return axios.post("/api/signup", SignUpFormData);
  },

  sendSignInForm: function(SignInFormData){
    console.log("API.sendSignUpForm SignUpFormData",SignInFormData)
    return axios.post("/signin", SignInFormData);
    // return axios.post("/api/signup", SignUpFormData);
  },
  getUseId: function(req, res){
    return axios.get("/api/getuserid");
  },
  logout: function(){
    return axios.get("/api/logout");
  }
};