var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var sets = { // PLEASE CHANGE SETTINGS HERE IF NEEDED

    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    db: 'lasmarket'

};

{
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: sets.host,
        user: sets.user,
        password: sets.password,
        multipleStatements: true
    });

    function handleError(err, res) {
        var desiredProps = ['code', 'sqlMessage', 'sql'];
        let myErr = {};
        desiredProps.forEach((val) => {
            if (!(typeof err[val] == 'undefined')) {
                myErr[val] = err[val];
            }
        });
        console.error(myErr);
        res.status(400).json(myErr);
        return null;
    }
}

router.get('/createdb', function (req, res, next) {
    let sql = "CREATE DATABASE `lasmarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */; CREATE TABLE `lasmarket`.`cart` ( `id` int(11) NOT NULL AUTO_INCREMENT, `clientid` int(9) unsigned zerofill NOT NULL, `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; CREATE TABLE `lasmarket`.`client` ( `fname` varchar(45) NOT NULL, `lname` varchar(45) NOT NULL, `email` varchar(45) NOT NULL, `id` int(9) unsigned zerofill NOT NULL, `password` varchar(45) NOT NULL, `city` varchar(45) NOT NULL, `street` varchar(45) NOT NULL, `admin` tinyint(4) NOT NULL DEFAULT '0', `activecartid` int(11) DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `email_UNIQUE` (`email`), KEY `activecartid_idx` (`activecartid`), CONSTRAINT `activecartid` FOREIGN KEY (`activecartid`) REFERENCES `cart` (`id`) ON DELETE SET NULL ON UPDATE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; ALTER TABLE `lasmarket`.`cart` ADD CONSTRAINT `clientid` FOREIGN KEY (`clientid`) REFERENCES `client` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; INSERT INTO `lasmarket`.`client` (`fname`,`lname`,`email`,`id`,`password`,`city`,`street`,`admin`) VALUES ('admin','admin','admin@admin.admin',000000000,'admin','admin','admin',1); CREATE TABLE `lasmarket`.`category` ( `id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; INSERT INTO `lasmarket`.`category` (`name`) VALUES ('Dairy & Eggs'); INSERT INTO `lasmarket`.`category` (`name`) VALUES ('Fruits & Vegeables'); INSERT INTO `lasmarket`.`category` (`name`) VALUES ('Meat & Fish'); INSERT INTO `lasmarket`.`category` (`name`) VALUES ('Wine & Drinks'); CREATE TABLE `lasmarket`.`product` ( `id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, `categoryid` int(11) DEFAULT NULL, `price` decimal(11,2) NOT NULL, `picture` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`), KEY `categoryid` (`categoryid`), CONSTRAINT `categoryid` FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Greek Yogurt 150g',1,3.90,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_7290013771384.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Milk 1000ml',1,5.40,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_42466.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Egg 10-Pack',1,17.10,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_7290011778439.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Red Apple',2,2.50,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_995021.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Golden Apple',2,2.50,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_963129.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Orange',2,0.70,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_960258.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Frozen Salmon Fillet',3,163.10,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_662213.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Some Kind Of Meat',3,89.90,'https://upload.wikimedia.org/wikipedia/commons/5/5b/Hamburger_icon.png'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Red Wine',4,129.90,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_8801843.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Champagne',4,169.90,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_4022025001905.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('White Wine',4,129.90,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_5966033.PNG'); INSERT INTO `lasmarket`.`product` (`name`,`categoryid`,`price`,`picture`) VALUES ('Orange Juice',4,8.90,'https://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_2663522.PNG'); CREATE TABLE `lasmarket`.`cartitem` ( `id` int(11) NOT NULL AUTO_INCREMENT, `cartid` int(11) NOT NULL, `productid` int(11) NOT NULL, `quantity` int(3) NOT NULL DEFAULT '1', `unitprice` decimal(11,2) NOT NULL, `totalprice` decimal(11,2) GENERATED ALWAYS AS ((`quantity` * `unitprice`)) VIRTUAL, PRIMARY KEY (`id`), KEY `productid_idx` (`productid`), KEY `cartid_idx` (`cartid`), CONSTRAINT `cartid` FOREIGN KEY (`cartid`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `productid` FOREIGN KEY (`productid`) REFERENCES `product` (`id`) ON UPDATE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; CREATE TABLE `lasmarket`.`order` ( `id` int(11) NOT NULL AUTO_INCREMENT, `clientid` int(9) unsigned zerofill NOT NULL, `cartid` int(11) NOT NULL, `price` decimal(11,2) NOT NULL DEFAULT '0.00', `shippingcity` varchar(45) NOT NULL, `shippingstreet` varchar(45) NOT NULL, `shippingdate` date NOT NULL, `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ccnumber` int(16) unsigned zerofill NOT NULL, PRIMARY KEY (`id`), KEY `clientid_order` (`clientid`), KEY `cartid_order` (`cartid`), CONSTRAINT `cartid_order` FOREIGN KEY (`cartid`) REFERENCES `cart` (`id`) ON UPDATE CASCADE, CONSTRAINT `clientid_order` FOREIGN KEY (`clientid`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json({
            info: 'Database created successfully'
        });
    });
});

