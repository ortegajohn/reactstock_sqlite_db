import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import FriendCard from "./components/FriendCard";
// import Test from "./components/Test";
import Wrapper from "./components/Wrapper";
// import Title from "./components/Title";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import StockCardHolder from "./components/StockCardHolder";
// import StockTable from "./components/StockTable";
// import friends from "./friends.json";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Modal from "./components/Modal/Modal"
import TradingViewWidget from 'react-tradingview-widget';
import API from "./utils/API";
import axios from "axios";
import Jumbotron from "./components/Jumbotron";


/* ========================================================================
                              GLOBAL VARIABLES
   ======================================================================== */
let ticker = "";
let price = 0;
let stocksInfo = {}
let stock_ticker = {}
let search_ticker = ""
let stocksInfo_keys = []
let dbstocks = []
let signupformfirstname = ""
let signupformlastname = ""
let signupformusername = ""
let signupformpassword = ""
let guessmessage = 'Click an image to begin!'
let displaysignup = false
let displaysignin = false
let isUserLoggedIn = false;
let dom_signup = ""
let dom_signin = ""



class App extends Component {

  /* ========================================================================
                                SETTING STATE
     ======================================================================== */
  state = {
    showModal: false,
    ticker: ticker,
    price: price,
    stocksInfo: stocksInfo,
    search_ticker: search_ticker,
    stocksInfo_keys: stocksInfo_keys,
    dbstocks: dbstocks,
    signupformfirstname,
    signupformlastname,
    signupformusername,
    signupformpassword,
    displaysignup: displaysignup,
    displaysignin: displaysignin,

    isUserLoggedIn: isUserLoggedIn,
    // isSignedIn: isSignedIn

  };

  /* ========================================================================
                              FUNCTIONS
     ======================================================================== */

  // GET DATA FROM DB AND DISPALY CARDS ON PAGE LOAD
  componentDidMount() {
    this.getdbstockdata();
  }

  // START MODAL CODE
  // Modal Show and Close functions:
  handleShowMessageClick = (idx) => this.setState({ showModal: true, clickedIndex: idx })
  handleCloseModal = () => this.setState({ showModal: false })
  // END MODAL CODE

  // START HOVER CODE
  // Hover Modal Show and Close functions:
  // handleMouseHover() {
  //     this.setState({toggleHoverState});
  //   }

  //   toggleHoverState(isHovering) {
  //     return {
  //       isHovering: !this.isHovering,
  //     };
  //   }

  // TRACKS WHAT GOES INTO THE SEARCH BAR
  handleInputChange = event => {
    this.setState({ ticker: event.target.value });
    console.log("event.target.value: ", event.target.value)
  };

  // START SIGN IN/UP CODE
  // ========================================================================
  signUpFormSubmit = event => {
    event.preventDefault()
    console.log("signUpFormSubmit: ")
    let formdata = {
      firstname: this.state.signupformfirstname,
      lastname: this.state.signupformlastname,
      username: this.state.signupformusername,
      password: this.state.signupformpassword
    }

    API.sendSignUpForm(formdata)
    // this.logOut()
  };

  signINFormSubmit = event => {
    event.preventDefault()
    console.log("signINFormSubmit")
    // this.updatedbstockdataOnSub();
  }

  handleFormInputChange = event => {
    console.log("event.target.value: ", event.target.value)
    console.log("event.target.name: ", event.target.name)
    this.setState({ [event.target.name]: event.target.value }, () => {
      console.log("this.state.signupformfirstname: ", this.state.signupformfirstname)
      console.log("this.state.signupformlastname: ", this.state.signupformlastname)
      console.log("this.state.signupformusername: ", this.state.signupformusername)
      console.log("this.state.signupformpassword: ", this.state.signupformpassword)
    });
  }

  clicksignup = () => {

    if (!this.state.displaysignup) {
      this.setState({ displaysignup: true }, () => {
        console.log("this.state.displaysignup: ", this.state.displaysignup)
      })
    } else {
      this.setState({ displaysignup: false }, () => {
        console.log("this.state.displaysignup: ", this.state.displaysignup)
      })
    }
  }

