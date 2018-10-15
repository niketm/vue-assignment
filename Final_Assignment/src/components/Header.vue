<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                 <router-link   to = "/">Stock Trader</router-link>
             
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav" style="margin-left:1em;">
                   
                     <router-link   to = "/portfolio">Portfolio</router-link>
                     <router-link    to = "/stocks">Stocks</router-link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: $ {{initialCredits}}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="#"
                            @click = "endDay()" >
                            End Day
                        </a>
                     </li>
                    <li
                            class="dropdown"
                            :class="{open: isDropdownOpen}"
                            @click="isDropdownOpen = !isDropdownOpen">
                        <a
                                href="#"
                                class="dropdown-toggle"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false">Save & Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click= "saveData()" >Save Data</a></li>
                            <li><a href="#" @click= "loadData()">Load Data</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false
    };
  },
  computed:{
      
        initialCredits(){
            return this.$store.getters.getInitialCredit;
        }
  },
  methods:{
      endDay(){
         
           this.$store.dispatch('endDay');
      },
      saveData(){
          this.$store.dispatch('saveData');
      },
      loadData(){
          this.$store.dispatch('loadData');
      }
  }
};
</script>