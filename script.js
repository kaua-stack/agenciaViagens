// DOM Elements
const header = document.querySelector(".header")
const menuToggle = document.getElementById("menuToggle")
const mobileMenu = document.getElementById("mobileMenu")
const mobileLinks = document.querySelectorAll(".nav-mobile a")
const tabButtons = document.querySelectorAll(".tab-btn")
const tabPanes = document.querySelectorAll(".tab-pane")
const contactForm = document.getElementById("contactForm")
const successMessage = document.getElementById("successMessage")
const animatedElements = document.querySelectorAll(".section-header, .about-content, .card, .contact-content")

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block"

  // Toggle icon
  const icon = menuToggle.querySelector("i")
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Close menu when clicking on links
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.display = "none"
    const icon = menuToggle.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  })
})

// Tabs functionality with smooth transition
tabButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons and panes
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabPanes.forEach((pane) => {
      pane.classList.remove("active")
      pane.style.display = "none"
    })

    // Add active class to clicked button
    this.classList.add("active")

    // Show corresponding tab pane with transition
    const tabId = this.getAttribute("data-tab")
    const activePane = document.getElementById(tabId)

    // First make it display block but opacity 0
    activePane.style.display = "block"

    // Force a reflow to ensure the transition works
    void activePane.offsetWidth

    // Then add the active class which will animate opacity to 1
    activePane.classList.add("active")
  })
})

// Form submission with validation
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Basic validation
    let isValid = true
    const requiredFields = contactForm.querySelectorAll("[required]")

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.style.borderColor = "#ff3860"

        // Add shake animation
        field.classList.add("shake")
        setTimeout(() => {
          field.classList.remove("shake")
        }, 500)
      } else {
        field.style.borderColor = ""
      }
    })

    // Email validation
    const emailField = document.getElementById("email")
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailField && !emailPattern.test(emailField.value)) {
      isValid = false
      emailField.style.borderColor = "#ff3860"

      // Add shake animation
      emailField.classList.add("shake")
      setTimeout(() => {
        emailField.classList.remove("shake")
      }, 500)
    }

    if (!isValid) return

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For this example, we'll just show the success message

    // Hide form and show success message with animation
    contactForm.style.opacity = "0"
    setTimeout(() => {
      contactForm.style.display = "none"
      successMessage.style.display = "block"

      // Force reflow
      void successMessage.offsetWidth

      successMessage.style.opacity = "1"
    }, 300)

    // You can use this code to send form data via email
    // Uncomment and modify as needed
    /*
        // Create form data object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);
        
        // Send data using fetch API
        fetch('your-email-handler-url', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Show success message
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Force reflow
                void successMessage.offsetWidth;
                
                successMessage.style.opacity = '1';
            }, 300);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
        });
        */
  })
}

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear()

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add active class to navigation based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollPosition = window.scrollY
  const headerHeight = document.querySelector(".header").offsetHeight

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Animation of elements when they enter the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

animatedElements.forEach((element) => {
  observer.observe(element)
})

// Phone number mask
const phoneInput = document.getElementById("phone")
if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 0) {
      // Format: (00) 00000-0000
      if (value.length <= 2) {
        value = `(${value}`
      } else if (value.length <= 7) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`
      } else {
        value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`
      }
    }

    e.target.value = value
  })
}

// Add CSS for shake animation
const style = document.createElement("style")
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
.shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
`
document.head.appendChild(style)

document.addEventListener("DOMContentLoaded", function() {
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbot = document.getElementById("chatbot");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");

  chatbotToggle.addEventListener("click", () => {
      chatbot.classList.toggle("active");
  });

  chatbotClose.addEventListener("click", () => {
      chatbot.classList.remove("active");
  });

  chatbotSend.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          sendMessage();
      }
  });

  function sendMessage() {
      const userMessage = chatbotInput.value.trim();
      if (userMessage === "") return;

      appendMessage("Você", userMessage);
      chatbotInput.value = "";

      setTimeout(() => {
          appendMessage("Assistente", getBotResponse(userMessage));
      }, 1000);
  }

  function appendMessage(sender, message) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", sender === "Você" ? "user" : "bot");
      messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function getBotResponse(input) {
      const responses = {
          "oi": "Olá! Como posso te ajudar?",
          "quais serviços vocês oferecem?": "Oferecemos pacotes de viagem, hospedagem e experiências incríveis!",
          "como faço para entrar em contato?": "Você pode nos chamar pelo WhatsApp ou preencher o formulário na seção de contato!",
          "obrigado": "De nada! Se precisar de algo, estou por aqui!"
      };
      return responses[input.toLowerCase()] || "Desculpe, não entendi. Pode reformular?";
  }
});