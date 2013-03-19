(function initialize(){
    if(!window.auction){
        window.auction = {};
        window.auction.socket = io.connect('http://localhost');
    }
})();
