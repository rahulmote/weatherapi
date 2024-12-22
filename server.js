const express =require("express");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const app = express();

app.get("/:city", async(req,res)=>{
    try {
        const page = await axios.get(process.env.SCRAPE_API_FIRST+req.params.city+process.env.SCRAPE_API_LAST);
        const $ = cheerio.load(page.data);
        const date = $(process.env.DATE_CLASS).text();
        const temprature = $(process.env.TEMPERATURE_CLASS).text();
        const minMaxTemprature =$(process.env.MIN_MAX_TEMPERATURE).text();
        const humidityPressure = $(process.env.HUMIDITY_PRESSURE).text();
        let minTemprature = '';
        let maxTemprature = '';
        let humidity = '';
        let pressure = '';
        for(let i=0;i<6;i++){
            if(i<3){
                 minTemprature =minTemprature + minMaxTemprature[i]
            }else{
                maxTemprature =maxTemprature+minMaxTemprature[i];
            }
        }
        for(let i=0; i<6;i++){
            if(i<2){
             humidity = humidity+humidityPressure[i];    
            }else{
                pressure = pressure+humidityPressure[i];
            }
        }
        const weatheData = {
            date,
            temprature,
            minTemprature,
            maxTemprature,
            humidity,
            pressure
        }
        res.send(weatheData)
    } catch (error) {
        console.log(error)
    }
});

app.listen(process.env.PORT,()=>{
    console.log(`server started`);
})