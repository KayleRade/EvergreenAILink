const portalConfig = window.EVERGREEN_CONFIG || {};

const demoClient = {
  businessName: "Evergreen Demo Co.",
  contactName: "Client Preview",
  readinessScore: 78,
  recommendedPackage: "Growth Setup",
  packagePrice: "$1,100",
  automationRecommendation: "Start with lead response, appointment reminders, and FAQ automation.",
  summary: "Your business has a strong foundation opportunity. The biggest near-term wins are faster response times, cleaner lead capture, and reducing repeated admin work.",
  roi: {
    monthlyLaborCost: 2400,
    monthlySavings: 1280,
    missedLeadValue: 1800,
    paybackMonths: 0.7,
    annualRoi: 286
  }
};

const demoAdmin = {
  clients: 42,
  newSignups: 8,
  serviceRequests: 6,
  callsBooked: 5,
  intakeSubmissions: 13,
  dailyActivity: [4, 7, 5, 11, 8, 13, 10],
  recentClients: [
    ["Bright Studio", "Growth Setup", "AI ready score 82", "New"],
    ["Local Wellness Co.", "AI Agent/Tool", "Lead response", "Reviewing"],
    ["Greenline Services", "Starter Setup", "Foundation first", "Contacted"]
  ]
};

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

function getSupabaseClient() {
  if (!window.supabase || !portalConfig.supabase?.url || !portalConfig.supabase?.anonKey) return null;
  return window.supabase.createClient(portalConfig.supabase.url, portalConfig.supabase.anonKey);
}

async function handleAuthForm() {
  const form = document.querySelector("[data-auth-form]");
  if (!form) return;
  const mode = form.dataset.authForm;
  const status = form.querySelector("[data-form-status]");
  const supabase = getSupabaseClient();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    status.textContent = supabase ? "Working..." : "Supabase is not connected yet. This is a preview form.";
    if (!supabase) return;

    const response = mode === "register"
      ? await supabase.auth.signUp({ email: data.email, password: data.password, options: { data: { full_name: data.name, business_name: data.business_name } } })
      : await supabase.auth.signInWithPassword({ email: data.email, password: data.password });

    if (response.error) {
      status.textContent = response.error.message;
      return;
    }
    window.location.href = mode === "admin" ? "admin.html" : "client-portal.html";
  });
}

function renderClientDashboard() {
  const root = document.querySelector("[data-client-dashboard]");
  if (!root) return;
  root.innerHTML = `
    <div class="portal-grid stats-grid">
      <article class="metric-card"><span>AI readiness score</span><strong>${demoClient.readinessScore}/100</strong></article>
      <article class="metric-card"><span>Recommended package</span><strong>${demoClient.recommendedPackage}</strong></article>
      <article class="metric-card"><span>Projected monthly benefit</span><strong>${money(demoClient.roi.monthlySavings + demoClient.roi.missedLeadValue)}</strong></article>
      <article class="metric-card"><span>Estimated payback</span><strong>${demoClient.roi.paybackMonths} mo.</strong></article>
    </div>
    <div class="portal-grid two">
      <section class="portal-panel">
        <h2>Evaluation Summary</h2>
        <p>${demoClient.summary}</p>
        <ul class="feature-list">
          <li>${demoClient.automationRecommendation}</li>
          <li>Estimated monthly labor cost: ${money(demoClient.roi.monthlyLaborCost)}</li>
          <li>Estimated missed lead value: ${money(demoClient.roi.missedLeadValue)}</li>
          <li>Estimated 12-month ROI: ${demoClient.roi.annualRoi}%</li>
        </ul>
      </section>
      <section class="portal-panel">
        <h2>Next Steps</h2>
        <ol class="step-stack">
          <li>Review your AI readiness results.</li>
          <li>Book a consultation to confirm workflow priorities.</li>
          <li>Choose a setup or automation package.</li>
          <li>Connect the tools needed for implementation.</li>
        </ol>
      </section>
    </div>
  `;
}

function bindCheckoutLinks() {
  const checkoutMap = {
    starter: portalConfig.stripe?.starterSetupCheckoutUrl,
    growth: portalConfig.stripe?.growthSetupCheckoutUrl,
    agent: portalConfig.stripe?.aiAgentCheckoutUrl,
    consultation: portalConfig.bookingUrl
  };

  document.querySelectorAll("[data-checkout]").forEach((link) => {
    const url = checkoutMap[link.dataset.checkout];
    if (url) link.href = url;
  });
}

function renderAdminDashboard() {
  const root = document.querySelector("[data-admin-dashboard]");
  if (!root) return;
  root.innerHTML = `
    <div class="portal-grid stats-grid">
      <article class="metric-card"><span>Total clients</span><strong>${demoAdmin.clients}</strong></article>
      <article class="metric-card"><span>New signups</span><strong>${demoAdmin.newSignups}</strong></article>
      <article class="metric-card"><span>Service requests</span><strong>${demoAdmin.serviceRequests}</strong></article>
      <article class="metric-card"><span>Calls booked</span><strong>${demoAdmin.callsBooked}</strong></article>
    </div>
    <section class="portal-panel">
      <h2>Daily Activity</h2>
      <div class="bar-chart">${demoAdmin.dailyActivity.map((value, index) => `<span style="--bar:${value * 7}%"><em>${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</em></span>`).join("")}</div>
    </section>
    <section class="portal-panel">
      <h2>Recent Client Activity</h2>
      <div class="data-table">
        ${demoAdmin.recentClients.map((row) => `<div>${row.map((cell) => `<span>${cell}</span>`).join("")}</div>`).join("")}
      </div>
    </section>
    <div class="portal-grid two">
      <section class="portal-panel"><h2>Content Management</h2><p>FAQ, blog posts, footer social links, and site settings will connect to Supabase tables.</p></section>
      <section class="portal-panel"><h2>Operations Queue</h2><p>New service requests, calls booked, and intake results will appear here once n8n writes to Supabase.</p></section>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  handleAuthForm();
  renderClientDashboard();
  renderAdminDashboard();
  bindCheckoutLinks();
});
