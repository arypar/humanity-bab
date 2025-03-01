declare module 'pdf-parse' {
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
  }

  interface PDFText {
    text: string;
  }

  interface PDFParseOptions {
    version?: string;
  }

  function pdf(dataBuffer: Buffer, options?: PDFParseOptions): Promise<PDFText & PDFInfo>;

  export = pdf;
} 