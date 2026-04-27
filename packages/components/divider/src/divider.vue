<script setup lang="ts">
import { dividerProps } from './divider'
import { useDivider } from './use-divider'

defineOptions({
  name: 'MyDivider',
})

const props = defineProps(dividerProps)
const { classes } = useDivider(props)
</script>

<template>
  <div :class="classes" role="separator" :aria-orientation="props.direction">
    <span v-if="props.direction === 'horizontal' && $slots.default" class="my-divider__text">
      <slot />
    </span>
  </div>
</template>

<style scoped>
.my-divider {
  --my-divider-color: #dcdfe6;
  position: relative;
}

.my-divider--horizontal {
  width: 100%;
  margin: 20px 0;
  border-top: 1px solid var(--my-divider-color);
}

.my-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 12px;
  vertical-align: middle;
  border-left: 1px solid var(--my-divider-color);
}

.my-divider.is-dashed {
  border-style: dashed;
}

.my-divider__text {
  position: absolute;
  top: 0;
  padding: 0 12px;
  background: #ffffff;
  color: #909399;
  font-size: 13px;
  transform: translateY(-50%);
}

.my-divider.is-left .my-divider__text {
  left: 20px;
}

.my-divider.is-center .my-divider__text {
  left: 50%;
  transform: translate(-50%, -50%);
}

.my-divider.is-right .my-divider__text {
  right: 20px;
}
</style>
