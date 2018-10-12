/** #7 #chlob #new: the new yummy channel */

var yummy = {
    name: "#Yummy",
    createdOn: new Date(2016, 3, 1), /* month 0 is jan. */
    createdBy: "minus.plus.yummy",
    starred: false,
    expiresIn: 100,
    messageCount: 999,
    messages: []
};

/** #7 #chlob #fve: the other channels */

var sevencontinents = {
    name: "#SevenContinents",
    createdOn: new Date(2016, 3, 2), /* month 0 is jan. */
    createdBy: "cheeses.yard.applies",
    starred: true,
    expiresIn: 60,
    messageCount: 5,
    messages: []
};

var killerapp = {
    name: "#KillerApp",
    createdOn: new Date(2016, 8, 30), /* month 0 is jan. */
    createdBy: "lodge.bits.fake",
    starred: false,
    expiresIn: 1,
    messageCount: 10351,
    messages: []
};

var firstpersononmars = {
    name: "#FirstPersonOnMars",
    createdOn: new Date(2016, 8, 28), /* month 0 is jan. */
    createdBy: "snipped.atom.grid",
    starred: true,
    expiresIn: 30003,
    messageCount: 2424,
    messages: []
};

var octoberfest = {
    name: "#Octoberfest",
    createdOn: new Date(2016, 8, 25), /* month 0 is jan. */
    createdBy: "vocally.clearly.crawled",
    starred: false,
    expiresIn: 60,
    messageCount: 321,
    messages: []
};


// create a channel array with the global channels
var channelArray = [
    yummy, sevencontinents, killerapp, firstpersononmars, octoberfest
];