  clicksignIN = () => {
    if (!this.state.displaysignin) {
      this.setState({ displaysignin: true }, () => {
        console.log("this.state.displaysignin: ", this.state.displaysignin)
      })
    } else {
      this.setState({ displaysignin: false }, () => {
        this.getUserId();
        console.log("this.state.displaysignin: ", this.state.displaysignin)
      })
    }
  }
  displaysignup_function = () => {

    if (!this.state.displaysignup) {
      this.setState({ displaysignup: true }, () => {
        console.log("this.state.displaysignup: ", this.state.displaysignup)
      })
    } else {
      this.setState({ displaysignup: false }, () => {
        console.log("this.state.displaysignup: ", this.state.displaysignup)
      })
    }
  }

  clicksignIN = () => {
    if (!this.state.displaysignin) {
      this.setState({ displaysignin: true }, () => {
        console.log("this.state.displaysignin: ", this.state.displaysignin)
      })
    } else {
      this.setState({ displaysignin: false }, () => {
        console.log("this.state.displaysignin: ", this.state.displaysignin)
      })
    }
  }

  logout = event => {
    event.preventDefault();
    API.logout().then((res) => {
      console.log(" logout res.data: ", res.data)
      // console.log(" getUseId res: ", Object.keys(res))
    })
    this.updatedbstockdataOnSub();
  }

  getUserId = event => {
    event.preventDefault();
    console.log("Start getUserId")
    API.getUseId().then((res) => {
      console.log(" getUseId res.data: ", res.data)
      this.setState(res.data);
      // console.log(" getUseId res: ", Object.keys(res))
    })
  }

  // ========================================================================
  // END SIGN UP/IN CODE

  // GETS DATA FROM API, SETS stockInfo_keys
  searchTicker = query => {
    console.log("searchTicker")
    API.search(query)
      .then((res) => {
        console.log("QZQZ",res.data.data)
        // stock_ticker[res.data.data[0].symbol] = res.data.data[0]
        stock_ticker[query] = res.data.data[0]
        // stock_ticker[res.symbol] = res.data.data[0]
        this.setState({ stocksInfo: stock_ticker }, () => {
          stocksInfo_keys = Object.keys(this.state.stocksInfo)
          this.setState({ stocksInfo_keys: stocksInfo_keys }, () => {
            console.log("stocksInfo_keys: ", stocksInfo_keys)
          });
        })

        var test = {
          // ticker: this.state.ticker,
          // price: res.data.c,
          // name: "None",
          // open: res.data.o,
          // percentChange: res.data.c - res.data.o,
          // dayHigh: res.data.h,
          // dayLow: res.data.l,
          // marketCap: 0,
          // avgVol: 0
          ticker: this.state.ticker,
          price: res.data.data[0].close,
          name: res.data.data[0].symbol,
          open: res.data.data[0].open,
          percentChange: ((res.data.data[0].open - res.data.data[0].close)/ res.data.data[0].open).toFixed(2),
          dayHigh: res.data.data[0].high,
          dayLow: res.data.data[0].low,
          marketCap: 0,
          avgVol: res.data.data[0].volume
        }

        API.getUseId().then((res) => {
          console.log(" getUseId res.data: ", res.data)
          // this.setState(res.data);
          // console.log(" getUseId res: ", Object.keys(res))

          // test.user_id = res.data.userid
          test.user_id = res.data.userid

          API.savestock(test).then((res) => {
            console.log("res: ", res)
          });
        })


      })
      .catch(err => console.log(err));
  };



  getUserId = event => {
    event.preventDefault();
    console.log("Start getUserId")
    API.getUseId().then((res) => {
      console.log(" getUseId res.data: ", res.data)
      // this.setState(res.data);
      // console.log(" getUseId res: ", Object.keys(res))
    })

  }

  // GET DATA FROM THE DB
  getdbstockdata = event => {
    API.getstocks().then((res) => {
      console.log("res.data: ", res.data)
      this.setState({ dbstocks: res.data })
      console.log("This is dbstocks - getdbstockdata:", dbstocks)
    });
  }
  //  handleShowMessageClick = (idx) => this.setState({ showModal: true, clickedIndex: idx })

  // DELETE A STOCK FROM DB AND PAGE
  deleteDBstockData = idx => {
    let delTicker = idx;
    API.getstocks().then((idx) => {
      console.log("delTicker: ", idx.data[delTicker].ticker);
      delTicker = {
        ticker: idx.data[delTicker].ticker
      };
      console.log("this is del ticker from deleteDBstockData: ", delTicker)
      API.deleteStocks(delTicker);
      this.getdbstockdata();
    })
  }


