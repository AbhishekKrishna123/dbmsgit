var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var path = require("path");

var express = require("express");
var app = express();

var mysql = require("mysql");

module.exports = 
{
    addTest : function(req, res, connection, companyID)
    {
        var body = req.body;
        
        var insertVals = 
        {
            CompanyID : companyID,
            Name : body.testname,
            TestDate: body.testdate,
            TestTime: body.testtime,
            Location: body.testlocation,
            Details: body.otherdetails,
            CutOffGPA: body.cutoffgpa
        }

        connection.query("INSERT INTO TEST SET ?", insertVals, function(err, result) {
            if(err) throw err;
            else 
            {
                console.log("SUCCESS" + result);
                res.redirect('/dashboard');
            }
        });
    }
}