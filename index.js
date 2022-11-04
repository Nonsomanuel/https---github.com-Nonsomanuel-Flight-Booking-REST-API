const express = require("express");
const app = express();
const flights = require('./flights.json');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

//app.use(json());

//app.use("/", routes);

const port = process.env.PORT || 3000;




app.get('/flights', (req, res) => {
  //fetch all users
  return res.json({flights})
})

app.get('/flights/:id' , (req, res) => {
  //fecth req.params.id
  let id = req.params.id;
  //find flight with id 
let foundFlight = flights.find(flight => {
  return String(flight.id) === id
 })
 if (foundFlight) {
  return res.status(200).json({ flight: foundFlight })
 } else {
  return res.status(404).json({ message: "flight not found" })
 }
 
 
})


//create new flight
app.post('/flights', (req, res) => {
  //console.log(req.body.newFlight)
  
  //save new flight to existing database
  flights.push(req.body.newFlight);
 
  //save updated data to users.json
  //stringfy the json data
  let stringedData = JSON.stringify(flights, null, 2);
  fs.writeFile('flights.json', stringedData, function (err) {
      if (err) {
          return res.status(500).json({ message: err })
      }
  })

  //send back a response to client
  return res.status(200).json({ message: "flight successfully booked" })
})

//update flight
app.put('/flights/:id', (req, res) => {
  try {
    let id =req.params.id;
    
    const updatedflights = flights.find(flight => {
    const {title, time, price} =  req.body;
    flight.title = req.body.title;
    flight.time = req.body.time;
    flight.price = req.body.price;
      return String(flight.id) === id
    })
    flights.push(req.body.updatedFlight);

    if (updatedflights) {
    res.status(200).json({message: "flight updated"})}
   
      
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})


app.delete('/flights/:id', (req, res) => {
  try{
    let id =req.params.id;
    const deletedflights = flights.find(flight => {
     
      const {title, time, price, date} =  req.body;
     
     
      flight.title = req.body.title;
      flight.time = req.body.time;
      flight.price = req.body.price;
      flight.date = req.body.date;
      flights.splice(flights, null);
      return String(flight.id) === id
        })
    
    
    res.status(200).json({
      message: "Flight deleted",
      flights,
    });
    
  }
  catch (err) {
    res.status(500).json({ message: err.message});
  };
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
