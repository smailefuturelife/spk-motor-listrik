async function hapus(id) {
  let konfirmasi = confirm("Yakin mau hapus?");
  if (!konfirmasi) return;

  // 1. hapus dulu data di penilaian
  await supabaseClient
    .from("penilaian")
    .delete()
    .eq("id_kriteria", id);

  // 2. baru hapus kriteria
  let { error } = await supabaseClient
    .from("kriteria")
    .delete()
    .eq("id_kriteria", id);

  if (error) {
    console.log(error);
    alert("Gagal hapus");
  } else {
    alert("Berhasil hapus");
    load();
  }
}