  clicksignIN = () => {
    if (!this.state.displaysignin) {
      this.setState({ displaysignin: true }, () => {
        console.log("this.state.displaysignin: ", this.state.displaysignin)
      })
    } else {
      this.setState({ displaysignin: false }, () => {
        console.log("this.state.displaysignin: ", this.state.displaysignin)
      })
    }
  }


  updatedbstockdata = event => {
    event.preventDefault();
    console.log("prevent deafult")
    API.getstocks().then((res) => {
      console.log("res.data: ", res.data)
      let updateTickers = [];
      res.data.forEach(element => {
        console.log("element.ticker: ", element.ticker)
        updateTickers.push(element.ticker);
      });
      console.log("updateTickers: ", updateTickers);
      updateTickers.forEach(element => {
        console.log("This is element: ", element)
        API.search(element)
          .then((res) => {
            console.log("res.data: ", res.data)
            var test = {
              // ticker: this.state.ticker,
              // price: res.data.c,
              // name: "None",
              // open: res.data.o,
              // percentChange: res.data.c - res.data.o,
              // dayHigh: res.data.h,
              // dayLow: res.data.l,
              // marketCap: 0,
              // avgVol: 0
              ///////////////////////
              // ticker: element,
              // price: res.data.data[0].price,
              // name: res.data.data[0].name,
              // open: res.data.data[0].price_open,
              // percentChange: res.data.data[0].change_pct,
              // dayHigh: res.data.data[0].day_high,
              // dayLow: res.data.data[0].day_low,
              // marketCap: res.data.data[0].market_cap,
              // avgVol: res.data.data[0].volume_avg
              ////////////////////////////
              ticker: element,
              price: res.data.data[0].close,
              name: res.data.data[0].symbol,
              open: res.data.data[0].open,
              percentChange: ((res.data.data[0].open - res.data.data[0].close)/ res.data.data[0].open).toFixed(2),
              dayHigh: res.data.data[0].high,
              dayLow: res.data.data[0].low,
              marketCap: 0,
              avgVol: res.data.data[0].volume
            }
            console.log("this is test: ", test)
            API.updateStocks(test);
            this.getdbstockdata();
          })
      })
    })
  }

  updatedbstockdataOnSub = event => {
    // event.preventDefault();
    // console.log("prevent deafult")
    API.getstocks().then((res) => {
      console.log("res.data: ", res.data)
      let updateTickers = [];
      res.data.forEach(element => {
        console.log("element.ticker: ", element.ticker)
        updateTickers.push(element.ticker);
      });
      console.log("updateTickers: ", updateTickers);
      updateTickers.forEach(element => {
        console.log("This is element: ", element)
        API.search(element)
          .then((res) => {
            console.log("res.data: ", res.data)
            var test = {
              // ticker: this.state.ticker,
              // price: res.data.c,
              // name: "None",
              // open: res.data.o,
              // percentChange: res.data.c - res.data.o,
              // dayHigh: res.data.h,
              // dayLow: res.data.l,
              // marketCap: 0,
              // avgVol: 0
              ///////////////////////
              // ticker: element,
              // price: res.data.data[0].price,
              // name: res.data.data[0].name,
              // open: res.data.data[0].price_open,
              // percentChange: res.data.data[0].change_pct,
              // dayHigh: res.data.data[0].day_high,
              // dayLow: res.data.data[0].day_low,
              // marketCap: res.data.data[0].market_cap,
              // avgVol: res.data.data[0].volume_avg
              ////////////////////////////
              ticker: element,
              price: res.data.data[0].close,
              name: res.data.data[0].symbol,
              open: res.data.data[0].open,
              percentChange: ((res.data.data[0].open - res.data.data[0].close)/ res.data.data[0].open).toFixed(2),
              dayHigh: res.data.data[0].high,
              dayLow: res.data.data[0].low,
              marketCap: 0,
              avgVol: res.data.data[0].volume
            }
            console.log("this is test: ", test)
            API.updateStocks(test);
            this.getdbstockdata();
          })
      })
    })
  }