router.post('/client', function (req, res, next) {
    let desiredKeys = [
            'fname', // varchar(45)
            'lname', // varchar(45)
            'email', // varchar(45)
            'id', // int(9) UN zerofill PK
            'password', // varchar(45)
            'city', // varchar(45)
            'street' // varchar(45)
        ],
        desiredVals = [];
    desiredKeys.forEach(key => desiredVals.push(req.body[key] || null));
    let sql = mysql.format('INSERT INTO ??.`client` (??) VALUES (?);', [sets.db, desiredKeys, desiredVals]);
    pool.query(sql, function (err, results, fields) {
        if (err) {
            if (err.sqlMessage.includes('email')) {
                return handleError({
                    sqlMessage: 'Email address already exists'
                }, res);
            }
            if (err.sqlMessage.includes('PRIMARY')) {
                return handleError({
                    sqlMessage: 'ID already exists'
                }, res);
            }
            return handleError(err, res)
        };
        return res.json({
            info: 'New client registered successfully',
            newRecord: req.body
        });
    });
});

router.post('/login', function (req, res, next) {
    { // handle unusual errors
        if (req.body.email == '') return handleError({
            sqlMessage: 'Error: Please enter email address'
        }, res);
        /*if (req.body.password == '') return handleError({
            sqlMessage: 'Error: Please enter password'
        }, res);*/
        if (req.session.clientid) return handleError({
            sqlMessage: 'Error: Already logged in'
        }, res);
    } { // get pass by email and compare it with typed pass:
        let correctPass = '',
            sql = mysql.format('SELECT `id`,`password`,`fname`,`lname`,`admin`,`activecartid` FROM ??.`client` WHERE `email` = ?;', [sets.db, req.body.email]);
        pool.query(sql, function (err, results, fields) {
            if (err) return handleError(err, res);
            if (!results[0]) {
                return handleError({
                    sqlMessage: 'Error: Wrong email address',
                    sql: sql
                }, res);
            }
            correctPass = results[0].password;
            if (correctPass != req.body.password) return handleError({
                sqlMessage: 'Error: Wrong password',
                sql: sql
            }, res);
            req.session.clientid = results[0].id;
            req.session.admin = results[0].admin;
            req.session.activecartid = results[0].activecartid || null;
            req.session.save();
            return res.json({
                info: (results[0].admin ? 'Administrator ' : 'Client ') + results[0].fname + ' ' + results[0].lname + ' logged in successfully'
            });
        });
    }
});

router.post('/logout', function (req, res, next) {
    req.session.destroy(() => {
        return res.json({
            info: 'Logged out successfully'
        });
    });
});

router.get('/product', function (req, res, next) {
    let sql = mysql.format('SELECT * FROM ??.`product`;', [sets.db]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json(results);
    });
});

router.get('/category', function (req, res, next) {
    let sql = mysql.format('SELECT * FROM ??.`category`;', [sets.db]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json(results);
    });
});

router.get('/category/:id', function (req, res, next) {
    let sql = mysql.format('SELECT * FROM ??.`product` WHERE categoryid = ?;', [sets.db, req.params.id]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json(results);
    });
});

router.get('/product/:id', function (req, res, next) {
    let sql = mysql.format('SELECT * FROM ??.`product` WHERE `id` = ?;', [sets.db, req.params.id]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json(results);
    });
});

router.post('/product', function (req, res, next) {
    let desiredKeys = [
            'name', // varchar(45) 
            'categoryid', // int(11) 
            'price', // decimal(11,2) 
            'picture' // varchar(255)
        ],
        desiredVals = [];
    desiredKeys.forEach(key => desiredVals.push(req.body[key] || null));
    let sql = mysql.format('INSERT INTO ??.`product` (??) VALUES (?);', [sets.db, desiredKeys, desiredVals]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json({
            info: 'New product added successfully',
            newRecordId: results.insertId,
            newRecord: req.body
        });
    });
});

router.put('/product/:id', function (req, res, next) {
    let sql = mysql.format('UPDATE ??.`product` SET ? WHERE `id` = ?;', [sets.db, req.body, req.params.id]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json({
            info: 'Product updated successfully',
            'req.body': req.body
        });
    });
});

