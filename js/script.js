/*jslint browser: true*/
/*global $, console: true, jQuery, alert*/

    
/** #whereami #var: We store a reference to the current channel here */
var currentChannel;
var channelElement;
var sevencontinents;
/** #star #fix: We simply initialize it with the channel selected by default - sevencontinents */
currentChannel = sevencontinents;

var i;
var selectedChannelElement;
var channelArray;

/** #whereami #loc: Store my current (sender) location
 */
var currentLocation = {
    latitude: 48.249586,
    longitude: 11.634431,
    what3words: "shelf.jetted.purple"
};


/* #10 start the #external #action and say hello as soon as everything is loaded */

$(document).ready(function () {
    listChannels(compareDate); // create and sort channels
    loadEmojisOnStartup(); // load Emojis to toggle Button

    // Set intervall for refreshing the messages
    var updatingInterval = setInterval(messageUpdate, 10000); // Update message elements every ten seconds, call function messageUpdate()
    
    console.log("App is initialized"); // log success
});


/**
 * Switches the channel's name in the right app bar
 * @param channelObject ChannelObject
 */
function switchChannel(channelObject, channelElement) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject.name);
    //Write the new channel to the right app bar.
    //#chlob-dgst: read from name property
    document.getElementById('channel-name').innerHTML = channelObject.name;
    //Change the location to upgrading.never.helps
    //#chlob-dgst: read from createdBy property
    document.querySelector('#channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelObject.createdBy + '" target="_blank"><strong>' + channelObject.createdBy + '</strong></a>';
    //Removing stars
    //#icns-str: replace icon III/IV. The two font-awesome classes are changed
    //#btns-str: we now need to adress the <i> inside...
    //#chlob #trn: we adapt the star dynamically depending on whether the channel is starred in the object. First, we remove all stars...
    $('#channel-star i').removeClass('fas far');
    //#chlob-trn: ...second, we add the correct one
    $('#channel-star i').addClass(channelObject.starred ? 'fas' : 'far');
    //#9 selector adjusted for #btns #str
    /* Highlight the selected tab. */
   
    //#chlob-dgst: read from name property
    $('#channels li').removeClass('selected');
    $(channelElement).addClass('selected'); // More efficient way to highlight the selected class
         
    /** #whereami-var: We store a reference to the current channel. It's global because it's defined above */
    currentChannel = channelObject;
    
    
    //show channel's messages when user switches channel
    $('#messages').empty();
    $.each(channelObject.messages, function (index, value) {
        $('#messages').append(createMessageElement(value));
        $('#messages').scrollTop(Number.MAX_VALUE);
    });
    closeChannelBar(); // hide insert field if opened on channel switch
    
  
    
}



/* #6 #liking a channel on #click */
function star() {
    // Toggling star
    // #7 #icns #str: replace icon IV/IV. The two font-awesome classes are toggled instead of
    /* $('#channel-star').attr('src', 'img/star.png'); */
    $('#channel-star i').toggleClass('fas');
    $('#channel-star i').toggleClass('far');
    //#9 selector adjusted for #btns #str
    // #star #tgl: toggle star also in data model
    currentChannel.starred = !currentChannel.starred;
    // #star #lst: toggle star also in list
    $('#channels li:contains(' + currentChannel.name + ') .fa-star').removeClass('fas far');
    $('#channels li:contains(' + currentChannel.name + ') .fa-star').addClass(currentChannel.starred ? 'fas' : 'far');
}
/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');
    //...#6 #taptab #log the new tab on change...
    console.log('Changing in to', tabId);
    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}
/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

// Count characters of message entered by user
function CountCharacter() {
    
    // Define max length
    var limit = 140; // Define max length
    var written = $('#message').val().length; // read length of written text
    
    
 
    if (written >= limit) {
        $('#message-character-count').addClass("overlimit");
    }
    // if is used twice to reduce runtime! Otherwise the class will be removed on every keydown!
    if (written < limit) {
        $('#message-character-count').removeClass("overlimit");
    }
 
    $('#message-character-count').text(written + '/' + limit);
    
}

/**
 * This #constructor function creates a new chat #message.
 * @param text `String` a message text
 * @constructor
 */
function Message(text) {
    // copy my location
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    // set dates
    this.createdOn = new Date(); //now
    this.expiresOn = new Date(Date.now() + 15 * 60 * 1000); // mins * secs * msecs
    // set text
    this.text = text;
    // own message
    this.own = true;
    this.divElement = 'empty';
    this.update = function () {
        updateTime();
    };
}


/**
 * #8 This function makes an html #element out of message objects' #properties.
 * @param messageObject a chat message object
 * @returns html element
 */
