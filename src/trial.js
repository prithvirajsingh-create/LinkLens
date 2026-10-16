const express=require("express");
const cors=require("cors");
const cheerio=require("cheerio");

const app=express();
const PORT=process.env.PORT||3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message:"LinkLens API is running 🚀"
    });
});

