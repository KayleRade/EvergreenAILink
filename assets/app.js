const config = window.EVERGREEN_CONFIG || {};
const BOOKING_URL = "https://calendar.app.google/6oECkQT9oewUMVHs8";

const fallbackServices = [
  {
    id: "starter-setup",
    name: "Starter Setup",
    summary: "A clean professional foundation for small businesses that need to be found, contacted, and booked.",
    description: "Professional website setup, mobile-friendly layout, Google Maps / Business Profile support, contact form, booking page setup, Google Calendar connection, business email setup, basic SEO, Hostinger setup, and domain connection.",
    outcome: "A simple online presence that looks credible and gives customers a clear path to contact or book.",
    price: "$550"
  },
  {
    id: "growth-setup",
    name: "Growth Setup",
    summary: "A stronger digital foundation for businesses ready to grow lead generation and service presentation.",
    description: "Includes everything in Starter, plus more pages and sections, stronger service presentation, improved growth structure, advanced contact pathways, better booking flow, lead capture enhancements, improved SEO foundation, and additional setup support.",
    outcome: "A more complete online presence with stronger lead flow and a better foundation for future automation.",
    price: "$1,100"
  },
  {
    id: "ai-agent-tool",
    name: "Optional AI Agent or Tool",
    summary: "Add AI-powered support once your digital foundation is ready.",
    description: "AI Website Chat, Email Follow-Up, Appointment Assistant, Lead Qualifier, FAQ Assistant, or Workflow Automation.",
    outcome: "Faster customer response, better qualification, and less repetitive work for your team.",
    price: "$1,500 per Agent/Tool"
  },
  {
    id: "lead-response",
    name: "AI Lead Response System",
    summary: "Capture, qualify, and respond to new leads before competitors have opened their inbox.",
    description: "A fast-response automation stack that connects forms, missed calls, chat, CRM updates, follow-up messages, and human handoff rules.",
    outcome: "Faster replies, cleaner pipeline data, and fewer lost opportunities.",
    price: "Custom build"
  },
  {
    id: "ops-automation",
    name: "Operations Automation",
    summary: "Turn repetitive admin work into reliable workflows that run quietly in the background.",
    description: "We map manual processes, remove bottlenecks, and connect your tools with AI-assisted routing, summaries, reminders, and task creation.",
    outcome: "Hours saved every week with fewer dropped details.",
    price: "Custom build"
  },
  {
    id: "ai-crm",
    name: "AI CRM Cleanup + Follow-Up",
    summary: "Organize contacts, revive stale leads, and give every prospect a next step.",
    description: "A practical CRM improvement system for tagging, scoring, follow-up sequencing, owner assignment, and AI-generated notes.",
    outcome: "A cleaner system your team can actually trust.",
    price: "Custom build"
  },
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    summary: "Give callers and website visitors a faster first response with clear routing and handoff rules.",
    description: "A customer-facing AI intake and routing system for common questions, appointment requests, basic qualification, and escalation to a human when needed.",
    outcome: "Fewer missed opportunities and a calmer front desk experience.",
    price: "$1,500 per Agent/Tool"
  },
  {
    id: "appointment-assistant",
    name: "Appointment Assistant",
    summary: "Automate scheduling, reminders, rescheduling prompts, and calendar coordination.",
    description: "Connect booking pages, calendars, email or SMS reminders, lead source tracking, and follow-up tasks so appointments are easier to capture and manage.",
    outcome: "More booked calls with less manual coordination.",
    price: "$1,500 per Agent/Tool"
  },
  {
    id: "faq-assistant",
    name: "FAQ Assistant",
    summary: "Answer common questions automatically while still protecting the human handoff.",
    description: "A trained FAQ and support assistant for services, pricing, policies, next steps, and simple customer guidance.",
    outcome: "Faster answers and fewer repetitive support replies.",
    price: "$1,500 per Agent/Tool"
  }
];

