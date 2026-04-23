async function load() {
  let { data } = await supabaseClient
    .from("kriteria")
    .select("*");

  let el = document.getElementById("data");
  el.innerHTML = "";

  data.forEach((d, i) => {
    el.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${d.nama_kriteria}</td>
        <td>${d.bobot}</td>
        <td>${d.tipe}</td>
        <td>
          <button onclick="hapus('${d.id_kriteria}')">Hapus</button>
        </td>
      </tr>
    `;
  });
}

async function hapus(id) {
  alert("Klik hapus: " + id);

  await supabaseClient
    .from("kriteria")
    .delete()
    .eq("id_kriteria", id);

  load();
}

load();
