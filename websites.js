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

const websiteOne = new websiteIdNameUrlFirst(1, "iFunded", "https://ifunded.de/en/");
const websiteTwo = new websiteIdNameUrlSecond(2, "Property Partner", "www.propertypartner.co");
const websiteThree = new websiteIdNameUrlThird(3, "Property Moose", "propertymoose.co.uk");
const websiteFour = new websiteIdNameUrlFourth(4, "Homegrown", "www.homegrown.co.uk");
const websiteFive = new websiteIdNameUrlFifth(5, "Realty Mogul", "https://www.realtymogul.com");