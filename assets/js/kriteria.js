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

async function tambah() {
  let nama = document.getElementById("nama").value;
  let bobot = document.getElementById("bobot").value;
  let tipe = document.getElementById("tipe").value;

  await supabaseClient.from("kriteria").insert({
    nama_kriteria: nama,
    bobot: parseFloat(bobot),
    tipe: tipe
  });

  load();
}

async function hapus(id) {
  await supabaseClient
    .from("kriteria")
    .delete()
    .eq("id_kriteria", id);

  load();
}

window.hapus = hapus;
window.tambah = tambah;

load();
