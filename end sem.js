// ---------- Homepage (Frame 1) ----------
document.addEventListener("DOMContentLoaded", () => {
  const scheduleBtn = document.getElementById("scheduleBtn");
  if (scheduleBtn) {
    scheduleBtn.addEventListener("click", (s) => {
      window.location.href = "schedule pickup.html";
    });

    // Key-based interaction: Press "s" to go to schedule
    document.addEventListener("keydown", (e) => {
      if (e.key === "s" || e.key === "S") {
        scheduleBtn.click();
      }
    });
  }
});

// ---------- Schedule Pickup (Frame 2) ----------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pickupForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // DOM Traversal to extract values
      const name = form.querySelector("#name").value;
      const address = form.querySelector("#address").value;
      const item = form.querySelector("#item").value;
      const type = form.querySelector("#type").value;

      if (!name || !address || !item || !type) {
        alert("Please fill in all fields");
        return;
        // Redirect to summary.html
      window.location.href = "summary.html";
      }

      // Store summary in localStorage
      const summary = { name, address, item, type, weight };
      localStorage.setItem("pickupSummary", JSON.stringify(summary));
     
    });
  }
});
// ---------- Donation/Sell Summary (Frame 3) ----------
document.addEventListener("DOMContentLoaded", () => {
  const donateBtn = document.getElementById("donateBtn");
  const sellBtn = document.getElementById("sellBtn");

  if (donateBtn && sellBtn) {
    // Use classList toggle
    donateBtn.addEventListener("click", () => {
      donateBtn.classList.add("selected");
      sellBtn.classList.remove("selected");
      updateSummary("donate");
    });

    sellBtn.addEventListener("click", () => {
      sellBtn.classList.add("selected");
      donateBtn.classList.remove("selected");
      updateSummary("sell");
    });
  }

  function updateSummary(type) {
    const leftList = document.querySelector(".left ul");
    const rightSummary = document.querySelector(".right");
    const feeDisplay = document.querySelector(".fee");
    const totalDisplay = document.querySelector(".total");
    const rewardText = document.querySelector(".rewards");

    const data = JSON.parse(localStorage.getItem("pickupSummary"));

    // Use arrays to manage item summary
    const items = [
      `Name: ${data.name}`,
      `Address: ${data.address}`,
      `Item: ${data.item}`,
      `Type: ${data.type}`,
      `Mode: ${type}`
    ];

    leftList.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      leftList.appendChild(li);
    });

    let fee = type === "sell" ? 20 : 0;
    let total = fee;
    feeDisplay.textContent = `Fee: ₹${fee}`;
    totalDisplay.textContent = `Total: ₹${total}`;

    rewardText.textContent =
      type === "donate"
        ? "🌿 Thank you for donating! You earned 50 green points!"
        : "💰 You chose to sell items. Pickup scheduled!";
  }

  // Default to donate
  if (donateBtn) donateBtn.click();
});

document.addEventListener("DOMContentLoaded", () => {
  const faqList = document.getElementById("faqList");

  const faqs = [
    {
      question: "What items can I recycle?",
      answer: "You can recycle plastics, metals, paper, glass, electronics, and more through our platform."
    },
    {
      question: "How do I schedule a pickup?",
      answer: "Go to the 'Schedule Pickup' page, fill out your details, and submit the form. We'll handle the rest!"
    },
    {
      question: "Is there any pickup fee?",
      answer: "Pickup is free for donations. For selling items, a minimal service fee is applied."
    },
    {
      question: "How are reward points calculated?",
      answer: "Reward points are based on the quantity and type of materials donated or recycled."
    },
    {
      question: "Where can I track my rewards?",
      answer: "After each pickup, a summary is shown on the 'Summary' page. Future versions will have a rewards dashboard."
    }
  ];

  // Populate FAQs using an array
  faqs.forEach((faq, index) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    const questionEl = document.createElement("div");
    questionEl.classList.add("faq-question");
    questionEl.textContent = `${index + 1}. ${faq.question}`;

    const answerEl = document.createElement("div");
    answerEl.classList.add("faq-answer");
    answerEl.textContent = faq.answer;

    faqItem.appendChild(questionEl);
    faqItem.appendChild(answerEl);
    faqList.appendChild(faqItem);

    // Toggle visibility on click using event listener
    faqItem.addEventListener("click", () => {
      faqItem.classList.toggle("active");
    });
  });

  // Key-based interaction: press "f" to toggle all FAQs open/close
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === 'f') {
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.toggle("active");
      });
    }
  });
});

