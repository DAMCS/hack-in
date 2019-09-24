function Play_splash() {
    preload = document.getElementById("preload_splash");
    loading = 0;
    preload.style.animation = "";
    preload.style.display = "block";

    id = setInterval(frame, 64);

    function frame() {
        if (loading == 100) {
            Stop_splash();

        } else if (loading < 100) {
            loading = loading + 1;
            if (loading == 90) {
                Fade_splash()
            }
        }
    }
}

function Fade_splash() {
    preload.style.animation = "fadeout 1s ease";
    loading = 90;
}

function Stop_splash() {
    preload.style.display = "none";
    clearInterval(id);
}


function PreviewText() {
    Play_splash();
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("upload").files[0]);
    oFReader.onload = function(oFREvent) {

        var contents = oFREvent.target.result;

        var text = contents.split(',');
        text = text[1];

        var language = "";

        var e = document.getElementById("sel1");
        var strUser = e.options[e.selectedIndex].value;

        if (strUser == 'Java')
            language = 'java';
        else if (strUser == 'C++')
            language = 'cpp';
        else if (strUser == 'Python')
            language = 'py';
        else
            language = 'py';

        $.post('https://hack-a-venture.psglogin.in/botwar.php', {
            data: text,
            lang: language,
            game: "Proximity"
        }, function(data) {
            console.log(data);
            Stop_splash();
            displayOutput(data);

        });
    }
}