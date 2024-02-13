const express= require('express');
const app= express();
const items = require('./Items');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

console.log(items);

app.get('/api/items', (req, res)=>{
    res.json(items);
})

app.post('/api/items',(req,res) =>{
    const newItem = {
        name:req.body.name,
        id: req.body.id,
        price:req.body.price
    }
    items.push(newItem);
    res.json(items);
})

app.delete('/api/items/:id', (req, res) =>{
    let {id} = req.params;
    let itemToBeDeleted = items.find(item => item.id === id);

    if(itemToBeDeleted){
        res.json({
            message:'Item Deleted',
            items: items.filter(item => item.id !== id)
        })
    }else{
        res.status(404)
        .json({message: `Item you are looking for doesn't exist`});
    }
})

app.put('/api/items/:name', (req, res)=> {
        let{name} = req.params
        let itemTOBeUpdated = items.find(item => item.name === name);
        if(itemTOBeUpdated){
            const updatedItem = req.body;
            items.forEach(item => {
                if (item.name === req.params.name){
                    item.name = updatedItem ? updatedItem.item : item.name;
                    res.json({message: 'Items updated', item})
                }
            })
        }else{
            res.status(404)
            .json({ message: `Item you are looking for ${req.params.name} doesn't exist `})
        }
    })
    

app.listen(4000, () => {
    console.log(`It's working! :)`)
})