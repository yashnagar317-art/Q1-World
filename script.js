```javascript
/* =========================================================
   Q1 WORLD — LOGIN + SIGN UP + SUPABASE AUTH
   ========================================================= */


/* ---------------------------------------------------------
   SUPABASE CONFIG
   --------------------------------------------------------- */

const SUPABASE_URL =
  "https://prhafkklsifvagpdexzi.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_zg5yD1BMbtMY2g9yJJAzqw_JXsfu-Tk";


/* ---------------------------------------------------------
   CHECK SUPABASE LIBRARY
   --------------------------------------------------------- */

if (!window.supabase) {

  console.error(
    "Supabase library was not loaded."
  );

  throw new Error(
    "Supabase library missing. Check index.html."
  );

}


/* ---------------------------------------------------------
   CREATE SUPABASE CLIENT
   --------------------------------------------------------- */

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


console.log(
  "Q1 WORLD: Supabase initialized."
);


/* ---------------------------------------------------------
   GET ELEMENTS
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
   MOBILE MENU
   --------------------------------------------------------- */

if (menuToggle && navLinks) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navLinks.classList.toggle(
          "active"
        );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );

}


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
  mode
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

}


/* ---------------------------------------------------------
   OPEN LOGIN
   --------------------------------------------------------- */

if (openLoginBtn) {

  openLoginBtn.addEventListener(
    "click",
    () => {

      openAuthModal("login");

    }
  );

}


/* ---------------------------------------------------------
   OPEN SIGN UP
   --------------------------------------------------------- */

if (openSignupBtn) {

  openSignupBtn.addEventListener(
    "click",
    () => {

      openAuthModal("signup");

    }
  );

}


/* ---------------------------------------------------------
   CLOSE AUTH MODAL
   --------------------------------------------------------- */

if (closeAuthBtn) {

  closeAuthBtn.addEventListener(
    "click",
    closeAuthModal
  );

}


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
   SWITCH LOGIN → SIGN UP
   --------------------------------------------------------- */

if (switchToSignup) {

  switchToSignup.addEventListener(
    "click",
    () => {

      showAuthMode("signup");

      clearMessage();

    }
  );

}


/* ---------------------------------------------------------
   SWITCH SIGN UP → LOGIN
   --------------------------------------------------------- */

if (switchToLogin) {

  switchToLogin.addEventListener(
    "click",
    () => {

      showAuthMode("login");

      clearMessage();

    }
  );

}


/* ---------------------------------------------------------
   MESSAGES
   --------------------------------------------------------- */

function showMessage(
  message
) {

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


      const name =
        document
          .getElementById("signupName")
          ?.value
          .trim() || "";


      const email =
        document
          .getElementById("signupEmail")
          ?.value
          .trim() || "";


      const password =
        document
          .getElementById("signupPassword")
          ?.value || "";


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
          "Q1 WORLD: Creating account..."
        );


        const {
          data,
          error
        } =
          await supabaseClient.auth.signUp({

            email:
              email,

            password:
              password,

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
          "Q1 WORLD: Signup response",
          data
        );


        signupFormElement.reset();


        /*
          Email confirmation ON:
          user exists but session is null.
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


      } catch (error) {

        console.error(
          "Q1 WORLD Signup Error:",
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


      const email =
        document
          .getElementById("loginEmail")
          ?.value
          .trim() || "";


      const password =
        document
          .getElementById("loginPassword")
          ?.value || "";


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
          "Q1 WORLD: Logging in..."
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
          "Q1 WORLD: Login successful",
          data.user
        );


        loginFormElement.reset();


        showMessage(
          "Login successful!"
        );


        setTimeout(
          () => {

            closeAuthModal();

          },
          700
        );


      } catch (error) {

        console.error(
          "Q1 WORLD Login Error:",
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
          "Q1 WORLD: Logged out."
        );


      } catch (error) {

        console.error(
          "Logout Error:",
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
   GET PROFILE
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

      console.warn(
        "Profile could not be loaded:",
        error
      );

      return null;

    }


    return data;

  } catch (error) {

    console.warn(
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


  /* Logged out */

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


  /* Logged in */

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
   AUTH STATE
   --------------------------------------------------------- */

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    console.log(
      "Q1 WORLD Auth Event:",
      event
    );


    updateUserUI(
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
      "Q1 WORLD: Session checked."
    );


  } catch (error) {

    console.error(
      "Session Error:",
      error
    );

  }

}


/* ---------------------------------------------------------
   FRIENDLY ERROR MESSAGES
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
      "Invalid Supabase API key. Check your Project URL and Publishable Key."
    );

  }


  if (
    message.includes(
      "failed to fetch"
    )
  ) {

    return (
      "Could not connect to Supabase. Please check your internet connection."
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
      "Password must be at least 6 characters."
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
      "email"
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
   START
   --------------------------------------------------------- */

checkExistingSession();
```