const fallbackPosts = [
  {
    id: "ai-readiness",
    title: "Is Your Business Ready for AI Automation?",
    excerpt: "Five signs your business has enough repetition, missed follow-up, or operational drag to justify an AI system.",
    content: "AI automation is most useful when it is tied to a specific business bottleneck. If calls are missed, leads wait too long, follow-up is inconsistent, or your team keeps copying data between tools, there is likely a strong automation opportunity. The best first system is usually narrow, measurable, and connected to revenue or time savings.",
    featuredImage: "assets/evergreen-ai-hero.png",
    youtubeUrl: ""
  },
  {
    id: "automation-map",
    title: "What an AI System Plan Should Include",
    excerpt: "A good plan names the workflow, tools, triggers, handoffs, owner, and expected business result.",
    content: "Before building, define the workflow from first trigger to final outcome. A strong AI system plan should include the data source, qualification logic, automation steps, human review points, measurement plan, and failure handling. That keeps the system simple on the front end and powerful behind the scenes.",
    featuredImage: "assets/evergreen-ai-hero.png",
    youtubeUrl: ""
  }
];

const fallbackFaqs = [
  {
    id: "starter-vs-growth",
    question: "What is the difference between Starter Setup and Growth Setup?",
    answer: "Starter Setup is for a clean professional presence with website, contact, booking, Google, email, SEO, hosting, and domain basics. Growth Setup adds more pages, stronger service presentation, advanced contact pathways, improved lead capture, and a stronger SEO foundation.",
    category: "Pricing",
    keywords: "starter growth setup pricing website booking seo lead capture"
  },
  {
    id: "ai-system-plan",
    question: "What happens after I submit the AI System Plan intake?",
    answer: "Your answers help identify the strongest workflow opportunities, current tool gaps, and first automation to build. Evergreen AI Link reviews the intake and follows up with recommended next steps when there is a strong fit.",
    category: "AI Setup",
    keywords: "ai system plan intake workflow automation recommendation"
  },
  {
    id: "foundation-first",
    question: "Why do I need a digital foundation before AI automation?",
    answer: "AI works best when your website, forms, booking, email, lead capture, and basic systems are already clear. Without that foundation, automation has nowhere reliable to send data or trigger next steps.",
    category: "Automation",
    keywords: "digital foundation systems before automation website forms booking"
  },
  {
    id: "ai-tools",
    question: "Which AI tools can be added later?",
    answer: "Available AI tools include AI Website Chat, Email Follow-Up, Appointment Assistant, Lead Qualifier, FAQ Assistant, and Workflow Automation.",
    category: "AI Setup",
    keywords: "ai website chat email follow-up appointment assistant lead qualifier faq workflow"
  }
];

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const field = (record, key, fallback = "") => record.fields?.[key] ?? record[key] ?? fallback;

const imageField = (record) => {
  const attachment = field(record, "Featured Image");
  if (Array.isArray(attachment)) return attachment[0]?.url || "assets/evergreen-ai-hero.png";
  if (typeof attachment === "string" && attachment) return attachment;
  return field(record, "Featured Image URL", "assets/evergreen-ai-hero.png");
};

async function fetchAirtable(tableName) {
  const airtable = config.airtable || {};
  if (!airtable.baseId || !airtable.token) return null;

  const url = `https://api.airtable.com/v0/${airtable.baseId}/${encodeURIComponent(tableName)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${airtable.token}` }
  });

  if (!response.ok) throw new Error(`Airtable ${tableName} request failed`);
  const data = await response.json();
  return data.records || [];
}

async function getServices() {
  try {
    const records = await fetchAirtable(config.airtable?.servicesTable || "Services");
    if (!records) return fallbackServices;
    return records.map((record) => ({
      id: record.id,
      name: field(record, "Name"),
      summary: field(record, "Summary"),
      description: field(record, "Description"),
      outcome: field(record, "Outcome"),
      price: field(record, "Price")
    }));
  } catch {
    return fallbackServices;
  }
}

async function getPosts() {
  try {
    const records = await fetchAirtable(config.airtable?.blogTable || "Blog");
    if (!records) return fallbackPosts;
    return records.map((record) => ({
      id: record.id,
      title: field(record, "Title"),
      excerpt: field(record, "Excerpt"),
      content: field(record, "Content"),
      featuredImage: imageField(record),
      youtubeUrl: field(record, "YouTube URL")
    }));
  } catch {
    return fallbackPosts;
  }
}

