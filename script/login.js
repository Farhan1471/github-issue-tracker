document.getElementById("signin-btn").addEventListener("click", function(){
    const usernameInput = document.getElementById("input-username");
    const userName = usernameInput.value;
    console.log(userName);
    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    console.log(password);

    if(userName == "admin" && password == "admin123"){
        window.location.assign("/home.html")
    }
    else{
        alert("Login Failed");
        return;
    }
})