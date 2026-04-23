async function load() {
  let { data, error } = await supabaseClient
    .from("kriteria")
    .select("*")
    .order("id_kriteria", { ascending: true });

  if (error) {
    console.log(error);
    alert("Gagal load data");
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
        <td>${d.tipe}</td>
        <td>
          <button onclick="hapus('${d.id_kriteria}')" class="btn btn-danger btn-sm">
            🗑 Hapus
          </button>
        </td>
      </tr>
    `;
  });
}

// ================= TAMBAH =================
async function tambah() {
  let nama = document.getElementById("nama").value;
  let bobot = document.getElementById("bobot").value;
  let tipe = document.getElementById("tipe").value;

  if (!nama || !bobot) {
    alert("Semua field harus diisi!");
    return;
  }

  let { error } = await supabaseClient.from("kriteria").insert({
    nama_kriteria: nama,
    bobot: parseFloat(bobot),
    tipe: tipe
  });

  if (error) {
    console.log(error);
    alert("Gagal tambah data");
  } else {
    alert("Berhasil tambah!");
    document.getElementById("nama").value = "";
    document.getElementById("bobot").value = "";
    load();
  }
}

// ================= HAPUS =================
async function hapus(id) {
  let konfirmasi = confirm("Yakin mau hapus data ini?");
  if (!konfirmasi) return;

  let { error } = await supabaseClient
    .from("kriteria")
    .delete()
    .eq("id_kriteria", id);

  if (error) {
    console.log(error);
    alert("Gagal hapus (kemungkinan masih dipakai di penilaian)");
  } else {
    alert("Berhasil dihapus!");
    load();
  }
}

// 🔥 WAJIB biar onclick bisa akses
window.hapus = hapus;
window.tambah = tambah;

// pertama kali load
load();