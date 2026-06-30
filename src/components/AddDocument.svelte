<script lang="ts">
  import IconAdd from "@/components/Icons/IconAdd.svelte";
  import type { IDocumentFile } from "@/interfaces/file";
  import { storeDocuments } from "@/stores/documents.svelte";
  import ky from "ky";
  // import toast from 'svelte-french-toast';

  const { file }: { file: IDocumentFile } = $props();

  let docIsSaved = $derived(storeDocuments.docSaved);

  const handleAddDocument = async (file: IDocumentFile) => {
    try {
      const formData = new FormData();
      console.log(file.rawFile instanceof File);
      formData.append("file", file.rawFile);
      console.log("formData => ", formData);

      const url = `${import.meta.env.PUBLIC_BACKEND_URL}/api/document/add`;

      const json = await ky
        .post(url, {
          credentials: "include",
          body: formData,
          timeout: 60000,
        })
        .json();

      if (json) {
        console.log("document ajouté =>", json);
        // toast.success('Document Enregistré')
        storeDocuments.docSaved = true;
      }
    } catch (err) {
      console.error("err add document =>", err);
      // toast.error('Error adding document')
    }
  };
</script>

{#if !docIsSaved}
  <button
    onclick={() => handleAddDocument(file)}
    class="h-12 w-12 flex items-center justify-center border-green-200 text-green-500 rounded-full border-2 hover:bg-green-50 transition-colors cursor-pointer"
  >
    <IconAdd size={24} />
  </button>
{/if}
