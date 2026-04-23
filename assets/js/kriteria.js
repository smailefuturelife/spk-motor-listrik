async function load() {
  let { data } = await supabaseClient.from("kriteria").select("*");

  let el = document.getElementById("data");
  el.innerHTML = "";

  data.forEach(d => {
    el.innerHTML += `
      <tr>
        <td>${d.nama_kriteria}</td>
        <td>${d.bobot}</td>
        <td>${d.tipe}</td>
      </tr>`;
  });
}

async function tambah() {
  await supabaseClient.from("kriteria").insert({
    nama_kriteria: document.getElementById("nama").value,
    bobot: parseFloat(document.getElementById("bobot").value),
    tipe: document.getElementById("tipe").value
  });

  load();
}

load();