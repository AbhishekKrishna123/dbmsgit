var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var path = require("path");

var express = require("express");
var app = express();

var mysql = require("mysql");

module.exports =
{

    Reg : function (connection, body, res)
    {
        var insertVals = {
            USN : body.usn,
            FirstName: body.fname,
            LastName: body.lname,
            DOB: body.dob,
            MobileNumber: body.mobile,
            EmailID: body.email,
            Address: body.address,
            Gender: body.gender,
            Section: body.section,
            StudentType: body.ugpg,
            DiplomaStudent: body.diploma,
            Semester: body.semester,
            CGPA: body.cgpa,
            SGPA1: body.sgpa1,
            SGPA2: body.sgpa2,
            SGPA3: body.sgpa3,
            SGPA4: body.sgpa4,

            Marks10th: body.marks10th,
            Marks12th: body.marks12th,
            Password: body.pwd,

        };
        // insertion into MySQL
        connection.query("INSERT INTO STUDENT SET ?", insertVals, function(err, result) {
            if(err) throw err;
            else console.log("SUCCESS" + result);
        });


        var insertUsers = {username : body.usn, password : body.pwd, role : 1};

        connection.query("INSERT INTO USER SET ?", insertUsers, function(err, result) {
            if(err) throw err;
            else console.log("SUCCESS" + result);
        });

        res.sendFile('regsuccess.html', { root: path.join(__dirname, 'templates') });
        //res.redirect('/#cta');
    }
}