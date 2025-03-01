import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";

const CSV_FILE_PATH = path.join(process.cwd(), "data", "ExemptOrganizations.csv");

const binarySearchEIN = (csvData: string[], ein: string) => {
  let left = 0;
  let right = csvData.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = csvData[mid].split(",");
    const midEIN = row[0].trim();

    if (midEIN === ein) {
      return row; 
    } else if (midEIN < ein) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null; 
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { ein, orgName } = req.body;
  console.log("Received EIN Verification Request:", { ein, orgName });

  const cleanEin = ein.replace("-", "");

  try {
    const data = await fs.readFile(CSV_FILE_PATH, "utf8");
    const csvLines = data.trim().split("\n");
    const foundRow = binarySearchEIN(csvLines, cleanEin);

    if (foundRow) {
      return res.status(200).json({ success: true, organization: foundRow });
    } else {
      return res.status(404).json({ success: false, error: "No matching EIN found." });
    }
  } catch (error) {
    console.error("Error reading database file:", error);
    return res.status(500).json({ error: "Server error." });
  }
}