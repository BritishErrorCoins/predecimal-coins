import { saveAs } from "file-saver";

export function exportToCSV(data, filename = "export.csv") {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map(row =>
      headers.map(field => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`).join(",")
    )
  ].join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}
