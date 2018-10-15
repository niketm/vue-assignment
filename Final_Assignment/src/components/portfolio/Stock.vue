<template>
    <div class="col-sm-6 col-md-4">
      <h1>   {{msg}} </h1>
        <div v-bind:key= "stocks.id" v-for= "(stocks,index) in portfolio">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stocks.stock.name}}
                    <small>(Price: $ {{stocks.stock.price}}) </small>
                    <small>Available Quantity {{stocks.qty}}</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input
                            type="number"
                            class="form-control danger"
                            placeholder="Quantity"
                            v-model= "quantity[index]" 
                            @input = "changeClass($event)"
                    >
                </div>
                <div class="pull-right">
                    <button
                            class="btn btn-success"
                            @click= "sellStock(stocks)"
                    >Sell
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.danger {
  border: 1px solid red;
}
.safe {
    border : 1px solid green;
}
</style>

<script>

export default {
    data(){
        return {
            quantity:[],
            msg:''
        }
    },
    computed:{
        portfolio(){
            
            if(this.$store.getters.getPortfolio.length == 0){
            // this.msg="No stock avaliable in portfolio";
            }
           return this.$store.getters.getPortfolio;

        }
      
    },
    methods:{
         changeClass(e){
          if(e.target.value){
        e.target.classList.add('safe')
          }
          else{
              e.target.classList.remove('safe')
          }
       },
        sellStock(stock){
            var qty = this.quantity[stock.stock.id - 1];
            var stocksPrice = stock.stock.price * qty;
        
           if(stock.qty < qty){
               alert('can not sell more stocks than available');
           }
           else{
                var stk = {stock,stocksPrice,qty};
               this.$store.dispatch('sell',stk);
           }
        }
    }
};
</script>