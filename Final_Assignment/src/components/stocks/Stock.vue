<template>
    <div class="col-sm-6 col-md-4">
        <div v-bind:key = "stock.id" v-for = "(stock,index) in stocks " >
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.name}}
                    <small>(Price: {{stock.price}})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input
                            type="number"
                            min = 0
                            class="form-control danger"
                            placeholder="Quantity"
                            v-model = "quantity[index]"
                            @input = "changeClass($event)"
                           
                    >
                </div>
                <div class="pull-right">
                    <button
                            class="btn btn-success"
                            @click = "buyStock(stock)"
                    >Buy
                    </button>
                </div>
            </div>
             <p>Max Stock to Buy {{(AvailableCredit / stock.price).toFixed(2)}}</p>
        </div>
       
        </div>
    </div>
</template>

<style scoped>
.danger {
  border: 1px solid red;
}
.safe{
    border: 1px solid green;
}
</style>

<script>
import firebase from 'firebase';
export default {
    data(){
        return{
        
            quantity:[]
        }
    },
  
    computed:{
        stocks(){

        return this.$store.getters.getStocks;
        },
          AvailableCredit(){
            return this.$store.getters.getInitialCredit;
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
        buyStock(stock){

            var qty = this.quantity[stock.id - 1]
            if(!qty){
              alert('Enter Valid Stock Quantity!');
              
            }
            else{
            var stockPrice = qty * stock.price;
            if(stockPrice > this.AvailableCredit){
                alert('stock limit exceeding the available credit.')
            }
            else{
                 
            var stk = {stock,qty,stockPrice};
            this.$store.dispatch('buy',stk);
            
            }
        }
        }
    }
};
</script>