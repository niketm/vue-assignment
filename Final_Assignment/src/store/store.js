import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import stock from '../data/stockData.json';
import firebase from 'firebase';
export default new Vuex.Store({
    state:{
        initialCredit:100,
        stocks : stock,
       
        portfolios:[ ],
        quantity:[]
    },
    getters:{
        getStocks (state){
            
            return state.stocks;
        },
        getInitialCredit(state){
           return state.initialCredit;
        },
        getPortfolio(state){
           
            return state.portfolios;
        },
        getStockCurrentPrice(state){

        }
    },
    mutations:{
        buy(state,stocks){
            console.log('stockss',stocks);
            this.state.initialCredit -= stocks.stockPrice;
            this.state.portfolios.push(stocks);
            
        },
        sell(state,stocks){
        
         var stk = stocks.stock; // get the stock
         var portfolio = this.state.portfolios;
         
         for( var i = 0 ; i<portfolio.length ; i++){
             console.log(portfolio[i].stock);
             if(portfolio[i].stock.id == stk.stock.id){
                //   var pid = stk.stock.id - 1;
        //  console.log('port'+portfolio);
        eval(portfolio[i].qty -= stocks.qty);    
        eval(this.state.initialCredit+=stocks.stocksPrice);  
                 if(portfolio[i].qty == 0){
                    var index = portfolio.indexOf(portfolio[i]);
                    if (index > -1) {
                      portfolio.splice(index, 1);
                    }
                 }
                 console.log(portfolio[i]);
       
       
       
             }
         }
  
       
        },
        endDay(state){
            var stocks = this.state.stocks; 
            var operators = ['+','-'];
            var operatorNumber =  Math.floor(Math.random() * 2) + 0;
            var result ;
        
            for(var i = 0 ; i<stocks.length; i++){
              
             stocks[i].price =Math.abs( eval( stocks[i].price + operators[operatorNumber] + 1));
             if(stocks[i].price == 0){
                 stocks[i].price +=1;
             }
           
            }

        },
        saveData(state){
            var stockData = firebase.database().ref("stocks/");

            stockData.set ({
             stocks: this.state.stocks,
             portfolio:this.state.portfolios
            });
            alert('stock data saved!');
        },
        loadData(state){
            var ref = firebase.database().ref();
            var that  = this;
            ref.on("value", function(snapshot) {
               console.log(snapshot.val().stocks.portfolio);
               that.state.stocks = snapshot.val().stocks.stocks;
               that.state.portfolios = snapshot.val().stocks.portfolio;
            }, function (error) {
               console.log("Error: " + error.code);
            });
        }
 },
    actions: {
        buy({ commit }, stocks) {
              commit('buy',stocks);
        },
        sell({commit},payload){
            commit('sell',payload);
        },
        endDay({commit}){
            commit('endDay');
        },
        saveData({commit}){
            commit('saveData');
        },
        loadData({commit}){
            commit("loadData");
        }
    }
});