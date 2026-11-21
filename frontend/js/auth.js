const showMessage = (message, type = "danger") => {
  const box = document.getElementById("formMessage");
  box.textContent = message;
  box.className = `alert alert-${type}`;
};

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("registerButton");
    button.disabled = true;
    button.textContent = "Creating account...";

    const payload = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      password: document.getElementById("password").value
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");

      // Demo starter: token is kept in sessionStorage for this browser tab.
      sessionStorage.setItem("studentToken", data.token);
      sessionStorage.setItem("studentUser", JSON.stringify(data.user));
      showMessage("Account created successfully. You can now sign in.", "success");
      registerForm.reset();
    } catch (error) {
      showMessage(error.message || "Unable to connect to the server.");
    } finally {
      button.disabled = false;
      button.textContent = "Create account";
    }
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("loginButton");
    button.disabled = true;
    button.textContent = "Signing in...";

    const payload = {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value
    };

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed.");

      sessionStorage.setItem("studentToken", data.token);
      sessionStorage.setItem("studentUser", JSON.stringify(data.user));
      showMessage(`Welcome back, ${data.user.fullName}! Login successful.`, "success");
    } catch (error) {
      showMessage(error.message || "Unable to connect to the server.");
    } finally {
      button.disabled = false;
      button.textContent = "Sign in";
    }
  });
}
