<template>
  <div class="home">
    <count-to :start="10" :end="10000" ref="counter" @on-click="handleClick"></count-to>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CountTo from '@/components/CountTo'

@Component({
  name: 'HomePage',
  components: {
    CountTo,
  },
})
export default class Home extends Vue {
  public handleClick(event: any): void {
    console.log(event)
  }
  protected mounted() {
    setInterval(() => {
      (this.$refs.counter as CountTo).update(Math.random() * 10000) // 这样每2秒钟这里会更新一次，更新的值是随机的
    }, 2000)
  }
}
</script>