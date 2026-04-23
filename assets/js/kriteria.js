async function load() {
  let { data, error } = await supabaseClient
    .from("kriteria")
    .select("*")
    .order("nama_kriteria", { ascending: true });

  if (error) {
    console.log("ERROR:", error);
    return;
  }

  let el = document.getElementById("data");
  el.innerHTML = "";

  data.forEach((d, i) => {
    el.innerHTML += `
      <tr>
        <td><b>${i + 1}</b></td>
        <td>${d.nama_kriteria}</td>
        <td>${d.bobot}</td>
        <td>
          <span class="badge ${d.tipe === 'benefit' ? 'bg-success' : 'bg-danger'}">
            ${d.tipe}
          </span>
        </td>
        <td>
          <button onclick="hapus('${d.id_kriteria}')" class="btn btn-danger btn-sm">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

async function tambah() {
  let nama = document.getElementById("nama").value.trim();
  let bobot = document.getElementById("bobot").value;
  let tipe = document.getElementById("tipe").value;

  if (!nama || !bobot) {
    alert("Isi semua data!");
    return;
  }

  let { error } = await supabaseClient.from("kriteria").insert({
    nama_kriteria: nama,
    bobot: parseFloat(bobot),
    tipe: tipe
  });

  if (error) {
    alert("Gagal tambah data!");
    console.log(error);
    return;
  }

  document.getElementById("nama").value = "";
  document.getElementById("bobot").value = "";

  load();
}

async function hapus(id) {
  let konfirmasi = confirm("Yakin mau hapus?");

  if (!konfirmasi) return;

  let { error } = await supabaseClient
    .from("kriteria")
    .delete()
    .eq("id_kriteria", id);

  if (error) {
    alert("Gagal hapus!");
    console.log(error);
    return;
  }

  load();
}

load();
