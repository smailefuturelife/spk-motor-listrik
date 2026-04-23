async function login() {
  let username = document.getElementById("user").value;
  let password = document.getElementById("pass").value;

  let { data } = await supabaseClient
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "dashboard.html";
  } else {
    alert("Login gagal");
  }

   let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let btn = document.getElementById("btnLogin");

  if (!user || !pass) {
    alert("Isi username & password!");
    return;
  }

  btn.innerHTML = "Loading...";
  btn.disabled = true;

  if (user === "admin" && pass === "admin") {
    localStorage.setItem("user", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Login gagal!");
  }

  btn.innerHTML = "Login";
  btn.disabled = false;
}
