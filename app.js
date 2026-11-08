// =================================
// FIRST PAGE - REGISTRATION DETAILS
// =================================
const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  // 1. Toggle Password Visibility (Eye Icon)
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      // Switch eye icon between open and slashed
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  }

  // 2. Live Password Rule Validation (Red to Green)
  const rules = {
    length: { element: document.getElementById("rule-length"), regex: /.{8,}/ },
    upper: { element: document.getElementById("rule-upper"), regex: /[A-Z]/ },
    lower: { element: document.getElementById("rule-lower"), regex: /[a-z]/ },
    number: { element: document.getElementById("rule-number"), regex: /[0-9]/ },
    special: { element: document.getElementById("rule-special"), regex: /[\W_]/ }
  };

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const value = passwordInput.value;

      for (const key in rules) {
        const rule = rules[key];
        const icon = rule.element.querySelector("i");

        if (rule.regex.test(value)) {
          rule.element.classList.add("valid");
          rule.element.style.color = "green";
          if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-check");
          }
        } else {
          rule.element.classList.remove("valid");
          rule.element.style.color = "#d9534f"; // Red
          if (icon) {
            icon.classList.remove("fa-check");
            icon.classList.add("fa-times");
          }
        }
      }
    });
  }

  // 3. Save Email & Navigate to Second Page on Submit
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    localStorage.setItem("email", email);
    window.location.href = "personal.html"; // Update this if your 2nd page has a different filename
  });
}

const form = document.getElementById("personalForm");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get input values
        const firstName = document.getElementById("firstName").value.trim();

        const middleName = document.getElementById("middleName").value.trim();

        const lastName = document.getElementById("lastName").value.trim();

        const age = document.getElementById("age").value;

        const mobile = document.getElementById("mobile").value.trim();

        const gender = document.querySelector(
            'input[name="gender"]:checked'
        );

        // Validate gender
        if (!gender) {
            alert("Please select your gender.");
            return;
        }

        // Store Personal Details
        const personalDetails = {

            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            age: age,
            gender: gender.value,
            mobile: mobile

        };

        localStorage.setItem(
            "personalDetails",
            JSON.stringify(personalDetails)
        );

        // Navigate to Education Page
        window.location.href = "education.html";

    });

}


// =================================
// THIRD PAGE - EDUCATION DETAILS
// =================================

const educationForm = document.getElementById("educationForm");

if (educationForm) {
    educationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const sscDetails = document.getElementById("sscDetails").value.trim();
        const interDetails = document.getElementById("interDiplomaDetails").value.trim();
        const ugDetails = document.getElementById("ugDetails").value.trim();

        if (!sscDetails || !interDetails || !ugDetails) {
            alert("Please fill in all education details.");
            return;
        }

        const educationDetails = {
            sscDetails: sscDetails,
            interDetails: interDetails,
            ugDetails: ugDetails
        };

        localStorage.setItem(
            "educationDetails",
            JSON.stringify(educationDetails)
        );

        window.location.href = "address.html";
    });
}





// =================================
// FOURTH PAGE - ADDRESS DETAILS
// =================================

const addressForm = document.getElementById("addressForm");

if (addressForm) {
    addressForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const street = document.getElementById("streetname").value.trim();
        const city = document.getElementById("cityname").value.trim();
        const state = document.getElementById("statename").value.trim();
        const pincode = document.getElementById("pincodeno").value.trim();

        if (!street || !city || !state || !pincode) {
            alert("Please fill in all address details.");
            return;
        }

        if (!/^[0-9]{6}$/.test(pincode)) {
            alert("Enter a valid 6-digit pincode.");
            return;
        }

        const addressDetails = {
            street: street,
            city: city,
            state: state,
            pincode: pincode
        };

        localStorage.setItem("addressDetails", JSON.stringify(addressDetails));

        window.location.href = "confirm.html";
    });
}


// =================================
// FIFTH PAGE - CONFIRMATION DETAILS
// =================================


// =================================
// FIFTH PAGE - CONFIRMATION DETAILS
// =================================

const confirmationForm = document.getElementById("confirmationForm");

if (confirmationForm) {

    // Get saved details
    const email = localStorage.getItem("email");

    const personal = JSON.parse(
        localStorage.getItem("personalDetails") || "{}"
    );

    const education = JSON.parse(
        localStorage.getItem("educationDetails") || "{}"
    );

    const address = JSON.parse(
        localStorage.getItem("addressDetails") || "{}"
    );

    // Registration Details
    document.getElementById("gmailInput").value = email || "";

    // Personal Details
    document.getElementById("nameInput").value =
        [personal.firstName, personal.middleName, personal.lastName]
        .filter(Boolean).join(" ");

    document.getElementById("ageInput").value = personal.age || "";
    document.getElementById("genderInput").value = personal.gender || "";
    document.getElementById("mobileInput").value = personal.mobile || "";

    // Education Details
    document.getElementById("sscInput").value = education.sscDetails || "";
    document.getElementById("iddInput").value = education.interDetails || "";
    document.getElementById("ugdInput").value = education.ugDetails || "";

    // Address Details
    document.getElementById("streetInput").value = address.street || "";
    document.getElementById("cityInput").value = address.city || "";
    document.getElementById("stateInput").value = address.state || "";
    document.getElementById("pincodeInput").value = address.pincode || "";

    // Back Button
    document.getElementById("backBtn").addEventListener("click", function () {
        window.location.href = "address.html";
    });

    // Final Confirmation - Show Success Screen
   confirmationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("successPopup").style.display = "flex";
});

// OK button
document.getElementById("successOkBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});
}
