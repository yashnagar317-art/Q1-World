```javascript
/* =========================================================
   Q1 WORLD — SUPABASE AUTHENTICATION
   =========================================================

   IMPORTANT:
   Put your Supabase Project URL and Publishable Key below.

   NEVER use:
   - sb_secret_...
   - service_role key
   - database password

   The publishable key is intended for browser/client-side use.
   ========================================================= */


/* ---------------------------------------------------------
   SUPABASE CONFIG
   --------------------------------------------------------- */

const SUPABASE_URL =
  "https://prhafkklsifvagpdexzi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "PASTE_YOUR_NEW_SB_PUBLISHABLE_KEY_HERE";


/* ---------------------------------------------------------
   Check Supabase library
   --------------------------------------------------------- */

if (!window.supabase) {

  console.error(
    "Supabase library was not loaded."
  );

  alert(
    "Q1 WORLD could not load the Supabase library. Please refresh the page."
  );

  throw new Error(
    "Supabase JavaScript library is missing."
  );

}


/* ---------------------------------------------------------
   Create Supabase client
   --------------------------------------------------------- */

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


/* ---------------------------------------------------------
   DOM ELEMENTS
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
   BASIC DOM CHECK
   --------------------------------------------------------- */

console.log("Q1 WORLD JavaScript loaded.");
console.log("Supabase client initialized.");


/* ---------------------------------------------------------
   MOBILE MENU
   --------------------------------------------------------- */

if (menuToggle && navLinks) {

  menuToggle.addEventListener(
    "click",
    () => {

      const active =
        navLinks.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(active)
      );

    }
  );

}


/* Close mobile menu after navigation */

document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        if (navLinks) {

          navLinks.classList.remove(
            "active"
          );

        }

        if (menuToggle) {

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }
    );

  });


/* ---------------------------------------------------------
   AUTH MODAL
   --------------------------------------------------------- */

function openAuthModal(
  mode = "login"
) {

  if (!authModal) return;

  authModal.classList.remove(
    "hidden"
  );

  document.body.classList.add(
    "modal-open"
  );

  showAuthMode(mode);

  clearMessage();

}


function closeAuthModal() {

  if (!authModal) return;

  authModal.classList.add(
    "hidden"
  );

  document.body.classList.remove(
    "modal-open"
  );

  clearMessage();

}


function showAuthMode(
  mode = "login"
) {

  if (!loginForm || !signupForm) {
    return;
  }

  if (mode === "signup") {

    loginForm.classList.add(
      "hidden"
    );

    signupForm.classList.remove(
      "hidden"
    );

  } else {

    signupForm.classList.add(
      "hidden"
    );

    loginForm.classList.remove(
      "hidden"
    );

  }

  clearMessage();

}


/* ---------------------------------------------------------
   AUTH BUTTONS
   --------------------------------------------------------- */

if (openLoginBtn) {

  openLoginBtn.addEventListener(
    "click",
    () => {

      openAuthModal("login");

    }
  );

}


if (openSignupBtn) {

  openSignupBtn.addEventListener(
    "click",
    () => {

      openAuthModal("signup");

    }
  );

}


if (closeAuthBtn) {

  closeAuthBtn.addEventListener(
    "click",
    () => {

      closeAuthModal();

    }
  );

}


/* Click outside modal */

if (authModal) {

  authModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === authModal
      ) {

        closeAuthModal();

      }

    }
  );

}


/* Escape key */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      authModal &&
      !authModal.classList.contains("hidden")
    ) {

      closeAuthModal();

    }

  }
);


/* ---------------------------------------------------------
   SWITCH LOGIN / SIGNUP
   --------------------------------------------------------- */

if (switchToSignup) {

  switchToSignup.addEventListener(
    "click",
    () => {

      showAuthMode("signup");

    }
  );

}


if (switchToLogin) {

  switchToLogin.addEventListener(
    "click",
    () => {

      showAuthMode("login");

    }
  );

}


/* ---------------------------------------------------------
   MESSAGES
   --------------------------------------------------------- */

function showMessage(message) {

  if (!authMessage) return;

  authMessage.textContent =
    message;

  authMessage.classList.remove(
    "hidden"
  );

}


function clearMessage() {

  if (!authMessage) return;

  authMessage.textContent = "";

  authMessage.classList.add(
    "hidden"
  );

}


/* ---------------------------------------------------------
   BUTTON LOADING
   --------------------------------------------------------- */

function setButtonLoading(
  button,
  loading,
  normalText
) {

  if (!button) return;

  button.disabled =
    loading;

  button.textContent =
    loading
      ? "Please wait..."
      : normalText;

}


/* ---------------------------------------------------------
   SIGN UP
   --------------------------------------------------------- */

if (signupFormElement) {

  signupFormElement.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      clearMessage();


      const nameInput =
        document.getElementById(
          "signupName"
        );

      const emailInput =
        document.getElementById(
          "signupEmail"
        );

      const passwordInput =
        document.getElementById(
          "signupPassword"
        );


      const name =
        nameInput?.value.trim() || "";

      const email =
        emailInput?.value.trim() || "";

      const password =
        passwordInput?.value || "";


      /* Validate */

      if (
        !name ||
        !email ||
        !password
      ) {

        showMessage(
          "Please fill in all fields."
        );

        return;

      }


      if (password.length < 6) {

        showMessage(
          "Password must be at least 6 characters."
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

        console.log(
          "Creating Q1 WORLD account..."
        );


        const {
          data,
          error
        } =
          await supabaseClient.auth.signUp({

            email: email,

            password: password,

            options: {

              data: {

                display_name:
                  name

              }

            }

          });


        if (error) {

          throw error;

        }


        console.log(
          "Signup response:",
          data
        );


        /*

          If email confirmation is enabled,
          Supabase may return a user without
          an active session.

        */

        if (
          data.user &&
          !data.session
        ) {

          showMessage(
            "Account created! Please check your email and confirm your account."
          );

        } else {

          showMessage(
            "Account created successfully!"
          );


          setTimeout(
            () => {

              closeAuthModal();

            },
            1000
          );

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

}


/* ---------------------------------------------------------
   LOGIN
   --------------------------------------------------------- */

if (loginFormElement) {

  loginFormElement.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      clearMessage();


      const emailInput =
        document.getElementById(
          "loginEmail"
        );

      const passwordInput =
        document.getElementById(
          "loginPassword"
        );


      const email =
        emailInput?.value.trim() || "";

      const password =
        passwordInput?.value || "";


      if (
        !email ||
        !password
      ) {

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

        console.log(
          "Logging into Q1 WORLD..."
        );


        const {
          data,
          error
        } =
          await supabaseClient.auth
            .signInWithPassword({

              email:
                email,

              password:
                password

            });


        if (error) {

          throw error;

        }


        console.log(
          "Login successful:",
          data.user
        );


        showMessage(
          "Login successful!"
        );


        loginFormElement.reset();


        setTimeout(
          () => {

            closeAuthModal();

          },
          700
        );


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

}


/* ---------------------------------------------------------
   LOGOUT
   --------------------------------------------------------- */

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async () => {

      try {

        const {
          error
        } =
          await supabaseClient.auth
            .signOut();


        if (error) {

          throw error;

        }


        updateUserUI(null);


        console.log(
          "User logged out."
        );


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

}


/* ---------------------------------------------------------
   GET USER PROFILE
   --------------------------------------------------------- */

async function getUserProfile(
  user
) {

  if (!user) {

    return null;

  }


  try {

    const {
      data,
      error
    } =
      await supabaseClient
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

  } catch (error) {

    console.error(
      "Profile request failed:",
      error
    );

    return null;

  }

}


/* ---------------------------------------------------------
   UPDATE USER UI
   --------------------------------------------------------- */

async function updateUserUI(
  user
) {

  if (
    !openLoginBtn ||
    !openSignupBtn ||
    !userMenu ||
    !userName
  ) {

    return;

  }


  /* No user */

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


  /* Logged-in user */

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
   AUTH STATE LISTENER
   --------------------------------------------------------- */

supabaseClient.auth.onAuthStateChange(
  async (event, session) => {

    console.log(
      "Supabase Auth:",
      event
    );


    await updateUserUI(
      session?.user || null
    );

  }
);


/* ---------------------------------------------------------
   CHECK EXISTING SESSION
   --------------------------------------------------------- */

async function checkExistingSession() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth
        .getSession();


    if (error) {

      throw error;

    }


    await updateUserUI(
      data.session?.user || null
    );


    console.log(
      "Session check complete."
    );


  } catch (error) {

    console.error(
      "Session error:",
      error
    );

  }

}


/* ---------------------------------------------------------
   FRIENDLY AUTH ERRORS
   --------------------------------------------------------- */

function getFriendlyAuthError(
  error
) {

  const message =
    String(
      error?.message || ""
    ).toLowerCase();


  if (
    message.includes(
      "invalid api key"
    )
  ) {

    return (
      "Supabase API key is invalid. Please check the Q1 WORLD Project URL and Publishable Key."
    );

  }


  if (
    message.includes(
      "failed to fetch"
    )
  ) {

    return (
      "Unable to connect to Supabase. Please check your internet connection and project URL."
    );

  }


  if (
    message.includes(
      "invalid login credentials"
    )
  ) {

    return (
      "Email or password is incorrect."
    );

  }


  if (
    message.includes(
      "email not confirmed"
    )
  ) {

    return (
      "Please confirm your email before logging in."
    );

  }


  if (
    message.includes(
      "user already registered"
    )
  ) {

    return (
      "This email is already registered. Please login."
    );

  }


  if (
    message.includes(
      "password should be at least"
    )
  ) {

    return (
      "Please use a stronger password."
    );

  }


  if (
    message.includes(
      "rate limit"
    )
  ) {

    return (
      "Too many attempts. Please wait a little and try again."
    );

  }


  if (
    message.includes(
      "email address"
    ) &&
    message.includes(
      "invalid"
    )
  ) {

    return (
      "Please enter a valid email address."
    );

  }


  return (
    error?.message ||
    "Something went wrong. Please try again."
  );

}


/* ---------------------------------------------------------
   START Q1 WORLD
   --------------------------------------------------------- */

checkExistingSession();
```
