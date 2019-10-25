import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { Action, State } from 'vuex-class';
import Cookies from 'js-cookie'

@Component
export default class LoginPage extends Vue {
  public userName: string = ''
  public password: string | number = ''
  @Action('loginActions') public loginAction: any
  public login() {
    this.loginAction({ userName: this.userName, password: this.password }).then(() => {
      this.$router.push('/home')
    })
  }
  protected render() {
    return (
      <div class='login-page'>
        <input v-model={this.userName} />
        <input v-model={this.password} type='password' style='margin-left:10px;' />
        <button style='margin-left:10px' on-click={this.login}>登录</button>
      </div>
    )
  }
}
