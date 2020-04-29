<template>
  <!-- Main Footer -->
  <footer class="main-footer">
    <strong>
      Copyright &copy; 2020
      <a href="/">MojiPanda</a>.
      All rights reserved.
    </strong>
  </footer>
</template>

<style scoped>
.main-footer {
  display: block;
  bottom: 0;
  cursor: default;
  left: 0;
  line-height: 8em;
  position: absolute;
  text-align: center;
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      description: "Version 1.0.0"
    };
  }
};
</script>