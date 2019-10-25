import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import CountUp from 'countup'

@Component({
  name: 'CountTo',
})
export default class CountTo extends Vue {
  @Prop({ type: Number, default: 0 }) public readonly start!: number
  @Prop(Number) public readonly end!: number
  public counter: CountUp | undefined
  public get eleId() {
    return `count_to_${(this as any)._uid}`
  }
  public update(endVal: number): void {
    this.counter!.update(endVal)
  }
  // 这里写完后效果等同于：public click(event) { this.$emit('on-click', event) }
  @Emit('on-click')
  public click(event: any): any {
    return event
  }
  protected render() {
    return (
      <div class='count-up-wrap' on-click={this.click}>
        <span id={this.eleId}></span>
      </div>
    )
  }
  protected mounted() {
    this.counter = new CountUp(this.eleId, this.start, this.end, 0, 1, {})
    this.counter!.start();
  }
}

