<script lang="ts">
  type DocType = "pdf" | "jpg" | "docx";

  interface Document {
    id: number;
    name: string;
    type: string;
    size: string;
    checked: boolean;
    icon: DocType;
  }

  let documents = $state<Document[]>([
    { id: 1, name: "Justificatif de domicile.pdf", type: "PDF", size: "1.2 Mo", checked: true, icon: "pdf" },
    { id: 2, name: "Pièce d'identité.pdf", type: "PDF", size: "2.1 Mo", checked: true, icon: "pdf" },
    { id: 3, name: "Avis d'imposition 2024.jpg", type: "JPG", size: "1.4 Mo", checked: false, icon: "jpg" },
    { id: 4, name: "Bulletins de salaire.pdf", type: "PDF", size: "3.5 Mo", checked: true, icon: "pdf" },
    { id: 5, name: "Contrat de travail.docx", type: "DOCX", size: "78 Ko", checked: false, icon: "docx" },
  ]);

  let selectedCount = $derived(documents.filter((d) => d.checked).length);

  function toggleDoc(id: number) {
    documents = documents.map((d) => d.id === id ? { ...d, checked: !d.checked } : d);
  }

  function deselectAll() {
    documents = documents.map((d) => ({ ...d, checked: false }));
  }

  const iconColors: Record<DocType, string> = {
    pdf: "bg-red-100 text-red-600",
    jpg: "bg-green-100 text-green-600",
    docx: "bg-blue-100 text-blue-600",
  };
</script>

<div class="flex flex-col h-full">

  <!-- Header -->
  <div class="flex items-center justify-between mb-1 px-5 pt-5">
    <div class="flex items-center gap-1.5">
      <h2 class="text-base font-bold text-slate-800">Documents</h2>
      <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <button class="flex items-center gap-1.5 text-xs font-semibold text-accent border border-accent/30 px-3 py-1.5 rounded-lg hover:bg-accent/5 transition-colors">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      Ajouter des documents
    </button>
  </div>
  <p class="text-xs text-muted px-5 mb-4">Ajoutez les documents utiles à votre demande.<br/>Vous pouvez en sélectionner plusieurs.</p>

  <!-- Documents list -->
  <div class="flex-1 overflow-y-auto px-4 space-y-1.5">
    {#each documents as doc (doc.id)}
      <label class="flex items-center gap-3 px-3 py-6 rounded-xl border border-gray-300 hover:bg-slate-50 cursor-pointer transition-colors group">
        <input type="checkbox" class="sr-only" checked={doc.checked} onchange={() => toggleDoc(doc.id)} />
        <div class={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${doc.checked ? 'bg-accent border-accent' : 'border-slate-300 group-hover:border-accent/50'}`}>
          {#if doc.checked}
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          {/if}
        </div>
        <div class={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${iconColors[doc.icon]}`}>
          {doc.type}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-700 truncate">{doc.name}</p>
          <p class="text-xs text-muted">{doc.type} • {doc.size}</p>
        </div>
        <button aria-label="Options" class="shrink-0 p-1 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all rounded" onclick={(e) => e.preventDefault()}>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
        </button>
      </label>
    {/each}
  </div>

  <!-- Security notice -->
  <div class="mx-4 mt-3 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 border border-border">
    <svg class="w-5 h-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
    </svg>
    <p class="text-xs text-muted leading-snug">Vos documents sont sécurisés<br/><span class="text-slate-500">Seuls vous et notre agent-administratif y avez accès.</span></p>
  </div>

  <!-- Footer -->
  <div class="px-5 py-3 flex items-center justify-between border-t border-border mt-3">
    <p class="text-sm text-muted">{selectedCount} document{selectedCount > 1 ? 's' : ''}(s) sélectionné{selectedCount > 1 ? 's' : ''}</p>
    <button onclick={deselectAll} class="text-sm font-semibold text-accent hover:text-accent-light transition-colors">
      Tout désélectionner
    </button>
  </div>

</div>
