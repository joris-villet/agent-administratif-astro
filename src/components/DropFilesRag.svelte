<script lang="ts">
  import { addFiles } from '@/stores/documents.svelte';

  let isDragging = $state(false)

  function handleFiles(newFiles: FileList | null) {
    if (newFiles && newFiles.length > 0) addFiles(newFiles);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    isDragging = false
    handleFiles(e.dataTransfer?.files ?? null)
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault()
    isDragging = true
  }

  function onDragLeave() {
    isDragging = false
  }

  let inputEl: HTMLInputElement

  function onInputChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement
    handleFiles(input.files)
  }

  function openPicker() {
    inputEl.click()
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      inputEl.click()
    }
  }
</script>

<div
  role="button"
  class="block w-full border-[1.5px] border-dashed rounded-xl p-8 cursor-pointer transition-colors duration-200 {isDragging ? 'border-indigo-500 bg-violet-50' : 'border-gray-300 bg-gray-50 hover:border-indigo-500 hover:bg-violet-50'}"
  tabindex="0"
  ondrop={onDrop}
  ondragover={onDragOver}
  ondragleave={onDragLeave}
  onclick={openPicker}
  onkeydown={onKeyDown}
>
  <input
    bind:this={inputEl}
    type="file"
    accept=".pdf,.jpg,.jpeg,.png,.docx"
    multiple
    onchange={onInputChange}
    class="hidden"
  />

  <div class="flex items-center justify-center gap-5">
    <div class="relative shrink-0 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-11 h-11">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <span class="absolute -bottom-1 -right-1.5 bg-green-500 rounded-full w-[1.1rem] h-[1.1rem] flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[0.65rem] h-[0.65rem]">
          <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd"/>
        </svg>
      </span>
    </div>

    <div class="flex flex-col gap-1">
      <p class="text-[0.95rem] font-medium text-gray-700 m-0">Déposez ou sélectionnez vos fichiers</p>
      <p class="text-[0.8rem] text-gray-400 m-0">Formats acceptés : PDF, JPG, DOCX, PNG</p>
    </div>
  </div>
</div>