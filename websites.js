export default class websiteName {
    constructor(id, name, url) {
      this.id = id
      this.name = name
      this.url = url
    }

    getWebsite(){
        return `${this.id} ${this.name} ${this.url}`;
    }
  }