/**
 * META{"name":"Ping","version":"1.0.0","description":"Pings when a message is sent in a specific channel","author":"ItzFreeze","source":"https://github.com/FreezePoo/Discord-Channel-Ping.git"}//
 * @name Ping
 * @author ItzFreeze
 * @description Pings when a message is sent in a specific channel
 * @version 1.0.0
 * @source https://github.com/FreezePoo/Discord-Channel-Ping.git
 */

class Ping {
    getName() {
        return "Ping";
    }
    getDescription() {
        return "Pings when a message is sent in a specific channel";
    }
    getVersion() {
        return "1.0.0";
    }
    getAuthor() {
        return "ItzFreeze";
    }
    start() {
        const channelId = 'ENTER CHANNEL ID'; // Replace with the ID of the channel you want to ping in
        const pingMessage = 'A new message has been sent in the channel!'; // Replace with the message you want to send as a ping
        const guiNotification = true; // Set to true to show a GUI notification
        const guiNotificationTitle = 'Ping Plugin'; // Replace with the title of the GUI notification
        const guiNotificationText = 'A new message has been sent in the channel!'; // Replace with the text of the GUI notification
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    const message = mutation.addedNodes[0];
                    if (message.classList.contains('message') && message.getAttribute('data-channel-id') === channelId) {
                        const author = message.getAttribute('data-author-id');
                        if (guiNotification) {
                            const options = {
                                body: guiNotificationText,
                                icon: 'https://wallpapercave.com/dwp2x/WjY21KO.jpg' // Replace with an icon (This is just an example)
                            };
                            new Notification(guiNotificationTitle, options);
                        } else {
                            alert(`<@${author}> ${pingMessage}`);
                        }
                    }
                }
            });
        });
        const channel = document.querySelector(`[data-channel-id="${channelId}"]`);
        if (channel) {
            observer.observe(channel.querySelector('.messages'), { childList: true });
        }
    }
    stop() {
        // Clean up when the plugin is stopped
    }
}

global.Ping = new Ping();
if (module.exports.default) {
    module.exports = module.exports.default;
}
if (typeof(module.exports) !== "function") {
    module.exports = eval("Ping");
}
