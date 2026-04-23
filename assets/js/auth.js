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
}