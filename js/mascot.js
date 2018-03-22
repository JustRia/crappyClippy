mascot();
function mascot() {
    var pics = ["../img/deWae.png","../img/gottaPepeFast.png","../img/placeholder_clippy.png","../img/crappyClippy_512x512.png"];
    var iter = 0;
    document.getElementById('clippy').addEventListener('click', function (e) {
        var r = Math.floor(Math.random() * 100);
        console.log(r);
        if (r % 4 == 0) {
            window.open("https://microsoft-edge.en.softonic.com/");
        }
        document.getElementById('clippy').src=pics[iter];
    });
}