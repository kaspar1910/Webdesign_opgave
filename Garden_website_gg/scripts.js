/* Button functions for going from and to different html files */

function goBack(){
    window.location.href='index.html';
}

function go_upload_site(){
    window.location.href='upload.html';
}

document.getElementById('go_back_button').addEventListener('click', goBack);