// ==UserScript==
// @name         Channel Ping Plugin
// @version      1
// @description  Pings the user when a message is sent in a specific channel
// @author       ItzFreeze#1924
//META{"name":"Channel Ping","version":"1.0.0","description":"Allows you to receive a ping from a specific channel","author":"ItzFreeze"}*//
// ==/UserScript==

const channelId = '965669579105898507'; // Replace with the ID of the channel you want to ping in

const pingMessage = 'A new message has been sent in the channel!'; // Replace with the message you want to send as a ping

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            const message = mutation.addedNodes[0];
            if (message.classList.contains('message') && message.getAttribute('data-channel-id') === channelId) {
                const author = message.getAttribute('data-author-id');
                BdApi.showToast(`<@${author}> ${pingMessage}`, { type: 'success' });
            }
        }
    });
});

const channel = document.querySelector(`[data-channel-id="${channelId}"]`);
if (channel) {
    observer.observe(channel.querySelector('.messages'), { childList: true });
}