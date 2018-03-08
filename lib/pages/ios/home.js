module.exports = {
  url: function () {
    return "http://www.walmart.com";
  },

  elements: {
    dismiss_location: {
      locateStrategy: "accessibility id",
      selector: "Don’t Allow"
    },
    dismiss: {
      locateStrategy: "accessibility id",
      selector: "Don’t Allow"
    },
    search: {
      locateStrategy: "accessibility id",
      selector: "home_search_cell"
    },
    result: {
      locateStrategy: "accessibility id",
      selector: "heinz ketchup"
    },
    signin: {
      locateStrategy: "accessibility id",
      selector: "Sign In"
    },
    scanCode: {
      locateStrategy: "accessibility id",
      selector: "Scan Code"
    },
    departments: {
      locateStrategy: "accessibility id",
      selector: "Departments"
    }
  },

  commands: [{    
    disableNotification: function () {
      const dismiss = this.elements.dismiss;
      const dismiss_location = this.elements.dismiss_location;

      return this
        .clickMobileEl(dismiss_location.locateStrategy, dismiss_location.selector)
        .clickMobileEl(dismiss.locateStrategy, dismiss.selector);
    },

    searchForTerm: function (term) {
      const selectors = this.elements;

      return this
        .api.pause(10000) // Increased from 5000 to 10000
        // iPhone 5s and 6p don't like clicking
        .getMobileEl(selectors.search.locateStrategy, selectors.search.selector) // Get before click
        .clickMobileEl(selectors.search.locateStrategy, selectors.search.selector) 
        
        // wait for Scan Code and Departments elements 
        .getMobileEl(selectors.scanCode.locateStrategy, selectors.scanCode.selector)
        .getMobileEl(selectors.departments.locateStrategy, selectors.departments.selector)

        // Click before set
        // iPhone 5s and 6p don't like clicking
        .setMobileElValue(selectors.search.locateStrategy, selectors.search.selector, term)
        .clickMobileEl(selectors.result.locateStrategy, selectors.result.selector);
    },

    signin: function () {
      return this;

      // const signin = this.elements.signin;

      // return this
      //   .clickMobileEl(signin.locateStrategy, signin.selector);
    }
  }]
};
