var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var path = require("path");

var express = require("express");
var app = express();

var mysql = require("mysql");

module.exports =
{
    Login : function(connection, request, response)
    {
        var username = request.body.username;

        connection.query("SELECT * FROM USER WHERE USERNAME = '" + request.body.username + "'", function(err, res, fields){

            console.log(res);

            if(res.length == 0) {
                console.log("Error 1");
                console.log(res);
                //response.sendFile("unauthorised.html", { root: path.join(__dirname, 'templates') });
                response.redirect('/#');
                //return 0;
            } else {
                if(request.body.password == res[0].password){
                    //console.log("authorised user no error");

                    request.session.username = request.body.username;
                    request.session.role = res[0].role;
                    response.redirect('/dashboard');

                    //}
                } else {
                        //console.log("Error 2");
                        //console.log("not an authorised user");
                        response.redirect("/#");
                }
            }
        });
    }
}