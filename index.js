import express from "express"

const app = express()

const port = 8000
app.use(express.json())

let teaData = []
let nextId =1

//add a new tea
app.post('/teas',(req,res) =>{
    const {name,price}=req.body
    const newTea ={id: nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})


//get tea with ID
app.get('/teas/:id',(req,res) =>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    res.status(200).send(tea)
})


//tea update
app.put('/teas/:id',(req,res)=>
{
    const tea =teaData.find(t => t.id === parseInt(req.params.id ))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

//tea delete
app.delete('/teas/:id',(req,res) =>{
    const index = teaData.findIndex(t => t.id ===parseInt(req.params.id))
    if(index === -1)
    {
        return res.status(404).send("not fo und");
    }
    teaData.splice(index,1)
    res.status(204).send("deleted");
})


app.listen(port, () => {
    console.log(`Server is running at ${port}...`);
})
// app.get("/",(req,res) => {
//     res.send("Hello World");
// })

// app.get("/manager",(req,res) => {
//     res.send("Hello Omkar");
// })

// app.get("/batman",(req,res) => {
//     res.send("Express Learning");
// })
