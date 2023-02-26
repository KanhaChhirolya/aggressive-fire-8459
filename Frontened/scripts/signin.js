const signInBtn = document.getElementById("signbutton");

const semail = document.getElementById("kemail")
const spassword = document.getElementById("kpassword")

signInBtn.addEventListener("click", () => {
	
	let obj={	
		email:semail.value,
		password:spassword.value
   }
   console.log(obj)
   fetch("https://outstanding-fish-sundress.cyclic.app/user/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then(res=>res.json())
    .then(res=>{
        console.log(res)
        localStorage.setItem("token",res.Token)
        alert(`${res.msg}`)
        // document.getElementById("logintext").innerText="Logout"
        // document.getElementById("logintext").addEventListener("click",()=>{
        //     localStorage.setItem("token","")
        //     alert("User Logged out")
        //     document.getElementById("logintext").innerText="Login"
        // })
    })
    .catch(err=>console.log(err))
});