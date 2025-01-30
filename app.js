const supabaseUrl = "https://xguqoqvrzhfxdgaddafl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndXFvcXZyemhmeGRnYWRkYWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTU0ODMsImV4cCI6MjA1MzU3MTQ4M30.VI7y_-QBkfVZ3KBAZ8GlsWOMHL_sn0nOLsPqr_qeR4Q";
const supabasePro = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabasePro)

let signname = document.getElementById("signup-name");
let signemail = document.getElementById("signup-email");
let signpassword = document.getElementById("signup-password");
let signupbtn = document.getElementById("signup-btn");
let loginbtn = document.getElementById("login-btn");
// console.log(signemail,signpassword)
let loginemial = document.getElementById("login-email");
let loginpass = document.getElementById("login-password");

let roleinp = document.getElementById("inputRole");


let logintext = document.querySelector(".switchLogin");
let signuptext = document.querySelector(".switchSignUp");
let loginpage = document.getElementById("login-form");
let signuppage = document.getElementById("signup-form");

function switchloginTosignup() {
  loginpage.classList.add("hidden");
  signuppage.classList.remove("hidden");
}

function switchsignupTologin() {
  loginpage.classList.remove("hidden");
  signuppage.classList.add("hidden");
}

signupbtn.addEventListener("click", async () => {
  let name = signname.value;
  let email = signemail.value;
  let password = signpassword.value;
  let role = roleinp.value;
console.log(role)
  console.log(email, password);

  const { data, error } = await supabasePro.auth.signUp({ email, password });
  console.log(error);

  if (!email) {
    alert("unsuccessfully");
  }

//   console.log(data.user.id)

  const { error:tableError,data:tableData } = await supabasePro
  .from('user')
  .insert({
    name,
    role,
    uid:data.user.id
  })
  .select()
  console.log(tableData)


});

loginbtn.addEventListener("click", async (e) => {
  console.log("run");
  e.preventDefault();
  let email = loginemial.value;
  let password = loginpass.value;

  const { data, error } = await supabasePro.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
  } else {
    alert("login sucessfully");
    // window.location.href = "home.html"
    console.log(data);
  }

  const { data:tableData, error:tableError } = await supabasePro
  .from('user')
  .select()
  .eq("uid",data.user.id)
  .single()
console.log(tableData.role)

if(tableData.role === "buyer"){
    window.location.href = "buyer.html"

}else if(tableData.role === "vendor"){
window.location.href = "vendor.html"
}else if(tableData.role === "Admin"){
  window.location.href = "admin.html" 

}
else{
    alert("no role match")
}

 
});
