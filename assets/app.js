const config = window.EVERGREEN_CONFIG || {};

const fallbackServices = [
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

function youtubeEmbed(url) {
  if (!url) return "";
  const match = String(url).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

function setBookingLinks() {
  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    link.href = config.bookingUrl || "#contact";
  });
}

function renderServices(container, services, limit) {
  if (!container) return;
  const items = limit ? services.slice(0, limit) : services;
  container.innerHTML = items
    .map((service) => {
      const slug = slugify(service.name || service.id);
      return `
        <article class="card service-card">
          <p class="eyebrow">${service.price || "AI automation"}</p>
          <h3>${service.name}</h3>
          <p>${service.summary}</p>
          <a class="text-link" href="service.html?service=${encodeURIComponent(slug)}">Request This Service</a>
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

  if (frame && config.n8n?.embedUrl) {
    frame.src = selectedService ? `${config.n8n.embedUrl}?service=${encodeURIComponent(selectedService)}` : config.n8n.embedUrl;
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

async function renderDynamicPages() {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  renderServices(document.querySelector("[data-services]"), services, Number(document.querySelector("[data-services]")?.dataset.limit || 0));
  renderPosts(document.querySelector("[data-posts]"), posts, Number(document.querySelector("[data-posts]")?.dataset.limit || 0));

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
