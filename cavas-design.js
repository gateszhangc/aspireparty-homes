(() => {
  const brandCanvas = document.getElementById("brand-canvas");
  const favicon = document.getElementById("dynamic-favicon");
  const heroCanvas = document.getElementById("hero-canvas");

  const palette = {
    ink: "#0f1117",
    panel: "#faf9f6",
    cream: "#f0ede5",
    emerald: "#059669",
    blue: "#2563eb",
    red: "#dc2626",
    gold: "#d97706",
    muted: "#78716c",
  };

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function drawLogo(target) {
    const size = target.width;
    const ctx = target.getContext("2d");
    const s = size / 112;
    ctx.save();
    ctx.scale(s, s);
    ctx.clearRect(0, 0, 112, 112);

    // Background circle
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.arc(56, 56, 56, 0, Math.PI * 2);
    ctx.fill();

    // Stylized "A" shape - representing Aspire
    ctx.fillStyle = palette.emerald;
    ctx.beginPath();
    ctx.moveTo(56, 14);
    ctx.lineTo(92, 84);
    ctx.lineTo(78, 84);
    ctx.lineTo(68, 62);
    ctx.lineTo(44, 62);
    ctx.lineTo(34, 84);
    ctx.lineTo(20, 84);
    ctx.closePath();
    ctx.fill();

    // Arrow accent - forward motion
    ctx.fillStyle = palette.gold;
    ctx.beginPath();
    ctx.moveTo(62, 44);
    ctx.lineTo(82, 56);
    ctx.lineTo(62, 68);
    ctx.lineTo(62, 60);
    ctx.lineTo(42, 60);
    ctx.lineTo(42, 52);
    ctx.lineTo(62, 52);
    ctx.closePath();
    ctx.fill();

    // Accent dot
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(56, 56, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawHeroScene() {
    if (!heroCanvas) return;
    const rect = heroCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    heroCanvas.width = Math.max(600, Math.floor(rect.width * dpr));
    heroCanvas.height = Math.max(400, Math.floor(rect.height * dpr));

    const ctx = heroCanvas.getContext("2d");
    const width = heroCanvas.width;
    const height = heroCanvas.height;
    ctx.save();
    ctx.scale(width / 960, height / 640);
    ctx.clearRect(0, 0, 960, 640);

    // Background
    ctx.fillStyle = palette.panel;
    ctx.fillRect(0, 0, 960, 640);

    // Grid lines
    ctx.strokeStyle = "rgba(15,17,23,0.05)";
    ctx.lineWidth = 1;
    for (let x = 40; x < 960; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 640);
      ctx.stroke();
    }
    for (let y = 40; y < 640; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(960, y);
      ctx.stroke();
    }

    // Main card
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(15,17,23,0.12)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 16;
    roundRect(ctx, 60, 50, 840, 460, 12);
    ctx.fill();
    ctx.shadowColor = "transparent";

    // Card header bar
    ctx.fillStyle = palette.ink;
    roundRect(ctx, 60, 50, 840, 52, 12);
    ctx.fill();
    ctx.fillStyle = palette.ink;
    roundRect(ctx, 60, 78, 840, 24, 0);
    ctx.fill();

    // Three dots
    ctx.fillStyle = palette.red;
    ctx.beginPath();
    ctx.arc(98, 76, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = palette.gold;
    ctx.beginPath();
    ctx.arc(122, 76, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = palette.emerald;
    ctx.beginPath();
    ctx.arc(146, 76, 6, 0, Math.PI * 2);
    ctx.fill();

    // Title in card
    text(ctx, "Aspire Party — Dashboard", 180, 66, 18, 700, "#ffffff");

    // Left panel - mission
    ctx.fillStyle = "#f8f7f3";
    roundRect(ctx, 90, 130, 260, 340, 10);
    ctx.fill();

    text(ctx, "Our Mission", 110, 150, 16, 700);
    text(ctx, "Community Support", 110, 190, 13, 600, palette.muted);
    text(ctx, "£10M+", 110, 212, 28, 800, palette.emerald);
    text(ctx, "distributed in support", 110, 242, 13, 600, palette.emerald);

    text(ctx, "Youth Centres", 110, 280, 13, 600, palette.muted);
    text(ctx, "20+", 110, 302, 28, 800, palette.ink);
    text(ctx, "One in every ward", 110, 332, 11, 500, palette.muted);

    text(ctx, "Affordable Homes", 110, 370, 13, 600, palette.muted);
    text(ctx, "6,000+", 110, 392, 28, 800, palette.blue);

    // Right panel - initiative cards
    const initiatives = [
      ["Education", palette.blue, "Free School Meals", "38,000+ students"],
      ["Safety", palette.red, "CCTV Upgrades", "350 new cameras"],
      ["Environment", palette.emerald, "Waste Investment", "£15M invested"],
      ["Community", palette.gold, "Resident Surgeries", "200-300 monthly"],
    ];

    initiatives.forEach(([name, color, sub, stat], i) => {
      const y = 130 + i * 80;
      ctx.fillStyle = "#f8f7f3";
      roundRect(ctx, 380, y, 490, 68, 10);
      ctx.fill();

      ctx.fillStyle = color;
      roundRect(ctx, 400, y + 14, 12, 40, 4);
      ctx.fill();

      text(ctx, name, 428, y + 18, 15, 700);
      text(ctx, sub, 428, y + 40, 13, 500, palette.muted);

      ctx.fillStyle = palette.emerald;
      roundRect(ctx, 750, y + 14, 100, 40, 6);
      ctx.fill();
      text(ctx, stat, 762, y + 24, 13, 700, "#ffffff");
    });

    ctx.restore();
  }

  function text(ctx, value, x, y, size, weight = 700, color = palette.ink) {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px Inter, system-ui, sans-serif`;
    ctx.textBaseline = "top";
    ctx.fillText(value, x, y);
  }

  if (brandCanvas) drawLogo(brandCanvas);

  if (favicon) {
    const icon = document.createElement("canvas");
    icon.width = 112;
    icon.height = 112;
    drawLogo(icon);
    favicon.href = icon.toDataURL("image/png");
  }

  drawHeroScene();
  window.addEventListener("resize", drawHeroScene);
})();
