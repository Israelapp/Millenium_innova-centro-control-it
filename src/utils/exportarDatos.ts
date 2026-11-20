import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  HeadingLevel,
  PageOrientation,
} from 'docx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { EntradaTaller } from '../type/control-it';
import type { LlamadaTaller } from '../hook/useLLamada';

function obtenerFechaArchivo(): string {
  return new Date().toISOString().slice(0, 10);
}

function esLlamada(item: EntradaTaller | LlamadaTaller): item is LlamadaTaller {
  return 'telefono' in item && 'motivo' in item;
}

function crearCelda(texto: string, esCabecera = false): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: texto || '—',
            bold: esCabecera,
            size: esCabecera ? 19 : 18,
          }),
        ],
      }),
    ],
    width: { size: 0, type: WidthType.AUTO },
  });
}

export async function exportarWord(
  registros: (EntradaTaller | LlamadaTaller)[],
  titulo: string,
  nombreBase: string
): Promise<void> {
  if (registros.length === 0) return;

  const fecha = obtenerFechaArchivo();
  const esLlamadaVista = esLlamada(registros[0]);

  const cabeceras = esLlamadaVista
    ? ['ID', 'Fecha', 'Cliente', 'Teléfono', 'Empresa', 'Prioridad', 'Técnico', 'Estado', 'Motivo']
    : ['ID', 'Fecha Alta', 'Cliente', 'Dispositivo', 'Para', 'Prioridad', 'Técnico', 'Estado'];

  const filasTabla = registros.map((item) => {
    const valores = esLlamada(item)
      ? [
          item.id,
          item.fecha,
          item.cliente,
          item.telefono,
          item.empresa,
          item.prioridad,
          item.tecnicoAsignado || 'Sin asignar',
          item.estado,
          item.motivo,
        ]
      : [
          item.id,
          item.fechaAlta,
          item.cliente,
          item.dispositivo,
          item.para,
          item.prioridad,
          item.tecnicoAsignado || 'Sin asignar',
          item.estado,
        ];

    return new TableRow({
      children: valores.map((v) => crearCelda(String(v))),
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { orientation: PageOrientation.LANDSCAPE },
          },
        },
        children: [
          new Paragraph({
            text: `Centro de Control y Gestión IT — ${titulo}`,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Fecha de exportación: ${fecha}  ·  Total de registros: ${registros.length}`,
                color: '666666',
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                tableHeader: true,
                children: cabeceras.map((c) => crearCelda(c, true)),
              }),
              ...filasTabla,
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${nombreBase}-${fecha}.docx`);
}

export function exportarPDF(
  registros: (EntradaTaller | LlamadaTaller)[],
  titulo: string,
  nombreBase: string
): void {
  if (registros.length === 0) return;

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const fecha = obtenerFechaArchivo();

  doc.setFontSize(16);
  doc.text(`Centro de Control y Gestión IT — ${titulo}`, 14, 16);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Fecha de exportación: ${fecha} · Total registros: ${registros.length}`, 14, 23);
  doc.setTextColor(0);

  const esLlamadaVista = esLlamada(registros[0]);

  const columnas = esLlamadaVista
    ? ['ID', 'Fecha', 'Cliente', 'Teléfono', 'Empresa', 'Prioridad', 'Técnico', 'Estado', 'Motivo']
    : ['ID', 'Fecha Alta', 'Cliente', 'Dispositivo', 'Para', 'Prioridad', 'Técnico', 'Estado'];

  const filas = registros.map((item) => {
    if (esLlamada(item)) {
      return [
        item.id,
        item.fecha,
        item.cliente,
        item.telefono,
        item.empresa,
        item.prioridad,
        item.tecnicoAsignado || 'Sin asignar',
        item.estado,
        item.motivo,
      ];
    }

    return [
      item.id,
      item.fechaAlta,
      item.cliente,
      item.dispositivo,
      item.para,
      item.prioridad,
      item.tecnicoAsignado || 'Sin asignar',
      item.estado,
    ];
  });

  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 28,
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    headStyles: { fillColor: [30, 41, 59] },
  });

  doc.save(`${nombreBase}-${fecha}.pdf`);
}