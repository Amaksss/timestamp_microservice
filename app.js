import express from "express";
import dotenv from 'dotenv';




dotenv.config();
const app = express();
const PORT = process.env.PORT

app.get('/api/:date?', (req, res) => {

    const date = req.params.date;
    let dateObject

     //if there is an empty date parameter

     const now = new Date()
     if (!date || date === "") {
         return res.json({
             unix: now.getTime(),
             utc: now.toUTCString()
         })
     }

    //Checking if the input is a timestamp or datestring
    if (!isNaN(date)) { // if input is a timestamp
        dateObject = new Date(parseInt(date))
    }else

    //convert the date to date object by parsing the string
    dateObject = new Date(date);

    //use the date obect for conversion
    if (isNaN(dateObject.getTime())) { //checking if it is a valid date
        return res.json({ error: "Invalid Date"})
    } res.json({ 
        unix: dateObject.getTime(),
        utc: dateObject.toUTCString()
    })


   
    
});


app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})