function createMessageElement(messageObject) {
    var expiresIn = Math.round((messageObject.expiresOn - Date.now()) / 1000 / 60);
    
    
  /** 
  
    return '<div class="message' + (messageObject.own ? ' own' : '')
        //this dynamically adds #own to the #message, based on the
        //ternary operator. We need () in order not to disrupt the return.
        + '">' + '<h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank">' + '<strong>' + messageObject.createdBy + '</strong></a>' + messageObject.createdOn.toLocaleString() + '<em>' + expiresIn + ' min. left</em></h3>' + '<p>' + messageObject.text + '</p>' + '<button class="accent">+5 min.</button>' + // #9 #btns #acc now accented
        '</div>';
  
  
  */
    
        
    // Build the <div> from above as a jQuery object - create a message and implement $.click()
    var message = $('<div>').addClass('message').addClass(messageObject.own ? ' own' : '').append($('<h3>').append('<a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank"><strong>' + messageObject.createdBy + '</strong></a>' + messageObject.createdOn.toLocaleString() + '<em>' + expiresIn + ' min. left</em>')).append($('<p>' + messageObject.text + '</p>')).append($('<button class="accent">+5 min.</button>'));
   
    
     //store in messageObject
    messageObject.divElement = message;
    
    // return the complete messsage
    return message;
    
    
}
/**
 * This function wil #send a #message (and write it to the #messages div)
 */
function sendMessage() {
    // #8 Create a new #message to #send and log it.
    //var message = new Message("Hello chatter");
    //Check if text field is empty
    if ($('#message').val() === "") {
        alert("Please fill in some text first!");
    } else {
        // #8 let's now use the #real message #input
        var message = new Message($('#message').val());
        console.log("New message:", message);
        // #append the new #message to the messages section
        // Write Message content in channels.js
        currentChannel.messages.push(message);
        /*document.querySelector('#messages').innerHTML =
         document.querySelector('#messages').innerHTML + createMessageElement(message);*/
        // #8 nicer #message #append:
        $('#messages').append(createMessageElement(message));
        // #8 #message will #scroll to bottom, if we apply the div's height (or, in this case, a very high number)
        $('#messages').scrollTop(Number.MAX_VALUE);
        // #8 #clear the #message input
        $('#message').val('');
    }
    
    // Add Listeners to +5 min Buttons by calling the corresponding function
    addButtonListeners();
    
}



/**
 * #8 This function makes a #new jQuery #channel <li> element out of a given object
 * @param channelObject a channel object
 * @returns {HTMLElement}
 */
function createChannelElement(channelObject) {
    /* build this in jQuery:
     <li>
     {{ name }}
     <span class="channel-meta">
     <i class="fa fa-star-o"></i>
     <i class="fa fa-chevron-right"></i>
     </span>
     </li>
     */
    
    
    // create a channel and implement $.click()
    var channel = $('<li>').text(channelObject.name);
    
    // on-click listener to select clicked channel - calls switchChannel() for clicked li
    $(channel).click(function () {
        switchChannel(channelObject, this); //save channelElement reference for later usage
    });
    
    
                
    // create and append channel meta
    var meta = $('<span>').addClass('channel-meta').appendTo(channel);
    // The star including #star functionality.
    // Since we don't need any further children, we don't need any variables (references)
    $('<i>').addClass('fa-star').addClass(channelObject.starred ? 'fas' : 'far').appendTo(meta);
    // #9 #channel #boxes for some additional metadata
    $('<span>').text(channelObject.expiresIn + ' min').appendTo(meta);
    $('<span>').text(channelObject.messageCount + ' new').appendTo(meta);
    // The chevron
    $('<i>').addClass('fas').addClass('fa-chevron-right').appendTo(meta);
    
    // return the complete channel
    return channel;
}


// sort channels and add the, in the list
function listChannels(criterion) {
    //make sure to empty the list before adding the sorted channels
    $('#channels ul').empty();
    
    //sort the channels before appending them to the list
    channelArray.sort(criterion);
    
    //use a for loop to list channels, based on number of channels in array
    for (i = 0; i < channelArray.length; i++) {
        $('#channels ul').append(createChannelElement(channelArray[i]));
    }
    
    // keep selected channel on re-sorting the channels when using the tab bar buttons
    selectedChannelElement = $('#channels li:contains(' + currentChannel.name + ')'); // Var to highlight curentChannel which is initialized with the channel sevencontinents in the global var declaration part
    $(selectedChannelElement).addClass('selected'); // highlight selected one
    
    // Add Listeners to +5 min Buttons by calling the corresponding function
    addButtonListeners();
}

//sorting function for trending
function compareMessageCount(channel1, channel2) {
    return channel2.messageCount - channel1.messageCount;
}

