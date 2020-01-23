var db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res) {
        db.Burger.findAll({}).then(function(results) {
            let burgerArray = [];
            for(let index = 0; index < results.length;index++)
            {
                burgerArray[index] = {id: results[index].id, name:results[index].name, eaten: results[index].eaten};
            }
            //results.forEach(burger => burgerArray += {name:burger.name, eaten: burger.eaten});
            console.log(burgerArray);
            var hbsObject = {
                burgers: burgerArray
              };
            res.render("index", hbsObject);
        });
    });

    app.post("/api/burgers", function(req, res) {
        db.Burger.create({
            name: req.body.name,
            eaten: req.body.eaten
        }).then(function(results) {
            res.json(results);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.delete("/api/burgers/:id", function(req, res) {
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(results) {
            res.json(results);
        });
    });

    app.put("/api/burgers/:id", function(req, res) {
        db.Burger.update({
            eaten: req.body.eaten
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(results) {
            
            
            res.json(results);
        }).catch(function(err) {
            res.json(err);
        });
    });
}