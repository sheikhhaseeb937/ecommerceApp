
const supabaseUrl = "https://xguqoqvrzhfxdgaddafl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndXFvcXZyemhmeGRnYWRkYWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTU0ODMsImV4cCI6MjA1MzU3MTQ4M30.VI7y_-QBkfVZ3KBAZ8GlsWOMHL_sn0nOLsPqr_qeR4Q";
const supabasePro = supabase.createClient(supabaseUrl, supabaseKey);
// console.log(supabasePro)

const buyCard = document.querySelector(".buyCard")
console.log(buyCard)
const productID = localStorage.getItem("productID")
console.log(productID)
const buyID = JSON.parse(localStorage.getItem("sb-xguqoqvrzhfxdgaddafl-auth-token"))
const userID = buyID.user.id 
console.log( buyID.user.id )

const img = document.getElementById("img")
const title = document.getElementById("title")
const desc = document.getElementById("desc")
const price = document.getElementById("price")
// console.log(img,title,desc,price)

async function fetchBuyProduct(){
    const { data, error } = await supabasePro
    .from('product')
    .select()
    .eq("id",productID)
    .single()
    console.log(data)

localStorage.setItem('title',data.title)
localStorage.setItem('price',data.price)
localStorage.setItem('userID',data.uid)



    img.setAttribute('src',`${supabaseUrl}/storage/v1/object/${data.ImgFile}`)
    title.innerHTML = data.title
    desc.innerHTML = data.desc

    price.innerHTML = data.price
  


}
fetchBuyProduct()

async function buynow(){
    const {data, error } = await supabasePro
    .from('sales')
    .insert({
        title:localStorage.getItem("title"),
        price:localStorage.getItem("price"),
        userID: userID,
        productID : productID,

     })
    .select()
    if(error){
        alert('failed to placed order')
        console.log(error)
    }else{
          alert('Order Placed Successfully')
          window.location.href="buyer.html"
    }
  
}