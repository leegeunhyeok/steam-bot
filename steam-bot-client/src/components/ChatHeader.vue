<template>
  <div id="header">
    <div id="header-menu-area">
      <img src="../assets/header-menu.png" @click="$emit('drawerOpen')">
    </div>
    <img src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'ChatHeader'
}
</script>

<style lang="scss">
@import '../common.scss';

#header {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background-color-dark;
  height: $header-height;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.75);

  #header-menu-area {
    position: fixed;
    margin-top: 3px;
    width: 50px;
    height: 50px;
    top: 5px;
    left: 5px;

    img {
      cursor: pointer;
      width: 100%;
    }
  }
}
</style>
