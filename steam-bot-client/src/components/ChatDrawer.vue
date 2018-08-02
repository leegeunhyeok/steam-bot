<template>
  <transition name="drawer" mode="out-in">
    <div id="drawer">
      <div id="drawer-close" @click="$emit('drawerClose')">
        <span class="cross c1"></span>
        <span class="cross c2"></span>
      </div>
      <div id="drawer-content">
        Drawer 입니다.
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ChatDrawer'
}
</script>

<style lang="scss">
@import '../common.scss';

$drawer-width: 180px;

#drawer {
  position: absolute;
  top: 0px;
  background-color: $background-color-dark;
  width: $drawer-width;
  height: 100%;
  transition: .5s;
  color: $background-text-color;

  #drawer-close {
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin-top: 5px;
    margin-left: $drawer-width - 55;

    .cross {
      position: fixed;
      top: 25px;
      cursor: pointer;
      display: block;
      box-sizing: border-box;
      background-color: rgba(62, 126, 167, 1);
      border-radius: 2px;
      width: 40px;
      height: 5px;

      &.c1 {
        transform: rotate(45deg);
        margin: 0;
      }

      &.c2 {
        transform: rotate(-45deg);
        margin: 0;
      }
    }
  }

  #drawer-content {
    padding: 5px 10px;
    box-sizing: border-box;
  }
}

.drawer-enter-active, .drawer-leave-active {
  transition: .5s;
}
.drawer-enter, .drawer-leave-to {
  transform: translateX(-180px);
}
</style>
