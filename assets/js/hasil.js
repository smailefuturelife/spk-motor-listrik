async function hitung() {
  let { data: kriteria } = await supabaseClient.from("kriteria").select("*");
  let { data: alternatif } = await supabaseClient.from("alternatif").select("*");
  let { data: penilaian } = await supabaseClient.from("penilaian").select("*");

  let hasil = [];

  alternatif.forEach(a => {
    let skor = 0;

    kriteria.forEach(k => {
      let n = penilaian.find(p =>
        p.id_alternatif === a.id_alternatif &&
        p.id_kriteria === k.id_kriteria
      );

      if (n) skor += n.nilai * k.bobot;
    });

    hasil.push({ nama: a.nama_motor, skor });
  });

  hasil.sort((a, b) => b.skor - a.skor);

  let el = document.getElementById("hasil");
  el.innerHTML = "";

  hasil.forEach((h, i) => {
    let badge = "";
    let rowClass = "";

    if (i === 0) {
      badge = `<span class="badge bg-success">🥇 Terbaik</span>`;
      rowClass = "table-success";
    } else if (i === 1) {
      badge = `<span class="badge bg-primary">🥈</span>`;
    } else if (i === 2) {
      badge = `<span class="badge bg-warning text-dark">🥉</span>`;
    }

    el.innerHTML += `
      <tr class="${rowClass}">
        <td><b>${i + 1}</b></td>
        <td>${h.nama}</td>
        <td>${h.skor.toFixed(2)}</td>
        <td>${badge}</td>
      </tr>
    `;
  });
}