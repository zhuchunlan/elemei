<template>
  <div>
    <homeTop></homeTop>
    <homeContent></homeContent>
  </div>
</template>
<script>
import homeTop from "./homeTop";
import homeContent from "./homeContent";
export default {
  data() {
    return {};
  },
  components: {
    homeTop: homeTop,
    homeContent: homeContent,
  },
};
</script>