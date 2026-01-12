import { makeAutoObservable } from "mobx"

class UserStore {
  _isAuth: boolean
  _user: {}
  constructor () {
    this._isAuth = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(set: boolean) {
    this._isAuth = set
  }

  setUser(user: {}) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}

export default UserStore
