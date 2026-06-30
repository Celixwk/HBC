import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore
import jsPDF from 'jspdf';
// @ts-ignore
import autoTable from 'jspdf-autotable';
import {
  TrendingUp, TrendingDown, Loader2, RefreshCw, AlertCircle,
  BarChart2, DollarSign, ShoppingCart, Zap, ArrowUpRight, ArrowDownRight,
  CalendarDays, Table2, FileText
} from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { apiFetch } from '../../utils/apiFetch';
import './Reportes.css';

const fmt    = (n: number) => Math.round(n).toLocaleString('es-CO', { minimumFractionDigits: 0 });
const pct    = (n: number) => (n >= 0 ? '+' : '') + n.toFixed(1) + '%';
const fmtPDF = (v: number) => `$${Math.round(v).toLocaleString('es-CO')}`;

// jsPDF con Helvetica no soporta UTF-8: normaliza acentos y elimina no-ASCII
const spdf = (s: string): string =>
  (s || '')
    .replace(/↓|↳|↳|→/g, '>')  // flechas Unicode → >
    .replace(/—|–/g, '-')                  // guiones tipográficos → -
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')       // strip diacríticos (á→a, ó→o…)
    .replace(/[^\x20-\x7E]/g, '');         // eliminar cualquier otro no-ASCII

const inicioMes = () => { const d = new Date(); d.setDate(1); return d.toISOString().slice(0, 10); };
const finMes    = () => new Date().toISOString().slice(0, 10);

type Tab = 'pnl' | 'anual';
type C3  = [number, number, number];

const HBC = {
  verdeOscuro: [27,  64,  24]  as C3,
  verde:       [39,  107, 34]  as C3,
  verdeClaro:  [52,  140, 46]  as C3,
  dorado:      [176, 128, 30]  as C3,
  doradoClaro: [196, 151, 60]  as C3,
  cardBg:      [248, 250, 252] as C3,
  trackBg:     [218, 226, 234] as C3,
  rowWhite:    [255, 255, 255] as C3,
  rowAlt:      [241, 247, 241] as C3,
  rowTot:      [228, 242, 228] as C3,
  rowRed:      [255, 242, 242] as C3,
  textDark:    [22,  32,  46]  as C3,
  textMid:     [75,  95,  115] as C3,
  textMuted:   [145, 163, 182] as C3,
  border:      [205, 215, 226] as C3,
  blanco:      [248, 250, 252] as C3,
  rojo:        [180, 40,  40]  as C3,
};

