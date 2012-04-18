//Production
"use strict";
var config = {};

config.web = {};
config.db = {};

config.db.connectionString = "mongodb://efbenson:fnqjxk@staff.mongohq.com:10028/staging";
config.web.port = "80";

module.exports = config;