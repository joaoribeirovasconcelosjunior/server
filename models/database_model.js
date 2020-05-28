function database_model(){
    
    this.version = '0.0.1';
    var db = null;
    var mysql = require('mysql');
    var config = {
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'fire_zone'
    };
    
    this.connect = function (callback){        
        db = mysql.createConnection(config);
        db.connect(function(err, result){            
            if (err){                  
                console.log('error connecting mysql :' + err);
                return ;
            }
            console.log('cennected as database ' + config.database);
            callback(result);
        });
    };
     
    this.start_table = function (callback){
        db.query(`SELECT * FROM user`, function (err, result) {
            if(err !== null){ 
                var sql = `CREATE TABLE user (id INT NOT NULL AUTO_INCREMENT, email VARCHAR(40) NOT NULL, nickname VARCHAR(12) NOT NULL,username VARCHAR(40) NOT NULL,password VARCHAR(40) NOT NULL,score INT NOT NULL DEFAULT 0,PRIMARY KEY (id))`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                }); 
            }
        });
        db.query(`SELECT * FROM ranking`, function (err, result) {
            if(err !== null){
                var sql = `CREATE TABLE ranking (id INT NOT NULL,nickname VARCHAR(12) NOT NULL,score INT NOT NULL,PRIMARY KEY (id))`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                }); 
            }
        }); 
    };
     
    this.consult = function (item,value,callback) {
        
        var sql = `SELECT * FROM user WHERE '${value}' = ?`;
        db.query(sql, value,function (err, result) {
            
            var json = {"callback":"consult","item":item};
            err === null ? json["value"] = result.length > 0 ? true : false : json["value"] = "error";
            callback ( json );
        });
    };
    
    this.create_account = function (email, nickname, username, password, callback) {
        var sql = `INSERT INTO user (email, nickname, username, password) VALUES ?`;
        var values = [[email, nickname, username, password]];
        db.query(sql,[values],function (err, result) {
            console.log("******** ",result.insertId);
            var json = {"callback":"create_account"};
            err === null ? json["value"] =  true : json["value"] = "error";
            callback ( json );
        });
    };
    
    this.ranking = function (callback) {        
        db.query(`SELECT * FROM ranking ORDER BY score DESC`, function (err, result) {
            var json = {"callback":"rank"};
            for (i = 0; ls = result[i], i < result.length; i++) {
                json["nickname"] = json.nickname !== undefined ? json.nickname +','+ ls.nickname:ls.nickname;
                json["score"] = json.score !== undefined ? json.score +','+ ls.score:ls.score;
            }            
            callback ( err === null ? json : null );
        });
    };
    
    this.login = function (username,password, callback) {        
        var sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
        var values = [username,password];
        db.query(sql, values,function (err, result) {            
            var json = {"callback":"login"};
            err === null ? json["value"] = result.length > 0 ? true : false : json["value"] = "error";            
            callback ( json );
        });
    };    
}
 
module.exports = new database_model;
