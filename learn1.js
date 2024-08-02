if(localStorage.getItem('currentUsere')|| localStorage.getItem('currentUser'))
    {
        document.getElementById("log1").style.display = "none";

// Using visibility property
        document.getElementById("log1").style.visibility = "hidden";

    }


document.getElementById("profile").addEventListener("click",()=>
{
    if(localStorage.getItem('currentUsere'))
        {
            window.location.href="profile_hire.html";
        }
    else if(localStorage.getItem('currentUser')){
            window.location.href='profile.html';
        }
    else{
       alert("login to continue");
    }

})