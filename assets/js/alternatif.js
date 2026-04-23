async function load() {
  let { data } = await supabaseClient.from("alternatif").select("*");

  let el = document.getElementById("data");
  el.innerHTML = "";

  data.forEach((d, i) => {
    el.innerHTML += `
      <tr>
        <td><b>${i + 1}</b></td>
        <td>${d.nama_motor}</td>
      </tr>
    `;
  });
}

async function tambah() {
  let nama = document.getElementById("nama").value;

  if (!nama) {
    tampilAlert("Nama motor tidak boleh kosong!", "danger");
    return;
  }

  await supabaseClient.from("alternatif").insert({
    nama_motor: nama
  });

  document.getElementById("nama").value = "";
  tampilAlert("✅ Data berhasil ditambahkan!", "success");

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