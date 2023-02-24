

const signUpBtn = document.getElementById("signupbutton");



const remail = document.getElementById("remail")
const rpassword = document.getElementById("rpassword")
const rcity = document.getElementById("rcity")
const rname = document.getElementById("rname")






signUpBtn.addEventListener("click", () =>{

	let obj={
		 name:rname.value,
		 email:remail.value,
		 password:rpassword.value,
		 city:rcity.value
	}
	console.log(obj)
	fetch("http://localhost:8080/user/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then(res=>res.json())
    .then(res=>{
        console.log(res)
    })
    .catch(err=>console.log(err))
});