router.delete('/product/:id', function (req, res, next) {
    let sql = mysql.format('DELETE FROM ??.`product` WHERE `id` = ?;', [sets.db, req.params.id]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json({
            info: 'Product deleted successfully'
        });
    });
});

router.get('/cartitem/:cartid', function (req, res, next) {
    let sql = mysql.format('SELECT * FROM ??.`cartitem` WHERE `cartid` = ?;', [sets.db, req.params.cartid]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json(results);
    });
});

router.post('/cartitem', function (req, res, next) {
    let desiredKeys = [
            //'cartid', // int(11) 
            'productid', // int(11) 
            'quantity', // int(3) 
            'unitprice' // decimal(11,2)
        ],
        desiredVals = [];
    desiredKeys.forEach(key => desiredVals.push(req.body[key] || null));
    desiredKeys.push('cartid');
    if (!req.session.activecartid) return handleError({
        sqlMessage: 'Error: no active cart ID.'
    }, res);
    desiredVals.push(req.session.activecartid);
    let sql = mysql.format('INSERT INTO ??.`cartitem` (??) VALUES (?);', [sets.db, desiredKeys, desiredVals]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json({
            info: 'Item added to cart successfully',
            newRecordId: results.insertId,
            newRecord: req.body
        });
    });
});

router.delete('/cartitem/:id', function (req, res, next) {
    let sql = mysql.format('DELETE FROM ??.`cartitem` WHERE `id` = ?;', [sets.db, req.params.id]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json({
            info: 'Item removed from cart successfully'
        });
    });
});

router.get('/cart/:id', function (req, res, next) {
    let sql = mysql.format('SELECT * FROM ??.`cart` WHERE `id` = ?;', [sets.db, req.params.id]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json(results);
    });
});

router.post('/cart', function (req, res, next) {
    let sql = mysql.format('INSERT INTO ??.`cart` (??) VALUES (?);', [sets.db, 'clientid', req.session.clientid]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        req.session.activecartid = results.insertId;
        pool.query('UPDATE ??.`client` SET `activecartid` = ?;', [sets.db, results.insertId], function (err, results, fields) {
            if (err) return handleError(err, res);
        });
        return res.json({
            info: 'New cart created successfully',
            newRecordId: results.insertId,
            newRecord: req.body
        });
    });
});

router.post('/order', function (req, res, next) {
    let desiredKeys = [
            'clientid', // int(9) UN zerofill 
            'cartid', // int(11) 
            'price', // decimal(11,2) 
            'shippingcity', // varchar(45) 
            'shippingstreet', // varchar(45) 
            'shippingdate', // date
            'datecreated', // timestamp 
            'ccnumber' // int(16) UN zerofill
        ],
        desiredVals = [];
    desiredKeys.forEach(key => desiredVals.push(req.body[key] || null));
    pool.query('SELECT `id` FROM ??.`order` WHERE `date` = ?;', [sets.db, req.body[shippingdate]], function (err, results, fields) {
        if (results.length >= 3) return handleError({
            sqlMessage: 'Please choose another date (more than 3 orders on the same day are not allowed).'
        }, res);
    });
    let sql = mysql.format('INSERT INTO ??.`order` (??) VALUES (?);', [sets.db, desiredKeys, desiredVals]);
    pool.query(sql, function (err, results, fields) {
        if (err) return handleError(err, res);
        req.session.activecartid = null;
        pool.query('UPDATE ??.`client` SET `activecartid` = NULL;', [sets.db], function (err, results, fields) {
            if (err) return handleError(err, res);
        });
        return res.json({
            info: 'Order completed successfully',
            newRecordId: results.insertId,
            newRecord: req.body
        });
    });
});

router.post('/session', function (req, res, next) {
    if (req.session.clientid) {
        return pool.query('SELECT `fname`,`lname` FROM ??.`client` WHERE `id` = ?;', [sets.db, req.session.clientid], function (err, results, fields) {
            if (err) return handleError(err, res);
            return res.json({
                clientid: req.session.clientid || null,
                clientname: results[0].fname + ' ' + results[0].lname,
                admin: Boolean(req.session.admin),
                activecartid: req.session.activecartid || null
            });
        });
    }
    return res.json({
        clientid: null,
        clientname: null,
        admin: false,
        activecartid: req.session.activecartid || null
    });
});



{
    /*router.get('/client', function (req, res, next) {
    let table = mysql.escapeId(sets.db + '.' + 'client');
    pool.query('SELECT * FROM ' + table + ';', function (err, results, fields) {
        if (err) return handleError(err, res);
        return res.json(results);
    });
    });*/
}

module.exports = router;