async function getFaqs() {
  try {
    const records = await fetchAirtable(config.airtable?.faqTable || "FAQ");
    if (!records) return fallbackFaqs;
    return records
      .map((record) => ({
        id: record.id,
        question: field(record, "Question"),
        answer: field(record, "Answer"),
        category: field(record, "Category", "General"),
        keywords: field(record, "Keywords"),
        active: field(record, "Active", true),
        sortOrder: field(record, "Sort Order", 0)
      }))
      .filter((faq) => faq.active !== false && faq.question && faq.answer)
      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
  } catch {
    return fallbackFaqs;
  }
}

function youtubeEmbed(url) {
  if (!url) return "";
  const match = String(url).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

function setBookingLinks() {
  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    link.href = config.bookingUrl || BOOKING_URL;
  });
}

function renderServices(container, services, limit) {
  if (!container) return;
  const items = limit ? services.slice(0, limit) : services;
  container.innerHTML = items
    .map((service) => {
      const slug = slugify(service.name || service.id);
      const href = ["starter-setup", "growth-setup"].includes(slug)
        ? `ai-ready-business-setup.html?service=${encodeURIComponent(slug)}`
        : `service.html?service=${encodeURIComponent(slug)}`;
      return `
        <article class="card service-card">
          <p class="eyebrow">${service.price || "AI automation"}</p>
          <h3>${service.name}</h3>
          <p>${service.summary}</p>
          <a class="text-link" href="${href}">Request This Service</a>
        </article>
      `;
    })
    .join("");
}

function renderPosts(container, posts, limit) {
  if (!container) return;
  const items = limit ? posts.slice(0, limit) : posts;
  container.innerHTML = items
    .map((post) => {
      const slug = slugify(post.title || post.id);
      return `
        <article class="card post-card">
          <img src="${post.featuredImage || "assets/evergreen-ai-hero.png"}" alt="">
          <div>
            <p class="eyebrow">Evergreen Notes</p>
            <h3>${post.title}</h3>
            <p>${post.excerpt || String(post.content || "").slice(0, 140)}</p>
            <a class="text-link" href="post.html?post=${encodeURIComponent(slug)}">Read article</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function bindAiReady() {
  const checklist = document.querySelector("[data-ai-ready]");
  if (!checklist) return;

  const countNode = checklist.querySelector("[data-ready-count]");
  const update = () => {
    const count = checklist.querySelectorAll("input:checked").length;
    countNode.textContent = count ? `${count} signal${count === 1 ? "" : "s"} found` : "No signals selected";
    checklist.classList.toggle("is-active", count > 0);
  };

  checklist.querySelectorAll("input").forEach((input) => input.addEventListener("change", update));
  update();
}

async function bindContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    const payload = Object.fromEntries(new FormData(form).entries());
    status.textContent = "Sending...";

    try {
      if (config.airtable?.leadsWebhookUrl) {
        await fetch(config.airtable.leadsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else if (config.airtable?.baseId && config.airtable?.token) {
        await fetch(`https://api.airtable.com/v0/${config.airtable.baseId}/${encodeURIComponent(config.airtable.leadsTable || "Leads")}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.airtable.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ fields: payload })
        });
      } else {
        localStorage.setItem("evergreen-last-lead", JSON.stringify({ ...payload, savedAt: new Date().toISOString() }));
      }

      form.reset();
      status.textContent = "Thanks. We received your message and will follow up shortly.";
    } catch {
      status.textContent = "Something blocked the submission. Please email hello@evergreenailink.com.";
    }
  });
}

function bindN8nForm() {
  const form = document.querySelector("[data-n8n-form]");
  const frame = document.querySelector("[data-n8n-embed]");
  const params = new URLSearchParams(window.location.search);
  const selectedService = params.get("service") || "";

  document.querySelectorAll("[data-selected-service]").forEach((input) => {
    input.value = selectedService;
  });

  if (frame) {
    const configuredUrl = frame.dataset.formUrl || config.n8n?.embedUrl;
    if (configuredUrl) {
      frame.src = selectedService ? `${configuredUrl}?service=${encodeURIComponent(selectedService)}` : configuredUrl;
    }
    frame.hidden = false;
  }

  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    const payload = Object.fromEntries(new FormData(form).entries());
    status.textContent = "Building your request...";

    try {
      if (config.n8n?.intakeWebhookUrl) {
        await fetch(config.n8n.intakeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        localStorage.setItem("evergreen-last-system-plan", JSON.stringify({ ...payload, savedAt: new Date().toISOString() }));
      }

      form.reset();
      status.textContent = "Your AI System Plan request is in. We will review the workflow and reply with next steps.";
    } catch {
      status.textContent = "The automation endpoint did not respond. Please try again or book a call.";
    }
  });
}

