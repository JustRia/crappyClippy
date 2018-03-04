mascot();
function mascot() {
    document.getElementById('clippy').addEventListener('click', function (e) {
        var r = Math.floor(Math.random() * 100);
        console.log(r);
        if (r % 4 == 0) {
            window.open("https://microsoft-edge.en.softonic.com/");
        }
    });
}