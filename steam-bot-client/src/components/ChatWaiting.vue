<template>
  <div class="wait-message">
    <span class="wait-icon"></span>
    <span class="wait-icon"></span>
    <span class="wait-icon"></span>
  </div>
</template>

<script>
export default {
  name: 'ChatWaiting'
}
</script>

<style lang="scss">
@import '../common.scss';

$wait-icon-size: 10px;

@mixin message{
  display: inline-block;
  border-radius: 10px;
  padding: 5px 10px;
  word-wrap: break-word;
}

@mixin animation($delay) {
  animation-name: wait-icon;
  animation-duration: .8s;
  animation-delay: $delay;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}

@keyframes wait-icon {
  100% {
    opacity: 0;
  }
}

.wait-message {
  @include message;
  float: left;
  background-color: $secondary-color;
  text-align: center;

  .wait-icon {
    width: $wait-icon-size;
    height: $wait-icon-size;
    border-radius: 50%;
    margin: 5px 3px;
    display: block;
    box-sizing: border-box;
    background-color: $primary-color;
    float: left;
  }

  .wait-icon:nth-child(1) {
    @include animation(0s);
  }

  .wait-icon:nth-child(2) {
    @include animation(0.3s);
  }

  .wait-icon:nth-child(3) {
    @include animation(0.6s);
  }
}

</style>