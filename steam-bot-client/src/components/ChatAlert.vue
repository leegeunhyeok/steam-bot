<template>
  <transition name="slide" mode="out-in">
    <div id="alert">{{ alertMessage }}</div>
  </transition>
</template>

<script>
export default {
  name: 'ChatAlert',
  props: ['alertMessage']
}
</script>

<style lang="scss">
@import '../common.scss';

#alert {
  position: absolute;
  top: 0px;
  left: 0px;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: $background-color-dark;
  color: $background-text-color;
  text-align: center;
  z-index: 9999;
}

.slide-enter-active, .slide-leave-active {
  transition: .5s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-100px);
}
</style>