export const Reportes: React.FC = () => {
  const [tab, setTab]         = useState<Tab>('pnl');
  // Persiste el rango en localStorage para que no se reinicie al navegar
  const [desde, setDesde]     = useState(() => localStorage.getItem('hbc_rep_desde') || inicioMes());
  const [hasta, setHasta]     = useState(() => localStorage.getItem('hbc_rep_hasta') || finMes());
  const [pnl, setPnl]         = useState<any>(null);
  const [meses, setMeses]     = useState<any[]>([]);
  const [anual, setAnual]     = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [catAbierta, setCatAbierta] = useState<string | null>(null);

  // Guardar rango en localStorage cada vez que cambia
  useEffect(() => { localStorage.setItem('hbc_rep_desde', desde); }, [desde]);
  useEffect(() => { localStorage.setItem('hbc_rep_hasta', hasta); }, [hasta]);

  const fetchReporte = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [pRes, mRes, aRes] = await Promise.all([
        apiFetch(`/reportes/pnl?desde=${desde}&hasta=${hasta}`),
        apiFetch('/reportes/meses?meses=6'),
        apiFetch('/reportes/anual')
      ]);
      if (pRes.ok) setPnl(await pRes.json());
      else { const d = await pRes.json(); throw new Error(d.error); }
      if (mRes.ok) setMeses(await mRes.json());
      if (aRes.ok) setAnual(await aRes.json());
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [desde, hasta]);

  useEffect(() => { fetchReporte(); }, [fetchReporte]);

  // ── Exportar Excel del período ────────────────────────────────────────
  const exportarExcel = () => {
    if (!pnl) return;
    const fecha = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' });
    const S = {
      hdr1: 'background:#1B4018;color:#F8FAFC;font-size:15pt;font-weight:bold;padding:10px 14px',
      hdr2: 'background:#1B4018;color:#DCB464;font-size:10pt;padding:5px 14px',
      sec:  'background:#2D6B28;color:#FFF;font-weight:bold;font-size:10pt;padding:6px 12px',
      b:    'border:1px solid #CDD7E2;padding:5px 10px',
    };
    const td = (c: string, s: string) => `<td style="${s}">${c}</td>`;
    const row = (label: string, value: string, color: string, note = '') => `<tr>
      ${td(label, `${S.b};background:#F8FAFC;color:#4B5F73;padding-left:18px`)}
      ${td(value, `${S.b};background:#F8FAFC;color:${color};font-weight:bold;font-size:11pt`)}
      ${td(note, `${S.b};background:#F8FAFC;color:#91A3B6;font-size:9pt`)}
    </tr>`;

    const gastosRows = Object.entries(pnl.gastos.operativos.porCategoria as Record<string, any>)
      .map(([cat, data]: [string, any]) => row(cat, fmtPDF(data.total), '#B42828', `${data.items.length} registro(s)`)).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>body{font-family:Calibri,Arial,sans-serif}table{border-collapse:collapse}td{white-space:nowrap}</style>
</head><body><table>
<tr>${td('HOTEL BOUTIQUE — REPORTE FINANCIERO', S.hdr1)}<td style="${S.hdr1}" colspan="2"></td></tr>
<tr>${td(`Período: ${desde} al ${hasta}`, S.hdr2)}<td style="${S.hdr2}" colspan="2"></td></tr>
<tr>${td(`Generado: ${fecha}`, 'background:#1B4018;color:#94A3B8;font-size:9pt;padding:4px 14px')}<td style="background:#1B4018" colspan="2"></td></tr>
<tr><td colspan="3" style="height:10px"></td></tr>
<tr>${td('INGRESOS', S.sec)}<td style="${S.sec}" colspan="2"></td></tr>
${row('Hospedaje', fmtPDF(pnl.ingresos.hospedaje), '#276B22')}
${row('Consumos y servicios', fmtPDF(pnl.ingresos.consumos), '#B0801E')}
${pnl.ingresos.pendientes > 0 ? row('Pendientes de cobro', fmtPDF(pnl.ingresos.pendientes), '#94A3B8', 'No incluido en total') : ''}
<tr>${td('TOTAL INGRESOS', `${S.b};background:#F1F7F1;color:#1B4018;font-weight:bold;padding-left:18px`)}
${td(fmtPDF(pnl.ingresos.total), `${S.b};background:#F1F7F1;color:#1B4018;font-weight:bold;font-size:13pt`)}
<td style="${S.b};background:#F1F7F1"></td></tr>
<tr><td colspan="3" style="height:10px"></td></tr>
<tr>${td('GASTOS', S.sec)}<td style="${S.sec}" colspan="2"></td></tr>
${gastosRows}
${pnl.gastos.inventario.costoCompras > 0 ? row('Compras de inventario', fmtPDF(pnl.gastos.inventario.costoCompras), '#B42828') : ''}
<tr>${td('TOTAL GASTOS', `${S.b};background:#FFF2F2;color:#B42828;font-weight:bold;padding-left:18px`)}
${td(fmtPDF(pnl.gastos.total), `${S.b};background:#FFF2F2;color:#B42828;font-weight:bold;font-size:13pt`)}
<td style="${S.b};background:#FFF2F2"></td></tr>
<tr><td colspan="3" style="height:10px"></td></tr>
<tr>${td('RESULTADO NETO', `${S.b};background:${pnl.resumen.utilidadNeta >= 0 ? '#E4F2E4' : '#FFE4E4'};color:${pnl.resumen.utilidadNeta >= 0 ? '#1B4018' : '#B42828'};font-weight:bold;font-size:13pt;padding-left:18px`)}
${td(fmtPDF(pnl.resumen.utilidadNeta), `${S.b};background:${pnl.resumen.utilidadNeta >= 0 ? '#E4F2E4' : '#FFE4E4'};color:${pnl.resumen.utilidadNeta >= 0 ? '#276B22' : '#B42828'};font-weight:bold;font-size:14pt`)}
${td(`Margen: ${pct(pnl.resumen.margenNeto)}`, `${S.b};background:${pnl.resumen.utilidadNeta >= 0 ? '#E4F2E4' : '#FFE4E4'};color:#64748B`)}</tr>
<tr><td colspan="3" style="height:10px"></td></tr>
<tr><td colspan="3" style="color:#64748B;font-size:8pt;font-style:italic;padding:4px 10px">Sistema de Gestión — Hotel Boutique · HBC</td></tr>
</table></body></html>`;

    const blob = new Blob(['﻿' + html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `reporte-financiero-hbc-${desde}-${hasta}.xls`; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Exportar PDF del período ──────────────────────────────────────────
  const exportarPDF = () => {
    if (!pnl) return;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, M = 14;

    // Header
    doc.setFillColor(...HBC.verdeOscuro); doc.rect(0, 0, W, 52, 'F');
    doc.setFillColor(...HBC.dorado);      doc.rect(0, 0, 5, 52, 'F');
    doc.setFillColor(...HBC.verde); doc.roundedRect(W - 28, 9, 20, 10, 2, 2, 'F');
    doc.setTextColor(255,255,255); doc.setFontSize(8); doc.setFont('helvetica','bold');
    doc.text('HBC', W - 18, 15.5, { align: 'center' });
    doc.setFontSize(18); doc.setFont('helvetica','bold'); doc.setTextColor(...HBC.blanco);
    doc.text(spdf('Hotel Boutique - Reporte Financiero'), M - 1, 20);
    doc.setFontSize(10); doc.setFont('helvetica','normal'); doc.setTextColor(...HBC.doradoClaro);
    doc.text(spdf(`Periodo: ${desde}  -  ${hasta}`), M - 1, 30);
    doc.setFontSize(8); doc.setTextColor(185,200,215);
    doc.text(spdf(`Generado el ${new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'})}`), M - 1, 39);
    doc.setDrawColor(...HBC.doradoClaro); doc.setLineWidth(0.6); doc.line(M-1, 46, W-M+1, 46);

    // KPI Cards
    const kpiY = 58, cardW = (W - 2*M - 9) / 4;
    const kpis = [
      { label:'TOTAL INGRESOS',  value: fmtPDF(pnl.resumen.totalIngresos), sub:'Periodo',               accent: HBC.verde },
      { label:'TOTAL GASTOS',    value: fmtPDF(pnl.resumen.totalGastos),   sub:'Operativos+Inventario',  accent: HBC.rojo },
      { label:'UTILIDAD NETA',   value: fmtPDF(Math.abs(pnl.resumen.utilidadNeta)),
        sub: pnl.resumen.utilidadNeta < 0 ? 'Perdida' : 'Ganancia',
        accent: pnl.resumen.utilidadNeta >= 0 ? HBC.verde : HBC.rojo },
      { label:'MARGEN NETO',     value: pct(pnl.resumen.margenNeto), sub:'Sobre ingresos',
        accent: pnl.resumen.margenNeto >= 0 ? HBC.verde : HBC.rojo },
    ];
    kpis.forEach((kpi, i) => {
      const x = M + i * (cardW + 3);
      doc.setFillColor(220,228,236); doc.roundedRect(x+1, kpiY+1, cardW, 28, 2, 2, 'F');
      doc.setFillColor(...HBC.cardBg);  doc.roundedRect(x, kpiY, cardW, 28, 2, 2, 'F');
      doc.setFillColor(...kpi.accent);  doc.roundedRect(x, kpiY, cardW, 4, 2, 2, 'F');
      doc.rect(x, kpiY+2, cardW, 2, 'F');
      doc.setFontSize(6); doc.setFont('helvetica','bold'); doc.setTextColor(...HBC.textMuted); doc.text(kpi.label, x+5, kpiY+11);
      doc.setFontSize(9); doc.setFont('helvetica','bold'); doc.setTextColor(...kpi.accent);   doc.text(kpi.value, x+5, kpiY+20);
      doc.setFontSize(6); doc.setFont('helvetica','normal'); doc.setTextColor(...HBC.textMuted); doc.text(kpi.sub, x+5, kpiY+25.5);
    });

    // Gráfico 6 meses
    if (meses.length > 0) {
      const chartY = 96;
      doc.setFontSize(8.5); doc.setFont('helvetica','bold'); doc.setTextColor(...HBC.textMid);
      doc.text('COMPARATIVO ÚLTIMOS 6 MESES', M, chartY);
      doc.setDrawColor(...HBC.verde); doc.setLineWidth(0.5); doc.line(M, chartY+1.5, M+66, chartY+1.5);
      const barAreaX = M+30, barValueW = 32, barAreaW = W-M-barAreaX-barValueW;
      const maxVal = Math.max(...meses.map((m:any) => Math.max(m.ingresos, m.gastos)), 1);
      const barH = 5, barGap = 3, barStartY = chartY + 8;
      meses.forEach((m:any, i:number) => {
        const y = barStartY + i*(barH+barGap);
        doc.setFontSize(7); doc.setFont('helvetica','normal'); doc.setTextColor(...HBC.textDark);
        doc.text(spdf(m.mes), M, y+barH-0.5);
        doc.setFillColor(...HBC.trackBg); doc.roundedRect(barAreaX, y, barAreaW, barH, 1, 1, 'F');
        const ingW = Math.max((m.ingresos/maxVal)*barAreaW, 0);
        if (ingW>0.5) { doc.setFillColor(...HBC.verdeClaro); doc.roundedRect(barAreaX, y, ingW, barH, 1, 1, 'F'); }
        const gasW = Math.max((m.gastos/maxVal)*barAreaW, 0);
        if (gasW>0.5) { doc.setFillColor(200,60,60); doc.roundedRect(barAreaX, y+barH*0.55, gasW, barH*0.45, 0.5, 0.5, 'F'); }
        const utColor: C3 = m.utilidad >= 0 ? HBC.verde : HBC.rojo;
        doc.setFontSize(7); doc.setFont('helvetica','bold'); doc.setTextColor(...utColor);
        doc.text(`${m.utilidad>=0?'+':''}${fmtPDF(m.utilidad)}`, W-M, y+barH-0.5, {align:'right'});
      });
    }

    // Tabla ingresos
    const ingY = meses.length > 0 ? 160 : 98;
    doc.setFontSize(8.5); doc.setFont('helvetica','bold'); doc.setTextColor(...HBC.textMid);
    doc.text('DETALLE DE INGRESOS', M, ingY);
    doc.setDrawColor(...HBC.verde); doc.setLineWidth(0.5); doc.line(M, ingY+1.5, M+50, ingY+1.5);

    const catConsumos = Object.entries(pnl.ingresos.consumosPorCategoria as Record<string, number>);
    const ingRows: any[] = [
      [spdf('Hospedaje (reservas pagadas)'), fmtPDF(pnl.ingresos.hospedaje)],
      ...(catConsumos.length > 0
        ? catConsumos.map(([cat, val]) => [spdf(`  > ${cat}`), fmtPDF(val as number)])
        : pnl.ingresos.consumos > 0 ? [[spdf('Consumos y servicios'), fmtPDF(pnl.ingresos.consumos)]] : []),
      [spdf('TOTAL INGRESOS'), fmtPDF(pnl.ingresos.total)]
    ];
    autoTable(doc, {
      startY: ingY+5,
      head: [['Concepto','Monto']],
      body: ingRows,
      styles: { fontSize:8.5, cellPadding:{top:4,bottom:4,left:7,right:7}, textColor:HBC.textDark, fillColor:HBC.rowWhite, lineColor:HBC.border, lineWidth:0.2 },
      headStyles: { fillColor:HBC.verde, textColor:[255,255,255] as C3, fontStyle:'bold' },
      alternateRowStyles: { fillColor:HBC.rowAlt },
      columnStyles: { 0:{cellWidth:130}, 1:{halign:'right', textColor:HBC.verde, fontStyle:'bold'} },
      willDrawCell: (data:any) => { if (data.row.index===ingRows.length-1 && data.section==='body') doc.setFillColor(...HBC.rowTot); },
      margin: { left:M, right:M },
    });

    // Tabla gastos
    const afterIng = (doc as any).lastAutoTable?.finalY || (ingY+60);
    const gasY = afterIng + 8;
    if (gasY < 255) {
      doc.setFontSize(8.5); doc.setFont('helvetica','bold'); doc.setTextColor(...HBC.textMid);
      doc.text('DETALLE DE GASTOS', M, gasY);
      doc.setDrawColor(180,40,40); doc.setLineWidth(0.5); doc.line(M, gasY+1.5, M+46, gasY+1.5);
      const gasRows: any[] = [
        ...Object.entries(pnl.gastos.operativos.porCategoria as Record<string,any>).map(([cat,data]:[string,any]) => [spdf(cat), fmtPDF(data.total)]),
        ...(pnl.gastos.inventario.costoCompras>0 ? [[spdf('Compras de inventario'), fmtPDF(pnl.gastos.inventario.costoCompras)]] : []),
        [spdf('TOTAL GASTOS'), fmtPDF(pnl.gastos.total)]
      ];
      autoTable(doc, {
        startY: gasY+5,
        head: [['Categoría','Monto']],
        body: gasRows,
        styles: { fontSize:8.5, cellPadding:{top:4,bottom:4,left:7,right:7}, textColor:HBC.textDark, fillColor:HBC.rowWhite, lineColor:HBC.border, lineWidth:0.2 },
        headStyles: { fillColor:[140,30,30] as C3, textColor:[255,255,255] as C3, fontStyle:'bold' },
        alternateRowStyles: { fillColor:HBC.rowRed },
        columnStyles: { 0:{cellWidth:130}, 1:{halign:'right', textColor:HBC.rojo, fontStyle:'bold'} },
        willDrawCell: (data:any) => { if (data.row.index===gasRows.length-1 && data.section==='body') doc.setFillColor(255,210,210); },
        margin: { left:M, right:M },
      });

      // Resultado neto
      const resultY = (doc as any).lastAutoTable?.finalY + 8;
      if (resultY < 270) {
        const pos = pnl.resumen.utilidadNeta >= 0;
        doc.setFillColor(...(pos ? [232,247,232] as C3 : [255,232,232] as C3));
        doc.roundedRect(M, resultY, W-2*M, 14, 2, 2, 'F');
        doc.setDrawColor(...(pos ? HBC.verde : HBC.rojo)); doc.setLineWidth(0.5);
        doc.roundedRect(M, resultY, W-2*M, 14, 2, 2, 'S');
        doc.setFontSize(10); doc.setFont('helvetica','bold'); doc.setTextColor(...(pos ? HBC.verde : HBC.rojo));
        doc.text(spdf('RESULTADO NETO DEL PERIODO'), M+6, resultY+9);
        doc.text(fmtPDF(pnl.resumen.utilidadNeta), W-M-6, resultY+9, {align:'right'});
      }
    }

    // Footer
    const pageH = doc.internal.pageSize.getHeight();
    doc.setFillColor(...HBC.verdeOscuro); doc.rect(0, pageH-12, W, 12, 'F');
    doc.setFillColor(...HBC.dorado);      doc.rect(0, pageH-12, 5, 12, 'F');
    doc.setFontSize(7); doc.setFont('helvetica','normal'); doc.setTextColor(185,200,215);
    doc.text('Hotel Boutique Campestre - HBC · Sistema de Gestion', 12, pageH-4);
    doc.setTextColor(...HBC.doradoClaro);
    doc.text(String(new Date().getFullYear()), W-12, pageH-4, {align:'right'});
    doc.save(`reporte-financiero-hbc-${desde}-${hasta}.pdf`);
  };

  // ── Exportar Excel Anual ──────────────────────────────────────────────
  const exportarExcelAnual = () => {
    if (!anual) return;
    const { meses: mesesAnuales, totales, anio } = anual;
    const fecha = new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'long',year:'numeric'});
    const S = {
      hdr1:'background:#1B4018;color:#F8FAFC;font-size:15pt;font-weight:bold;padding:10px 14px',
      hdr2:'background:#1B4018;color:#DCB464;font-size:10pt;padding:5px 14px',
      sec: 'background:#2D6B28;color:#FFF;font-weight:bold;font-size:10pt;padding:6px 12px',
      th:  'background:#1B4018;color:#FFF;font-weight:bold;font-size:9pt;border:1px solid #1B4018;padding:6px 10px',
      thR: 'background:#1B4018;color:#FFF;font-weight:bold;font-size:9pt;text-align:right;border:1px solid #1B4018;padding:6px 10px',
      thC: 'background:#1B4018;color:#FFF;font-weight:bold;font-size:9pt;text-align:center;border:1px solid #1B4018;padding:6px 10px',
      b:   'border:1px solid #CDD7E2;padding:5px 10px',
    };
    const td = (c:string, s:string) => `<td style="${s}">${c}</td>`;
    const dataRows = mesesAnuales.map((m:any, i:number) => {
      const bg = i%2===1?'#F1F7F1':'#FFFFFF';
      const uc = m.utilidad>=0?'#276B22':'#B42828';
      return `<tr>
        ${td(m.mes,`${S.b};background:${bg};color:#16202E;font-weight:bold`)}
        ${td(fmtPDF(m.hospedaje),`${S.b};background:${bg};color:#276B22;text-align:right`)}
        ${td(fmtPDF(m.consumos),`${S.b};background:${bg};color:#B0801E;text-align:right`)}
        ${td(fmtPDF(m.totalIngresos),`${S.b};background:${bg};color:#276B22;font-weight:bold;text-align:right`)}
        ${td(fmtPDF(m.totalGastos),`${S.b};background:${bg};color:#B42828;text-align:right`)}
        ${td(fmtPDF(m.utilidad),`${S.b};background:${bg};color:${uc};font-weight:bold;text-align:right`)}
        ${td(String(m.numReservas),`${S.b};background:${bg};color:#4B5F73;text-align:center`)}
      </tr>`;
    }).join('');
    const html=`<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>body{font-family:Calibri,Arial,sans-serif}table{border-collapse:collapse}td,th{white-space:nowrap}</style>
</head><body><table>
<tr>${td(`HOTEL BOUTIQUE — INFORME ANUAL ${anio}`,S.hdr1)}<td style="${S.hdr1}" colspan="6"></td></tr>
<tr>${td(`Generado: ${fecha}`,S.hdr2)}<td style="${S.hdr2}" colspan="6"></td></tr>
<tr><td colspan="7" style="height:10px"></td></tr>
<tr>${td('DETALLE MENSUAL',S.sec)}<td style="${S.sec}" colspan="6"></td></tr>
<tr><th style="${S.th};min-width:140px">Mes</th><th style="${S.thR};min-width:120px">Hospedaje</th>
<th style="${S.thR};min-width:120px">Consumos</th><th style="${S.thR};min-width:120px">Ingresos</th>
<th style="${S.thR};min-width:120px">Gastos</th><th style="${S.thR};min-width:120px">Utilidad</th>
<th style="${S.thC};min-width:80px">Reservas</th></tr>
${dataRows}
<tr>
${td('TOTAL',`${S.b};background:#E4F2E4;color:#16202E;font-weight:bold`)}
${td(fmtPDF(totales.hospedaje),`${S.b};background:#E4F2E4;color:#276B22;font-weight:bold;text-align:right`)}
${td(fmtPDF(totales.consumos),`${S.b};background:#E4F2E4;color:#B0801E;font-weight:bold;text-align:right`)}
${td(fmtPDF(totales.totalIngresos),`${S.b};background:#E4F2E4;color:#1B4018;font-weight:bold;font-size:11pt;text-align:right`)}
${td(fmtPDF(totales.totalGastos),`${S.b};background:#FFE4E4;color:#B42828;font-weight:bold;font-size:11pt;text-align:right`)}
${td(fmtPDF(totales.utilidad),`${S.b};background:${totales.utilidad>=0?'#E4F2E4':'#FFE4E4'};color:${totales.utilidad>=0?'#276B22':'#B42828'};font-weight:bold;font-size:11pt;text-align:right`)}
${td(String(totales.numReservas),`${S.b};background:#E4F2E4;color:#4B5F73;font-weight:bold;text-align:center`)}
</tr>
<tr><td colspan="7" style="color:#64748B;font-size:8pt;font-style:italic;padding:4px 10px">Sistema de Gestión — Hotel Boutique · HBC</td></tr>
</table></body></html>`;
    const blob=new Blob(['﻿'+html],{type:'application/vnd.ms-excel;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=`informe-anual-hbc-${anual.anio}.xls`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!pnl && loading) return (
    <div className="reportes-container">
      <div style={{display:'flex',justifyContent:'center',padding:'80px'}}>
        <Loader2 size={28} className="animate-spin" style={{color:'var(--primary)'}} />
      </div>
    </div>
  );

  const maxBar = meses.length > 0 ? Math.max(...meses.map((m:any) => Math.max(m.ingresos, m.gastos))) : 1;

  return (
    <div className="reportes-container">
      {/* Header */}
      <div className="rep-header">
        <div>
          <h2 className="page-title">Reporte Financiero</h2>
          <p className="page-subtitle">Ingresos, gastos y utilidad — para reuniones con propietarios</p>
        </div>
        <div className="rep-header-actions">
          {tab === 'pnl' && pnl && <>
            <Button variant="ghost" size="sm" onClick={exportarExcel} title="Exportar Excel del período"><Table2 size={14} /> Excel</Button>
            <Button variant="ghost" size="sm" onClick={exportarPDF}   title="Exportar PDF del período"><FileText size={14} /> PDF</Button>
          </>}
          {tab === 'anual' && anual && (
            <Button variant="ghost" size="sm" onClick={exportarExcelAnual} title="Exportar Excel anual"><Table2 size={14} /> Excel Anual</Button>
          )}
          <Button variant="ghost" size="sm" onClick={fetchReporte} disabled={loading}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </Button>
        </div>
      </div>

      {error && <div className="rep-alert"><AlertCircle size={13} />{error}</div>}

      {/* Tabs */}
      <div className="rep-tabs">
        <button className={`rep-tab ${tab==='pnl' ? 'active' : ''}`} onClick={() => setTab('pnl')}>
          <BarChart2 size={15} /> P&amp;L del Período
        </button>
        <button className={`rep-tab ${tab==='anual' ? 'active' : ''}`} onClick={() => setTab('anual')}>
          <CalendarDays size={15} /> Resumen Anual
        </button>
      </div>

      {/* ══ TAB: P&L ══ */}
      {tab === 'pnl' && (
        <>
          <div className="glass-panel rep-periodo">
            <div className="rep-periodo-inputs">
              <div><label>Desde</label>
                <input type="date" className="filter-input" value={desde} onChange={e=>setDesde(e.target.value)} />
              </div>
              <div><label>Hasta</label>
                <input type="date" className="filter-input" value={hasta} onChange={e=>setHasta(e.target.value)} />
              </div>
              <Button variant="primary" size="sm" onClick={fetchReporte} disabled={loading}>
                {loading ? <Loader2 size={14} className="animate-spin" /> : 'Generar'}
              </Button>
            </div>
          </div>

          {pnl && (
            <>
              <div className="rep-kpis">
                <div className="rep-kpi ingresos">
                  <div className="kpi-icon"><DollarSign size={20}/></div>
                  <div>
                    <div className="kpi-label">Total Ingresos</div>
                    <div className="kpi-valor">${fmt(pnl.resumen.totalIngresos)}</div>
                    {pnl.ingresos.pendientes > 0 && <div className="kpi-sub">+ ${fmt(pnl.ingresos.pendientes)} pendientes</div>}
                  </div>
                </div>
                <div className="rep-kpi gastos">
                  <div className="kpi-icon"><ShoppingCart size={20}/></div>
                  <div>
                    <div className="kpi-label">Total Gastos</div>
                    <div className="kpi-valor">${fmt(pnl.resumen.totalGastos)}</div>
                    <div className="kpi-sub">operativos + inventario</div>
                  </div>
                </div>
                <div className={`rep-kpi ${pnl.resumen.utilidadNeta>=0?'utilidad-pos':'utilidad-neg'}`}>
                  <div className="kpi-icon">{pnl.resumen.utilidadNeta>=0?<TrendingUp size={20}/>:<TrendingDown size={20}/>}</div>
                  <div>
                    <div className="kpi-label">Utilidad Neta</div>
                    <div className="kpi-valor">${fmt(Math.abs(pnl.resumen.utilidadNeta))}</div>
                    <div className={`kpi-margen ${pnl.resumen.margenNeto>=0?'pos':'neg'}`}>{pct(pnl.resumen.margenNeto)} margen</div>
                  </div>
                </div>
                <div className="rep-kpi costo-ventas">
                  <div className="kpi-icon"><Zap size={20}/></div>
                  <div>
                    <div className="kpi-label">Costo de Ventas</div>
                    <div className="kpi-valor">${fmt(pnl.gastos.inventario.costoVentas)}</div>
                    <div className="kpi-sub">Ut. bruta: ${fmt(pnl.resumen.utilidadBruta)}</div>
                  </div>
                </div>
              </div>

              {meses.length > 0 && (
                <div className="glass-panel rep-chart-panel">
                  <div className="rep-section-title"><BarChart2 size={16}/> Comparativo últimos 6 meses</div>
                  <div className="rep-bars">
                    {meses.map((m:any) => (
                      <div key={m.mes} className="rep-bar-group">
                        <div className="rep-bar-pair">
                          <div className="rep-bar ingresos-bar" style={{height:`${Math.max(4,(m.ingresos/maxBar)*120)}px`}} title={`Ingresos: $${fmt(m.ingresos)}`}/>
                          <div className="rep-bar gastos-bar"   style={{height:`${Math.max(4,(m.gastos/maxBar)*120)}px`}}   title={`Gastos: $${fmt(m.gastos)}`}/>
                        </div>
                        <div className="rep-bar-label">{m.mes}</div>
                        <div className={`rep-bar-utilidad ${m.utilidad>=0?'pos':'neg'}`}>
                          {m.utilidad>=0?'+':''}${fmt(m.utilidad)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rep-bar-legend">
                    <span className="legend-ing">■ Ingresos</span>
                    <span className="legend-gas">■ Gastos</span>
                  </div>
                </div>
              )}

              <div className="rep-pnl-grid">
                {/* Ingresos */}
                <div className="glass-panel rep-pnl-col">
                  <div className="rep-section-title ingresos-title"><TrendingUp size={15}/> Ingresos del Período</div>
                  <div className="pnl-row pnl-sub"><span>Hospedaje (reservas pagadas)</span><span>${fmt(pnl.ingresos.hospedaje)}</span></div>
                  {Object.entries(pnl.ingresos.consumosPorCategoria as Record<string,number>).length > 0 ? (
                    <>
                      <div className="pnl-row pnl-sub"><span>Consumos y servicios</span><span>${fmt(pnl.ingresos.consumos)}</span></div>
                      {Object.entries(pnl.ingresos.consumosPorCategoria as Record<string,number>).map(([cat, val]) => (
                        <div key={cat} className="pnl-row pnl-item" style={{paddingLeft:'28px'}}>
                          <span>↳ {cat}</span><span>${fmt(val as number)}</span>
                        </div>
                      ))}
                    </>
                  ) : pnl.ingresos.consumos > 0 && (
                    <div className="pnl-row pnl-sub"><span>Consumos y servicios</span><span>${fmt(pnl.ingresos.consumos)}</span></div>
                  )}
                  {pnl.ingresos.pendientes > 0 && (
                    <div className="pnl-row pnl-pending"><span>Pendientes de cobro</span><span>${fmt(pnl.ingresos.pendientes)}</span></div>
                  )}
                  <div className="pnl-row pnl-total"><span>TOTAL INGRESOS</span><span>${fmt(pnl.ingresos.total)}</span></div>
                </div>

                {/* Gastos */}
                <div className="glass-panel rep-pnl-col">
                  <div className="rep-section-title gastos-title"><TrendingDown size={15}/> Gastos del Período</div>
                  {Object.entries(pnl.gastos.operativos.porCategoria as Record<string,any>).map(([cat,data]:[string,any]) => (
                    <div key={cat}>
                      <div className="pnl-row pnl-sub pnl-cat-row" onClick={()=>setCatAbierta(catAbierta===cat?null:cat)} style={{cursor:'pointer'}}>
                        <span>{cat}{data.items.length>0&&<span className="pnl-count"> ({data.items.length})</span>}</span>
                        <span>${fmt(data.total)}</span>
                      </div>
                      {catAbierta===cat&&data.items.map((item:any)=>(
                        <div key={item.id_gasto} className="pnl-row pnl-item">
                          <span>{item.descripcion}{item.comprobante?` (${item.comprobante})`:''}</span>
                          <span>${fmt(parseFloat(item.monto))}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  {pnl.gastos.inventario.costoCompras>0&&(
                    <div className="pnl-row pnl-sub"><span>Compras de inventario</span><span>${fmt(pnl.gastos.inventario.costoCompras)}</span></div>
                  )}
                  <div className="pnl-row pnl-total gastos-total"><span>TOTAL GASTOS</span><span>${fmt(pnl.gastos.total)}</span></div>
                  <div className={`pnl-row pnl-resultado ${pnl.resumen.utilidadNeta>=0?'resultado-pos':'resultado-neg'}`}>
                    <span>RESULTADO NETO</span><span>${fmt(pnl.resumen.utilidadNeta)}</span>
                  </div>
                </div>
              </div>

              {/* Desglose por Método de Pago */}
              {Object.keys(pnl.ingresos.porMetodoPago as Record<string,number>).length > 0 && (
                <div className="glass-panel" style={{padding:'20px'}}>
                  <div className="rep-section-title" style={{marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px'}}>
                    <DollarSign size={15}/> Ingresos por Método de Pago
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'12px'}}>
                    {Object.entries(pnl.ingresos.porMetodoPago as Record<string,number>).sort((a,b)=>b[1]-a[1]).map(([metodo, monto]) => {
                      const porcentaje = pnl.ingresos.total > 0 ? ((monto / pnl.ingresos.total) * 100).toFixed(1) : '0.0';
                      return (
                        <div key={metodo} style={{
                          background:'rgba(255,255,255,0.04)',
                          border:'1px solid var(--border-medium)',
                          borderRadius:'12px',
                          padding:'16px 20px',
                          minWidth:'160px',
                          flex:'1',
                          display:'flex',
                          flexDirection:'column',
                          gap:'6px'
                        }}>
                          <span style={{fontSize:'12px',color:'var(--text-muted)',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.05em'}}>{metodo}</span>
                          <span style={{fontSize:'20px',fontWeight:700,color:'#10b981'}}>${fmt(monto as number)}</span>
                          <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                            <div style={{flex:1,height:'4px',background:'var(--border-medium)',borderRadius:'2px'}}>
                              <div style={{width:`${porcentaje}%`,height:'100%',background:'#10b981',borderRadius:'2px'}}/>
                            </div>
                            <span style={{fontSize:'12px',color:'var(--text-muted)',minWidth:'36px'}}>{porcentaje}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {pnl.ingresos.detalle.length > 0 && (
                <div className="glass-panel" style={{padding:0,overflow:'hidden'}}>
                  <div className="rep-section-title" style={{padding:'16px 20px',borderBottom:'1px solid var(--border-light)'}}>
                    Detalle de Ingresos
                  </div>
                  <table className="rep-table">
                    <thead><tr><th>Fecha</th><th>Tipo</th><th>Descripción</th><th style={{textAlign:'right'}}>Monto</th></tr></thead>
                    <tbody>
                      {pnl.ingresos.detalle.map((d:any,i:number)=>(
                        <tr key={i}>
                          <td>{d.fecha?format(parseISO(d.fecha.slice(0,10)),'d MMM',{locale:es}):'—'}</td>
                          <td><span className={`rep-tipo-badge ${d.tipo==='Hospedaje'?'hospedaje':'consumo'}`}>{d.tipo}</span></td>
                          <td style={{fontSize:'0.83rem'}}>{d.descripcion}</td>
                          <td style={{textAlign:'right',fontWeight:600}}>${fmt(d.monto)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ══ TAB: Resumen Anual ══ */}
      {tab === 'anual' && (
        <>
          {loading && !anual ? (
            <div style={{display:'flex',justifyContent:'center',padding:'60px'}}>
              <Loader2 size={24} className="animate-spin" style={{color:'var(--primary)'}}/>
            </div>
          ) : anual && (
            <>
              {anual.comparativa && (
                <div className="rep-comparativa-grid">
                  <div className="glass-panel rep-comp-total">
                    <div style={{fontSize:'0.75rem',color:'var(--text-muted)',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>
                      Total Año {anual.anio}
                    </div>
                    <div style={{fontSize:'1.6rem',fontWeight:700,color:'var(--text-primary)'}}>
                      ${fmt(anual.totales.totalIngresos)}
                    </div>
                    <div style={{fontSize:'0.78rem',color:'var(--text-muted)',marginTop:'4px'}}>
                      ${fmt(anual.totales.hospedaje)} hospedaje · ${fmt(anual.totales.consumos)} consumos
                    </div>
                    <div style={{marginTop:'8px',fontSize:'0.78rem'}}>
                      <span style={{color:anual.totales.utilidad>=0?'#34d399':'#f87171',fontWeight:600}}>
                        Utilidad {anual.totales.utilidad>=0?'+':''}${fmt(anual.totales.utilidad)}
                      </span>
                      <span style={{color:'var(--text-muted)',marginLeft:'8px'}}>· {anual.totales.numReservas} reservas</span>
                    </div>
                  </div>

                  <div className="glass-panel rep-comp-card">
                    <div className="rep-comp-label">Hospedaje este mes</div>
                    <div className="rep-comp-value" style={{color:'#10b981'}}>${fmt(anual.comparativa.hospedajeActual)}</div>
                    <div className="rep-comp-sub">vs ${fmt(anual.comparativa.hospedajeAnterior)} mes anterior</div>
                    {anual.comparativa.variacionHospedaje!==null&&(
                      <div className={`rep-comp-var ${anual.comparativa.variacionHospedaje>=0?'pos':'neg'}`}>
                        {anual.comparativa.variacionHospedaje>=0?<ArrowUpRight size={13}/>:<ArrowDownRight size={13}/>}
                        {pct(anual.comparativa.variacionHospedaje)}
                      </div>
                    )}
                  </div>

                  <div className="glass-panel rep-comp-card">
                    <div className="rep-comp-label">Consumos este mes</div>
                    <div className="rep-comp-value" style={{color:'#f59e0b'}}>${fmt(anual.comparativa.consumosActual)}</div>
                    <div className="rep-comp-sub">vs ${fmt(anual.comparativa.consumosAnterior)} mes anterior</div>
                    {anual.comparativa.variacionConsumos!==null&&(
                      <div className={`rep-comp-var ${anual.comparativa.variacionConsumos>=0?'pos':'neg'}`}>
                        {anual.comparativa.variacionConsumos>=0?<ArrowUpRight size={13}/>:<ArrowDownRight size={13}/>}
                        {pct(anual.comparativa.variacionConsumos)}
                      </div>
                    )}
                  </div>

                  <div className="glass-panel rep-comp-card">
                    <div className="rep-comp-label">Total mes actual</div>
                    <div className="rep-comp-value">${fmt(anual.comparativa.mesActual)}</div>
                    <div className="rep-comp-sub">vs ${fmt(anual.comparativa.mesAnterior)} mes anterior</div>
                    {anual.comparativa.variacionIngresos!==null&&(
                      <div className={`rep-comp-var ${anual.comparativa.variacionIngresos>=0?'pos':'neg'}`}>
                        {anual.comparativa.variacionIngresos>=0?<ArrowUpRight size={13}/>:<ArrowDownRight size={13}/>}
                        {pct(anual.comparativa.variacionIngresos)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="glass-panel" style={{padding:0,overflow:'hidden'}}>
                <div className="rep-section-title" style={{padding:'16px 20px',borderBottom:'1px solid var(--border-light)'}}>
                  Historial {anual.anio} — Mes a Mes
                </div>
                <table className="rep-table">
                  <thead>
                    <tr>
                      <th>Mes</th>
                      <th style={{textAlign:'right'}}>Hospedaje</th>
                      <th style={{textAlign:'right'}}>Consumos</th>
                      <th style={{textAlign:'right'}}>Ingresos</th>
                      <th style={{textAlign:'right'}}>Gastos</th>
                      <th style={{textAlign:'right'}}>Utilidad</th>
                      <th style={{textAlign:'center'}}>Reservas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {anual.meses.map((m:any)=>(
                      <tr key={m.mes}>
                        <td style={{fontWeight:600}}>{m.mes}</td>
                        <td style={{textAlign:'right',color:'#10b981'}}>${fmt(m.hospedaje)}</td>
                        <td style={{textAlign:'right',color:'#f59e0b'}}>${fmt(m.consumos)}</td>
                        <td style={{textAlign:'right',fontWeight:600,color:'#10b981'}}>${fmt(m.totalIngresos)}</td>
                        <td style={{textAlign:'right',color:'#f87171'}}>${fmt(m.totalGastos)}</td>
                        <td style={{textAlign:'right',fontWeight:700,color:m.utilidad>=0?'#34d399':'#f87171'}}>
                          {m.utilidad>=0?'+':''}${fmt(m.utilidad)}
                        </td>
                        <td style={{textAlign:'center',color:'var(--text-muted)'}}>{m.numReservas}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{borderTop:'2px solid var(--border-medium)'}}>
                      <td style={{fontWeight:700,fontSize:'0.9rem'}}>TOTAL {anual.anio}</td>
                      <td style={{textAlign:'right',fontWeight:700,color:'#10b981'}}>${fmt(anual.totales.hospedaje)}</td>
                      <td style={{textAlign:'right',fontWeight:700,color:'#f59e0b'}}>${fmt(anual.totales.consumos)}</td>
                      <td style={{textAlign:'right',fontWeight:700,color:'#10b981',fontSize:'0.95rem'}}>${fmt(anual.totales.totalIngresos)}</td>
                      <td style={{textAlign:'right',fontWeight:700,color:'#f87171',fontSize:'0.95rem'}}>${fmt(anual.totales.totalGastos)}</td>
                      <td style={{textAlign:'right',fontWeight:700,fontSize:'0.95rem',color:anual.totales.utilidad>=0?'#34d399':'#f87171'}}>
                        {anual.totales.utilidad>=0?'+':''}${fmt(anual.totales.utilidad)}
                      </td>
                      <td style={{textAlign:'center',fontWeight:700,color:'var(--text-muted)'}}>{anual.totales.numReservas}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
