class Prev {
    constructor(){
        this.name = "vikram "
    }
    getName() {
        return `My name is prev ${this.name}`
    }
}
class Next extends Prev {
    constructor(){
        super();
    }
    getName() {
        return`My name is ${this.name} is comming from Next`
    }
}

// const prev = new Prev();
const next = new Next();
console.log(next.getName());