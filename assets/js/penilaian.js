let kriteria = [];
let alternatif = [];

async function loadData() {
  let k = await supabaseClient.from("kriteria").select("*");
  let a = await supabaseClient.from("alternatif").select("*");

  kriteria = k.data;
  alternatif = a.data;

  // Dropdown laptop
  let select = document.getElementById("alternatif");
  select.innerHTML = "<option>Pilih Laptop</option>";

  alternatif.forEach(a => {
    select.innerHTML += `
      <option value="${a.id_alternatif}">
        ${a.nama_laptop}
      </option>`;
  });

  // Form input nilai
  let form = document.getElementById("form-nilai");
  form.innerHTML = "";

  kriteria.forEach(k => {
    form.innerHTML += `
      <div class="mb-3">
        <label class="form-label">
          ${k.nama_kriteria} 
          <small class="text-muted">(${k.tipe})</small>
        </label>
        <input type="number" min="1" max="100"
          id="nilai-${k.id_kriteria}"
          class="form-control"
          placeholder="Masukkan nilai...">
      </div>
    `;
  });
}

async function simpan() {
  let id_alt = document.getElementById("alternatif").value;

  if (!id_alt) {
    tampilAlert("Pilih laptop dulu!", "danger");
    return;
  }

  for (let k of kriteria) {
    let nilai = document.getElementById(`nilai-${k.id_kriteria}`).value;

    if (!nilai) {
      tampilAlert("Semua nilai harus diisi!", "danger");
      return;
    }

    await supabaseClient.from("penilaian").insert({
      id_alternatif: id_alt,
      id_kriteria: k.id_kriteria,
      nilai: parseFloat(nilai)
    });
  }

  tampilAlert("✅ Penilaian berhasil disimpan!", "success");
}

function tampilAlert(pesan, tipe) {
  document.getElementById("alert").innerHTML = `
    <div class="alert alert-${tipe}">
      ${pesan}
    </div>
  `;
}

loadData();