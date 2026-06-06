function isiDemo() {
    document.getElementById("user").value = "admin@gmail.com";
    document.getElementById("pass").value = "123";
}

async function login() {

    let username = document.getElementById("user").value.trim();
    let password = document.getElementById("pass").value.trim();

    if (username === "" || password === "") {
        alert("Username dan Password wajib diisi!");
        return;
    }

    document.getElementById("btnText").style.display = "none";
    document.getElementById("loading").style.display = "inline-block";

    try {

        const { data, error } = await supabaseClient
            .from("users")
            .select("*")
            .eq("username", username)
            .eq("password", password)
            .single();

        if (error || !data) {
            alert("Username atau Password salah!");
            return;
        }

        localStorage.setItem("user", JSON.stringify(data));

        alert("Login berhasil!");

        window.location.href = "dashboard.html";

    } catch (err) {

        console.error(err);
        alert("Terjadi kesalahan koneksi!");

    } finally {

        document.getElementById("btnText").style.display = "inline";
        document.getElementById("loading").style.display = "none";

    }
}

document.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
        login();
    }

});
