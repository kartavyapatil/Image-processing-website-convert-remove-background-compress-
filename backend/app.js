const express = require('express')
const app = express()
const port = 3000
const router = require("./routes/index")
const cors = require("cors")
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use("/demo",(req,res)=>{
  res.send("hello world");
})
app.use("/api",router)
app.use("*",(req,res)=>{
    console.log("page not found ")
})
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})