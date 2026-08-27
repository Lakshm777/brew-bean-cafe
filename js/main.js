document.addEventListener("DOMContentLoaded", () => {
  // Sticky navbar scroll behavior
  const navbar = document.querySelector(".navbar-custom");
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    // Trigger on page load in case page is already scrolled
    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }

  // Active navigation highlight
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";
  const navLinks = document.querySelectorAll(".navbar-custom .nav-link");
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === pageName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Contact Form Mock Submission & Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill out all fields before submitting.", "error");
        return;
      }

      // Simple email pattern check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }

      // Mock success submission
      showToast("Thank you! Your message has been sent. We'll be in touch soon.", "success");
      contactForm.reset();
    });
  }

  // Toast notifier helper function
  function showToast(message, type = "success") {
    // Check if toast container exists, if not, create it
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
      toastContainer.style.zIndex = "1060";
      document.body.appendChild(toastContainer);
    }

    const toastId = "toast_" + Date.now();
    const isSuccess = type === "success";
    const title = isSuccess ? "Message Sent" : "Form Error";

    const toastHTML = `
      <div id="${toastId}" class="toast toast-custom hide" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
        <div class="toast-header d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <span class="rounded-circle me-2 d-inline-block" style="width: 12px; height: 12px; background-color: ${isSuccess ? 'var(--deodar-green)' : '#dc3545'}"></span>
            <strong class="me-auto text-dark" style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${title}</strong>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" style="font-size: 0.75rem;"></button>
        </div>
        <div class="toast-body text-dark" style="font-size: 0.9rem;">
          ${message}
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);
    const toastElement = document.getElementById(toastId);
    
    // Initialize and show via Bootstrap JS SDK
    if (window.bootstrap) {
      const bsToast = new bootstrap.Toast(toastElement);
      bsToast.show();
      // Remove element from DOM after it finishes hiding
      toastElement.addEventListener("hidden.bs.toast", () => {
        toastElement.remove();
      });
    } else {
      // Fallback if bootstrap is not loaded
      toastElement.classList.remove("hide");
      toastElement.classList.add("show");
      setTimeout(() => {
        toastElement.classList.remove("show");
        toastElement.classList.add("hide");
        setTimeout(() => toastElement.remove(), 500);
      }, 4000);
    }
  }
});
