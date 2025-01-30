const supabaseUrl = "https://xguqoqvrzhfxdgaddafl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndXFvcXZyemhmeGRnYWRkYWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTU0ODMsImV4cCI6MjA1MzU3MTQ4M30.VI7y_-QBkfVZ3KBAZ8GlsWOMHL_sn0nOLsPqr_qeR4Q";
const supabasePro = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabasePro)
// console.log("hey")
const cards = document.querySelector(".cards ")

async function fetchProduct(){
  const { data, error } = await supabasePro
  .from('product')
  .select()
  console.log(data)

  for (let i = 0; i < data.length; i++) {
console.log(data[i])


  const cardslist= document.createElement('div')
 
cardslist.innerHTML = `<div class="cards  ml-9 mt-4 w-[240px] h-[350px] border-[1px] border-black">
    <img src="${supabaseUrl}/storage/v1/object/${data[i].ImgFile}" class="w-[100%] h-[50%]"  alt="">
    <h1 class=" font-bold text-[1.2rem] ml-5">${data[i].title}</h1>
    <p class="text-[1rem] ml-5">${data[i].desc}</p>
    <h1 class="font-bold text-[1.2rem] ml-5 text-red-600">${data[i].price}</h1>
   <div class="btns flex justify-center gap-5 mt-4">
    <button onclick="buynowPro(${data[i].id})" class="w-[100px] h-[40px] bg-yellow-600 rounded-[10px] text-white">Buy Now</button>
    <button  class="w-[100px] h-[40px] bg-red-600 rounded-[10px] text-white">Add To Cart</button>

   </div>`;
   cards.appendChild(cardslist)
  }


}
fetchProduct()

function buynowPro(id){
  console.log("run",id)
  localStorage.setItem("productID",id)
  window.location.href="buyNow.html"
}