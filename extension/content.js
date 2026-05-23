// Deltax Extension Prototype - Content Script
let btnInjected = false;

function injectDeltaxButton() {
    if (document.getElementById('deltax-leak-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'deltax-leak-btn';
    btn.textContent = 'Check for Leaks';
    
    // Clicking the button injects the UI Alert Prototype from previous batch
    btn.onclick = () => {
        deltaxInjectCorrection();
    };

    document.body.appendChild(btn);
    btnInjected = true;
}

function removeDeltaxButton() {
    const btn = document.getElementById('deltax-leak-btn');
    if (btn) {
        btn.remove();
        btnInjected = false;
    }
}

// Simulated Deltax Injection Logic (matches the UI Spec from Batch 2)
function deltaxInjectCorrection() {
    // Prevent duplicate alert cards
    if(document.getElementById('deltax-alert-card')) {
        return;
    }

    const card = document.createElement('div');
    card.id = 'deltax-alert-card';
    card.className = "w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden font-sans fixed top-24 right-8 z-50 deltax-tailwind";
    
    // Use the exact HTML provided in the UI spec
    card.innerHTML = \`
      <!-- Header -->
      <div class="px-4 py-3 bg-blue-50 border-b border-gray-200 flex justify-between items-center" style="background-color: #EFF6FF; border-bottom: 1px solid #E5E7EB;">
        <h3 class="text-sm font-semibold text-blue-900" style="color: #1E3A8A; font-weight: 600; font-size: 0.875rem; margin:0;">Deltax Fiscal Alert</h3>
        <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full" style="background-color: #DBEAFE; color: #1E40AF; border-radius: 9999px; padding: 0.25rem 0.5rem; font-size: 0.75rem;">Meal Delta</span>
      </div>
      
      <!-- Deduction Comparison -->
      <div class="p-4" style="padding: 1rem; background: #fff;">
        <!-- Current Unoptimized -->
        <div class="flex justify-between items-end mb-4" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1rem;">
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wide" style="color: #6B7280; font-size: 0.75rem; text-transform: uppercase; margin:0; letter-spacing: 0.025em;">Current Claim</p>
            <p class="text-lg font-medium text-gray-900 line-through" style="color: #111827; font-size: 1.125rem; font-weight: 500; text-decoration: line-through; margin:0;">€25.00</p>
          </div>
          <span class="text-xs text-red-500 font-medium" style="color: #EF4444; font-size: 0.75rem; font-weight: 500;">Audit Risk</span>
        </div>
        
        <!-- Optimized Delta -->
        <div class="flex justify-between items-end p-3 bg-emerald-50 rounded-md border border-emerald-100" style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0.75rem; background-color: #ECFDF5; border: 1px solid #D1FAE5; border-radius: 0.375rem;">
          <div>
            <p class="text-xs text-emerald-600 uppercase tracking-wide font-semibold" style="color: #059669; font-size: 0.75rem; text-transform: uppercase; font-weight: 600; margin:0;">Max Legal Delta</p>
            <p class="text-2xl font-bold text-emerald-600" style="color: #059669; font-size: 1.5rem; font-weight: 700; margin:0;">€14.85</p>
          </div>
          <span class="text-xs text-emerald-600 font-medium" style="color: #059669; font-size: 0.75rem; font-weight: 500;">Secured</span>
        </div>
      </div>

      <!-- Logic / Formula -->
      <div class="px-4 py-2 bg-gray-50 border-t border-b border-gray-200" style="padding: 0.5rem 1rem; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB;">
        <p class="text-xs text-gray-500 text-center" style="color: #6B7280; font-size: 0.75rem; text-align: center; margin:0;">
          Formula: <span class="font-mono text-gray-700" style="color: #374151; font-family: monospace;">€20.20 (max) - €5.35 (base)</span>
        </p>
      </div>
      
      <!-- Actions -->
      <div class="p-4" style="padding: 1rem; background: #fff;">
        <button id="deltax-dismiss" class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" style="width: 100%; padding: 0.5rem 1rem; background-color: #3B82F6; color: #fff; font-size: 0.875rem; font-weight: 600; border-radius: 0.25rem; border: none; cursor: pointer;">
          Optimize Deduction
        </button>
      </div>
    \`;

    document.body.appendChild(card);
    
    document.getElementById('deltax-dismiss').onclick = () => {
        card.remove();
    };
}

// Function to check URL and inject/remove button
function checkUrl() {
    if (window.location.pathname.includes('/transactions')) {
        injectDeltaxButton();
    } else {
        removeDeltaxButton();
    }
}

// Run check on load
checkUrl();

// Listen to message from background.js (for SPA transitions)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'url_changed') {
        checkUrl();
    }
});

// Fallback observer in case history API doesn't catch all internal pushState routes
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    checkUrl();
  }
}).observe(document, {subtree: true, childList: true});
