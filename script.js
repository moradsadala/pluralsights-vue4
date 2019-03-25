var app = new Vue({
    el:'#app',
    created:function(){
        apiKey = '0gOTVzSU3A5r5S2OeW9rnIUngngrIoGH5V1ABwVl';
        url = 'https://api.nasa.gov/planetary/apod?api_key=';
        axios.get( url + apiKey)
            .then(function(){
                app.canConnect = true;
            })
            .catch(function(){
                app.canConnect = false
            });
    },
    data:{
        isSuccesseded:false,
        beers:[
            {name:'Ahool Ale' , price:2.8},
            {name:'Agoge Ale' , price:3.0}
        ],
        shoppingCart:{
            items : [],
            totalCost:0
        },
        canConnect:false
    },
    computed:{
        isOnline:function(){
            return this.canConnect ? 'Yes':'No';
        }
    },
    methods:{
        addElement:function(beer){
            if(!this.isSuccesseded){
                this.shoppingCart.items.push(beer); 
            }
            
        },
        updateTotalCost:function(){
            let totalCost = 0;
            for(i=0 ; i < this.shoppingCart.items.length ; i++){
                totalCost += this.shoppingCart.items[i].price;
            }
            this.shoppingCart.totalCost = totalCost;
        },
        resetCart:function(){
            this.shoppingCart.items = [];
        },
        submitOrder:function(){
            this.isSuccesseded = true;
        },
        addNewOrder:function(){
            this.resetCart();
            this.updateTotalCost();
            this.isSuccesseded = false;
        },
    },
    watch:{
        shoppingCart:{
            handler: function(){
            this.updateTotalCost();
            },
            deep:true  
        },
        

           
        
    }
    
})