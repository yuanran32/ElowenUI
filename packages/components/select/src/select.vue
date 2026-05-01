<script setup lang="ts">
import { computed, ref } from 'vue'
import { selectEmits, selectProps } from './select'
import { useSelect } from './use-select'

defineOptions({
  name: 'MySelect',
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)
const rootRef = ref<HTMLElement>()

const {
  visible,
  hoveredIndex,
  triggerRef,
  dropdownId,
  optionIdPrefix,
  selectedOption,
  showClear,
  toggle,
  clear,
  selectOption,
  setHoveredIndex,
  handleKeydown,
  handleFocus,
  handleBlur,
} = useSelect(props, emit, rootRef)

const classes = computed(() => [
  'my-select',
  `is-${props.variant}`,
  {
    'is-disabled': props.disabled,
    'is-open': visible.value,
  },
])
</script>

<template>
  <div ref="rootRef" :class="classes">
    <button
      ref="triggerRef"
      class="my-select__trigger"
      type="button"
      role="combobox"
      :aria-expanded="visible"
      :aria-controls="dropdownId"
      :aria-activedescendant="hoveredIndex >= 0 ? `${optionIdPrefix}-${hoveredIndex}` : undefined"
      :disabled="props.disabled"
      @click="toggle"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <span v-if="selectedOption" class="my-select__value">{{ selectedOption.label }}</span>
      <span v-else class="my-select__placeholder">{{ props.placeholder }}</span>
      <span class="my-select__actions">
        <span
          v-if="showClear"
          class="my-select__clear"
          role="button"
          tabindex="0"
          aria-label="clear select"
          @click.stop="clear"
          @keydown.enter.stop.prevent="clear"
          @keydown.space.stop.prevent="clear"
        >
          ×
        </span>
        <span class="my-select__arrow" aria-hidden="true">⌄</span>
      </span>
    </button>

    <div v-if="visible" :id="dropdownId" class="my-select__dropdown">
      <ul class="my-select__list" role="listbox">
        <li
          v-for="(option, index) in props.options"
          :id="`${optionIdPrefix}-${index}`"
          :key="String(option.value)"
          class="my-select__option"
          role="option"
          :aria-selected="selectedOption?.value === option.value"
          :aria-disabled="option.disabled || undefined"
          :class="{
            'is-selected': selectedOption?.value === option.value,
            'is-hovered': hoveredIndex === index,
            'is-disabled': option.disabled,
          }"
          @mouseenter="setHoveredIndex(index)"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.my-select {
  position: relative;
  width: 100%;
}

.my-select__trigger {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: var(--my-spacing-md);
  border: 1px solid var(--my-color-border);
  border-radius: var(--my-radius-base);
  padding: 10px 12px;
  background: var(--my-color-white);
  color: var(--my-color-text-primary);
  font-size: var(--my-font-size-base);
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--my-transition-duration) var(--my-transition-ease),
    box-shadow var(--my-transition-duration) var(--my-transition-ease);
}

.my-select__trigger:focus {
  border-color: var(--my-color-primary);
  box-shadow: 0 0 0 3px var(--my-color-primary-light);
  outline: none;
}

.my-select.is-filled .my-select__trigger {
  border-color: transparent;
  background: var(--my-color-fill-light);
}

.my-select.is-filled .my-select__trigger:focus {
  border-color: transparent;
}

.my-select.is-quiet .my-select__trigger {
  border-width: 0 0 1px;
  border-radius: 0;
  padding-left: 0;
  background: transparent;
}

.my-select.is-quiet .my-select__trigger:focus {
  box-shadow: 0 2px 0 0 var(--my-color-primary);
}

.my-select.is-open .my-select__trigger {
  border-color: var(--my-color-primary);
}

.my-select.is-disabled .my-select__trigger,
.my-select__trigger:disabled {
  background: var(--my-color-fill-light);
  color: var(--my-color-text-placeholder);
  cursor: not-allowed;
}

.my-select__value,
.my-select__placeholder {
  flex: 1;
  min-width: 0;
}

.my-select__placeholder {
  color: var(--my-color-text-placeholder);
}

.my-select__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--my-spacing-sm);
  color: var(--my-color-text-secondary);
}

.my-select__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--my-color-primary-light);
  color: var(--my-color-primary);
  cursor: pointer;
}

.my-select__arrow {
  font-size: var(--my-font-size-base);
  line-height: 1;
  transition: transform var(--my-transition-duration) var(--my-transition-ease);
}

.my-select.is-open .my-select__arrow {
  transform: rotate(180deg);
}

.my-select__dropdown {
  position: absolute;
  z-index: var(--my-z-index-dropdown);
  width: 100%;
  margin-top: var(--my-spacing-sm);
  border: 1px solid var(--my-color-border-light);
  border-radius: 12px;
  background: var(--my-color-white);
  box-shadow: var(--my-shadow-md);
}

.my-select.is-filled .my-select__dropdown {
  border-color: transparent;
}

.my-select__list {
  margin: 0;
  padding: 6px;
  list-style: none;
}

.my-select__option {
  border-radius: var(--my-radius-small);
  padding: 10px 12px;
  color: var(--my-color-text-primary);
  cursor: pointer;
  transition:
    background var(--my-transition-duration) var(--my-transition-ease),
    color var(--my-transition-duration) var(--my-transition-ease);
}

.my-select__option.is-hovered,
.my-select__option:hover {
  background: var(--my-color-fill-light);
}

.my-select__option.is-selected {
  background: var(--my-color-primary-light);
  color: var(--my-color-primary);
  font-weight: 600;
}

.my-select__option.is-disabled {
  color: var(--my-color-text-placeholder);
  cursor: not-allowed;
}

.my-select__option.is-disabled:hover {
  background: transparent;
}
</style>
