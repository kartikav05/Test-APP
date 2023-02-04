const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
require("dotenv").config();
const https = require("https");
var apikey=process.env.APIKEY;


//

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Start Server

app.listen(process.env.PORT || 3000, function () {
    console.log("server on 3000");
})
//Form Post
app.post("/", function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var ph = req.body.ph;
   

    var data = {

        members: [{

            email_address: email,
            status: "subscribed",
            merge_fields: {

                FNAME: name,
                PHONE: ph,
              

            }

        }]

    }
    var JsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/fdd768a3cb";
    const options = {

        method: "POST",
        auth: process.env.APIKEY
    }


    const request = https.request(url, options, function (response) {

        if(response.statusCode===200){
            res.sendFile(__dirname+"/ok.html")
        }
        else
        res.sendFile(__dirname+"/failure.html")

        response.on("data", function (data) {

            console.log(JSON.parse(data));

        })
    })

    //console.log(name, bdate);
    request.write(JsonData);
    request.end();

})

//GET

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
})

//    5f69ca0a82411b640a539555a6c9bf1d-us9   fdd768a3cb

