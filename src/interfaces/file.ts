export interface IDocumentFile {
  id: string;
  name: string;
  type: string;
  mimeType: string;
  size: number;
  status: 'en_attente' | 'ingere';
  addedAt: Date;
  previewUrl: string | null;
  rawFile: File;
}

export interface IStoreDocuments {
  files: IDocumentFile[];
  selectedId: string | null;
  docSaved: boolean;
  documents: any[]
}