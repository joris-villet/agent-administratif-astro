<!-- <script lang="ts">
  import ky from "ky";
  import { onMount } from "svelte";
  import { storeDocuments } from "@/stores/documents.svelte";

  let offset = $state<number>(0);
  let limit = $state<number>(5);
  let documents = $derived(storeDocuments.documents);

  async function fecthDocuments() {
    try {
      const url = `${import.meta.env.PUBLIC_FASTIFY_URL}/api/document/list/${offset}/${limit}`;
      const { data } = await ky
        .get(url, {
          credentials: "include",
        })
        .json<{ data: any[] }>();

      if (data) {
        storeDocuments.documents = [...data];
      }

      console.log("documents list => ", data);
    } catch (err) {
      console.log("err fetch documents => ", err);
    }
  }

  onMount(() => {
    fecthDocuments();
  });
</script>

<section class="py-8">
  {#if documents.length > 0}
    <div
      class="overflow-x-auto rounded-box border border-base-content/5 text-neutral-600"
    >
      <table class="table">
        <thead>
          <tr class="text-neutral-600">
            <th>
              <input type="checkbox" class=" bg-white" />
            </th>
            <th class="text-center">Nom du document</th>
            <th class="text-center">Type</th>
            <th class="text-center">Taille</th>
            <th class="text-center">Status</th>
            <th class="text-center">Ajouté le</th>
          </tr>
        </thead>
        <tbody>
          {#each documents as document}
            <tr>
              <td>
                <input class="text-neutral-600" type="checkbox" />
              </td>
              <td class="text-center">{document.title}</td>
              <td
                class="table mx-auto py-1 px-2 border border-neutral-200 text-neutral-500 font-bold p-0 w-3 rounded-md text-center bg-neutral-100"
              >
                {#if document.mimeType === "application/pdf"}
                  PDF
                {:else if document.mimeType === "image/jpeg"}
                  JPEG
                {:else if document.mimeType === "image/png"}
                  PNG
                {:else}
                  {document.mimeType}
                {/if}
              </td>
              <td>{document.createdAt}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>
 -->

<script lang="ts">
  import ky from "ky";
  import { onMount } from "svelte";
  import { FileText, Eye, Pencil, Trash2 } from "@lucide/svelte";
  import { storeDocuments } from "../stores/documents.svelte";

  type DocumentStatus = "ingested" | "processing" | "failed";
  interface Document {
    id: string;
    title: string;
    mimeType: string;
    size: number; // bytes
    status: DocumentStatus;
    createdAt: string; // ISO
  }

  let offset = $state(0);
  let limit = $state(5);
  let total = $state(0);
  let loading = $state(false);
  let error = $state<string | null>(null);

  const documents = $derived(storeDocuments.documents);

  // --- helpers ---
  const dateFmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short" });
  const formatDate = (iso: string) => dateFmt.format(new Date(iso));

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  }

  const statusLabels: Record<DocumentStatus, { label: string; cls: string }> = {
    ingested: { label: "Ingéré", cls: "badge-success" },
    processing: { label: "En cours", cls: "badge-warning" },
    failed: { label: "Échec", cls: "badge-error" },
  };

  function pdfIcon(mime: string) {
    if (mime === "application/pdf")
      return { color: "text-red-500", label: "PDF" };
    if (mime.startsWith("image/"))
      return { color: "text-blue-500", label: "IMG" };
    return { color: "text-neutral-500", label: "FILE" };
  }

  // --- fetch ---
  async function fetchDocuments() {
    loading = true;
    error = null;
    try {
      const url = `${import.meta.env.PUBLIC_BACKEND_URL}/api/document/list/${offset}/${limit}`;
      const res = await ky
        .get(url, { credentials: "include" })
        .json<{ data: Document[]; total: number }>();

      storeDocuments.documents = res.data;
      total = res.total;
    } catch (err) {
      error = err instanceof Error ? err.message : "Erreur inconnue";
    } finally {
      loading = false;
    }
  }

  // --- actions ---
  function viewDocument(doc: Document) {
    /* ouvre /api/document/:id ou modal */
  }
  function editDocument(doc: Document) {
    /* ouvre modal d'édition */
  }
  async function deleteDocument(doc: Document) {
    if (!confirm(`Supprimer "${doc.title}" ?`)) return;
    await ky.delete(
      `${import.meta.env.PUBLIC_FASTIFY_URL}/api/document/${doc.id}`,
      { credentials: "include" }
    );
    await fetchDocuments();
  }

  onMount(fetchDocuments);
</script>

<section class="py-8">
  {#if error}
    <div class="alert alert-error">{error}</div>
  {/if}

  {#if documents.length > 0}
    <div class="overflow-x-auto rounded-box border border-base-content/5">
      <table class="table">
        <thead class="text-neutral-600">
          <tr>
            <th><input type="checkbox" class="checkbox checkbox-sm" /></th>
            <th>Nom du document</th>
            <th class="text-center">Type</th>
            <th class="text-center">Taille</th>
            <th class="text-center">Status</th>
            <th class="text-center">Ajouté le</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each documents as document (document.id)}
            {@const icon = pdfIcon(document.mimeType)}
            <tr>
              <td><input type="checkbox" class="checkbox checkbox-sm" /></td>
              <td>
                <div class="flex items-center gap-2">
                  <FileText class={`w-5 h-5 ${icon.color}`} />
                  <span>{document.title}</span>
                </div>
              </td>
              <td class="text-center">
                <span class="badge badge-neutral">{icon.label}</span>
              </td>
              <td class="text-center">{formatSize(document.size)}</td>
              <td class="text-center">
                <span class={`badge ${statusLabels[document.status].cls}`}>
                  {statusLabels[document.status].label}
                </span>
              </td>
              <td class="text-center">{formatDate(document.createdAt)}</td>
              <td class="text-center">
                <div class="flex justify-center gap-1">
                  <button
                    class="btn btn-ghost btn-xs"
                    onclick={() => viewDocument(document)}
                    aria-label="Voir"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button
                    class="btn btn-ghost btn-xs"
                    onclick={() => editDocument(document)}
                    aria-label="Éditer"
                  >
                    <Pencil class="w-4 h-4" />
                  </button>
                  <button
                    class="btn btn-ghost btn-xs text-error"
                    onclick={() => deleteDocument(document)}
                    aria-label="Supprimer"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <span class="text-neutral-500">
        {offset + 1}–{Math.min(offset + limit, total)} sur {total}
      </span>
      <div class="join">
        <button
          class="join-item btn btn-sm"
          disabled={offset === 0}
          onclick={() => {
            offset = Math.max(0, offset - limit);
            fetchDocuments();
          }}
        >
          ← Précédent
        </button>
        <button
          class="join-item btn btn-sm"
          disabled={offset + limit >= total}
          onclick={() => {
            offset += limit;
            fetchDocuments();
          }}
        >
          Suivant →
        </button>
      </div>
    </div>
  {:else if loading}
    <div class="flex justify-center py-8">
      <span class="loading loading-spinner"></span>
    </div>
  {:else}
    <p class="text-center text-neutral-500 py-8">Aucun document.</p>
  {/if}
</section>
