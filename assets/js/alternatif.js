async function load() {
  let { data } = await supabaseClient.from("alternatif").select("*");

  let el = document.getElementById("data");
  el.innerHTML = "";

  data.forEach((d, i) => {
    el.innerHTML += `
      <tr>
        <td><b>${i + 1}</b></td>
        <td>${d.nama_laptop}</td>
        <td>
          <button onclick="hapus('${d.nama_laptop}')" class="btn btn-danger btn-sm">
            <i class="bi bi-trash"></i> Hapus
          </button>
        </td>
      </tr>
    `;
  });
}

async function tambah() {
  let nama = document.getElementById("nama").value;

  if (!nama) {
    tampilAlert("Nama laptop tidak boleh kosong!", "danger");
    return;
  }

  await supabaseClient.from("alternatif").insert({
    nama_laptop: nama
  });

  document.getElementById("nama").value = "";
  tampilAlert("✅ Data berhasil ditambahkan!", "success");

  load();
}

async function hapus(nama_laptop) {
  let yakin = confirm("Yakin ingin menghapus data ini?");

  if (!yakin) {
    return;
  }

  let { error } = await supabaseClient
    .from("alternatif")
    .delete()
    .eq("nama_laptop", nama_laptop);

  if (error) {
    tampilAlert("Gagal menghapus data: " + error.message, "danger");
    return;
  }

  tampilAlert("🗑️ Data berhasil dihapus!", "warning");
  load();
}

function tampilAlert(pesan, tipe) {
  document.getElementById("alert").innerHTML = `
    <div class="alert alert-${tipe}">
      ${pesan}
    </div>
  `;
}

load();