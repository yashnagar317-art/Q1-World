/* =========================================================
   Q1 WORLD — SUPABASE AUTHENTICATION
   =========================================================

   IMPORTANT:
   Replace SUPABASE_ANON_KEY with your Supabase
   Publishable/Anon key.

   NEVER put the Supabase service_role key here.
   NEVER put your database password here.
   ========================================================= */


const SUPABASE_URL =
  "https://prhafkklsifvagpdexzi.supabase.co";

const SUPABASE_ANON_KEY =
  "https://prhafkklsifvagpdexzi.supabase.co/rest/v1/";


/* ---------------------------------------------------------
   Supabase client
   --------------------------------------------------------- */

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


/* ---------------------------------------------------------
   DOM elements
   --------------------------------------------------------- */

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.getElementById("navLinks");

const authModal =
  document.getElementById("authModal");

const closeAuthBtn =
  document.getElementById("closeAuthBtn");

const openLoginBtn =
  document.getElementById("openLoginBtn");

const openSignupBtn =
  document.getElementById("openSignupBtn");

const loginForm =
  document.getElementById("loginForm");

const signupForm =
  document.getElementById("signupForm");

const loginFormElement =
  document.getElementById("loginFormElement");

const signupFormElement =
  document.getElementById("signupFormElement");

const switchToSignup =
  document.getElementById("switchToSignup");

const switchToLogin =
  document.getElementById("switchToLogin");

const authMessage =
  document.getElementById("authMessage");

const userMenu =
  document.getElementById("userMenu");

const userName =
  document.getElementById("userName");

const logoutBtn =
  document.getElementById("logoutBtn");


/* ---------------------------------------------------------
   Mobile menu
   --------------------------------------------------------- */

if (menuToggle) {

  menuToggle.addEventListener("click", () => {

    const active =
      navLinks.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      String(active)
    );

  });

}


/* Close mobile menu after clicking navigation */

document.querySelectorAll(".nav-links a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* ---------------------------------------------------------
   Authentication modal
   --------------------------------------------------------- */

function openAuthModal(mode = "login") {

  authModal.classList.remove("hidden");

  document.body.classList.add("modal-open");

  showAuthMode(mode);

  clearMessage();

}


function closeAuthModal() {

  authModal.classList.add("hidden");

  document.body.classList.remove("modal-open");

  clearMessage();

}


function showAuthMode(mode) {

  if (mode === "signup") {

    loginForm.classList.add("hidden");

    signupForm.classList.remove("hidden");

  } else {

    signupForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

  }

  clearMessage();

}


/* Open Login */

openLoginBtn.addEventListener("click", () => {

  openAuthModal("login");

});


/* Open Signup */

openSignupBtn.addEventListener("click", () => {

  openAuthModal("signup");

});


/* Close modal */

closeAuthBtn.addEventListener("click", () => {

  closeAuthModal();

});


/* Click outside modal */

authModal.addEventListener("click", (event) => {

  if (event.target === authModal) {

    closeAuthModal();

  }

});


/* Escape key */

document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    !authModal.classList.contains("hidden")
  ) {

    closeAuthModal();

  }

});


/* Switch Login → Signup */

switchToSignup.addEventListener("click", () => {

  showAuthMode("signup");

});


/* Switch Signup → Login */

switchToLogin.addEventListener("click", () => {

  showAuthMode("login");

});


/* ---------------------------------------------------------
   Messages
   --------------------------------------------------------- */

function showMessage(message) {

  authMessage.textContent = message;

  authMessage.classList.remove("hidden");

}


function clearMessage() {

  authMessage.textContent = "";

  authMessage.classList.add("hidden");

}


/* ---------------------------------------------------------
   Loading buttons
   --------------------------------------------------------- */

function setButtonLoading(button, loading, normalText) {

  if (!button) return;

  button.disabled = loading;

  button.textContent =
    loading ? "Please wait..." : normalText;

}


/* ---------------------------------------------------------
   SIGN UP
   --------------------------------------------------------- */

signupFormElement.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    clearMessage();

    const name =
      document
        .getElementById("signupName")
        .value
        .trim();

    const email =
      document
        .getElementById("signupEmail")
        .value
        .trim();

    const password =
      document
        .getElementById("signupPassword")
        .value;


    if (!name || !email || !password) {

      showMessage(
        "Please fill in all fields."
      );

      return;

    }


    const submitButton =
      signupFormElement.querySelector(
        ".auth-submit"
      );


    setButtonLoading(
      submitButton,
      true,
      "Create Account"
    );


    try {

      const {
        data,
        error
      } = await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {

          data: {
            display_name: name
          }

        }

      });


      if (error) {

        throw error;

      }


      /*
        Supabase trigger automatically creates
        the matching public.profiles record.
      */


      if (
        data.user &&
        !data.session
      ) {

        showMessage(
          "Account created! Please check your email to confirm your account."
        );

      } else {

        showMessage(
          "Account created successfully!"
        );

        setTimeout(() => {

          closeAuthModal();

        }, 1000);

      }


      signupFormElement.reset();


    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      showMessage(
        getFriendlyAuthError(error)
      );

    } finally {

      setButtonLoading(
        submitButton,
        false,
        "Create Account"
      );

    }

  }
);


