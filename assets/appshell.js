// Reusable AppShell (sidebar + topbar) — injected into authenticated pages
window.renderAppShell = function ({ active, tier = 'gov', mainHTML }) {
  const tierConfig = {
    gov: { label: 'Government · Premium', cls: 'tier-gov', org: 'وزارة الصحة', initial: 'ص', role: 'مدير الإعلام' },
    channel: { label: 'Channel · Enterprise', cls: 'tier-channel', org: 'MBC News', initial: 'M', role: 'محرر أخبار' },
    journalist: { label: 'Journalist · Pro', cls: 'tier-journalist', org: 'صحيفة الرياض', initial: 'ص', role: 'صحفي مستقل' },
    influencer: { label: 'Creator · Social', cls: 'tier-influencer', org: 'صانع محتوى', initial: 'م', role: 'مؤثر' },
  }[tier];

  const navItems = [
    { key: 'dashboard', href: 'dashboard.html', icon: 'layout-dashboard', label: 'لوحة التحكم' },
    { key: 'library', href: 'library.html', icon: 'library', label: 'مكتبة الأخبار', badge: '12,847' },
    { key: 'ai-studio', href: 'ai-studio.html', icon: 'sparkles', label: 'استوديو AI' },
    { key: 'export', href: 'export.html', icon: 'download', label: 'مركز التصدير' },
  ];
  const govOnly = [
    { key: 'media-center', href: 'media-center.html', icon: 'building-2', label: 'المركز الإعلامي' },
    { key: 'network', href: '#', icon: 'users', label: 'شبكة الصحفيين' },
  ];
  const reportsItem = { key: 'reports', href: 'reports.html', icon: 'bar-chart-3', label: 'تقارير الأثر' };

  const navHTML = navItems.map(it => `
    <a href="${it.href}" class="nav-item ${active === it.key ? 'active' : ''}">
      <svg data-lucide="${it.icon}"></svg>
      <span>${it.label}</span>
      ${it.badge ? `<span class="nav-badge">${it.badge}</span>` : ''}
    </a>
  `).join('');

  const govHTML = (tier === 'gov') ? `
    <div class="nav-group-label">خاص بالجهات الحكومية</div>
    ${govOnly.map(it => `
      <a href="${it.href}" class="nav-item ${active === it.key ? 'active' : ''}">
        <svg data-lucide="${it.icon}"></svg>
        <span>${it.label}</span>
      </a>
    `).join('')}
    <a href="${reportsItem.href}" class="nav-item ${active === reportsItem.key ? 'active' : ''}">
      <svg data-lucide="${reportsItem.icon}"></svg><span>${reportsItem.label}</span>
    </a>
  ` : (tier === 'channel' ? `
    <div class="nav-group-label">خاص بالقنوات</div>
    <a href="reports.html" class="nav-item ${active === 'reports' ? 'active' : ''}">
      <svg data-lucide="bar-chart-3"></svg><span>تقارير الاستخدام</span>
    </a>
    <a href="#" class="nav-item"><svg data-lucide="users"></svg><span>فريق القناة</span></a>
  ` : '');

  const settingsHTML = `
    <div class="nav-group-label">الإعدادات</div>
    <a href="#" class="nav-item"><svg data-lucide="settings"></svg><span>الإعدادات</span></a>
    <a href="#" class="nav-item"><svg data-lucide="palette"></svg><span>الهوية البصرية</span></a>
    <a href="#" class="nav-item"><svg data-lucide="life-buoy"></svg><span>الدعم</span></a>
  `;

  const shellHTML = `
    <div class="wire-ticker" id="topWire"></div>
    <div class="app">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <a href="index.html" class="logo logo-sm">
            <span class="logo-mark"></span>
            <span>Rawi Press</span>
          </a>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-group-label">المنصة</div>
          ${navHTML}
          ${govHTML}
          ${settingsHTML}
        </nav>
        <div class="sidebar-footer">
          <div class="avatar">${tierConfig.initial}</div>
          <div style="flex:1; min-width:0">
            <div style="font-size:13px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${tierConfig.org}</div>
            <div style="font-size:11px; color:var(--text-muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${tierConfig.role}</div>
          </div>
          <button class="btn-icon" title="القائمة"><svg data-lucide="more-horizontal" style="width:16px;height:16px"></svg></button>
        </div>
      </aside>
      <div style="min-width:0">
        <div class="topbar">
          <button class="btn-icon" title="بحث"><svg data-lucide="search" style="width:16px;height:16px"></svg></button>
          <div class="input-wrap" style="flex:1; max-width:520px">
            <input class="input" placeholder="ابحث في المكتبة، الأحداث، الصحفيين..." style="height:36px"/>
          </div>
          <div style="flex:1"></div>
          <span class="tier-badge ${tierConfig.cls}">${tierConfig.label}</span>
          <button class="btn-icon" title="المفضلة"><svg data-lucide="bookmark" style="width:16px;height:16px"></svg></button>
          <button class="btn-icon" title="الإشعارات" style="position:relative">
            <svg data-lucide="bell" style="width:16px;height:16px"></svg>
            <span style="position:absolute; top:6px; right:6px; width:6px; height:6px; border-radius:50%; background:var(--rawi-red)"></span>
          </button>
          <button class="btn-icon" title="تبديل الوضع" onclick="RawiPress.toggleTheme()"><svg data-lucide="moon" style="width:16px;height:16px"></svg></button>
          <div style="height:24px; width:1px; background:var(--border); margin:0 4px"></div>
          <span class="lang-toggle" style="font-family:var(--f-mono); font-size:11px; color:var(--text-muted); display:inline-flex; gap:2px">
            <a href="#" style="color:var(--rawi-red); padding:2px 6px; font-weight:600">AR</a>
            <span style="opacity:.3">/</span>
            <a href="#" style="color:var(--text-muted); padding:2px 6px">EN</a>
            <span style="opacity:.3">/</span>
            <a href="#" style="color:var(--text-muted); padding:2px 6px">UR</a>
          </span>
        </div>
        <main class="main">${mainHTML}</main>
      </div>
    </div>
  `;
  document.getElementById('app-root').innerHTML = shellHTML;
  buildWireTicker(document.getElementById('topWire'));
  if (window.lucide) lucide.createIcons();
};
