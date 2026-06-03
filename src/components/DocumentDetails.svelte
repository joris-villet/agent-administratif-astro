<script lang="ts">
  import { storeDocuments } from '@/stores/documents.svelte';
  import { storeUser } from '@/stores/user.svelte';
  import IconTrash from "@/components/Icons/IconTrash.svelte";
  import IconEdit from "@/components/Icons/IconEdit.svelte";
  import AddDocument from "@/components/AddDocument.svelte";

  let selectedFile = $derived(
    storeDocuments.files.find((f) => f.id === storeDocuments.selectedId) ?? null
  );

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  }

  function formatDate(date: Date): string {
    const d = date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${d} à ${h}h${m}`;
  }

  function close() {
    storeDocuments.selectedId = null;
  }

  function removeFile() {
    if (!selectedFile) return;
    const currentId = selectedFile.id;
    storeDocuments.files = storeDocuments.files.filter((f) => f.id !== currentId);
    storeDocuments.selectedId = storeDocuments.files.at(-1)?.id ?? null;
  }

  function getTypeColors(type: string): string {
    switch (type.toUpperCase()) {
      case 'PDF':
        return 'bg-red-100 text-red-600';
      case 'JPG':
      case 'JPEG':
      case 'PNG':
      case 'WEBP':
        return 'bg-blue-100 text-blue-600';
      case 'DOCX':
        return 'bg-indigo-100 text-indigo-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
</script>

<div class="flex flex-col h-full">
  <!-- Header -->
  <div class="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
    <h2 class="text-sm font-semibold text-slate-800">Détails du document</h2>
    {#if selectedFile}
      <button
        onclick={close}
        class="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Fermer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>

  {#if !selectedFile}
    <!-- Empty state -->
    <div class="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
      <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
        <svg class="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-medium text-slate-600">Aucun document sélectionné</p>
        <p class="text-xs text-slate-400 mt-1">Déposez un fichier pour voir ses détails ici</p>
      </div>
    </div>
  {:else}
    <div class="flex-1 overflow-y-auto min-h-0">
      <!-- File summary -->
      <div class="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center text-[0.65rem] font-bold shrink-0 {getTypeColors(selectedFile.type)}">
          {selectedFile.type}
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold text-slate-800 truncate">{selectedFile.name}</p>
          <p class="text-xs text-slate-400 mt-0.5">{selectedFile.type} • {formatSize(selectedFile.size)}</p>
        </div>
      </div>

      <!-- Informations -->
      <div class="px-6 py-5 border-b border-border">
        <h3 class="text-sm font-bold text-slate-800 mb-4">Informations</h3>
        <div class="space-y-3.5">
          <div class="flex items-start justify-between gap-4">
            <span class="text-xs text-slate-400 shrink-0">Nom du fichier</span>
            <span class="text-xs text-slate-700 text-right break-all">{selectedFile.name}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-slate-400 shrink-0">Type</span>
            <span class="text-xs text-slate-700">{selectedFile.type}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-slate-400 shrink-0">Taille</span>
            <span class="text-xs text-slate-700">{formatSize(selectedFile.size)}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-slate-400 shrink-0">Statut</span>
            {#if selectedFile.status === 'ingere'}
              <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-600">Ingéré</span>
            {:else}
              <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-600">En attente</span>
            {/if}
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-slate-400 shrink-0">Ajouté le</span>
            <span class="text-xs text-slate-700 text-right">{formatDate(selectedFile.addedAt)}</span>
          </div>
          {#if storeUser.email}
            <div class="flex items-center justify-between gap-4">
              <span class="text-xs text-slate-400 shrink-0">Ingéré par</span>
              <span class="text-xs text-slate-700 text-right truncate max-w-36">{storeUser.email}</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Preview -->
      <div class="px-6 py-5">
        <h3 class="text-sm font-bold text-slate-800 mb-4">Aperçu</h3>
        <div class="rounded-xl border border-border bg-slate-50 overflow-hidden flex items-center justify-center min-h-40">
          {#if selectedFile.previewUrl && selectedFile.mimeType === 'application/pdf'}
            <iframe
              src={selectedFile.previewUrl}
              title="Aperçu PDF"
              class="w-full h-100"
            ></iframe>
          {:else if selectedFile.previewUrl}
            <img
              src={selectedFile.previewUrl}
              alt="Aperçu"
              class="w-full h-auto object-contain max-h-full"
            />
          {:else}
            <div class="flex flex-col items-center gap-2 py-10 text-slate-400">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-xs">Aperçu non disponible</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="py-4 border-t border-border">
    <div class="w-2/3 mx-auto flex justify-center items-center gap-10">
      <AddDocument file={selectedFile} />
      <button
        class="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-200 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
      >
        <IconEdit size={24}/>
      </button>
      <button
        onclick={removeFile}
        class="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-200 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <IconTrash size={24}/>
      </button>
    </div>
    </div>
  {/if}
</div>
