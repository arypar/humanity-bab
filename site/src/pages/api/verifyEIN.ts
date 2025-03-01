import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from 'fs';

const CSV_FILE_PATH = path.join(process.cwd(), "data", "ExemptOrganizations.csv");

function binarySearchEIN(csvLines: string[], targetEIN: string): string | null {
  let left = 0;
  let right = csvLines.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const line = csvLines[mid];
    const [ein] = line.split(",");

    // Remove quotes for comparison
    const cleanEin = ein.replace(/"/g, '');

    console.log(`Comparing: ${cleanEin} with target: ${targetEIN}`);

    if (cleanEin === targetEIN) {
      return line;
    } else if (cleanEin < targetEIN) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { ein, orgName } = req.body;
  console.log("Received EIN Verification Request:", { ein, orgName });

  const cleanEin = ein.replace("-", "");

  console.log("Received EIN:", ein);
  console.log("Cleaned EIN:", cleanEin);

  try {
    const data = await fs.readFile(CSV_FILE_PATH, "utf8");
    const csvLines = data.trim().split("\n");

    console.log("Number of lines in CSV:", csvLines.length);
    console.log("First 5 lines of CSV:", csvLines.slice(0, 5));

    const foundRow = binarySearchEIN(csvLines, cleanEin);

    if (foundRow) {
      console.log("Matching row found:", foundRow);
      return res.status(200).json({ success: true, organization: foundRow });
    } else {
      console.log("No matching EIN found");
      return res.status(404).json({ success: false, error: "No matching EIN found." });
    }
  } catch (error) {
    console.error("Error reading database file:", error);
    return res.status(500).json({ error: "Server error." });
  }
}