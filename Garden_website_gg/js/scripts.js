/* Button functions for going from and to different html files */

let homeworkcontent = JSON.parse(sessionStorage.getItem('homeworkcontent')) || {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
};

function goBack(){
    window.location.href='index.html';
}

function go_upload_site(){
    window.location.href='upload.html';
}




const goBackButton = document.getElementById('go_back_button');
if (goBackButton) {
    goBackButton.addEventListener('click', goBack);
}


const goUploadButton = document.getElementById('go_upload_button');
if (goUploadButton) {
    goUploadButton.addEventListener('click', go_upload_site);
}

const uploadButton = document.getElementById('upload_button');
if (uploadButton) {
    uploadButton.addEventListener('click', do_upload);
}
    





    
    function do_upload(){
    
    
    let day = document.getElementById('day').value;
    let homeworksubject = document.getElementById('subject').value;
    
    if(homeworksubject == null || homeworksubject == '' || day == null || day == ''){
        return;
    }

    homeworkcontent[day].push(homeworksubject);

        sessionStorage.setItem('homeworkcontent', JSON.stringify(homeworkcontent));
        
        window.location.href = 'index.html';
    }



document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('mon_container')) {
        displayHomework();
    }
});

function displayHomework() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const ids = ['mon_container', 'tue_container', 'wed_container', 'thu_container', 'fri_container', 'sat_container', 'sun_container'];

    days.forEach((day, daynumber) => {
        let container = document.getElementById(ids[daynumber]);
        if (container) {
            container.innerHTML = '';

            homeworkcontent[day].forEach((subject) => {
                let daytext = document.createElement('daytext');
                daytext.textContent = subject;
                container.appendChild(daytext);
            });
        }
    });
}