const supabaseUrl = "https://xguqoqvrzhfxdgaddafl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndXFvcXZyemhmeGRnYWRkYWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTU0ODMsImV4cCI6MjA1MzU3MTQ4M30.VI7y_-QBkfVZ3KBAZ8GlsWOMHL_sn0nOLsPqr_qeR4Q";
const supabasePro = supabase.createClient(supabaseUrl, supabaseKey);
// console.log(supabasePro)

const TitleInp = document.getElementById("TitleInp")
const Desc =document.getElementById("Desc")
const PriceInp =document.getElementById("PriceInp")
const ImgFile = document.getElementById("ImgFile")

// btnADD
const AddBtn = document.getElementById("AddBtn")




// async function getUser(){
//   const { data: { user } } = await supabasePro.auth.getUser()
//   console.log(user)
// }

// getUser()
const key = localStorage.getItem("sb-xguqoqvrzhfxdgaddafl-auth-token");

const parsedKey = JSON.parse(key);
console.log(parsedKey.user.id);


async function AddProducts(){

    const title  = TitleInp.value
    const desc  = Desc.value
    const price = PriceInp.value
    console.log(title,desc,price)


    const file = ImgFile.files[0]
console.log(file)


const fileName = `${Date.now()}-${file.name}`;
console.log(fileName)


    const { data, error } = await supabasePro
      .storage
      .from('images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
  if (error) {
    alert("Image upload failed");
    console.log(error);
    return;
  }
console.log(data)
  


    const { data:tableData,error:TableError } = await supabasePro
    .from('product')
    .insert({ 
        title : title,
        desc : desc,
        price:price,
       ImgFile:data.fullPath,
       uid:parsedKey.user.id
     })
    .select()
    if(error){
console.log(error)
    }
  console.log(data)

  window.location.reload()

}





async function fetchProduct(){
    const { data, error } = await supabasePro
  .from('product')
  .select()
  .eq("uid",parsedKey.user.id)
 
console.log(data)

  const cardP = document.getElementById('cardP')
console.log(cardP)
for (let i = 0; i < data.length; i++) {
console.log(data[i])

 const cardslist= document.createElement('div')
 
cardslist.innerHTML = `<div class="cards  ml-9 mt-4 w-[240px] h-[350px] border-[1px] border-black">
    <img src="${supabaseUrl}/storage/v1/object/${data[i].ImgFile}" class="w-[100%] h-[50%]"  alt="">
    <h1 class=" font-bold text-[1.2rem] ml-5">${data[i].title}</h1>
    <p class="text-[1rem] ml-5">${data[i].desc}</p>
    <h1 class="font-bold text-[1.2rem] ml-5 text-red-600">${data[i].price}</h1>
   <div class="btns flex justify-center gap-5 mt-4">
    <button onclick="editBtn(${data[i].id})"" class="w-[100px] h-[40px] bg-yellow-600 rounded-[10px] text-white">Edit Now</button>
    <button onclick="cardDelete(${data[i].id})"" class="w-[100px] h-[40px] bg-red-600 rounded-[10px] text-white">Delete</button>

   </div>`;
   cardP.appendChild(cardslist)

}
 







}


fetchProduct()


async function cardDelete(productid){
  const {data,error}= await supabasePro
  .from('product')
  .delete()
  .eq('id', productid)
  .select()


  if(!error){
    window.location.reload()
  }
}

async function editBtn(editID){
  console.log("edit")
  const { data, error } = await supabasePro
  .from('product')
  .select()
  .eq("id",editID)
  .single()

console.log(data.title)
TitleInp.value = data.title
Desc.value = data.desc
PriceInp.value = data.price

AddBtn.innerHTML = "Update"
AddBtn.removeAttribute("onclick")

  AddBtn.addEventListener("click", async () => {
    console.log("edit function");
    const { error } = await supabasePro
      .from("product")
      .update({ 
        title: TitleInp.value,
        desc: Desc.value,
        price: PriceInp.value
      })
      .eq("id", editID);

      console.log(error)

      if(!error){
        alert('product update successfully')
        window.location.reload()
      }

  });

}