var Test = require("../lib/example-base-test-class");
var dpro = require("dpro");

module.exports = new Test({
  tags: ["app", "ip8"],

  "Disable notification": function (client) {
    var home = client.page[dpro.device][dpro.home]();
    home.disableNotification();
  },

  "Go to account": function (client) {
    var home = client.page[dpro.device][dpro.home]();
    home.signin();
  },

  "Login": function (client) {
    var login = client.page[dpro.device][dpro.login]();
    login.login("<username>", "<password>");
  },

  "Search for Welcome message": function (client) {
    var login = client.page[dpro.device][dpro.login]();
    login.searchForWelcomeMessage();
  },

  "Search for ketchup": function (client) {
    var home = client.page[dpro.device][dpro.home]();

    home.searchForTerm("ketchup");
  },

  "Go to second item in search result": function (client) {
    var search = client.page[dpro.device][dpro.search]();

    search.goToResult(2);
  }


});
