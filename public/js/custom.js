$( document ).ready(function() {
    var userFeed = new Instafeed({
        get: 'user',
        userId: '186234050',
        accessToken: '186234050.1677ed0.7ce7885569184c4ba04e2566ac496cd3',
        limit: 20,
        resolution: 'standard_resolution',
        sortBy: 'most-recent',
        filter: function(image) {
            return image.tags.indexOf('jimsnurserypics') >= 0;
        },
        template: '<a href="{{link}}"><img src="{{image}}" /></a>'
    });
    userFeed.run();
});