  // RUNS THE SUBMIT BUTTON, ONCLICK setState search_ticker = state.ticker
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Clicked Submit")
    // https://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately
    this.setState({ search_ticker: this.state.ticker }, () => {
      this.searchTicker(this.state.search_ticker);
      
      
    })
    // this.getdbstockdata();
    this.updatedbstockdataOnSub();
    event.value = "";
  };


  // logOut = event => {
  //   // event.preventDefault()
  //   if (!isUserLoggedIn) {
  //     this.setState({ isUserLoggedIn: true },

  //       () => {
  //         console.log("this.state.isUserLoggedIn: ", this.state.isUserLoggedIn)
  //       })
  //     API.logout()
  //   }
  //   // else  {
  //   //   this.setState({isUserLoggedIn: false}, () => {
  //   //     console.log("this.state.isUserLoggedInZZZ: ", this.state.isUserLoggedIn)
  //   //   })
  //   // }

  // }

  // logout = event => {
  //   event.preventDefault();
  //   API.logout().then((res) => {
  //     console.log(" logout res.data: ", res.data)
  //     // console.log(" getUseId res: ", Object.keys(res))
  //   }
  //   )
  // }


  /* ============================================================================== */
  /*                      RENDER                                                    */
  /* ============================================================================== */

  render() {


    return (

      <Wrapper >
        <Router>
          <div>
            <div>
              <Nav

                displaysignup_function={this.displaysignup_function}
                displaysignup={this.state.displaysignup}
                isUserLoggedIn={this.state.isUserLoggedIn}
                getUseId={this.state.getUseId}
                // logOut= 
                userLogin={this.logOut}
              />


              <Route
                path="/signedIn"
              ></Route>

              {/* <SignUp
            handleFormInputChange={this.handleFormInputChange}
            signUpFormSubmit={this.signUpFormSubmit}
          /> */}



              <Route
                path="/signup"
                // exact  component={SignUp} 
                // https://tylermcginnis.com/react-router-pass-props-to-components/
                render={(props) => <SignUp {...props}
                  logOut={this.logOut} />}

              />

              {/* <Route
                path="/signin"
                // exact  component={SignIn} 
                // https://tylermcginnis.com/react-router-pass-props-to-components/
                render={(props) => <SignIn {...props}
                isUserLoggedIn={this.state.isUserLoggedIn}
                logOut={this.logOut} />}

              /> */}

              <Route exact path="/signin" component={SignIn} />



              <Jumbotron />


              <SearchBar
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                getdbstockdata={this.getdbstockdata}
                refresh={this.updatedbstockdata}
                getUserId={this.getUserId}
                logout={this.logout}
              />
            </div>

            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <div className='card-deck'>

                    {this.state.dbstocks.map((data, idx) => (
                      <StockCardHolder
                        stocksInfo_keys={this.state.stocksInfo_keys}
                        data={data}
                        key={data.id}
                        getdbstockdata={() => this.getdbstockdata()}
                        handleShowMessageClick={() => this.handleShowMessageClick(idx)}
                        deleteDBstockData={() => this.deleteDBstockData(idx)}
                      />
                    ))}

                    {this.state.showModal ? (
                      <Modal onClose={this.handleCloseModal}>
                        <span>Ticker: {this.state.dbstocks[this.state.clickedIndex].ticker}  |  Name: {this.state.dbstocks[this.state.clickedIndex].name}</span>
                        <br />
                        <span>Stock Price: {this.state.dbstocks[this.state.clickedIndex].price}   |   Change %: {this.state.dbstocks[this.state.clickedIndex].percentChange}</span>
                        <br />
                        <span>Open: {this.state.dbstocks[this.state.clickedIndex].open}   |   Day Low: {this.state.dbstocks[this.state.clickedIndex].dayLow}</span>
                        <br />
                        <span>Day High: {this.state.dbstocks[this.state.clickedIndex].dayHigh}   |   Avg. Vol. {this.state.dbstocks[this.state.clickedIndex].avgVol}</span>
                        <br />
                        <TradingViewWidget symbol={`${this.state.dbstocks[this.state.clickedIndex].ticker}`} height={500} width={600} />
                      </Modal>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* <MiniChart></MiniChart> */}
          </div>
        </Router>

      </Wrapper>
    );
  }
}

export default App;