//sorting function for favorites
function compareStarred(channel1, channel2) {
    return channel2.starred - channel1.starred;
}

//sorting function for new based on date
function compareDate(channel1, channel2) {
    return channel2.createdOn - channel1.createdOn;
}

//function to load emojis on startup
function loadEmojisOnStartup() {
    
    //Load the emojis only once and create a global variable
    var emojis = require('emojis-list');
    console.log(emojis[0]); // log first emoji to console to ensure proper working
    
    //Load the emojis into the emoji field for texting an add an onclick event for later inserting them into a message
    for (i = 0; i < emojis.length; i++) {
        $('#emojis').append('<span class="emoji">' + emojis[i] + '</span>');
    }  // add them to the list of emojis
        
    // Add onclick event#
    $('.emoji').on('click', function () {
        var emoji = $(this).text();
        console.log('The emoji ' + emoji + ' was inserted in to the message.');
        $('#message').val($('#message').val() + emoji);
        toggleEmojis();
    });
}
  
// Add channel if floating button is clicked
function addChannel() {
    $('#messages').empty(); // clear old messages 
    $('#right-app-bar').css("display", "none"); // hide old title
    $('#channel-bar').css("display", "flex"); // display text enter field
}


// Function to close channel bar
function closeChannelBar() {
    $('#channel-bar').css("display", "none");
    $('#right-app-bar').css("display", "block");
}


// Function to create a new channel if enter is pressed on the input field
function createChannel() {
    
    var enteredTitle = $('#channel-input-id').val();
    var channelProperties = new Channel(enteredTitle);  // call channel cration function
    
    if (enteredTitle === '') {
        alert("Please enter a title!");
    } else {
        if (enteredTitle.search("#") == '0' && enteredTitle.search(" ") == '-1') {
            
            $('#channels ul').append(createChannelElement(channelProperties)); // create a new channel with the entered name
            $('#channels ul').scrollTop(Number.MAX_VALUE); // Scrolling
            channelArray.push(channelProperties); // add new Channel to exisiting channel array
            switchChannel(channelProperties); // switch to newly created channel
            console.log('Channel ' + channelProperties.name + ' was created.'); // log it
            $('#channel-input-id').val(''); // clear field afterwards
        } else {
            alert("Please enter a title starting with '#' and avoid spaces in your title!");
        }
    }
}


/**
 * #10 This function makes an html #element out of channel objects' #properties.
 * @param messageObject a chat message object
 * @returns html element
 */
function Channel(text) {
    // initialize values as declared in channels.js
    this.name = text;
    this.createdOn = new Date(); //now
    this.createdBy = "cheese.yard.applies";
    this.starred = true;
    this.expiresIn = 12345;
    this.messageCount = 42;
    this.messages = [];
}

// Updating function for messages
function messageUpdate() {
    
    // Refresh time left for all messages to update time
    $.each(currentChannel.messages, function (index, value) {

        // local calculating vars    
        var currentTime = new Date();
        var timeDifference = (currentChannel.messages[index].expiresOn.getTime() - currentTime.getTime());
        var diffMins = timeDifference / 60000; // minutes
        
        // round to 1 decimal
        diffMins = diffMins.toFixed(1);
        
        // update the field with time left
        $(currentChannel.messages[index].divElement).find("em").html(diffMins + " min. left");
        
        // change textColor to accent if smaller than 5 mins, otherwise leave it
        if (timeDifference < 5) {
            $(currentChannel.messages[index].divElement).find("em").css("color", "#3F51B5");
        } else {
            $(currentChannel.messages[index].divElement).find("em").css("color", "black");
        }
        
        // If the time left is over: first remove DOM element, then remove it from array
        if (diffMins <= 0) {
            $(currentChannel.messages[index].divElement).remove();
            currentChannel.messages.splice(index, 1);
        }
        
        // log update progress     
        console.log("Updating message elements…");
    });
}

function addButtonListeners() {
    
    // Add onclick event# to all +5 min buttons
    
    $.each(currentChannel.messages, function (index, value) {
        var button = $(currentChannel.messages[index].divElement).find("button");
        

        $(button).click(function () {

            var newTime = new Date(currentChannel.messages[index].expiresOn.getTime() + (5 * 60 * 1000)); // add +5 min
            currentChannel.messages[index].expiresOn = newTime; // save to Array
            
            var timeAdd = (currentChannel.messages[index].expiresOn.getTime() - Date.now()); // calculate new expiry time
            var timeAddMins = timeAdd / 60000; // transfer to minutes
            timeAddMins = timeAddMins.toFixed(1); // round to 1 decimal
            
            $(currentChannel.messages[index].divElement).find("em").html(timeAddMins + " min. left"); // update message element
        });
    });
}