const supabaseUrl = "https://xguqoqvrzhfxdgaddafl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndXFvcXZyemhmeGRnYWRkYWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTU0ODMsImV4cCI6MjA1MzU3MTQ4M30.VI7y_-QBkfVZ3KBAZ8GlsWOMHL_sn0nOLsPqr_qeR4Q";
const supabasePro = supabase.createClient(supabaseUrl, supabaseKey);
// console.log(supabasePro)

const tbody = document.getElementById("tbody");


async function fetchsale(){
    const { data, error } = await supabasePro
    .from('sales')
    .select()
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        const sale = data[i]
  const tr = document.createElement("tr")
  tr.classList.add("border-t", "border-gray-300")
  tr.innerHTML = `  <td class="py-3 px-6 text-left">${i + 1}</td>
                    <td class="py-3 px-6 text-left text-red-700 font-bold"><span>$</span>${sale.price}</td>
                    <td class="py-3 px-6 text-left">${sale.title}</td>
                    <td class="py-3 px-6 text-left text-green-600">${sale.userID}</td>
                    <td class="py-3 px-6 text-left">${sale.productID}</td>
  `

tbody.appendChild(tr)
      }
  
}
fetchsale()