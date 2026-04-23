let chart;

async function hitung() {

  let kriteria = (await supabaseClient.from("kriteria").select("*")).data;
  let alternatif = (await supabaseClient.from("alternatif").select("*")).data;
  let penilaian = (await supabaseClient.from("penilaian").select("*")).data;

  let matriks = {};

  // 🔥 NORMALISASI
  kriteria.forEach(k => {
    let nilai = penilaian
      .filter(p => p.id_kriteria === k.id_kriteria)
      .map(p => p.nilai);

    let max = Math.max(...nilai);
    let min = Math.min(...nilai);

    penilaian.forEach(p => {
      if (p.id_kriteria === k.id_kriteria) {

        if (!matriks[p.id_alternatif]) {
          matriks[p.id_alternatif] = {};
        }

        if (k.tipe === "benefit") {
          matriks[p.id_alternatif][k.id_kriteria] = p.nilai / max;
        } else {
          matriks[p.id_alternatif][k.id_kriteria] = min / p.nilai;
        }

      }
    });
  });

  // 🔥 HITUNG SKOR
  let hasil = [];

  alternatif.forEach(a => {
    let total = 0;

    kriteria.forEach(k => {
      let nilai = matriks[a.id_alternatif]?.[k.id_kriteria] || 0;
      total += nilai * k.bobot;
    });

    hasil.push({
      nama_laptop: a.nama_laptop,
      skor: total
    });
  });

  // 🔥 SORT
  hasil.sort((a, b) => b.skor - a.skor);

  // 🔥 TABEL
  let el = document.getElementById("hasil");
  el.innerHTML = "";

  hasil.forEach((h, i) => {
    let badge = "";

    if (i === 0) badge = "🥇 Terbaik";
    else if (i === 1) badge = "🥈";
    else if (i === 2) badge = "🥉";

    el.innerHTML += `
      <tr class="${i === 0 ? 'table-success' : ''}">
        <td>${i + 1}</td>
        <td>${h.nama_laptop}</td>
        <td>${h.skor.toFixed(4)}</td>
        <td>${badge}</td>
      </tr>
    `;
  });

  // 🔥 CHART
  let labels = hasil.map(h => h.nama_laptop);
  let values = hasil.map(h => h.skor);

  if (chart) chart.destroy();

  let ctx = document.getElementById("chartHasil").getContext("2d");

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107',
          '#FF5722',
          '#9C27B0',
          '#00BCD4'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      cutout: '70%', // 🔥 kecil & tipis
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            font: { size: 10 }
          }
        }
      }
    }
  });
}