function renderFaqs(container, faqs) {
  if (!container) return;
  container.innerHTML = faqs
    .map((faq) => `
      <article class="faq-item" data-faq-item data-search-text="${[faq.question, faq.answer, faq.category, faq.keywords].join(" ").toLowerCase()}">
        <button class="faq-question" type="button" aria-expanded="false">
          <span>${faq.question}</span>
          <span>+</span>
        </button>
        <div class="faq-answer">
          <p class="eyebrow">${faq.category || "General"}</p>
          <p>${faq.answer}</p>
        </div>
      </article>
    `)
    .join("");

  container.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest("[data-faq-item]");
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      item.classList.toggle("is-open", !expanded);
    });
  });
}

function bindFaqSearch() {
  const input = document.querySelector("[data-faq-search]");
  const count = document.querySelector("[data-faq-count]");
  if (!input) return;

  const update = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    document.querySelectorAll("[data-faq-item]").forEach((item) => {
      const haystack = item.dataset.searchText || "";
      const match = terms.every((term) => haystack.includes(term));
      item.hidden = !match;
      if (match) visible += 1;
    });
    if (count) count.textContent = `${visible} answer${visible === 1 ? "" : "s"} found`;
  };

  input.addEventListener("input", update);
  update();
}

async function renderDynamicPages() {
  const [services, posts, faqs] = await Promise.all([getServices(), getPosts(), getFaqs()]);
  renderServices(document.querySelector("[data-services]"), services, Number(document.querySelector("[data-services]")?.dataset.limit || 0));
  renderPosts(document.querySelector("[data-posts]"), posts, Number(document.querySelector("[data-posts]")?.dataset.limit || 0));
  renderFaqs(document.querySelector("[data-faqs]"), faqs);
  bindFaqSearch();

  const serviceDetail = document.querySelector("[data-service-detail]");
  if (serviceDetail) {
    const slug = new URLSearchParams(window.location.search).get("service");
    const service = services.find((item) => slugify(item.name || item.id) === slug) || services[0];
    document.title = `${service.name} | Evergreen AI Link`;
    document.querySelectorAll("[data-service-name]").forEach((node) => (node.textContent = service.name));
    document.querySelectorAll("[data-selected-service]").forEach((node) => (node.value = service.name));
    serviceDetail.innerHTML = `
      <p class="eyebrow">Request This Service</p>
      <h1>${service.name}</h1>
      <p class="lead">${service.summary}</p>
      <p class="price">${service.price || "Custom build"}</p>
      <div class="detail-grid">
        <div><strong>What it does</strong><p>${service.description}</p></div>
        <div><strong>Expected outcome</strong><p>${service.outcome}</p></div>
      </div>
    `;
  }

  const postDetail = document.querySelector("[data-post-detail]");
  if (postDetail) {
    const slug = new URLSearchParams(window.location.search).get("post");
    const post = posts.find((item) => slugify(item.title || item.id) === slug) || posts[0];
    const embed = youtubeEmbed(post.youtubeUrl);
    document.title = `${post.title} | Evergreen AI Link`;
    postDetail.innerHTML = `
      <p class="eyebrow">Evergreen Notes</p>
      <h1>${post.title}</h1>
      <img class="post-hero" src="${post.featuredImage || "assets/evergreen-ai-hero.png"}" alt="">
      ${embed ? `<iframe class="video" src="${embed}" title="${post.title}" allowfullscreen></iframe>` : ""}
      <div class="article-copy">${String(post.content || "").split("\n").map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setBookingLinks();
  bindAiReady();
  bindContactForm();
  bindN8nForm();
  renderDynamicPages();
});