/* ---------------------------------------------------------
   LOGIN
   --------------------------------------------------------- */

loginFormElement.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    clearMessage();


    const email =
      document
        .getElementById("loginEmail")
        .value
        .trim();

    const password =
      document
        .getElementById("loginPassword")
        .value;


    if (!email || !password) {

      showMessage(
        "Please enter your email and password."
      );

      return;

    }


    const submitButton =
      loginFormElement.querySelector(
        ".auth-submit"
      );


    setButtonLoading(
      submitButton,
      true,
      "Login"
    );


    try {

      const {
        data,
        error
      } =
        await supabaseClient.auth.signInWithPassword({

          email: email,

          password: password

        });


      if (error) {

        throw error;

      }


      if (data.user) {

        showMessage(
          "Login successful!"
        );

        loginFormElement.reset();


        setTimeout(() => {

          closeAuthModal();

        }, 600);

      }


    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      showMessage(
        getFriendlyAuthError(error)
      );

    } finally {

      setButtonLoading(
        submitButton,
        false,
        "Login"
      );

    }

  }
);


/* ---------------------------------------------------------
   LOGOUT
   --------------------------------------------------------- */

logoutBtn.addEventListener(
  "click",
  async () => {

    try {

      const {
        error
      } = await supabaseClient.auth.signOut();


      if (error) {

        throw error;

      }


      updateUserUI(null);


    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

      alert(
        "Unable to logout right now. Please try again."
      );

    }

  }
);


/* ---------------------------------------------------------
   Get profile from database
   --------------------------------------------------------- */

async function getUserProfile(user) {

  if (!user) {

    return null;

  }


  const {
    data,
    error
  } = await supabaseClient

    .from("profiles")

    .select(
      "id, display_name, email"
    )

    .eq(
      "id",
      user.id
    )

    .maybeSingle();


  if (error) {

    console.error(
      "Profile error:",
      error
    );

    return null;

  }


  return data;

}


/* ---------------------------------------------------------
   Update UI based on logged-in user
   --------------------------------------------------------- */

async function updateUserUI(user) {

  if (!user) {

    openLoginBtn.classList.remove(
      "hidden"
    );

    openSignupBtn.classList.remove(
      "hidden"
    );

    userMenu.classList.add(
      "hidden"
    );

    userName.textContent = "";

    return;

  }


  const profile =
    await getUserProfile(user);


  const displayName =
    profile?.display_name ||
    user.user_metadata?.display_name ||
    user.email?.split("@")[0] ||
    "User";


  userName.textContent =
    `Hi, ${displayName}`;


  openLoginBtn.classList.add(
    "hidden"
  );

  openSignupBtn.classList.add(
    "hidden"
  );

  userMenu.classList.remove(
    "hidden"
  );

}


/* ---------------------------------------------------------
   Authentication state listener
   --------------------------------------------------------- */

supabaseClient.auth.onAuthStateChange(
  async (event, session) => {

    console.log(
      "Auth event:",
      event
    );

    await updateUserUI(
      session?.user || null
    );

  }
);


/* ---------------------------------------------------------
   Check existing session
   --------------------------------------------------------- */

async function checkExistingSession() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();


    if (error) {

      throw error;

    }


    await updateUserUI(
      data.session?.user || null
    );


  } catch (error) {

    console.error(
      "Session error:",
      error
    );

  }

}


/* ---------------------------------------------------------
   Friendly error messages
   --------------------------------------------------------- */

function getFriendlyAuthError(error) {

  const message =
    String(
      error?.message || ""
    ).toLowerCase();


  if (
    message.includes(
      "invalid login credentials"
    )
  ) {

    return "Email or password is incorrect.";

  }


  if (
    message.includes(
      "user already registered"
    )
  ) {

    return "This email is already registered. Please login.";

  }


  if (
    message.includes(
      "password should be at least"
    )
  ) {

    return "Please use a stronger password.";

  }


  if (
    message.includes(
      "email not confirmed"
    )
  ) {

    return "Please confirm your email before logging in.";

  }


  if (
    message.includes(
      "rate limit"
    )
  ) {

    return "Too many attempts. Please wait a little and try again.";

  }


  return (
    error?.message ||
    "Something went wrong. Please try again."
  );

}


/* ---------------------------------------------------------
   Start
   --------------------------------------------------------- */

checkExistingSession();
