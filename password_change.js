var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var path = require("path");

var express = require("express");
var app = express();

var mysql = require("mysql");

module.exports =
{
    PasswordChange : function (req, res, connection)
    {
        var body = req.body;
        var name = req.session.username;

        //console.log("username" + name);

        var old_password = body.old_password;
        var new_password = body.new_password;
        var cnew_password = body.cnew_password;

        if(new_password != cnew_password)
        {
            res.sendFile('password_change_fail.html', { root: path.join(__dirname, 'templates')});
        }

        //console.log("OLD PW: " + old_password);
        //console.log("NEW PW: ", + new_password);

        var query1 = "SELECT * FROM USER WHERE USERNAME = '" + name + "';"


        connection.query(query1, function(err, result){
            
            if(err) 
            {
                console.log("ERROR!" + err);
            }

            else
            {
                //console.log("FIRST RESULT" + result + "\n\n");

                if(result[0].password == body.old_password)
                {

                    var query2 = "UPDATE USER SET PASSWORD = '" + new_password + "' WHERE USERNAME = '" + name + "';"

                    connection.query(query2, function(error, result)
                    {
                        if(error) throw error;
                        else 
                        {
                            //console.log("UPDATED!" + result);
                            res.redirect('/dashboard');
                        }
                    });
                }

                else
                {
                    //console.log("WRONG DETAILS!\n\n");
                    res.sendFile('password_change_fail.html', { root: path.join(__dirname, 'templates')});
                }
            }
        });
    }
}