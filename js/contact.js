// FIX 20: enquiry form
// - arriving from a "Book this" button (contact.html?package=brand-kit) ticks that package
// - once a Formspree ID is in the form's action, enquiries are sent straight to my inbox
// - until then, it falls back to opening the visitor's email app with everything filled in
const orderForm = document.getElementById("order-form");
const statusText = orderForm.querySelector(".form-status");

// tick the package that was chosen on the Services page
const chosen = new URLSearchParams(window.location.search).get("package");
if (chosen) {
  const box = orderForm.querySelector('input[data-slug="' + chosen + '"]');
  if (box) box.checked = true;
}

function summary() {
  const data = new FormData(orderForm);
  return [
    "Name: " + data.get("name"),
    "Email: " + data.get("email"),
    "Business: " + (data.get("business") || "-"),
    "Needs: " + (data.getAll("package").join(", ") || "-"),
    "Budget: " + (data.get("budget") || "-"),
    "Deadline: " + (data.get("deadline") || "-"),
    "",
    data.get("message"),
  ].join("\n");
}

orderForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // no Formspree ID yet: use the visitor's email app instead
  if (orderForm.action.includes("YOUR_FORM_ID")) {
    const name = document.getElementById("name").value;
    window.location.href =
      "mailto:maya.potzas@gmail.com?subject=" +
      encodeURIComponent("New enquiry from " + name) +
      "&body=" +
      encodeURIComponent(summary());
    return;
  }

  const button = orderForm.querySelector(".order-btn");
  button.disabled = true;
  statusText.innerText = "Sending...";

  try {
    const response = await fetch(orderForm.action, {
      method: "POST",
      body: new FormData(orderForm),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("not sent");
    orderForm.reset();
    statusText.innerText = "Order received! I'll get back to you within a couple of days.";
  } catch (error) {
    statusText.innerText =
      "Sorry, that didn't send. Please try again or email me at maya.potzas@gmail.com.";
  }
  button.disabled = false;
});
