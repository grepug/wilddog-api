import wilddog = require('wilddog')

interface Config {
  syncURL: string,
  authDomain: string
}

export class Wilddog {

  private config: Config
  public wilddog: any
  public sync: wilddog.sync.sync

  constructor (
    config: Config,
  ) {
    this.config = config
  }

  public init (): Wilddog {
    this.wilddog = wilddog.initializeApp(this.config)
    this.sync = this.wilddog.sync()
    return this
  }

}
