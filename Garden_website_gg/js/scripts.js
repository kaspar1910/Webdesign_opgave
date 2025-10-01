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

    days.forEach(function(day) {
        const containerId = day.substring(0, 3) + '_container'; // Creates the mon_container, tus_conater and so on - bruger de 3 første bogstaver i dagen :) Det samme som du gjorder
        let container = document.getElementById(containerId); //Document reffers to the entire html - matcher container with <ul> in hitml :9

        if (container) {
            container.innerHTML = ''; // Clear list - Nulstil listen :)

            // Loop through homework and create list items with buttons - mener om C#
            homeworkcontent[day].forEach((subject, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'homework-item'; 

                const subjectText = document.createElement('span');
                subjectText.textContent = subject;

                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'item-buttons';

                const editBtn = document.createElement('button');
                editBtn.textContent = '✎';
                editBtn.className = 'edit-btn';
                editBtn.title = 'Edit homework';
                editBtn.onclick = () => editHomeworkFromBoard(day, index); // Edit function - rediger allrede tilføjet også upload

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '✖';
                deleteBtn.className = 'delete-btn';
                deleteBtn.title = 'Delete homework';
                deleteBtn.onclick = () => deleteHomeworkFromBoard(day, index); // Delete function - slet

                buttonContainer.appendChild(editBtn);
                buttonContainer.appendChild(deleteBtn);
                listItem.appendChild(subjectText);
                listItem.appendChild(buttonContainer);
                container.appendChild(listItem);
            });

            // Create and add the '+' button at the end of the list
            const addListItem = document.createElement('li');
            const addBtn = document.createElement('button');
            addBtn.className = 'add-homework-btn';
            addBtn.textContent = '+';
            addBtn.title = 'Add new homework';
            addBtn.onclick = () => addHomeworkToBoard(day); // Add function - man kan også tilføje uden at uploade

            addListItem.appendChild(addBtn);
            container.appendChild(addListItem);
        }
    });
}

function addHomeworkToBoard(day){
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const subject = prompt (`Enter homework subject for ${capitalizedDay}`);
    
    //If the user didnt cancel after entering value, (smart hvis det sker kap)
    if (subject && subject.trim() !== '')
    {
        homeworkcontent[day].push(subject.trim());
        sessionStorage.setItem('homeworkcontent', JSON.stringify(homeworkcontent));
        displayHomework(); //this "loads" the list again <--
    }
}

function deleteHomeworkFromBoard(day,index) {
    if (confirm(`Are you sure you want to delete this homework? "${homeworkcontent[day][index]}"?`)) 
    {
        homeworkcontent[day].splice(index, 1);
        sessionStorage.setItem('homeworkcontent', JSON.stringify(homeworkcontent));
        displayHomework();
    }
}

function editHomeworkFromBoard(day, index) {
    const currentSubject = homeworkcontent[day][index];
    const newSubject = prompt("Edit your homework subject:", currentSubject);
    
    if (newSubject !== null && newSubject.trim() !== '') 
    {
        homeworkcontent[day][index] = newSubject.trim();
        sessionStorage.setItem('homeworkcontent', JSON.stringify(homeworkcontent));
        displayHomework();
    }
}

document.addEventListener('DOMContentLoaded', function() 
{
    if (document.getElementById('mon_container')) {
        displayHomework();
    }
})