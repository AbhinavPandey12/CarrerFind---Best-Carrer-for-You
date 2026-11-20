import {
  RecommendedCareerResult,
  CareerSuitabilityEntry,
  PersonalCharacteristicsReview,
  UserCharacteristicDimension,
} from './assessmentEngine';

export interface AssessmentReportData {
  archetypeTitle: string;
  archetypeSubtitle: string;
  topCareers: RecommendedCareerResult[];
  allCareers: CareerSuitabilityEntry[];
  personalReview: PersonalCharacteristicsReview;
}

/**
 * Generates an SVG representation of the 10-dimension User Characteristics Radar Chart
 */
function generateRadarSvg(characteristics: UserCharacteristicDimension[]): string {
  const width = 420;
  const height = 360;
  const cx = 210;
  const cy = 180;
  const radius = 120;
  const total = characteristics.length;

  if (total === 0) return '';

  // Background concentric grid rings (2, 4, 6, 8, 10)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPolygons = rings
    .map((scale) => {
      const pts = characteristics
        .map((_, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
          const r = radius * scale;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');
      return `<polygon points="${pts}" fill="none" stroke="#e2e8f0" stroke-width="1" />`;
    })
    .join('');

  // Axis lines from center to outer points
  const axisLines = characteristics
    .map((_, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2 2" />`;
    })
    .join('');

  // User data polygon
  const dataPoints = characteristics.map((item, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
    const r = radius * Math.max(0.1, item.score / (item.fullMark || 10));
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y, item };
  });

  const polyPts = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const dataPolygon = `
    <polygon points="${polyPts}" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" stroke-width="2.5" />
    ${dataPoints
      .map(
        (p) =>
          `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#4f46e5" stroke="#ffffff" stroke-width="1.5" />`
      )
      .join('')}
  `;

  // Labels around the perimeter
  const labels = characteristics
    .map((item, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total;
      const labelRadius = radius + 24;
      const x = cx + labelRadius * Math.cos(angle);
      const y = cy + labelRadius * Math.sin(angle);

      let anchor = 'middle';
      if (Math.cos(angle) > 0.3) anchor = 'start';
      else if (Math.cos(angle) < -0.3) anchor = 'end';

      const shortName = item.dimension
        .replace('Orientation', 'Orient.')
        .replace('Interaction', 'Interact.');

      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#475569" dominant-baseline="central">${shortName} (${item.score}/10)</text>`;
    })
    .join('');

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${gridPolygons}
      ${axisLines}
      ${dataPolygon}
      ${labels}
    </svg>
  `;
}

/**
 * Builds the complete professional printable HTML document for the assessment report
 */
export function generateAssessmentReportHtml(data: AssessmentReportData): string {
  const { archetypeTitle, archetypeSubtitle, topCareers, allCareers, personalReview } = data;
  const characteristics = personalReview.characteristicsList || [];
  const radarSvg = generateRadarSvg(characteristics);
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Score bars HTML for user characteristics
  const characteristicBarsHtml = characteristics
    .map((c) => {
      const pct = Math.round((c.score / (c.fullMark || 10)) * 100);
      const barColor = pct >= 75 ? '#10b981' : pct >= 55 ? '#6366f1' : pct >= 40 ? '#f59e0b' : '#94a3b8';
      const badgeBg = pct >= 75 ? '#dcfce7' : pct >= 55 ? '#ede9fe' : pct >= 40 ? '#fef3c7' : '#f1f5f9';
      const badgeText = pct >= 75 ? '#15803d' : pct >= 55 ? '#6d28d9' : pct >= 40 ? '#b45309' : '#475569';

      return `
        <div style="margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; font-size: 11px;">
            <span style="font-weight: 600; color: #1e293b;">${c.dimension}</span>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; padding: 1px 6px; border-radius: 999px; background: ${badgeBg}; color: ${badgeText}; font-size: 9px; font-weight: 700; text-transform: uppercase;">${c.level}</span>
              <span style="font-weight: 800; color: #0f172a; font-size: 12px;">${c.score} / 10</span>
            </div>
          </div>
          <div style="background: #e2e8f0; border-radius: 6px; height: 7px; overflow: hidden;">
            <div style="width: ${pct}%; background: ${barColor}; height: 100%; border-radius: 6px;"></div>
          </div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">${c.description}</div>
        </div>
      `;
    })
    .join('');

  // Top career recommendations HTML
  const topCareersHtml = topCareers
    .slice(0, 10)
    .map((c, idx) => {
      const score = c.compatibilityScore;
      const scoreColor = score >= 85 ? '#059669' : score >= 70 ? '#4f46e5' : '#d97706';
      const rankBg = idx === 0 ? '#4f46e5' : idx <= 2 ? '#6366f1' : '#334155';

      const possessedHtml = (c.possessedSkills || [])
        .slice(0, 4)
        .map((s) => `<span style="display: inline-block; padding: 2px 8px; border-radius: 4px; background: #ecfdf5; color: #065f46; font-size: 10px; font-weight: 600; margin: 2px;">✓ ${s}</span>`)
        .join('');

      const missingHtml = (c.missingSkills || [])
        .slice(0, 3)
        .map((s) => `<span style="display: inline-block; padding: 2px 8px; border-radius: 4px; background: #fffbeb; color: #92400e; font-size: 10px; font-weight: 600; margin: 2px;">△ ${s}</span>`)
        .join('');

      return `
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 14px; background: ${idx === 0 ? '#f8fafc' : '#ffffff'}; page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 8px; background: ${rankBg}; color: white; font-weight: 800; font-size: 12px;">#${idx + 1}</span>
                <span style="font-size: 16px; font-weight: 800; color: #0f172a;">${c.title}</span>
                <span style="padding: 2px 8px; border-radius: 999px; background: #ede9fe; color: #6d28d9; font-size: 10px; font-weight: 700; text-transform: uppercase;">${c.category}</span>
              </div>
              <p style="font-size: 11.5px; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">${c.whyMatch}</p>

              <div style="margin-bottom: 8px;">
                ${possessedHtml ? `<div style="margin-bottom: 4px;"><strong style="font-size: 10px; color: #059669; text-transform: uppercase;">Skills You Have:</strong> ${possessedHtml}</div>` : ''}
                ${missingHtml ? `<div><strong style="font-size: 10px; color: #b45309; text-transform: uppercase;">Skills to Develop:</strong> ${missingHtml}</div>` : ''}
              </div>
            </div>

            <div style="text-align: center; min-width: 85px; padding: 10px 12px; background: #f1f5f9; border-radius: 10px; border: 1px solid #e2e8f0;">
              <div style="font-size: 26px; font-weight: 900; color: ${scoreColor}; line-height: 1;">${c.compatibilityScore}%</div>
              <div style="font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 4px; letter-spacing: 0.05em;">Suitability</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #f1f5f9; font-size: 10.5px; color: #475569;">
            <div>
              <span style="color: #64748b; font-size: 9px; text-transform: uppercase; font-weight: 600; display: block;">Entry Salary</span>
              <strong style="color: #0f172a;">$${c.entrySalaryMin}k–$${c.entrySalaryMax}k</strong>
            </div>
            <div>
              <span style="color: #64748b; font-size: 9px; text-transform: uppercase; font-weight: 600; display: block;">Senior Salary</span>
              <strong style="color: #0f172a;">$${c.seniorSalaryMin}k–$${c.seniorSalaryMax}k</strong>
            </div>
            <div>
              <span style="color: #64748b; font-size: 9px; text-transform: uppercase; font-weight: 600; display: block;">Work-Life Balance</span>
              <strong style="color: #059669;">${c.workLifeBalance} / 10</strong>
            </div>
            <div>
              <span style="color: #64748b; font-size: 9px; text-transform: uppercase; font-weight: 600; display: block;">Learning Difficulty</span>
              <strong style="color: #4f46e5;">${c.learningDifficulty} / 10</strong>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  // Key strengths, traits, drives lists
  const strengthsList = (personalReview.keyStrengths || [])
    .map((s) => `<li style="margin-bottom: 5px; font-size: 11.5px; color: #1e293b;"><strong style="color: #4f46e5;">✓</strong> ${s}</li>`)
    .join('');

  const traitsList = (personalReview.workStyleTraits || [])
    .map((t) => `<li style="margin-bottom: 5px; font-size: 11.5px; color: #1e293b;"><strong style="color: #10b981;">•</strong> ${t}</li>`)
    .join('');

  const inclinationsList = (personalReview.professionalInclinations || [])
    .map((p) => `<li style="margin-bottom: 5px; font-size: 11.5px; color: #1e293b;"><strong style="color: #f59e0b;">▸</strong> ${p}</li>`)
    .join('');

  const drivesHtml = (personalReview.coreDrives || [])
    .map((d) => `<span style="display: inline-block; padding: 4px 10px; border-radius: 999px; background: #ffe4e6; color: #be123c; font-size: 10.5px; font-weight: 700; margin: 3px;">❤️ ${d}</span>`)
    .join('');

  const avoidHtml = (personalReview.thingsToAvoid || [])
    .map((a) => `<span style="display: inline-block; padding: 4px 10px; border-radius: 999px; background: #f1f5f9; color: #475569; font-size: 10.5px; font-weight: 600; margin: 3px;">🚫 ${a}</span>`)
    .join('');

  // Suitability summary table (top 20)
  const summaryTableRows = allCareers
    .slice(0, 20)
    .map((c) => {
      const fcBg =
        c.fitCategory === 'Excellent Fit'
          ? '#dcfce7'
          : c.fitCategory === 'Good Fit'
          ? '#ede9fe'
          : c.fitCategory === 'Moderate Fit'
          ? '#fef3c7'
          : '#ffe4e6';
      const fcColor =
        c.fitCategory === 'Excellent Fit'
          ? '#15803d'
          : c.fitCategory === 'Good Fit'
          ? '#6d28d9'
          : c.fitCategory === 'Moderate Fit'
          ? '#b45309'
          : '#be123c';

      return `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 6px 8px; font-weight: 700; color: #64748b; font-size: 10px; text-align: center;">#${c.rank}</td>
          <td style="padding: 6px 8px; font-weight: 700; color: #0f172a; font-size: 11px;">${c.title}</td>
          <td style="padding: 6px 8px; color: #475569; font-size: 10px;">${c.category}</td>
          <td style="padding: 6px 8px; text-align: center;">
            <span style="display: inline-block; padding: 2px 7px; border-radius: 999px; background: ${fcBg}; color: ${fcColor}; font-size: 9px; font-weight: 700; text-transform: uppercase;">${c.fitCategory}</span>
          </td>
          <td style="padding: 6px 8px; text-align: right; font-weight: 800; color: #4f46e5; font-size: 11px;">${c.compatibilityScore}%</td>
        </tr>
      `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>CareerFind — Career Assessment Report</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 12mm 14mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 11.5px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    .report-container {
      max-width: 820px;
      margin: 0 auto;
    }
    .header-banner {
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%);
      color: white;
      padding: 24px 22px;
      border-radius: 14px;
      margin-bottom: 20px;
    }
    .logo-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
    .brand-title {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .brand-title span {
      color: #a5b4fc;
    }
    .report-date {
      font-size: 10px;
      color: #c7d2fe;
      font-weight: 500;
    }
    .archetype-title {
      font-size: 24px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 6px;
      letter-spacing: -0.01em;
    }
    .archetype-subtitle {
      font-size: 12px;
      color: #e0e7ff;
      line-height: 1.5;
      max-width: 650px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #1e1b4b;
      margin: 22px 0 10px 0;
      padding-bottom: 6px;
      border-bottom: 2px solid #ede9fe;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .summary-box {
      background: #f8fafc;
      border-left: 4px solid #6366f1;
      padding: 12px 14px;
      border-radius: 0 8px 8px 0;
      font-size: 11.5px;
      color: #334155;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
      background: #f8fafc;
    }
    .card-title {
      font-size: 11px;
      font-weight: 700;
      color: #4338ca;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
    }
    ul {
      list-style: none;
      padding-left: 0;
    }
    .radar-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 16px;
      align-items: center;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .table-container {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
    }
    th {
      background: #f1f5f9;
      color: #475569;
      font-weight: 700;
      text-align: left;
      padding: 8px;
      font-size: 10px;
      text-transform: uppercase;
      border-bottom: 1px solid #e2e8f0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 14px;
      border-top: 1px solid #e2e8f0;
      font-size: 9.5px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .page-break {
        page-break-before: always;
      }
    }
  </style>
</head>
<body>
  <div class="report-container">
    <!-- Header Banner -->
    <div class="header-banner">
      <div class="logo-row">
        <div class="brand-title">Career<span>Find</span></div>
        <div class="report-date">Generated on ${formattedDate}</div>
      </div>
      <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #a5b4fc; margin-bottom: 4px;">
        OFFICIAL CAREER ASSESSMENT REPORT
      </div>
      <div class="archetype-title">${archetypeTitle}</div>
      <div class="archetype-subtitle">${archetypeSubtitle}</div>
    </div>

    <!-- Section 1: Characteristics of the User -->
    <div>
      <div class="section-title">
        <span>👤</span> Characteristics of the User &amp; Personality Analysis
      </div>

      ${personalReview.summaryParagraph ? `<div class="summary-box">${personalReview.summaryParagraph}</div>` : ''}

      <!-- Visual Representation of User Characteristics (Radar Chart + Progress Bars) -->
      <div class="radar-container">
        <div style="display: flex; justify-content: center; align-items: center;">
          ${radarSvg}
        </div>
        <div>
          <div style="font-size: 11px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px;">
            Characteristics Across 10 Core Dimensions
          </div>
          ${characteristicBarsHtml}
        </div>
      </div>

      <!-- Strengths & Work Style Grid -->
      <div class="grid-2">
        <div class="card">
          <div class="card-title">⚡ Key Strengths</div>
          <ul>${strengthsList || '<li style="font-size: 11px; color: #64748b;">Comprehensive multi-disciplinary strengths</li>'}</ul>
        </div>
        <div class="card">
          <div class="card-title">🧠 Work Style Traits</div>
          <ul>${traitsList || '<li style="font-size: 11px; color: #64748b;">Adaptive work style across various settings</li>'}</ul>
        </div>
      </div>

      <!-- Working Preferences Grid -->
      <div class="grid-2">
        <div class="card">
          <div class="card-title">⚖️ Technical / Practical Balance</div>
          <div style="font-size: 11.5px; color: #1e293b; font-weight: 500;">
            ${personalReview.technicalPracticalBalance || 'Balanced across technical and practical dimensions'}
          </div>
        </div>
        <div class="card">
          <div class="card-title">🏢 Work Environment Preference</div>
          <div style="font-size: 11.5px; color: #1e293b; font-weight: 500;">
            ${personalReview.workEnvironmentPreference || 'Adaptable across remote, hybrid, and onsite settings'}
          </div>
        </div>
      </div>

      <!-- Professional Inclinations & Drives -->
      <div class="grid-2">
        <div class="card">
          <div class="card-title">🎯 Professional Inclinations</div>
          <ul>${inclinationsList || '<li style="font-size: 11px; color: #64748b;">Broad career exploration</li>'}</ul>
        </div>
        <div class="card">
          <div class="card-title">❤️ Core Professional Drives</div>
          <div style="margin-top: 4px;">${drivesHtml || '<span style="font-size: 11px; color: #64748b;">Meaningful impact and personal growth</span>'}</div>
        </div>
      </div>

      ${personalReview.thingsToAvoid && personalReview.thingsToAvoid.length > 0 ? `
      <div style="margin-top: 10px; margin-bottom: 20px;">
        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">
          Workplace Conditions &amp; Frustrations to Avoid
        </div>
        <div>${avoidHtml}</div>
      </div>
      ` : ''}
    </div>

    <!-- Section 2: Top Career Recommendations -->
    <div class="page-break" style="margin-top: 20px;">
      <div class="section-title">
        <span>⭐</span> Top Career Recommendations (Rankings &amp; Suitability)
      </div>
      <p style="font-size: 11px; color: #64748b; margin-bottom: 14px;">
        Based on your 21 dimensional assessment responses, the following career paths represent your strongest holistic matches.
      </p>

      ${topCareersHtml}
    </div>

    <!-- Section 3: Complete Suitability Overview -->
    <div style="margin-top: 24px; page-break-inside: avoid;">
      <div class="section-title">
        <span>📊</span> Suitability Analysis — Top 20 Career Rankings
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width: 45px; text-align: center;">Rank</th>
              <th>Career Title</th>
              <th>Category</th>
              <th style="text-align: center;">Fit Level</th>
              <th style="text-align: right; width: 75px;">Match %</th>
            </tr>
          </thead>
          <tbody>
            ${summaryTableRows}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div>CareerFind Intelligence Engine • Multi-Attribute Decision Analysis</div>
      <div>Confidential Assessment Report • © ${new Date().getFullYear()} CareerFind</div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Client-side trigger to generate and download the professionally formatted PDF report
 */
export function downloadAssessmentReportPdf(data: AssessmentReportData): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const htmlContent = generateAssessmentReportHtml(data);

      // Create an invisible iframe for reliable, popup-blocker-free printing to PDF
      const existingIframe = document.getElementById('careerfind-report-iframe');
      if (existingIframe) {
        document.body.removeChild(existingIframe);
      }

      const iframe = document.createElement('iframe');
      iframe.id = 'careerfind-report-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;
      if (!iframeDoc) {
        throw new Error('Unable to access iframe document');
      }

      // Set document title so browsers name the saved PDF appropriately
      const originalTitle = document.title;
      const reportTitle = `CareerFind_Assessment_Report_${data.archetypeTitle.replace(/[^a-zA-Z0-9]/g, '_')}`;
      document.title = reportTitle;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      const doPrint = () => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          document.title = originalTitle;
          resolve(true);
        } catch (printErr) {
          console.error('Iframe print error:', printErr);
          // Fallback: open clean print window
          const printWin = window.open('', '_blank');
          if (printWin) {
            printWin.document.write(htmlContent);
            printWin.document.close();
            printWin.focus();
            printWin.print();
          }
          document.title = originalTitle;
          resolve(true);
        }
      };

      // Allow 350ms for DOM layout and embedded SVG rendering before triggering print
      setTimeout(doPrint, 350);
    } catch (err) {
      console.error('Failed to trigger assessment report print/PDF download:', err);
      resolve(false);
    }
  });
}
