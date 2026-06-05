import type { IStoreDocuments, IDocumentFile } from "@/interfaces/file";

export const storeDocuments = $state<IStoreDocuments>({
  files: [],
  selectedId: null,
  docSaved: false,
  documents: []
});

export function addFiles(fileList: FileList) {
  for (const file of Array.from(fileList)) {
    const ext = file.name.split('.').pop()?.toUpperCase() ?? 'FILE';
    const isPreviewable = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
    ].includes(file.type);

    const id = crypto.randomUUID();
    const doc: IDocumentFile = {
      id,
      name: file.name,
      type: ext,
      mimeType: file.type,
      size: file.size,
      status: 'en_attente',
      addedAt: new Date(),
      previewUrl: isPreviewable ? URL.createObjectURL(file) : null,
      rawFile: file,
    };

    storeDocuments.files.push(doc);
    storeDocuments.selectedId = id;
  }
}
