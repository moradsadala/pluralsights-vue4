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
            {name:'Ahool Ale' , price:2.8 , ibu:'33 i.b.u'},
            {name:'Agoge Ale' , price:3.0 , ibu:'30 i.b.u'}
        ],
        shoppingCart:{
            items : [],
            totalCost:0
        },
        canConnect:false
    },
    filters:{
        convertIBU: function(value){
            if(!value) {return '';}
            value = value.toString();
            value = value.replace(/\./g,'');
            return value.toUpperCase();
        }
    },
    computed:{
        isOnline:{
            get:function(){
            return this.canConnect ? 'Yes':'No';
            }
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